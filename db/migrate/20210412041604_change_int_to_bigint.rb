class ChangeIntToBigint < ActiveRecord::Migration[5.2]
  def change
    change_column :accounts, :acct_num, :bigint
    change_column :accounts, :routing_num, :bigint
  end
end
