var axios = require('axios')
const request = require("request");

const ids='0e8c6790-fda2-4801-8e5c-258e755de980'
//
const store={"address1":"ww","address2":"ww","calling_code":"86","city":"aww","country_code":"CN","full_address":"ww","phone":"186768777676","state":"ww","title":"ww","user_id":"1234567899","zipcode":"",}
axios( {
    method: 'post',
    url:' https://main-stg.bindo.co/api/v2/stores',
    data:{
        "store":store,
    },
    headers: {
        "content-type": "application/json",
        "X-User-Access-Token": "idisfthnp710rjgsbgok9bcua7gbfb2",
    },

 }).then(function (response) {
    // handle success
   console.log(response.data);
})
    .catch(function (error) {
        // handle error
        console.log(error);
    })
//
// axios( {
//     method: 'patch',  //status
//     url:'https://wonder_registry.bindolabs.com/items/businesses/'+ids,
//     data:{
//         "ref_id":"123",
//     },
//
// }).then(function (response) {
//     // handle success
//     console.log(response.data);
// }).catch(function (error) {
//         // handle error
//         console.log(error);
//         console.log(response.data);
//     })

//
// request({
//     timeout: 5000,
//     method: "patch",
//     url:'https://wonder_registry.bindolabs.com/items/businesses/'+ids,
//     headers: {
//         "content-type": "application/json",
//     },
//     data:{
//         "ref_id:":"1",
//     },
//     json: true
//
// }, (error, response, body) => {
//     if (!error && response.statusCode == 200) {
//         console.log(body);
//         console.log("11")
//     } else {
//         // console.log(body);
//         console.log(error);
//         // console.log(body)
//         console.log(response.statusCode)
//         // console.log(body);
//
//
//     }
// })



