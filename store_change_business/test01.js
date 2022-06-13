const axios = require('axios')


ids='c4305947-b1c3-11ec-a3d9-42010aaa001d'

axios({
    method: 'get',  //status
    url: 'https://wonder_registry.bindolabs.com/items/businesses/'+ids,
});
console.log("获取getbusinesse的数据")