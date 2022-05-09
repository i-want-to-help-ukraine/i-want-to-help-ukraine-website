const keysOfArrayValues = ['cities', 'activities']
const keysOfNumberValue = ['page', 'count', 'offset']

export const buildURLParams = (oldParams, key, value) => {
  const newParams = {}
  if (keysOfArrayValues.includes(key)) {
    if (value.length) {
      newParams[key] = encodeURIComponent(value)
    } else {
      // eslint-disable-next-line no-param-reassign
      delete oldParams[key]
    }
  } else {
    newParams[key] = value
  }
  return { ...oldParams, ...newParams }
}

export const parseURLParams = (query) => {
  const queryObject = { ...query }
  Object.keys(queryObject).forEach((key) => {
    let decodedQuery = decodeURIComponent(queryObject[key])
    if (keysOfArrayValues.includes(key)) decodedQuery = decodedQuery.split(',')
    if (keysOfNumberValue.includes(key)) decodedQuery = Number(decodedQuery)
    queryObject[key] = decodedQuery
  })
  return queryObject
}
