"use strict";

const fs = require("fs");

/**
 * Loader config files from directory
 * @class ConfigLoader
 */
class ConfigLoader {
    /**
     * Creates an instance of ConfigLoader.
     * @memberOf ConfigLoader
     */
    constructor () {
        this.files = [];
    }

    /**
     * Json parse data
     * @private
     * @param {any} text - text context from file
     * @param {any} fullPath - path + file name
     * @returns {any} - config data object
     * @memberOf ConfigLoader
     */
    _parseData(text, fullPath) {
        try {
            const data = JSON.parse(text);

            return data;
        } catch (err) {
            const msg = `Unable to parse file "${fullPath}", error: ${err}`;
            
            throw new Error(msg);
        }
    }

    /**
     * Read each file in directory
     * @private
     * @param {any} files - files in directory
     * @param {any} dir - directory name
     * @param {any} callback - callback on read file
     * @returns {void}
     * @memberOf ConfigLoader
     */
    _readEachFiles(files, dir, callback) {
        files.forEach((file) => {
            const fullPath = `${dir}/${file}`;
            
            fs.readFile(fullPath, "utf8", (err, text) => {
                if (err) {
                    const msg = `Unable to read file "${fullPath}", error: ${err}`;

                    throw new Error(msg);
                }

                const data = {
                    path: fullPath,
                    params: this._parseData(text, fullPath)
                };

                this.files.push(data);
                callback(data);
            });
        });
    }

    /**
     * Read directory
     * @private
     * @param {any} dir - directory name
     * @param {any} callback - callback on read file
     * @returns {void}
     * @memberOf ConfigLoader
     */
    _readPath(dir, callback) {
        fs.readdir(dir, (err, files) => {
            if (err) {
                const msg = `Unable to read directory "${dir}", error: ${err}`;

                throw new Error(msg);
            }

            this._readEachFiles(files, dir, callback);
        });
    }

    /**
     * Load each file in directory
     * @public
     * @param {any} dir - directory name
     * @param {any} callback - callback on read file
     * @returns {void}
     * @memberOf ConfigLoader
     */
    loadEachFile(dir, callback) {
        this.clear();
        this._readPath(dir, callback);
    }

    /**
     * Clear data
     * @public
     * @returns {void}
     * @memberOf ConfigLoader
     */
    clear() {
        this.files = [];
    }
}

module.exports = ConfigLoader;
