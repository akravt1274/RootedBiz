const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    $('#error-msg').text('Unable to logout, please try again.');
  }
};

document.querySelector('#logout').addEventListener('click', logout);
