import https from 'https';
import { SocksProxyAgent } from 'socks-proxy-agent';

const info = {
    host: '//34.80.87.139',
    port:`1080`,
    userId: 'proxyuser',
    password: '1qaz2wsx'
};
const agent = new SocksProxyAgent(info);

https.get('https://jsonip.org', { agent }, (res) => {
    console.log(res.headers);
    res.pipe(process.stdout);
});