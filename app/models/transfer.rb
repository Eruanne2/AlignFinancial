# == Schema Information
#
# Table name: transfers
#
#  id           :bigint           not null, primary key
#  from_acct_id :integer          not null
#  to_acct_id   :integer          not null
#  amount       :float            not null
#  memo         :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  user_id      :integer          not null
#
class Transfer < ApplicationRecord
  validates :from_acct_id, :to_acct_id, :amount, :user_id, presence: true

  belongs_to :user,
    foreign_key: :user_id,
    class_name: 'User'

  belongs_to :from_acct,
    foreign_key: :from_acct_id,
    class_name: 'Account'

  belongs_to :to_acct,
    foreign_key: :to_acct_id,
    class_name: 'Account'
end
