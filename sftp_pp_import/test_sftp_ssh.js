// const socks = require('@luminati-io/socksv5')
 const socks = require('socksv5')
const { Client } = require('ssh2');
const fs = require("fs")

const sshConfig = {
    host: '208.78.44.39',
    port: 22,
    username: 'bindo',
    privateKey: fs.readFileSync('/Users/developer/id_rsa.txt')
};
const info ={
    srcAddr:'34.80.87.139',
    srcPort:'22',
    dstPort:'1080',





}
socks.createServer((info, accept, deny) => {
    // NOTE: you could just use one ssh2 client connection for all forwards, but
    // you could run into server-imposed limits if you have too many forwards open
    // at any given time
    const conn = new Client();
    conn.on('ready', () => {
        conn.forwardOut(info.srcAddr,
            info.srcPort,
            info.dstAddr,
            info.dstPort,
            (err, stream) => {
                if (err) {
                    conn.end();
                    return deny();
                }

                const clientSocket = accept(true);
                if (clientSocket) {
                    stream.pipe(clientSocket).pipe(stream).on('close', () => {
                        conn.end();
                    });
                } else {
                    conn.end();
                }
            });
    }).on('error', (err) => {
        deny();
    }).connect(sshConfig);
}).listen(1080, '34.80.87.139', () => {
    console.log('SOCKSv5 proxy server started on port 1080');
}).useAuth(socks.auth.());