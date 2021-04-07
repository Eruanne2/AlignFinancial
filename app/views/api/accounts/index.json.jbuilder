json.array! @accounts.each do |acct|
  json.partial! '/api/accounts/account', account: acct
end