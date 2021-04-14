class RemoveUniqueFromTransfers < ActiveRecord::Migration[5.2]
  def change
    remove_index :transfers, :from_acct_id
    add_index :transfers, :from_acct_id
    remove_index :transfers, :to_acct_id
    add_index :transfers, :to_acct_id
  end
end
