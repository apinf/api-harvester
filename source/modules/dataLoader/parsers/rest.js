"use strict";

const request = require("request");

class Rest {
    /**
     * Parse response from server
     * @private
     * @param {string} url - request url
     * @param {object} err - request err
     * @param {object} response - response params
     * @param {string} body - response body
     * @returns {object} - result
     * @memberOf Rest
     */
    _parseResponse(url, err, response, body) {
        let result,
            msg;
        
        if (err || response.statusCode !== 200) {
            msg = `Unable to load page ${url}, error: ${err || response.statusMessage}`;
        } else {
            try {
                result = JSON.parse(body);
            } catch (e) {
                msg = `Unable to parse response from ${url}, error: ${e}`;
            }
        }

        if (msg) {
            throw new Error(msg);
        } else {
            return result;
        }
    }

    /**
     * Prepare data for transform
     * @private
     * @param {object} fields - fields in model file
     * @param {object} response - response from server
     * @returns {object} - data for transform
     * @memberOf Rest
     */
    _prepareData(fields, response) {
        const data = {

        };

        Object.keys(fields).forEach((key) => {
            data[key] = this._deepSearch(response, fields[key].selector);
        });

        return data;
    }

    /**
     * Search idx in string
     * @private
     * @param {string} path - path string to search
     * @returns {string} - searched idx from string
     * @memberOf Rest
     */
    _searchIdx(path) {
        const regExp = new RegExp("\\[(\\d+)\\]", "g");
        let idx = path.match(regExp);

        idx = idx ? idx[0] : null;

        return idx;
    }

    /**
     * Search path in object
     * @private
     * @param {object} obj - obj to search
     * @param {string} path - path string
     * @returns {object} - founded object
     * @memberOf Rest
     */
    _deepSearch(obj, path) {
        const paths = path.split("."),
            regExp = new RegExp("\\d+");
        let current = obj;
            
        for (let i = 0; i < paths.length; i += 1) {
            let idx = this._searchIdx(paths[i]);
            
            if (idx) {
                paths[i] = paths[i].replace(idx, "");
                idx = Number(idx.match(regExp)[0]);
            }

            if (typeof current[paths[i]] === "undefined") {
                current = (function () {
                    return;
                }());

                break;
            } else {
                current = current[paths[i]];

                if (Array.isArray(current)) {
                    idx = idx ? idx : 0;
                    current = current[idx];
                }
            }
        }
        
        return current;
    }

    /**
     * Load data from api's list
     * @private
     * @param {string} url - api url
     * @param {object} fields - fields in model file
     * @param {array} list - lists array
     * @param {function} callback - callback function
     * @returns {void}
     * @memberOf Rest
     */
    _loadEachApi(url, fields, list, callback) {
        const regExp = new RegExp("\\{\\{(\\w+)\\}\\}", "g");
        
        list.forEach((api) => {
            let selector = url.match(regExp);

            selector = selector && selector[0];

            if (selector) {
                const apiUrl = url.replace(selector, api);

                request.get(apiUrl, (err, response, body) => {
                    const result = this._parseResponse(url, err, response, body),
                        data = this._prepareData(fields, result);

                    callback(data);
                });
            }
        });
    }

    /**
     * Load api's list
     * @param {object} params - config
     * @param {function} callback - callback
     * @returns {void}
     * @memberOf Rest
     */
    _loadList(params, callback) {
        request.get(params.list, (err, response, body) => {
            const pagination = params.pagination,
                selector = pagination && pagination.selector ? pagination.selector : "result";
            let result = this._parseResponse(params.list, err, response, body)[selector];

            if (result && Array.isArray(result)) {
                const limit = pagination && pagination.limit ? pagination.limit : result.length,
                    start = 0;

                result = result.slice(start, limit);

                this._loadEachApi(params.detail, params.fields, result, callback);
            }
        });
    }

    /**
     * Load data
     * @public
     * @param {object} params - config
     * @param {function} callback - callback
     * @returns {void}
     * @memberOf Rest
     */
    loadData(params, callback) {
        this._loadList(params, (data) => {
            callback(data);
        });
    }
}

module.exports = Rest;
