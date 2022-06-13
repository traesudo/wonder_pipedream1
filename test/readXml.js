const  xml2js = require('xml2js')
const axios = require("axios");

const parseString = xml2js.parseString
var appMidInfo="<alipay><is_success>T</is_success></alipay>"



 parseString(appMidInfo, function (err, result) {
    var sumStatus=result.alipay.is_success[0]
    console.log(result.alipay.is_success[0]);
    if(result.alipay.is_success[0]=="T"){
        axios({
                method:"post",
                url:"https://wonder_registry.bindolabs.com/items/merchant_ids",
                headers:{authorization:"Bearer input_in"},
                body:{
                    "MID": "662a01ff-cf77-4137-b79a-7b53ae63f505",
                    "payment_acquirer": "b5b150a0-4665-41fc-ba51-7d64470c37dc",
                    "business": "662a01ff-cf77-4137-b79a-7b53ae63f505",

                },
            }).then(err,function (res,err){
               if(err){
                   console.log(err)
               }
                console.log(res)
        })

    }


})

console.log()