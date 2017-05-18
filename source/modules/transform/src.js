"use strict";

const fs = require("fs"),
    path = require("path");

/**
 * Transform to output data model
 * @class Transform
 */
class Transform {
    constructor() {
        try {
            const fullPath = path.resolve(__dirname, "model.json"),
                content = fs.readFileSync(fullPath, "utf8");

            this._model = JSON.parse(content);
        } catch (err) {
            const msg = `Unable to parse output model, error: ${err}`;

            throw new Error(msg);
        }
    }

    /**
     * Get model object clone
     * @private
     * @returns {any} - model clone
     * @memberOf Transform
     */
    _getModel() {
        return Object.assign({
            
        }, this._model);
    }

    /**
     * Check transformable value on valid
     * @private
     * @param {any} value - value to check
     * @returns {boolean} - on valid value
     * @memberOf Transform
     */
    _checkValidValue(value) {
        let result = true;

        if ((typeof value === "string" && value.trim() === "") ||
            (typeof value === "number" && isNaN(value)) ||
            typeof value === "undefined" ||
            (Array.isArray(value) && value.length === 0) ||
            (typeof value === "object" && value !== null && Object.keys(value).length === 0) ||
            value === null) {

            result = false;
        }

        return result;
    }
    
    /**
     * Transform data to output dataModel
     * @public
     * @param {any} data - data object | array
     * @returns {any} - transformed data
     * @memberOf Transform
     */
    transform(data) {
        const model = this._getModel();
        let result = data;

        if (typeof data === "object" && data !== null) {
            Object.keys(model.fields).forEach((key) => {
                const source = model.fields[key].source,
                    defaultValue = model.fields[key].default;
                
                if (result.hasOwnProperty(source)) {
                    result[key] = this._checkValidValue(result[source]) ? String(result[source]) : defaultValue;

                    delete result[source];
                } else {
                    result[key] = defaultValue;
                }
            });
        } else {
            result = null;
        }

        return result;
    }
}

module.exports = Transform;
