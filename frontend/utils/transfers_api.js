export const getTransfer = transferId => {
  return $.ajax({
    method: 'get',
    url: `/api/transfers/${transferId}`
  })
};

export const getAllTransfers = () => {
  return $.ajax({
    method: 'get',
    url: '/api/transfers/'
  })
};

export const createTransfer = transferData => {
  return $.ajax({
    method: 'post',
    url: '/api/transfers/',
    data: { transferData }
  })
};