const axios = require("axios")

// pp版
// function getCounter(){
//     const pp_counter = axios($,{
//         method:"get",
//         url:"https://wonder_registry.bindolabs.com/items/Counter/1",
//
//     });
//     console.log("获取计数器成功",pp_counter)
//
// }


//test
function getCounter(){
    axios({
        method:"get",
        url:"https://wonder_registry.bindolabs.com/items/Counter",

    }).then(function (response){
        console.log(response.data)
        const one = response.data
        }

        // console.log(data)

    )
}
function  updateCounter(pp_counter){
    console.log("开始更新计数器",pp_counter)
    axios({
        method:"patch",
        url:"https://wonder_registry.bindolabs.com/items/Counter/1",
        data:{
            "pp_counter":pp_counter,
        },


    });
    console.log("更新成功")

}
// const pp_counter=52
// var index = updateCounter(pp_counter)
var index = getCounter()
// console.log(one)