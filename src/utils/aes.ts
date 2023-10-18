import JSEncrypt from 'jsencrypt';

// 公钥
const publicKey = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvzOefkM5jWCYpQI9DoFJ
sV7+VJzqR88Hdmhhr6onVNFFQEIF+3WyfQw14/AucAL2XZQDIwMC5OI7wXsXGVsd
YF6ukq/cWDf8RTIyRhibrURZ+JswaYBFgzVpIDO5Mih7p6TmX0Ek/yl16n4ur5ig
w9soppApzjVz83F6UgU5oN07Enzc9RH6eh/1m4bnuVNABLeD8od3q/QCLwBxtimr
QAFwbBkuAVUyCcKdeFlm6leA3RIJHnv1js+6ZacLXQkS/n6vzmRYNje/QrEDeodQ
87gX/ZZRE8d+ED6z0YfTT0BJ0voOktmvUbxg33Jlqgl9A7NQOWhWhwFAGyCtW+HR
+wIDAQAB
-----END PUBLIC KEY-----
`;

export function publicKeyEncrypt(data:string) {
    var msgStr = JSON.stringify(data);
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    return encrypt.encrypt(msgStr);
}
  