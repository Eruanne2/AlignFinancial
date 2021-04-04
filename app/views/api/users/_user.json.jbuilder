json.extract! user, :id, :username, :fname, :lname, :email, :address, :phone

# syntax might need tweaking, but add this later
# json.accountIds do
#   json.array! @user.accounts.each do |acct|
#     json.extract! account, :id
#   end
# end