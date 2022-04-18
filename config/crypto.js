const CryptoJS = require("crypto-js");

class Crypto {
    static secretKey;
    static {
        this.secretKey = process.env.SECRET_KEY||"yourscretkey";
    }
    static encrypt(decrypted, secretKey){
        return CryptoJS.AES.encrypt(decrypted, secretKey||this.secretKey).toString();
    }
    static encryptJSON(decrypted, secretKey){
        return this.encrypt(JSON.stringify(decrypted, secretKey));
    }
    static decrypt(encrypted, secretKey){
        return CryptoJS.AES.decrypt(encrypted, secretKey||this.secretKey).toString(CryptoJS.enc.Utf8);
    }
    static decryptJSON(encrypted, secretKey){
        return JSON.parse(this.decrypt(encrypted, secretKey));
    }
}

module.exports = Crypto;