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
var sendFixed = false;

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
            console.log("\nSyntax to use API-Harvester:\nnode index.js [<path(s)_to_config_file(s)_folder(s) | " +
                "fixed_errors_filename_with_relative_path_to_this(source)_folder> -u=<API-platform_username> -p=<password>" +
                " [-v] [-sendfixed]] [-help]\n\n" +
                "Note! \n1) There can be multiple paths for the config files.\n" +
                "2) If there are errors when sending the harvested APIs to the platform,\n" +
                "   you can find the harvesting-errors.json file in modules/sender_errors/\n" +
                "   folder, and view/fix the errors with view-fix-errors.html in the same folder.\n\n" +
                "-v\t\t Use verbose mode (output the response body for any \n\t\t API info tried to be sent to the platform)\n" +
                "-help\t\t Output this help (and do nothing else)\n" +
                "-sendfixed\t Send fixed API infos from a single file (give the \n\t\t filename with relative path to this" +
                " folder as a separate parameter).\n\n");
            process.exit(0);
        }
        else if (item.includes("-sendfixed")) {
            sendFixed = true;
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

        // echo the used platform URL to send the API infos in the harvesting, for convenience
        console.log("\nused platform URL to send the API infos: \n" + sender_conf.send_apis_url);

        var datas = [];
        if (!sendFixed) {
          path_args.forEach((path) => {
              configLoader.loadEachFile(path, onLoadConfig);
          });
        }
        else {
          // path_args here is the errors file name user intput in the CLI (with relative path to source folder)
          if (!path_args.includes("./") && !path_args.includes("../")) {
              path_args = "./" + path_args;
          }
          var errors = require(path_args);
          // add errors to a structure that sender reads
          errors.harvester_errors.forEach((error) => {
             var data = {
                 title: error.api_name,
                 description: error.desc_start + error.desc_exceeding,
                 endpoint: error.api_url
             };
             datas.push(data);
          });

          apisToSend = datas.length;
          datas.forEach((data) => {
              sender.send(data, function (responseBody) {
                  if (echoVerbose) {
                      console.log(responseBody);
                  }
              });
          });
        }
    });
}

function apisToSendCount() {
    return apisToSend;
}

function allFilesInPathProcessed() {
    // always return true if processing a the fixed errors file (program started with -sendFixed switch)
    if (sendFixed) {
        return true;
    }
    return (configFileCounter == configLoader.howManyFilesInPath());
}

module.exports.apisToSendCount = apisToSendCount;
module.exports.allFilesInPathProcessed = allFilesInPathProcessed;

start();
