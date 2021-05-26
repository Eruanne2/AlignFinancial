class AddInterestYtdToAccounts < ActiveRecord::Migration[5.2]
  def change
    add_column :accounts, :interest_ytd, :float, default: 0
  end
end
