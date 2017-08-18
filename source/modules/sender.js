"use strict";

const request = require("request");

var sender_conf = require("./sender_config");

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
                    "content-type": "application/json"
                },
                body: json
            },
                (err, response, body) => {
                    if (err || response.statusCode !== 200) {
                        const msg = `Unable to load data in api ${url}, error: ${err || response.statusMessage}`;

                        throw new Error(msg);
                    }

                    callback(body);
                }
        );
    }
}

module.exports = Sender;
