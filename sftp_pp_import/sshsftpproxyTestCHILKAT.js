var os = require('os');
var fs = require('fs')
var chilkat = require('@chilkat/ck-node11-linux32');
// if (os.platform() == 'win32') {
//     if (os.arch() == 'ia32') {
//         var chilkat = require('@chilkat/ck-node11-win-ia32');
//     } else {
//         var chilkat = require('@chilkat/ck-node11-win64');
//     }
// } else if (os.platform() == 'linux') {
//     if (os.arch() == 'arm') {
//         var chilkat = require('@chilkat/ck-node11-arm');
//     } else if (os.arch() == 'x86') {
//         var chilkat = require('@chilkat/ck-node11-linux32');
//     } else {
//         var chilkat = require('@chilkat/ck-node11-linux64');
//     }
// } else if (os.platform() == 'darwin') {
//     var chilkat = require('@chilkat/ck-node11-macosx');
// }

function chilkatExample() {

    // This example assumes the Chilkat API to have been previously unlocked.
    // See Global Unlock Sample for sample code.

    var sftp = new chilkat.SFtp();

    // To use a SOCKS4 or SOCKS5 proxy, simply set the following
    // properties prior to connecting:
    // The SOCKS hostname may be a domain name or
    // IP address:
    sftp.SocksHostname = "www.mysocksproxyserver.com";
    sftp.SocksPort = 1080;
    sftp.SocksUsername = "myProxyLogin";
    sftp.SocksPassword = "myProxyPassword";

    // Set the SOCKS version to 4 or 5 based on the version
    // of the SOCKS proxy server:
    sftp.SocksVersion = 5;

    // Note: SOCKS4 servers only support usernames without passwords.
    // SOCKS5 servers support full login/password authentication.

    // Connect to the SSH server.
    // The standard SSH port = 22
    // The hostname may be a hostname or IP address.
    var hostname = "sftp.example.com";
    var port = 22;
    var privateKey= fs.readFileSync('/Users/developer/id_rsa.txt')
    if (success !== true) {
        console.log(sftp.LastErrorText);
        return;
    }

    // Your application is now connected to an SFTP/SSH server
    // through a SOCKS4 or SOCKS5 proxy.
    // ..

}

chilkatExample();