# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Account.destroy_all
Transfer.destroy_all

demoUser = User.create!([ { username: "DemoUser", password: "password", fname: "Demo", lname: "User", email: "example@email.com", address: "1234 Example Ln", phone: "123-456-7890" }]);

demoAccounts = Account.create!([
  { nickname: 'Primary Checking', acct_type: 'checkings', user_id: demoUser[0].id, external: false, balance: 2824.55},
  { nickname: 'Core Savings', acct_type: 'savings', user_id: demoUser[0].id, external: false, balance: 3217.09},
  { nickname: 'Vacation Fund', acct_type: 'savings', user_id: demoUser[0].id, external: false, balance: 6332.74},
  { nickname: 'Long-term Savings', acct_type: 'money market', user_id: demoUser[0].id, external: false, balance: 17324.51},
  { nickname: 'ABC Credit Union', acct_type: 'checkings', user_id: demoUser[0].id, external: true, acct_num: 98739837, routing_num: 29472940},
  { nickname: 'ABC Emergency Fund', acct_type: 'savings', user_id: demoUser[0].id, external: true, acct_num: 97386355, routing_num: 1183794},
]);

demoTransfers = Transfer.create!([
  { from_acct_id: demoAccounts[0].id, to_acct_id: demoAccounts[1].id, amount: 200, memo: 'Monthly savings transfer', user_id: demoUser[0].id },
  { from_acct_id: demoAccounts[0].id, to_acct_id: demoAccounts[2].id, amount: 100, memo: 'Monthly vacation contribution', user_id: demoUser[0].id },
  { from_acct_id: demoAccounts[5].id, to_acct_id: demoAccounts[0].id, amount: 1300, memo: 'Car repair', user_id: demoUser[0].id },
  { from_acct_id: demoAccounts[5].id, to_acct_id: demoAccounts[0].id, amount: 1300, memo: 'Car repair', user_id: demoUser[0].id }
]);