const getCookie = (cookieName) => {
  const name = cookieName + '='
  const decodedCookie = decodeURIComponent(document.cookie)
  const cookieArray = decodedCookie.split(';')
  for (let i = 0; i < cookieArray.length; i++) {
    let cookieItem = cookieArray[i]
    while (cookieItem.charAt(0) === ' ') {
      cookieItem = cookieItem.substring(1)
    }
    if (cookieItem.indexOf(name) === 0) {
      return cookieItem.substring(name.length, cookieItem.length)
    }
  }
  return ''
}

const setCookie = (name, value, expSecs) => {
  const date = new Date()
  date.setTime(date.getTime() + expSecs * 1000)
  document.cookie = `${name}=${value};path=/;expires=${date.toUTCString()}`
}

const deleteCookie = (name) => {
  document.cookie = `${name}='';path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC;`
}

export { getCookie, setCookie, deleteCookie }
