"use strict";

const Xray = require("x-ray");

class HtmlScraping {
    /**
     * Check and prepare included data
     * @private
     * @param {any} data - loaded data
     * @param {object} fields - fields from config
     * @param {function} callback - callback
     * @returns {boolean} - included flag for this data
     * @memberOf HtmlScraping
     */
    _prepareData(data, fields, callback) {
        let haveIncluded = false;
        
        if (Array.isArray(data)) {
            const len = data.length;
            let count = 0;

            data.forEach((item, idx) => {
                haveIncluded = this._prepareData(item, fields, (response) => {
                    data[idx] = response;

                    count += 1;

                    if (count === len) {
                        callback(data);
                    }
                });
            });
        } else if (typeof data === "string") {
            if (fields.hasOwnProperty("include")) {
                haveIncluded = true;

                this._load(callback, data, fields.include, fields.pagination, fields.scope);
            }
        } else {
            let len = 0,
                count = 0;
            
            Object.keys(data).forEach((key) => {
                if (fields[key].hasOwnProperty("include")) {
                    len += 1;
                    haveIncluded = true;

                    this._prepareData(data[key], fields[key], (response) => {
                        data[key] = response;

                        count += 1;

                        if (count === len) {
                            callback(data);
                        }
                    });
                }
            });
        }

        if (!haveIncluded) {
            callback(data);
        }

        return haveIncluded;
    }

    /**
     * Map selector for arguments
     * @private
     * @param {object} fields - fields from config
     * @returns {array} - mapped selector for arguments
     * @memberOf HtmlScraping
     */
    _mapSelector(fields) {
        let selector = {

        };

        if (fields.hasOwnProperty("scrape")) {
            selector = fields.scrape;
        } else {
            Object.keys(fields).forEach((field) => {
                if (fields[field].hasOwnProperty("scrape")) {
                    selector[field] = fields[field].scrape;
                }
            });
        }
        
        return selector;
    }

    /**
     * Map arguments for x-ray
     * @private
     * @param {string} url - load url
     * @param {object} fields - fields from config
     * @param {string} scope - scope selector
     * @returns {array} - mapped arguments for x-ray
     * @memberOf HtmlScraping
     */
    _mapArguments(url, fields, scope) {
        const args = [];
        let selector = this._mapSelector(fields);

        if (scope) {
            selector = [selector];
            
            args.push(scope);
        }

        args.unshift(url);
        args.push(selector);

        return args;
    }

    /**
     * Load data using a xray
     * @private
     * @param {function} callback - callback
     * @param {string} url - load url
     * @param {object} fields - fields from config
     * @param {string} pagination - pagination selector
     * @param {string} scope - scope selector
     * @returns {void}
     * @memberOf HtmlScraping
     */
    _load(callback, url, fields, pagination, scope) {
        let xray = new Xray();
        const args = this._mapArguments(url, fields, scope);

        xray = xray.apply(xray, args);

        if (pagination) {
            xray.paginate(pagination.selector);

            if (pagination.limit) {
                xray.limit(pagination.limit);
            }
        }

        xray((err, data) => {
            let result = data,
                msg = "";
            
            if (err) {
                result = "";
                msg = `Unable to parse page ${url}, error: ${err}`;
            }

            this._prepareData(result, fields, callback);

            if (msg) {
                throw new Error(msg);
            }
        });
    }

    /**
     * Load data
     * @public
     * @param {object} params - config
     * @param {function} callback - callback
     * @returns {void}
     * @memberOf HtmlScraping
     */
    loadData(params, callback) {
        this._load((data) => {
            if (data) {
                callback(data);
            }
        }, params.url, params.fields, params.fields.pagination, params.fields.scope);
    }
}

module.exports = HtmlScraping;
