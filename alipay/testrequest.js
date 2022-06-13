const request = require("request");
request({
    timeout: 5000,
    method: "get",
    url: 'https://wonder_registry.bindolabs.com/items/PP_importing_Mids/',
    headers: {
        "content-type": "application/json",
    },
    qs: {
//?filter[status][_eq] ='+status,
//t 使用status 过滤
        "status":"draft"
    },
    json: true

}, (error, response, body) => {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }else{
        console.log(body);
        console.log(error);
        console.log(response)
        // console.log(response.statusCode)
        // console.log(body);


    }
})