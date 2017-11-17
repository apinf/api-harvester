const ConfigLoader = require("./modules/configLoader"),
    DataLoader = require("./modules/dataLoader/src"),
    Transform = require("./modules/transform/src"),
    Sender = require("./modules/sender"),
    configLoader = new ConfigLoader(),
    dataLoader = new DataLoader(),
    transform = new Transform(),
    sender = new Sender();

var authenticate = require("./modules/authenticate");
var sender_conf = require("./modules/sender_config")
var apisToSend = 0;
var echoVerbose = false;
var logIndex = false;
var configFileCounter = 0;

/**
 * Transform and send data to api
 * @param {object} data - data to transform and send
 * @returns {void}
 */
function transformAndSend(data) {
    const result = transform.transform(data);

    sender.send(result, function (responseBody) {
        if (echoVerbose) {
            console.log(responseBody);
        }
    });
}

/**
 * On load data from source
 * @param {any} data - data object | array
 * @returns {void}
 */
function onLoadData(data) {
    apisToSend += data.length;
    configFileCounter += 1;

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

    var temp = process.argv.slice(2);
    var path_args = [];
    var pwd = "";
    var user = "";
    var paths_temp = "";

    if (temp == "") {
        temp[0] = "-help";
    }

    // dig out the switches and their data from the arguments
    temp.forEach((item) => {
        if (item.includes("-p=")) {
            pwd = item.substring(3,item.length);
        }
        else if (item.includes("-u=")) {
            user = item.substring(3,item.length);
        }
        else if (item.includes("-v")) {
            echoVerbose = true;
        }
        else if (item.includes("-help")) {
            console.log("\nSyntax to use API-Harvester is\n node index.js [<path_to_config_file(s)_folder> " +
                "-u=<API-platform_username> -p=<password> [-v]] [-help]\n\n" +
                "Note! There can be multiple paths for the config files.\n\n" +
                "-v\t use verbose mode (output the response body for any API info sent successfully)\n" +
                "-help\t output this help (and do not do harvesting)\n\n");
            process.exit(0);
        }
        else {
            if (paths_temp.length < 1) {
                paths_temp += item.toString();
            }
            else {
                paths_temp += "," + item.toString();
            }
        }
    });
    path_args = paths_temp.split(",");

    authenticate.login(user, pwd, function (err, data) {
        if (err) return console.error(err);

        // authToken and user id for debugging
        if (logIndex) console.log("\nauthToken: \n" + authenticate.authToken);
        if (logIndex) console.log("userId: " + authenticate.userId);

        // echo the API platform URL used in the harvesting, for convenience
        console.log("\nAPI platform URL: \n" + sender_conf.send_apis_url);

        path_args.forEach((path) => {
            configLoader.loadEachFile(path, onLoadConfig);
        });
    });
}

function apisToSendCount() {
    return apisToSend;
}

function allFilesInPathProcessed() {
    return (configFileCounter == configLoader.howManyFilesInPath());
}

module.exports.apisToSendCount = apisToSendCount;
module.exports.allFilesInPathProcessed = allFilesInPathProcessed;

start();
