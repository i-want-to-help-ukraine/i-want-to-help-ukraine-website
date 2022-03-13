export default function ({ store, redirect }) {
  const user = store.getters['auth/getUser']
  if (!user) {
    return redirect('/login')
  }
}
