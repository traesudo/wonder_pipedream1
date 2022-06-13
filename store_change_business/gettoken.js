const axios = require('axios')
const fs = require('fs')


function gettoken() {
    const path = '/tmp/mytoken.txt'
        if (!fs.existsSync(path)) {
             // axios 获取token gettoken
            fs.writeFile("/tmp/mytoken.txt", content, err => {
                if (err) {
                    console.log(err)
                    return
                }
                console.log("创建成功====token")
            })
            return  content

        } else {
            const data = fs.readFileSync('/tmp/mytoken.txt', 'utf8');
            return data;

        }


}

const token =gettoken();
console.log(token)

//
// axios({
//     method: 'post',
//     url: 'https://main-stg.bindo.co/api/v2/login',  //更新bindo的url
//     headers: {
//         "content-type": "application/json",
//
//     },
//     data:{
//
//     "username":"trea.li@bindo.com",
//     "password":"Lx199876"
// }
// });
