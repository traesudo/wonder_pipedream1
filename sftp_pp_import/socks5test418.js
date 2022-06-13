const SocksClient = require ('socks');
const SFTPClient =require ('ssh2-sftp-client');
const  fs =require('fs');

const host = '208.78.44.39';
const port = 22; // default SSH/SFTP port on remote server

const mysocks =  SocksClient.createConnection({
    proxy: {
        host: '34.80.87.139', // proxy hostname
        port: 1080, // proxy port
        type: 5, // for SOCKS v5
        username:"proxyuser",
        password:"1qaz2wsx",
    },
    command: 'connect',
    destination: { host,port } // the remote SFTP server
});

console.log("socket._sock")
// console.log(socket._sock)
const client = new SFTPClient();
client.connect({
    host:'208.78.44.39',
    port: 22,
    sock: mysocks._sock, // pass the socket to proxy here (see ssh2 doc)
    username: 'bindo',
    privateKey: fs.readFileSync('/Users/developer/.ssh/id_rsa')
})