var crypto = require('crypto');
const request = require("request");

const site_infos=[{
    site_type: "WEB",
    site_url:  "https://tastegourmet.gobindo.com/stores/kr1/menus",
}]
//转字符串 site_infos
const stringsiteInfos = JSON.stringify(site_infos)
const time3=Math.floor(Date.now())
var dataobj = {
    "service":'alipay.overseas.secmerchant.maintain.queryStatus',
    "partner":2088721222565561, //建立model
    "secondary_merchant_id":537261,//建立model
    "_input_charset":"UTF-8",
    "payment_method":'ONLINE_PAYMENT',//判断---后续
    "timestamp":time3,
};
var keylist = Object.keys(dataobj)
    .sort();
// dataobj.service='alipay.overseas.secmerchant.maintain.queryStatus'
var params = [];//生成签名参数数组
var params2 = [];//最终参数拼接字符串数组，所有一级 value（biz_content 作为一个 value）进行 encode
for (var i = 0; i < keylist.length; i++) {
    var v = keylist[i];
    params.push(v + "=" + dataobj[v]);
    params2.push(v + "=" + encodeURIComponent(dataobj[v]));
}
console.log("排序")


var str = params.join("&");//签名拼接字符串
const privatekey = "-----BEGIN PRIVATE KEY-----\nMIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAN5GI4ENpOnEzEeySULGRTa08Xl1J6NLJgeeyyu+unasrjTneo61+S9tat59hvT9pMAd2ACMD2/OQkp2HEfJ3CH/QUlC9FNauT9h6jmRnT6hPEHHbo0bROIB9JdGmCRQ8hOkvEl1rG3eEXuXzjCc5VPRZy9RQTpH3QItoyRDVQ9JAgMBAAECgYAPnyJTqZ/Thi9NQqx/cuveYm0uOhulEF0F4BUrZ+Y2/P/pW/NzIDr5KFmAdZYMld8EWZSaxT04gGiMTyzBpuA/qebu3xTSVc/RQ26GwlaXTY4PPPDbBiSN3v2Ogku9MktTM+byqRjWcqi+yMn6gXB3vwWVSDnbStmfRAnDBIP8YQJBAPBHNvXvatVXf1n/jCXi4nbY0BISwaiu8eTlGsqSoQm3JfD2OMrcCX4tgYgvjfO4jjELOe2sawRiCsL7OcLnh0UCQQDs0VgbrnVvlgviIluPOVLuZdh5qSngqCrUukE+pdUzajL/WorwpmYuW7nyrQOfyI0vkdqcNZKkeLyh2FKkf7Y1AkAMLA9kthQ7aotRC9kVskC2tJUV1U1qNjKa3eBVksgFrfmGE3MdE7iHY9bEB2SxjA/n/CGbILjrJ+xTpFZwwTnhAkBPvh5hE9nPfUL7Hn6eN7tJM1o1fVTwpS/m+eDGa6ji6zvI6IAokJ+PtKtkoAW8ZBfGkOJ//zolz9IU3XbWlXqRAkAN4mUtBpbZ0xssaSPMO2/YPIReix83I8VwYZGbxNiYTQAKS1U9yAGjJwrBBLZ26wv5n/c7PwGq9nn4tb/41irg\n-----END PRIVATE KEY-----"
var sign = crypto.createSign("RSA-SHA1");
sign.update(str);
var signature = sign.sign(privatekey, "base64");
var sign1 = encodeURIComponent(signature)
var sign_type1 = encodeURIComponent('RSA')
console.log(signature)

params2.push('sign=' + sign1)
params2.push('sign_type=' + sign_type1)

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
