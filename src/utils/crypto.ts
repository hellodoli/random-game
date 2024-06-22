import CryptoJS from 'crypto-js'

const CRYPTO_AES_KEY = '22/06/2024'

export const encryptData = (str: string) =>
  CryptoJS.AES.encrypt(str, CRYPTO_AES_KEY).toString()

export const decryptData = (str: string) =>
  CryptoJS.AES.decrypt(str, CRYPTO_AES_KEY).toString(CryptoJS.enc.Utf8)

export const isEncrypted = (str: string) => {
  const bytes = CryptoJS.AES.decrypt(str, CRYPTO_AES_KEY)
  try {
    const decrypted = bytes.toString(CryptoJS.enc.Utf8)
    return !!decrypted
  } catch {
    return false
  }
}
