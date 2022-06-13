import fs from "fs"
import Client from 'ssh2-sftp-client'
import {axios} from "@pipedream/platform"


export function request1(config){
    // 1. 创建axios实例
    const instance = axios.create({
        httpAgent: new http.Agent({ keepAlive: true }),
        httpsAgent: new https.Agent({ keepAlive: true }),
        proxy: {
            protocol: 'https',
            host: '34.80.87.139',
            port: 1080,
            auth: {
                username: 'proxyuser',
                password: '1qaz2wsx',
            }
        },
    });

    // 2.发送真正的网络请求,返回一个promise
    return instance(config);
};
let remotePath="/in";
let localPath="/Users/developer/1.txt";
request1({
     uploadCSVToSFTP(localPath,remotePath) {
        console.log(localPath,remotePath);
        const  sftp = new Client();
        const  config= {
            host: "208.78.44.39",
            port: 22,
            username: "bindo",
            password: "/Users/developer/id_rsa.txt",
        };
        sftp.connect(config);
        return sftp.put(localPath,SFTP_BASIC_DIR + remotePath,{autoClose:true});
    }
})



