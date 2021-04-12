class AddNicknameToAccounts < ActiveRecord::Migration[5.2]
  def change
    add_column :accounts, :nickname, :string, null: false, default: 'Nickname'
  end
end
