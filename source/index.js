const ConfigLoader = require("./modules/configLoader"),
    DataLoader = require("./modules/dataLoader/src"),
    Transform = require("./modules/transform/src"),
    Sender = require("./modules/sender"),
    configLoader = new ConfigLoader(),
    dataLoader = new DataLoader(),
    transform = new Transform(),
    sender = new Sender();

/**
 * Transform and send data to api
 * @param {object} data - data to transform and send
 * @returns {void}
 */
function transformAndSend(data) {
    const result = transform.transform(data);

    sender.send(result, () => {
        global.console.log(`${data} has been append`);
    });
}

/**
 * On load data from source
 * @param {any} data - data object | array
 * @returns {void}
 */
function onLoadData(data) {
    if (Array.isArray(data)) {
        data.forEach((item) => {
            transformAndSend(item);
        });
    } else {
        transformAndSend(data);
    }
}

/**
 * On load config file from file system
 * @param {any} config - config json object
 * @returns {void}
 */
function onLoadConfig(config) {
    dataLoader.loadFromConfig(config, onLoadData);
}

/**
 * Start script
 * @returns {void}
 */
function start () {
    const args = process.argv.slice(2);

    args.forEach((path) => {
        configLoader.loadEachFile(path, onLoadConfig);
    });
}

start();
