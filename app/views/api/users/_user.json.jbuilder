json.extract! user, :id, :username, :fname, :lname, :email, :address, :phone

# this doesn't work...
if @user
  json.accountIds do
    json.array! @user.accounts.each do |acct|
      json.extract! acct, :id
    end
  end
end