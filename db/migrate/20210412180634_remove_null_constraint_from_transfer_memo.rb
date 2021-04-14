class RemoveNullConstraintFromTransferMemo < ActiveRecord::Migration[5.2]
  def change
    change_column_null(:transfers, :memo, true)
  end
end
