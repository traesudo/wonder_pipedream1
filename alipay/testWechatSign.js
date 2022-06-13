const  { KEYUTIL, KJUR, hextob64, hextob64u } =require( 'jsrsasign');
const privateKeyString = `
-----BEGIN PRIVATE KEY-----
MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAIYSs8zydPxowvlnX+9vyDRS52nNwQocDcmpXyVfMY5F+1UdmVcktwbWAzjpAZHlmNjtSYYxMkp1jedDCFBVvcQGu1ulbT7yvGY8FFRfMG0UbXT7m3hUK6IHCVYUWKCGI2+HI44V26O+pq/KvIY96Oy+X1zZa1cv2aEb3GFnH+D1AgMBAAECgYAq8li4AL5qkCBMhcmcSCFIaXoJUUhRtbTQ8TkyHnEgUth0ZlvVJ0SdovY7R6AiHPq+GhxgKOgkI83F05oZKa30YUXY5MVhUYbBvjeifbTG3lIeDwL1s51nRIUBcGEyfnDfotePtt4quxV5cXNUcsNVymgA7Pin/6bGsc062ZsQgQJBAN6VGh39fDVzqHqhPpf4WsgOvmSC5RzPMobNEP0lU9SNat86Othg6tz3h3u3vRNsXMu+n+9F5oRFbJobiXhlt6ECQQCaM8P3bYpKwImAm0gmUixIoF0wwlnYm7PHcr5P1hYHrMvxS7dT5PdHKihJAnIYhtLG6bfdzFv/Kb4XP0Gf5xjVAkBLOk2XcUL3td1thO3o4xGbqBAFXJAfCpBjKw/g3yrUHe/O/plA5JC8mhR6ZgFLfUZnvkfD0PY2IliwRTpTLN3BAkBSxAYjAACCLuWeybnoF6L9OFXMngRrZucP3l6Xq2kXpX+xe9pihTrUT6Rfy5hB4duwODIgMlgOlPEauTEYCoohAkEAgmSF5pYELbvOW9eO9tQrFm20qf/9sXHi1Z87qSzGxA3HqcrqPe73L3nfxg5nrgOwg0ZqNl1wNBXti+LxXa7DeQ==
-----END PRIVATE KEY-----
`



 function sha256withRSA(inputString) {
    const key = KEYUTIL.getKey(privateKeyString);
    // 创建 Signature 对象，设置签名编码算法
    const signature = new KJUR.crypto.Signature({ alg: 'SHA256withRSA' });
    // 初始化
    signature.init(key);
    // 传入待加密字符串
    signature.updateString(inputString);
    // 生成密文
    const originSign = signature.sign();
    // const sign64 = hextob64(originSign);
    // console.log('sign base64 =======', sign64);
    // const sign64u = hextob64u(originSign);
    // console.log('sign base64u=======', sign64u);
    return originSign;
}
var data = "";
var message = "GET" + "\n"
    + "/v3/certificates" + "\n"
    + "1234567" + "\n"
    + "12dsadasd" + "\n"
    + "1123" + "\n";

var wocao=sha256withRSA(message)
console.log(wocao)

var ignature="qbLMwXNxyKF7b2KNRS7DvxQpibADsrurvlmfIwea8pwdACuYkK6J4w54NeHhECwnIG3PENkx2BKE1LO8HPpaEzHFWYuWuWei8meaBL8N602VpHNjlIo6siZ9pMq0M+efSWv7wj62yTxfOdT++dVWDtXZSCoGf7H9y4KymDKrqF/OuI4zHQRz+J07rvdVamKc+siEOCnfHtFg6C0juCbuw+HiHx+4MD8x4iMwRJuk8FS2yxvhkZy8+qbrCYWG+pgG52ubLCBUaDQ4xUHbfDd7RIgqBp7rFb9+73rAz8bXrvDk+DLmZUWc2kQ49rWo3VU9R75XINHhhXlZHzdGCp06HA=="
console.log("-----------")
console.log(ignature)