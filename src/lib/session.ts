import CryptoJS from 'crypto-js';

const SECRET_KEY = 'my_secret_key_123'; 

export function encrypt(data: string) {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
}

export function decrypt(cipherText: string) {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}
