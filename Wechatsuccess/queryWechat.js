const axios = require('axios')
const {KEYUTIL, KJUR, hextob64} = require("jsrsasign");

// sub_mchid: '512287430' sp_appid:"wx31331a78e8a40eea" //"sp_mchid":"1501977491",
const sub_mchid='512287430'
const sp_appid='wx31331a78e8a40eea'
const sp_mchid='1501977491'

const  url =sub_mchid+"?sp_appid="+sp_appid+"&sp_mchid="+sp_mchid

var OffLineprivatekey=
    `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCsD+mdN4HNCDlzQmhCQv9+9GHSS0Ee5TCx9Z8FSLpKiRYMH7/DBvQTPCIH299xyuChcZsQO4tA98njS70Ah6eVmOCn+iJmq08Fqk3kClMOEQTtAWT9CQHQl04BpTx4Tl9fKmLK263wcg1X/Y0PGxqTOSMw2DSoFn9frFBc8Z5X5e8bBZd9prDi+IFGKvMywvhpl2hCe0baghIP0Y2VWwHfcKM2OR4jQB8Yx7cBTV3kHMbOnVUiMHF+qQNnxZfJYgPVpp7DLClgGyHfWy+T0etPXyCwPYlnef+WHEbX1wh2IC9uzWWJQPuVnWXest9/GBgbpTol/jmXpzO+jmSKKCBLAgMBAAECggEAchhzL1+ZYR5tCjMk85t91O+01kA0xInySm+3rUdW0QoqZou/G1JHE2Iypsd0Wf7QCf5NduwlIUWuyFx2zh0mUZr4jireGPrMAdO2ptr5zEAY5higoPISFAHhJlIt0REXSQHQVPhrVSAsHQbzPOsaKjofTcpw0G1qtUSMXbWS7HFkTnr3D1VvRSN/Nb5LpxLourrErahxqPTxT+Is9Q1n48z3iSgdy+8NiGFZCCg/h45nPi3aVYA5auhfOBXOpggHKxp19jeDnINpRQIdDx4bgyVdkyV+rpDGjyogmdlokiLpAZtAD5RdTVO4PRjMSfoCBLjbQg8WkXSJrPXivJFtsQKBgQDR6FSg3MyGgK37CO95e6JjYFWLc4yqdCodEgDCQkoYCbKiasiyi5MTEisvVLbQBNixp55FTVwKifSDp+khAS+ly2YlkNalmaT+oZRLZuKL8XtE7GeE1mHknI4SNksfi8oMKNLNggQeMtXasLtDhlxhyQ04IlEURtxZyRN7peV6HwKBgQDR2CehF8uTltsIuUJM7QMzRoYjxwssXICjC9y2T5OcmaPICuJvmQ+pQ9KoWN+BzBkNSmewsxuXoV0yiuvAhfgQwjLM9YJhMkeXHBvq/WDKCm/FbJyAaddoFcSjME2DOGFPyuVppsS2QueOeTupqz6gziooSXrJuRxocnv7z17sVQKBgQCKKA+jfRBEqudYJg5wd/Zu0BYd3eTEwAaD8bh8I2NfJOrlScFk+sbHs5qm4WwdyELT004xsPQWn6xHBzpDFePFjPVjXkxY3KKjUbgoVMRhdYQ73hlYbj4qWPyNchzJ25kVnbz5tEx/j9f/w3jNvd6KIelIfBW/cdBQbC8doBhE4wKBgF5L7fL8CGU4IxFWfq6mywtdo6WsKh8zKjMaf4IFXGXAvNKF4Z8YfusnKSCxXy6qko9gYhwLQFjxEDpIJwyKpyCQw9dKc95Ng9IptXnxhm8EJZnn5qPl7AA/1+8lI4/V5BTBLjo90KO+iOODIwZph2kne9ZCvsSrRFLDL2fGlfdJAoGBAMGrnJeyB7OonAtoRvooaT26zem+ifLOQdAtVWzfyMIIwR0SXO+vFW7jxKM6jwVtKiTCFNsMus9ky4BlwUHjOaCFeQNhTm52jOHIMCPEWvEx3uhzVSef6Ky+pS3UWbVMSk/tbo0izdk60r6Axae4hJTxRIKfNN3DNiRbZcrkhEWI
-----END PRIVATE KEY-----`// var sign = crypto.createSign("RSA-SHA256");


const time1 =Math.floor(Date.now() / 1000);
console.log("???????????????=%d",time1);
const time2= time1.toString()

const number1="adssw223"
console.log('???????????????=%s',number1)
// console.log(a)

//??????key
const mchid1="1501977491"
const serialvalue="57309C2E21D7D22688A6FC8A04245526E005A553"
var data ={'sub_mchid':'512287430','sp_appid':'wx31331a78e8a40eea','sp_mchid':'1501977491'};
var data1="";
var message = "GET" + "\n"
    + "/hk/v3/merchants/"+url + "\n"
    + time1 + "\n"
    + number1 + "\n"
    + data1 + "\n";

function sha256withRSA(inputString) {
    const key = KEYUTIL.getKey(OffLineprivatekey);
    // ?????? Signature ?????????????????????????????????
    const signature = new KJUR.crypto.Signature({ alg: 'SHA256withRSA' });
    // ?????????
    signature.init(key);
    // ????????????????????????
    signature.updateString(inputString);
    // ????????????
    const originSign = signature.sign();
    const sign64 = hextob64(originSign);
    console.log('sign base64 =======', sign64);
    return sign64;
}
var keysign= sha256withRSA(message)
//??????????????????
console.log("????????????",message)
console.log("??????path",url)

var finstr =`WECHATPAY2-SHA256-RSA2048 mchid="${mchid1}",serial_no="${serialvalue}",nonce_str="${number1}",timestamp="${time2}",signature="${keysign}"`
console.log("get finstr info",finstr)

axios({
    method:"get",
    url:"https://api.mch.weixin.qq.com/hk/v3/merchants/"+url,
    headers:{
            "content-type":"application/json",
            "Accept":"application/json",
            "authorization":finstr,
            "User-Agent":"bindo",
            "Wechatpay-Serial":"7BB360C3537D73A05E75A9AF63EEEB2F11C33B07",


    }
}).then(function (res){
    console.log(res)
}).catch((err)=>{
    console.log(err)
});