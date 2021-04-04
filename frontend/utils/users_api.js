export const createUser = userData => {
  return $.ajax({
    method: 'POST',
    url: '/api/users',
    data: { userData }
  });
};

export const getUser = userId => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${userId}`
  })
};

export const updateUser = userData => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/users/${userData.id}`,
    data: { userData }
  });
};