export default function ({ store, redirect }) {
  const user = store.getters['auth/getUserToken']
  if (!user) {
    return redirect('/login')
  }
}
