import https from 'https';
import { SocksProxyAgent } from 'socks-proxy-agent';

const info = {
    host: 'br41.nordvpn.com',
    userId: 'your-name@gmail.com',
    password: 'abcdef12345124'
};
const agent = new SocksProxyAgent(info);

https.get('https://jsonip.org', { agent }, (res) => {
    console.log(res.headers);
    res.pipe(process.stdout);
});