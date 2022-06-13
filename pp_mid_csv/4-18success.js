// const socksv5 = require('socksv5')
//const socks = require("socksv5");
const SSHClient = require('ssh2-sftp-client');
const  fs =require('fs');
var http = require('http');
const mysocks  = require('@luminati-io/socksv5')
const remoteFilePath="tem"

const content = `-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABFwAAAAdzc2gtcn
NhAAAAAwEAAQAAAQEAsrAYIXlIJ38HyKz043/yOEBznGA2hlstu1qlhREQ/SZ7s6Y97gZJ
3xRPEpsKbBxoysuJ3mmg5OEkh0VoRW9kJebfS49w6Eol9G3s5YzAiTHXfws+7YprpFgm3G
o5p+eFvvImuax0uprG1VveCOXZ4qapYEHOHW8sZTGpwVztL9ZcVLMwsFBvau/9HJFZ1JA5
z+vnQUiLmDqoiR0RN7UjuYLbLGMJssS7AEG9LMu6lBapyVxg7n1JkPlIlDzvCkFnxn8SPU
RjPuSy4HuVPMmFq2SbYuEth5m5b69Nf9UhW3JS1Nps7HyZk57/IyuqiXWOHQsWcuB2KvB6
mBcXfgEy/QAAA9CK5i2WiuYtlgAAAAdzc2gtcnNhAAABAQCysBgheUgnfwfIrPTjf/I4QH
OcYDaGWy27WqWFERD9Jnuzpj3uBknfFE8SmwpsHGjKy4neaaDk4SSHRWhFb2Ql5t9Lj3Do
SiX0bezljMCJMdd/Cz7timukWCbcajmn54W+8ia5rHS6msbVW94I5dnipqlgQc4dbyxlMa
nBXO0v1lxUszCwUG9q7/0ckVnUkDnP6+dBSIuYOqiJHRE3tSO5gtssYwmyxLsAQb0sy7qU
FqnJXGDufUmQ+UiUPO8KQWfGfxI9RGM+5LLge5U8yYWrZJti4S2Hmblvr01/1SFbclLU2m
zsfJmTnv8jK6qJdY4dCxZy4HYq8HqYFxd+ATL9AAAAAwEAAQAAAQBPy1dbS1+vU4jUUngh
R7eQ6yc1g7mVkg4ABmC35YEiqxa+iNRLAL/oQJd3BYlH8f/R38a3bZAN5YR8a8A+kZm1Wz
4H7gxLjyEX4CbT82DfY0SKVSlKxm9/OmZQM5d/pWISfOxSKfMOiaOVD6s9afc8wZQNihVT
C5xVrDHUSX0ZyO73ZmDnypKXiDqyygiaJZRwUCEJjA8/KtL8JOPpelZB0KBM/VUZXYxGsk
lbrnrdRfTa+CVx3lkv9GPnqfLLd2mFa7gCqiPpHClQzpaGlgdz8wqj0/9oVdqQ1feHnmyF
dPZRA5BxiD3zu0t+xUfgi3cw292BtTiyymh4MvXnmBT5AAAAgF57NhPJqjWn2i9Pz+HymH
91W1oWj+6r7oTUeiPBbfxGmpwhqkWTVv5Z3eVdMy3SAZeM98Xi8Wmhp+P45d7Yi+JYui/O
X0p8Na6ZFsGAkqyfo3bo9J/egApta8pDQEe6ZX6LPANGgyInONg1kmIBHB1AZoCxVQeMMb
jzH4qE+o3cAAAAgQDXnelBsq0AAcIiragMr6ie8eHiqWveqOCGC/VLCL+ZYbPnIXH4Nc9M
mciXlBHfonGCFh6WqCs1IDgBtEmMU2nVSO/82gAQdMAhMVA8zSizjSve7n1wQvVzxkrOkX
Ede7OCAEiuWDYuUSTw2rsiKki0LDsoOrShnDxKv6ZJHwPomwAAAIEA1CeQvZ6GNzeKGc7C
J00xg9PnnI4XIsk7AqPa0ICI5o5m0uTFfPyqFa64r+j1R6z4o4CIb7jTRNz2ow3OPYaODQ
QeCam3fGqEI5BqGtOxbEOafcxq2U8pl2QS6jHiumE6avV6V15MREgd3Y9E00SkOFJe9sup
pg5wxM68b1FGEEcAAAAacHJvZC5zZnRwLnBsYW5ldEBiaW5kby5jb20B
-----END OPENSSH PRIVATE KEY-----`


fs.writeFile('/Users/developer/ssh/id_rsa', content, err => {
    if (err) {
        console.error(err)
        return
    }




    //文件写入成功。
})
function  getname(){
    var myDate = new Date()

    var yy=myDate.getFullYear(); //获取完整的年份(4位,1970-????)
    var mm=myDate.getMonth()+1; //获取当前月份(0-11,0代表1月)
    var dd=myDate.getDate(); //获取当前日(1-31)
    //console.log(yy+"-"+mm+"-"+dd)
    //return "yy+"-"+mm+"-"+dd.csv";
    const remoteFilePath="/Test_MerchantBulkLoadV3_Bindo_"+yy+"-"+mm+"-"+dd+".csv"
    return remoteFilePath
}


const client = mysocks.connect({

    host:"208.78.44.39",
    port: 22,
    proxyHost: '34.80.87.139',
    proxyPort: 1080,
    auths: [ mysocks.auth.UserPassword('proxyuser','1qaz2wsx') ]

},function (socket){


    console.log(socket)
    console.log("ssh2")
    console.log(client._sock)
    var conn = new  SSHClient;

    //console.log(conn)
    // console.log("++++=++++")
    conn.connect({
        sock:socket,
        host:'208.78.44.39',
        port: 22,
        username: 'bindo',
        privateKey: fs.readFileSync('/Users/developer/ssh/id_rsa')
    }).then(() => {
        var remoteFilePath =getname()
        conn.put("/Users/developer/ssh/id_rsa" ,"/in"+remoteFilePath)


    }).then(data=>{
        console.log(data,"the data info")
    }).catch(err=>{

        conn.end()
        console.log(err, 'catch error');
    });


});
