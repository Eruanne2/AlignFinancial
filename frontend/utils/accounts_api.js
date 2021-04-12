export const createAccount = acctData => {
  return $.ajax({
    method: 'post',
    url: '/api/accounts',
    data: { acctData }
  })
};

export const getAllAccounts = () => {
  return $.ajax({
    method: 'get',
    url: '/api/accounts'
  })
};

export const getAccount = acctId => {
  return $.ajax({
    method: 'get',
    url: `/api/accounts/${acctId}`
  })
};

export const patchAccount = acctData => {
  return $.ajax({
    method: 'patch',
    url: `/api/accounts/${acctData.id}`,
    data: { acctData }
  })
};

export const destroyAccount = acctId => {
  return $.ajax({
    method: 'delete',
    url: `/api/accounts/${acctId}`
  })
};