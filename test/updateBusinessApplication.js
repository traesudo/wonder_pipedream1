const axios =  require("axios");

var businessId=null
var key='57b6977b-9cf1-4581-98c4-8d0430c9a8bc'
axios({
    method:"patch",
    url:"https://wonder_registry.bindolabs.com/items/business_applications/"+key,
    headers:{authorization:"Bearer input_in"},
    data:{application_business:businessId},
}).then(function (res,err){
    console.log(res)

})