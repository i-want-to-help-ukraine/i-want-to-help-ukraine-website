import { Auth0Client } from '@auth0/auth0-spa-js'

const auth0 = new Auth0Client({
  domain: 'i-want-to-help-ukraine.eu.auth0.com',
  client_id: 'vZuNfiPqcC9xktyuO4FFt1HT7bfIjGzu',
})

export default auth0
