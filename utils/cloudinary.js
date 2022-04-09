import { hash, codec } from 'sjcl'

export const avatarUploadOptions = {
  folder: process.env.CLOUDINARY_USER_AVATARS_FOLDER_NAME,
  upload_preset: process.env.CLOUDINARY_USER_AVATARS_PRESET_NAME,
}

export const createSecureSignature = (params) => {
  const dataParams = { ...params }
  const sortedParams = Object.keys(dataParams)
    .sort()
    .reduce((obj, key) => {
      // eslint-disable-next-line no-param-reassign
      obj[key] = dataParams[key]
      return obj
    }, {})
  let paramsString = new URLSearchParams(sortedParams).toString()
  paramsString += process.env.CLOUDINARY_API_SECRET

  const signatureBitArray = hash.sha256.hash(paramsString)
  const signatureHash = codec.hex.fromBits(signatureBitArray)
  return signatureHash
}

export const buildUploadAvatarParams = (uid) => {
  const params = {
    ...avatarUploadOptions,
    timestamp: Date.now(),
  }
  if (uid) {
    const avatarPublicId = uid.split('|')[1] || uid.split('|')[0]
    params.public_id = avatarPublicId
  }
  const signature = createSecureSignature({ ...params })
  params.signature = signature
  params.api_key = process.env.CLOUDINARY_API_KEY
  return params
}
