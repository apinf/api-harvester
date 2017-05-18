"use strict";

const HtmlScraping = require("./parsers/htmlScraping.js"),
    Rest = require("./parsers/rest.js"),
    CSV = require("./parsers/csv.js");

/**
 * Interface for loading data
 * @class DataLoader
 */
class DataLoader {
    /**
     * Creates an instance of DataLoader.
     * @memberOf DataLoader
     */
    constructor () {
        this.parsers = {
            htmlScraping: new HtmlScraping(),
            rest: new Rest(),
            csv: new CSV()
        };
    }

    /**
     * Load data from config
     * @public
     * @param {any} config - config object
     * @param {any} callback - callback on load
     * @returns {void}
     * @memberOf DataLoader
     */
    loadFromConfig (config, callback) {
        const type = config.params.type,
            parsers = this.parsers;

        let parser;

        switch (type) {
        case "rest":
            parser = parsers.rest;

            break;
        case "csv":
            parser = parsers.csv;

            break;
        default:
            parser = parsers.htmlScraping;
        }

        parser.loadData(config.params, callback);
    }
}

module.exports = DataLoader;
