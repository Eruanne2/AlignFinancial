export const formatMoney = amount => {
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return formatter.format(amount);
};

export const formatRubyDate = rubyDateString => {
  let date = new Date(rubyDateString);
  date = date.toDateString();
  return (date.slice(4,10) + ',' + date.slice(10)).toUpperCase();
};

export const formatDateTime = date => {
  let dateString = date.toDateString();
  dateString = dateString.slice(4,10) + ',' + dateString.slice(10);
  let timeString = date.toLocaleTimeString();
  timeString = timeString.slice(0, 4) + timeString.slice(7)
  return (dateString + ' • ' + timeString)
};

export const formatDate = date => {
  date = date.toDateString();
  return (date.slice(4,10) + ',' + date.slice(10)).toUpperCase();
};