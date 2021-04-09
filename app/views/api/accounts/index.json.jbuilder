
@accounts.each do |acct|
  json.set! acct.id do
    json.partial! '/api/accounts/account', account: acct
  end
end