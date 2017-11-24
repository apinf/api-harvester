const request = require("request");

var sender_conf = require("./sender_config");
var logAuthenticate = false;

module.exports  = {
    authToken: "",
    userId: "",
    login: function(user, pwd, callback) {
        const url = sender_conf.send_login_url,
            json = {
                username: user,
                password: pwd
            };
            
        if (logAuthenticate) console.log("Test \n username_: " + user + "\npassword_: " + pwd);

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
                        const msg = `Unable to login to platform ${url}, error: ${err || response.statusMessage}`;

                        throw new Error(msg);
                    }
                    // store login values
                    this.authToken = body.data.authToken.toString();
                    this.userId = body.data.userId.toString();
                    callback(err, response.body);
                }
        );
    }
};
