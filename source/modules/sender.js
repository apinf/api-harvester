"use strict";

const request = require("request");

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
      //const url = "https://apinf.io/rest/v1/apis",
      //const url = "https://nightly.apinf.io/rest/v1/apis",
      const url = "http://localhost:3000/rest/v1/apis",
            json = {
                // api: {
                //     id: this._guid(),
                //     name: data.title,
                //     description: data.description,
                //     api_endpoint_url: data.endpoint
                // }
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
