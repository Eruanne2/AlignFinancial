class CreateAccounts < ActiveRecord::Migration[5.2]
  def change
    create_table :accounts do |t|
      t.integer :acct_num, null: false
      t.integer :routing_num, null: false
      t.string :acct_type, null: false
      t.integer :user_id, null: false
      t.boolean :external, null: false
      t.float :balance
      t.float :interest_rate
      t.integer :transfer_limit

      t.timestamps
    end
    add_index :accounts, :acct_num, unique: true
    add_index :accounts, :user_id
  end
end
