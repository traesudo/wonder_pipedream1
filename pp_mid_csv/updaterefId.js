const axios = require('axios')
const {response} = require("express");

//
// axios( {
//     method: 'get',  //status
//     url: 'https://main-stg.bindo.co/api/v2/stores/',
//     headers: {
//         "content-type": "application/json",
//         "X-User-Access-Token": "30sidswu8nn7g4tldgcxza1dxoqua5z",
//         data:{
//             "store":"changeStore",
//         }
//     },
// });

//"phone":,
const info ={
    "address1":"www",
    "address2":"ww",
    "calling_code":"86",
    "city":"ss",//
    "country_code":"CN",
    "full_address":"ww",
    "phone":'business_phone',
    "state":status,
    "title":"92w2w2d12daass112dd32awaaee1d3",//business_name
    "user_id":business_id,
    "zipcode":"33",
    "lat":"64.78378",
    "lng":"54.78378",
}


const innn={
    "store": info
}


var resp=axios( {
    method: 'post',  //status
    url: 'https://main-stg.bindo.co/api/v2/stores',
    headers: {
        "content-type": "application/json",
        "X-User-Access-Token": "idisfthnp710rjgsbgok9bcua7gbfb2",
    },
        data:innn,

}).then(function (resp) {
    console.log(resp['data'])
    //console.log(response.data);
}).catch(function (error) {
    // handle error
    console.log(error);

})



