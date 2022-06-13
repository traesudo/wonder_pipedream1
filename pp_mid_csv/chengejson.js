
const user =[]

var a=[1,2,3]
var b=['a','b','c']

var array = {};
for(var i = 0; i < a.length; i++){
    array[a[i]] = b[i]
}
// console.log(array)
var json = JSON.stringify(array)
console.log(json)
//
// //数组
//     var a=[1,2,3]
//     var b=['a','b','c']
// for(var i=0;i<a.length;i++){
//     var s=[a[i],b[i]]
//     user.push(s)
//
// }


// var a=JSON.stringify(a);

// console.log(user)