export default function ({ store, redirect }) {
  const isAuthenticated = store.getters['auth/isAuthenticated']
  if (!isAuthenticated) {
    return redirect('/login')
  }
}
