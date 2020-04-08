const CryptoJS = require('crypto-js');
const Logger = require('./LoggerUtils');

class CryptographyUtils {
  /**
   * Encrypt Plain Text
   * @param {string} password - Password.
   * @param {string} plainText - Plain Text to encrypt.
   * @param {Object} [config] - Configuration.
   * @param {string} [config.keySize = 128] - The size of the key. The possibles values are 128, 256 or 512.
   * @param {Number} [config.iterations = 1] - The number of iterations desired.
   * @return {string} Plain Text Encrypted.
   */
  static encryptAES(password, plainText, config = { keySize: 256, iterations: 1 }) {
    const { keySize } = config;
    const { iterations } = config;
    Logger.debug(`encryptAES keySize: ${keySize}`);
    Logger.debug(`encryptAES iterations: ${iterations}`);

    const salt = CryptoJS.lib.WordArray.random(128 / 8);
    Logger.debug(`encryptAES salt: ${salt}`);

    const key = CryptoJS.PBKDF2(password, salt, {
      keySize: keySize / 32,
      hasher: CryptoJS.algo.SHA512,
      iterations: iterations,
    });
    Logger.debug(`encryptAES key: ${key}`);

    const iv = CryptoJS.lib.WordArray.random(128 / 8);
    Logger.debug(`encryptAES iv: ${iv}`);

    const encrypted = CryptoJS.AES.encrypt(plainText, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });

    const encryptedMessage = encrypted.toString() + iv.toString() + salt.toString();
    Logger.debug(`encryptAES encryptedMessage: ${encryptedMessage}`);
    return encryptedMessage;
  }

  /**
   * Decrypt message
   * @param {string} password - Password.
   * @param {string} encryptedMessage - Plain Text encrypt.
   * @param {Object} [config] - Configuration.
   * @param {string} [config.keySize = 128] - The size of the key. The possibles values are 128, 256 or 512.
   * @param {Number} [config.iterations = 1] - The number of iterations desired.
   * @return {string} Message Decrypted.
   */
  static decryptAES(password, encryptedMessage, config = { keySize: 256, iterations: 1 }) {
    const { keySize } = config;
    const { iterations } = config;
    Logger.debug(`decryptAES keySize: ${keySize}`);
    Logger.debug(`decryptAES iterations: ${iterations}`);

    const salt = CryptoJS.enc.Hex.parse(encryptedMessage.substr(encryptedMessage.length - 32));
    const iv = CryptoJS.enc.Hex.parse(encryptedMessage.substr(encryptedMessage.length - 64, 32));
    const encrypted = encryptedMessage.substr(0, encryptedMessage.length - 64);

    Logger.debug(`decryptAES salt: ${salt}`);
    Logger.debug(`decryptAES iv: ${iv}`);

    const key = CryptoJS.PBKDF2(password, salt, {
      keySize: keySize / 32,
      hasher: CryptoJS.algo.SHA512,
      iterations: iterations,
    });
    Logger.debug(`decryptAES key: ${key}`);

    const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });

    const decryptedMessage = decrypted.toString(CryptoJS.enc.Utf8);
    Logger.debug(`decryptAES decryptedMessage: ${decryptedMessage}`);

    if (!decryptedMessage) {
      throw new Error('Decrypt Error');
    }

    return decryptedMessage;
  }

  /**
   * Hashing Algorithm of 224 bits(28 bytes)
   * @param {string} message - Message to be hashed.
   * @return {string} Hashed message.
   */
  static hash224(message) {
    const hash = CryptoJS.SHA224(message);
    return hash;
  }

  /**
   * Hashing Algorithm of 256 bits(32 bytes)
   * @param {string} message - Message to be hashed.
   * @return {string} Hashed message.
   */
  static hash256(message) {
    const hash = CryptoJS.SHA256(message);
    return hash;
  }

  /**
   * Hashing Algorithm of 384 bits(48 bytes)
   * @param {string} message - Message to be hashed.
   * @return {string} Hashed message.
   */
  static hash384(message) {
    const hash = CryptoJS.SHA384(message);
    return hash;
  }

  /**
   * Hashing Algorithm of 512 bits(64 bytes)
   * @param {string} message - Message to be hashed.
   * @return {string} Hashed message.
   */
  static hash512(message) {
    const hash = CryptoJS.SHA512(message);
    return hash;
  }

  /**
   * Hashing Algorithm 3
   * @param {string} message - Message to be hashed.
   * @return {string} Hashed message.
   */
  static hash3(message) {
    const hash = CryptoJS.SHA3(message);
    return hash;
  }
}

module.exports = CryptographyUtils;
