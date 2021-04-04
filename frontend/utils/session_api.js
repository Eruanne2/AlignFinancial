export const createSession = userCreds => {
  return $.ajax({
    method: 'POST',
    url: '/api/session',
    data: { userCreds }
  });
};

export const destroySession = () => {
  return $.ajax({
    method: 'DELETE',
    url: '/api/session'
  });
};