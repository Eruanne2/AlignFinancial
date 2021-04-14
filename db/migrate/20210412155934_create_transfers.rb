class CreateTransfers < ActiveRecord::Migration[5.2]
  def change
    create_table :transfers do |t|
      t.integer :from_acct_id, null: false
      t.integer :to_acct_id, null: false
      t.float :amount, null: false
      t.string :memo, null: false

      t.timestamps
    end
    add_index :transfers, :from_acct_id, unique: true
    add_index :transfers, :to_acct_id, unique: true
  end
end
