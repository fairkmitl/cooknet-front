export default async function({ $auth, next, store }) {
  let user = $auth.user;
  if ($auth.loggedIn) {
  } else {
    next("/");
  }
}
