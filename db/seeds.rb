# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

demoUser = User.create!([ { username: "DemoUser", password: "password", fname: "Demo", lname: "User", email: "example@email.com", address: "1234 Example Ln", phone: "123-456-7890" }]);

demoAccounts = Account.create!([
  { nickname: 'Primary Checking', acct_type: 'checkings', user_id: 1, external: false, balance: 2824.55},
  { nickname: 'Core Savings', acct_type: 'savings', user_id: 1, external: false, balance: 3217.09},
  { nickname: 'Vacation Fund', acct_type: 'savings', user_id: 1, external: false, balance: 6332.74},
  { nickname: 'Long-term Savings', acct_type: 'money market', user_id: 1, external: false, balance: 17324.51},
  { nickname: 'ABC Credit Union', acct_type: 'checkings', user_id: 1, external: true},
  { nickname: 'ABC Emergency Fund', acct_type: 'savings', user_id: 1, external: true},
]);

demoTransfers = Transfer.create!([
  { from_acct_id: 1, to_acct_id: 2, amount: 200, memo: 'Monthly savings transfer', user_id: 1 },
  { from_acct_id: 1, to_acct_id: 3, amount: 100, memo: 'Monthly vacation contribution', user_id: 1 },
  { from_acct_id: 6, to_acct_id: 1, amount: 1300, memo: 'Car repair', user_id: 1 },
  { from_acct_id: 6, to_acct_id: 1, amount: 1300, memo: 'Car repair', user_id: 1 }
]);