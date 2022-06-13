//offline
const site_infos=[{
    site_type: "WEB",
    site_url:  "https://tastegourmet.gobindo.com/stores/kr1/menus",
}]
//转字符串 site_infos
const stringsiteInfos = JSON.stringify(site_infos)
const time3=Math.floor(Date.now())
var dataobj = {
    // "ConfigUrl":Config.url,
    // "OwnRsaPrivKey":
    //     "service":"alipay.overseas.secmerchant.online.maintain",
    "partner":2088721226070997,
    "secondary_merchant_name":"Dab-Pa Artisant",
    "secondary_merchant_id":537261,

    "store_name":"Taste+New+Limited",
    "store_country":"CN",
    "store_address":"Test",
    "register_country":"CN",
    "register_address":"testAddress",
    "secondary_merchant_type":"ENTERPRISE",
    "registration_no":"519723407213085723",
    // "service":"alipay.overseas.secmerchant.online.maintain",
    "site_infos":stringsiteInfos,
    "contact_no":"18276147057",
    "contact_email":"queek.he@antcosa.com",
    "secondary_merchant_industry":"5812",//mcc
    "_input_charset":"UTF-8",
    "store_id":537261,
    "timestamp":time3,




};



var crypto = require('crypto');
const request = require("request");

dataobj.store_industry='5812'
dataobj.service='alipay.overseas.secmerchant.offline.maintain'
var keylist = Object.keys(dataobj)
    .sort();

var params = [];//生成签名参数数组
var params2 = [];//最终参数拼接字符串数组，所有一级 value（biz_content 作为一个 value）进行 encode
for (var i = 0; i < keylist.length; i++) {
    var v = keylist[i];
    params.push(v + "=" + dataobj[v]);
    params2.push(v + "=" + encodeURIComponent(dataobj[v]));
}
console.log("排序")
console.log(params2)


var str = params.join("&");//签名拼接字符串

//key on line
const OffLineprivatekey = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCVHTS3Ol3iI/DhrSLg0hYPlXR5T32HX4M8shTt3tm0srEdsf3csgef9k6JvBdCZR2chRCCjyw2Ztb9zI/j1R/GeTmXGua/7nR0hiOsw+1jUEc/a1RAr2VG4qx+PzqY9aH/Xakak2W9A1kM8s17Rtn2CuSWXbVLus3ETFcSSTn16BuRJ4qJQvVsQ4nlQyKc23KXR+Y/g6nwNeikBffcuQFv7kZ7syEbZBhfn104zgIAcvEFPp2NjNL+IRYF7p+zQ95KDPI5gSpTRg998mOlv7gBzJNtY0cX8GeSr3/sCUmN1s2DiEBNwevyCPF61XNhPpvnySf4Fv9lbVieKZaeejxHAgMBAAECggEAE2ozE+xIjwoo8elOEkGoV60Y9jaQXJDmEIALU5FhfTKK9xfWuuZ/MaerQCm6SY3K1jdJGAa2Nfsb4P3CemKkeX4NLox1IOZWSVmxyWvVO8oXDL3XwXhU0m7vEJ0A7yuERTCXtPseEwcdkB8I/BUUigGPE7jtwwd2hSl/aMUaA9da3aBUxRFykaao7kmoDuipI7VzMtB45QLBKbzbhos0WlON98ZYIimAhso7X+2faAW8N9yO3M35S2nuBo1NdRVA3Ml+1NtFJ/jO3ddTevcybzEYQK19ecJennwfeuRw1YUeDkgibW9OXczklZNn4kMnNofnpO1d9xfAoKGokHSdCQKBgQDK0EKikNddcixWroAECRruSBBU3VJjHqHsj67+sr/QxPejReg5tflESEYrPHYY40ofQIuj/LDHy1c0k/eriaA51js6S1UQUJVHa9RPDR/yKLYmYM7qNyIkH64QpVi+hjeXsNTGEpXOSXMiHt1XzrYsKbKCoSr0iK9DwL0WUcYRRQKBgQC8N992y0MSrcLCYY5logp/juRRQ1x1AYfMiva4vUmJTiwuSSJM0J9XAe9Q8S7b5N99RGQM0NOzUDaIHgL0NgnT+RqK8rML5xcuLN9tqTHGy98HzVCV5yP+10b6eyn+/Eht+SgpJqEoCSa0QQ70bkpZjRfPhrasb06D+k5vIrJiGwKBgQCrPfK1XkRpYyhqvAXc4m85t+EKNqEEje28Vok0BmsM8/H/itwMNkjUTY3pnbA9TVPdVVtSR95fo6HrA/B/hsGhc/AoRUj6cH/KgRIO+Q77IULC3sR2X7zU8WbAKUvn+l1gF+9fmnugZMXwjkzngeKxITfXMguZ0vrg4xEEkmEBXQKBgBGMK/tJTAGLzaKNsdbr2oq16bdhzlbiQ6TgN8xVaWuxrBDMpLQApzpXZdZoBfReTC/DlohTV8lZ6xuZoLDf8N6gVMcrhWHQs6qMaHAy2/8qtqpli+PN3t89dtKXdPzezGnkVsgvX8r5v3ACuMA1IB1lOBkS+CjvX6SSS4m09GiNAoGAV6ViRwdXLqsxlK/S3jPYaG1SOClgRxa1gd07aLSFGC4MqfEN+cFS3k8LH9xLVl9h7Im7cMHVrJ9OvfCflpqdOVhn4Q+pfU00zGx7S3kTvVTuMYPx3/XpY1Nz24ucwt0aXdq6e/XY27PP4I8BvDDrlygks45yoRTxV9OGeCuNb7o=\n-----END PRIVATE KEY-----"

//生成签名
var sign = crypto.createSign("RSA-SHA256");
sign.update(str);
var signature = sign.sign(OffLineprivatekey, "base64");
var sign1 = encodeURIComponent(signature)
var sign_type1 = encodeURIComponent('RSA2')
console.log(signature)

params2.splice(12, 0, 'sign=' + sign1)
params2.splice(13, 0, 'sign_type=' + sign_type1)
// params2.push(timestamp=timestamp1)

var str1 = params2.join("&");//签名拼接字符串
console.log(str1)

request({
    timeout: 5000,
    method: "get",
    url: 'https://intlmapi.alipay.com/gateway.do?' + str1,
    headers: {
        "content-type": "application/json",
    },
    json: true

}, (error, response, body) => {
    if (!error && response.statusCode == 200) {
        console.log(body);
    } else {
        // console.log(body);
        // console.log(error);
        // console.log(body)
        // console.log(response.statusCode)
        // console.log(body);


    }
})



