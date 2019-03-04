export default function ({ route, store, redirect }) {
    if (!store.state.authUser && route.path != "/login") {
      return redirect('/login')
    }
  }