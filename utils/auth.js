import { Auth0Client } from '@auth0/auth0-spa-js'
import { getCookie } from './cookies'

export const PROTECTED_ROUTES = ['edit-profile']

export const authCookiePresent = () => {
  if (process.browser) {
    return !!getCookie('token') && !!getCookie('auth0Id')
  }

  return false
}

const auth0 = new Auth0Client({
  domain: process.env.AUTH0_DOMAIN,
  client_id: process.env.AUTH0_CLIENT_ID,
  audience: process.env.AUTH0_API_URL,
  useRefreshTokens: true,
})

export default auth0
