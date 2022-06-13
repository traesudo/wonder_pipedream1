


// import https from 'https';
// import { SocksProxyAgent } from 'socks-proxy-agent';
//
//
// var proxy = process.env.socks_proxy || 'socks://proxyuser:1qaz2wsx34.80.87.139:1080';
// console.log(proxy)
//
// // const agent = new SocksProxyAgent(proxy);
//
// // https.get('https://jsonip.org', { agent }, (res) => {
// //     console.log(res.headers);
// //     res.pipe(process.stdout);
// // });


const SSHClient = require("ssh2-sftp-client");
const SocksClient = require("socks");
const fs = require("fs");
const  options  =  {
    proxy : {
        host : '34.80.87.139' ,  // ipv4, ipv6, or hostname
        port : 1080 ,
        username:"proxyuser",
        password:"1qaz2wsx34",
        type : 5
    } ,

    command : 'connect' ,

    // 当使用 associate 时，目的地应该是远程预计将 UDP 数据包发送到要转发的代理服务器的客户端。这应该是您的本地 IP，或者可选的通配符地址 (0.0.0.0) UDP Client <-> Proxy <-> UDP Client
    destination : {
        host:'208.78.44.39',
        port: 22,

    }
} ;

const info = SocksClient.createConnection(options);
var conn = new SSHClient();
conn.connect({
    sock:info.socket,
    username: "bindo",
    privateKey: fs.readFileSync('/tmp/id_rsa.txt')
})
console.log(conn)
conn.put("/tmp/id_rsa.txt","/in")






//
// const Client = require('ssh2-socksv5-proxy').Client;
// const newClient = new Client();
// const fs = require("fs")
// const socks = require("@luminati-io/socksv5");
// newClient.connect({
//     host: '208.78.44.39',
//     port: 22,
//
//     proxyHost: '34.80.87.139',
//     proxyPort: 1080,
//     username: 'proxyuser',
//     // password: '1qaz2wsx34'，
//     username:"bindo",
//     privateKey:fs.readFileSync('/Users/developer/.ssh/id_rsa'),
//     auths:[ socks.auth.UserPassword('proxyuser','1qaz2wsx') ],
// })
// newClient.on('ready', function() {
//     console.log('ready');
//     newClient.end();
// });
// newClient.on('error', function(error) {
//     console.log(error)
// })