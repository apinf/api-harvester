"use strict";

const request = require("request");

var authenticate = require("./authenticate");
var sender_conf = require("./sender_config");
var fs = require('fs');

var apiCounter = 0;
var failingApiCounter = 0;
var index = require("../index");
var waitingHttpResponses = 0;
var logSender = false;
var errorInDataFieldContentCount = 0;
var error400Count = 0;
var error409Count = 0;

/**
 * Sender of transformed data in api
 * @class Sender
 */
class Sender {
    /**
     * Generate guid number
     * @private
     * @returns {string} - guid
     * @memberOf Sender
     */
    _guid () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
    }

    /**
     * Send transformed data in api
     * @public
     * @param {any} data - transformed data
     * @param {any} callback - callback
     * @returns {void}
     * @memberOf Sender
     */
    send(data, callback) {
        if (apiCounter == 0) {
            // when beginning harvesting, add proper start to the beginning of harvesting-errors.json file
            this.manageErrorOutputFile(false, function () {});
        }

        // use the API info + additional meta data to form an harvesting error
        const harv_err = {
            reason: '',
            api_name: '',
            desc_start: '',
            desc_exceeding: '',
            api_url: '',
            mod_sent: 0,
            is_duplicate: 0,
            idNo: 0
        };
        apiCounter += 1;
        var error_found = 0;

        // this is the url validator string from the Simple-Schema that the platform uses
        // source for the regex strign (code row #547 from the below link)
        // https://github.com/aldeed/meteor-simple-schema/blob/master/simple-schema.js
        var re_url = new RegExp("^(?:(?:https?|ftp):\\/\\/)(?:\\S+(?::\\S*)?@)?(?:(?!10(?:\\."+
        "\\d{1,3}){3})(?!127(?:\\.\\d{1,3}){3})(?!169\\.254(?:\\.\\d{1,3}){2})(?!192\\.168(?:\\."+
        "\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\."+
        "(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|"+
        "(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\."+
        "(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))"+
        "(?::\\d{2,5})?(?:\\/[^\\s]*)?$","i");

        if (data.description.length > 1000 || !re_url.test(data.endpoint.toString().trim())) {
            // during harvesting, add ',' to separate error objects in the harvesting-errors.json file
            if (failingApiCounter > 0) {
                this.manageErrorOutputFile(false, function () {});
            }
            failingApiCounter += 1;
            if (data.description.length > 1000) {
                if (!error_found) {
                    harv_err.reason = 'Too long description';
                    harv_err.api_name = data.title;
                    harv_err.desc_start = data.description.substring(0,1000);
                    harv_err.desc_exceeding = data.description.substring(1000),
                    harv_err.api_url = data.endpoint;
                    harv_err.idNo = failingApiCounter;
                }
                if (logSender) console.log('Harvesting error found!! (Too long description)');

                error_found += 1;
            }

            if (!re_url.test(data.endpoint.toString().trim())) {
                if (!error_found) {
                    harv_err.reason = 'Invalid URL';
                    harv_err.api_name = data.title;
                    harv_err.desc_start = data.description;
                    harv_err.api_url = data.endpoint;
                    harv_err.idNo = failingApiCounter;
                }
                else {
                    harv_err.reason = 'Too long description AND Invalid URL';
                    harv_err.api_url = data.endpoint;
                }
                if (logSender) console.log('Harvesting error found!! (Invalid URL)');

                error_found += 1;
            }
            fs.appendFileSync(sender_conf.output_errors_file, JSON.stringify(harv_err), function (err) {
              if (err) throw err;
            });

            errorInDataFieldContentCount += 1;

            this.checkToCloseTheErrorsFile();
        }

        if (!error_found) {
            waitingHttpResponses += 1;
            const url = sender_conf.send_apis_url,
                json = {
                    name: data.title,
                    description: data.description,
                    url: data.endpoint
                };

            request.post(
                url,
                {
                    json: true,
                    headers: {
                        "content-type": "application/json",
                        "X-Auth-Token": authenticate.authToken,
                        "X-User-Id": authenticate.userId
                    },
                    body: json
                },
                    (err, response, body) => {
                        if (err || ( response.statusCode !== 200 &&
                        response.statusCode !== 400 && response.statusCode !== 409 )) {
                            const msg = `Unable to load data in api ${url}, error: ${err || response.statusMessage}`;

                            throw new Error(msg);
                            failingApiCounter += 1;
                            waitingHttpResponses -= 1;
                            this.checkToCloseTheErrorsFile();
                        }
                        // api info sent successfully
                        else if (response.statusCode == 200) {
                            if (logSender) console.log('API info sent successfully!');
                            waitingHttpResponses -= 1;
                            this.checkToCloseTheErrorsFile();
                        }
                        // Fail, duplicate API name
                        else if (response.statusCode == 400) {
                            if (logSender) console.log('Harvesting error found!! (Duplicate name)');

                            // during harvesting, add ',' to separate error objects in the harvesting-errors.json file
                            if (failingApiCounter > 0) {
                                this.manageErrorOutputFile(false, function () {});
                            }
                            failingApiCounter += 1;
                            harv_err.reason = 'Duplicate name';
                            harv_err.api_name = data.title;
                            harv_err.desc_start = data.description.substring(0,1000);
                            harv_err.desc_exceeding = data.description.substring(1000),
                            harv_err.api_url = data.endpoint;
                            harv_err.is_duplicate = 1;
                            harv_err.idNo = failingApiCounter;

                            fs.appendFileSync(sender_conf.output_errors_file, JSON.stringify(harv_err), function (err) {
                              if (err) throw err;
                            });

                            waitingHttpResponses -= 1;
                            error400Count += 1;
                            this.checkToCloseTheErrorsFile();
                        }
                        // Fail, fields "name" and "url" are required
                        else if (response.statusCode == 409) {
                            if (logSender) console.log('Harvesting error found!! (Fields "name" and "url" are required)');

                            // during harvesting, add ',' to separate error objects in the harvesting-errors.json file
                            if (failingApiCounter > 0) {
                                this.manageErrorOutputFile(false, function () {});
                            }
                            failingApiCounter += 1;
                            harv_err.reason = 'Name and url required';
                            harv_err.api_name = data.title;
                            harv_err.desc_start = data.description.substring(0,1000);
                            harv_err.desc_exceeding = data.description.substring(1000),
                            harv_err.api_url = data.endpoint;
                            harv_err.idNo = failingApiCounter;

                            fs.appendFileSync(sender_conf.output_errors_file, JSON.stringify(harv_err), function (err) {
                              if (err) throw err;
                            });

                            waitingHttpResponses -= 1;
                            error409Count += 1;
                            this.checkToCloseTheErrorsFile();
                        }

                        callback(body);
                    }
            );
        }
    }

    manageErrorOutputFile(last_item, callback) {
        var writeLine = '';
        if (!last_item && failingApiCounter == 0) {
            writeLine = '{"harvester_errors":[';
        }
        else if (!last_item){
            writeLine = ',';
        }
        else if (last_item) {
            writeLine  = ']}';
        }

        if (!last_item && failingApiCounter == 0) {
            fs.writeFileSync(sender_conf.output_errors_file, writeLine, function (err) {
              if (err) throw err;
            });
        }
        else {
            fs.appendFileSync(sender_conf.output_errors_file, writeLine, function (err) {
              if (err) throw err;
            });
        }

        callback();
    }

    checkToCloseTheErrorsFile() {
      // if last item, close the error file if it's been created
      if (index.allFilesInPathProcessed() && index.apisToSendCount() == apiCounter &&
            waitingHttpResponses == 0) {
          if (logSender) console.log('apis-to-send: '  + index.apisToSendCount() + '  api-counter: ' + apiCounter +
            ' waitingHttpResponses: ' + waitingHttpResponses);
          // when all harvesting is done, add proper closure text to the harvesting-errors file
          this.manageErrorOutputFile(true, function () {
              if (logSender) console.log(" --- harv-err file END");
          });

          // write short summary to console about the results
          console.log("\n\nHarvesting summary.\nTotal: " + index.apisToSendCount() + " API infos, of which: \n" +
            (index.apisToSendCount()-failingApiCounter) + " was successfully added \n" +
            errorInDataFieldContentCount + " had errors in their data field content \n" +
            error400Count + " was interpret as duplicate (based on API name) \n" +
            error409Count + " was missing name or url info\n\n\n" +
            "harvesting-errors.json file has been created in modules/sender_errors folder\n" +
            "Use view-fix-errors.html file in the same folder to view and manually fix the errors.\n" +
            "Then send the fixed API info(s) to the platform. (See details 'node index.js -help'.)\n\n");
      }
    }
}

module.exports = Sender;
