export default function ({ store, redirect }) {
  if (!store.auth.user) {
    return redirect('/login')
  }
}
