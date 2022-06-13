const private_key = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCsD+mdN4HNCDlzQmhCQv9+9GHSS0Ee5TCx9Z8FSLpKiRYMH7/DBvQTPCIH299xyuChcZsQO4tA98njS70Ah6eVmOCn+iJmq08Fqk3kClMOEQTtAWT9CQHQl04BpTx4Tl9fKmLK263wcg1X/Y0PGxqTOSMw2DSoFn9frFBc8Z5X5e8bBZd9prDi+IFGKvMywvhpl2hCe0baghIP0Y2VWwHfcKM2OR4jQB8Yx7cBTV3kHMbOnVUiMHF+qQNnxZfJYgPVpp7DLClgGyHfWy+T0etPXyCwPYlnef+WHEbX1wh2IC9uzWWJQPuVnWXest9/GBgbpTol/jmXpzO+jmSKKCBLAgMBAAECggEAchhzL1+ZYR5tCjMk85t91O+01kA0xInySm+3rUdW0QoqZou/G1JHE2Iypsd0Wf7QCf5NduwlIUWuyFx2zh0mUZr4jireGPrMAdO2ptr5zEAY5higoPISFAHhJlIt0REXSQHQVPhrVSAsHQbzPOsaKjofTcpw0G1qtUSMXbWS7HFkTnr3D1VvRSN/Nb5LpxLourrErahxqPTxT+Is9Q1n48z3iSgdy+8NiGFZCCg/h45nPi3aVYA5auhfOBXOpggHKxp19jeDnINpRQIdDx4bgyVdkyV+rpDGjyogmdlokiLpAZtAD5RdTVO4PRjMSfoCBLjbQg8WkXSJrPXivJFtsQKBgQDR6FSg3MyGgK37CO95e6JjYFWLc4yqdCodEgDCQkoYCbKiasiyi5MTEisvVLbQBNixp55FTVwKifSDp+khAS+ly2YlkNalmaT+oZRLZuKL8XtE7GeE1mHknI4SNksfi8oMKNLNggQeMtXasLtDhlxhyQ04IlEURtxZyRN7peV6HwKBgQDR2CehF8uTltsIuUJM7QMzRoYjxwssXICjC9y2T5OcmaPICuJvmQ+pQ9KoWN+BzBkNSmewsxuXoV0yiuvAhfgQwjLM9YJhMkeXHBvq/WDKCm/FbJyAaddoFcSjME2DOGFPyuVppsS2QueOeTupqz6gziooSXrJuRxocnv7z17sVQKBgQCKKA+jfRBEqudYJg5wd/Zu0BYd3eTEwAaD8bh8I2NfJOrlScFk+sbHs5qm4WwdyELT004xsPQWn6xHBzpDFePFjPVjXkxY3KKjUbgoVMRhdYQ73hlYbj4qWPyNchzJ25kVnbz5tEx/j9f/w3jNvd6KIelIfBW/cdBQbC8doBhE4wKBgF5L7fL8CGU4IxFWfq6mywtdo6WsKh8zKjMaf4IFXGXAvNKF4Z8YfusnKSCxXy6qko9gYhwLQFjxEDpIJwyKpyCQw9dKc95Ng9IptXnxhm8EJZnn5qPl7AA/1+8lI4/V5BTBLjo90KO+iOODIwZph2kne9ZCvsSrRFLDL2fGlfdJAoGBAMGrnJeyB7OonAtoRvooaT26zem+ifLOQdAtVWzfyMIIwR0SXO+vFW7jxKM6jwVtKiTCFNsMus9ky4BlwUHjOaCFeQNhTm52jOHIMCPEWvEx3uhzVSef6Ky+pS3UWbVMSk/tbo0izdk60r6Axae4hJTxRIKfNN3DNiRbZcrkhEWI
-----END PRIVATE KEY-----`;

const mchid = "1501977491";
const serialNo = "57309C2E21D7D22688A6FC8A04245526E005A553";

let sdk = require('postman-collection');

// request data does not resolve variables which makes sign-error
// see https://github.com/postmanlabs/postman-app-support/issues/3322
function replaceVariables(templateString) {
    let tokens = _.uniq(templateString.match(/{{\w*}}/g))

    _.forEach(tokens, t => {
        let variable = t.replace(/[{}]/g, '')
        let value = environment[variable] || globals[variable]
        templateString = templateString.replace(new RegExp(t,'g'), value)
    });

    return templateString
}

var newUrl = new sdk.Url(replaceVariables(request.url));

var now = Date.now();
var timeStamp = Math.round(now / 1000);
var nonceStr = now;

var method = request.method;

var data = "";

var canonicalUrl = newUrl.getPathWithQuery();

if (method == 'POST' || method == 'PUT' || method == 'PATCH') {
    var data = pm.request.body.raw;
    if (canonicalUrl.endsWith('upload')) {
        var result = JSON.parse(JSON.stringify(pm.request.body.formdata));
        for (var i in result) {
            if (result[i].key == 'meta') {
                data = result[i].value;
            }
        }
    }
}

var message = method + "\n"
    + canonicalUrl + "\n"
    + timeStamp + "\n"
    + nonceStr + "\n"
    + data + "\n";

pm.sendRequest("https://wx.gtimg.com/pay/js/apiv3/libs/node-forge@0.7.6/forge.min.js", function (err, res) {
    if (err) {
        console.log(err);}
    else {
        eval(res.text());

        var privateKey = forge.pki.privateKeyFromPem(private_key);
        var sha256 = forge.md.sha256.create();
        sha256.update(forge.util.encodeUtf8(message));
        var signature = forge.util.encode64(privateKey.sign(sha256));

        console.log(`message=[${message}]`);

        var auth = `WECHATPAY2-SHA256-RSA2048 mchid="${mchid}",serial_no="${serialNo}",nonce_str="${nonceStr}",timestamp="${timeStamp}",signature="${signature}"`;
        pm.environment.set("auth", auth);
    }
});
