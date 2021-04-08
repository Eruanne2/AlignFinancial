# == Schema Information
#
# Table name: accounts
#
#  id             :bigint           not null, primary key
#  acct_num       :integer          not null
#  routing_num    :integer          not null
#  acct_type      :string           not null
#  user_id        :integer          not null
#  external       :boolean          not null
#  balance        :float
#  interest_rate  :float
#  transfer_limit :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

ACCT_BENEFITS = { 
  'checkings'=> { interest_rate: 0.5, transfer_limit: 10000}, 
  'savings'=> { interest_rate: 1.5, transfer_limit: 6},
  'money market'=> { interest_rate: 1.2, transfer_limit: 6}
};

class Account < ApplicationRecord
  after_initialize :acct_setup
  validates :acct_num, :routing_num, :acct_type, :user_id, presence: true
  validates :external, inclusion: { in: [true, false]}
  validates :acct_type, inclusion: { in: ['checkings', 'savings', 'money market']}
  validate :internal_account_info

  belongs_to :owner,
    foreign_key: :user_id,
    class_name: 'User'

  def acct_setup
    self.acct_num ||= rand(10000000..99999999)
    self.routing_num ||= 14952223
    self.balance = 0.0
    self.interest_rate = ACCT_BENEFITS[acct_type][:interest_rate]
    self.transfer_limit = ACCT_BENEFITS[acct_type][:transfer_limit]
  end

  def internal_account_info
    return if external
    errors.add(:balance, "can't be blank") unless balance.present?
    errors.add(:interest_rate, "can't be blank") unless interest_rate.present?
    errors.add(:transfer_limit, "can't be blank") unless transfer_limit.present?
  end

end
