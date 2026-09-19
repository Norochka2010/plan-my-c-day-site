// Credentials stay in the URL fragment and memory: never sent to this site's server,
// logged, persisted, fetched, or placed in a query string. No third-party resources.
(() => {
  const params = new URLSearchParams(location.hash.slice(1));
  history.replaceState(null, '', location.pathname);
  const title = document.getElementById('title');
  const message = document.getElementById('message');
  const help = document.getElementById('help');
  const link = document.getElementById('open');
  if (params.has('error') || params.has('error_code')) {
    title.textContent = 'Let’s try a fresh link';
    message.textContent = 'This link could not be used. Return to the app and request a new email, then open the newest message.';
    help.textContent = 'Already confirmed your email? You can try signing in.';
    return;
  }
  const type = params.get('type');
  const access = params.get('access_token');
  const refresh = params.get('refresh_token');
  if (!['recovery', 'signup'].includes(type) || !access || !refresh) {
    message.textContent = 'To confirm your email or reset your password, open the newest email link on your phone.';
    return;
  }
  const target = new URLSearchParams({ type, access_token: access, refresh_token: refresh });
  link.href = 'mobile://me#' + target.toString();
  title.textContent = type === 'recovery' ? 'Choose your new password' : 'Continue to your account';
  message.textContent = type === 'recovery' ? 'Tap below to open the app and choose a new password.' : 'Tap below to finish opening your account in the app.';
  help.textContent = 'If the app doesn’t open, make sure it is installed on this phone. Keep this page open while you try again.';
})();
