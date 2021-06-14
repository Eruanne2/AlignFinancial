# == Schema Information
#
# Table name: accounts
#
#  id             :bigint           not null, primary key
#  nickname       :string           default("Nickname"), not null
#  acct_num       :bigint           not null
#  routing_num    :bigint           not null
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
  'checkings'=> { interest_rate: 0.5, transfer_limit: 10000, nickname: 'Interest Checking'}, 
  'savings'=> { interest_rate: 1.2, transfer_limit: 6, nickname: 'High-Yield Savings'},
  'money market'=> { interest_rate: 1.5, transfer_limit: 6, nickname: 'Money Market'}
};

class Account < ApplicationRecord
  after_initialize :acct_setup
  validates :acct_num, :routing_num, :acct_type, :user_id, :nickname, presence: true
  validates :external, inclusion: { in: [true, false]}
  validates :acct_type, inclusion: { in: ['checkings', 'savings', 'money market']}
  validate :internal_account_info

  belongs_to :owner,
    foreign_key: :user_id,
    class_name: 'User'

  has_many :transfers_from,
    foreign_key: :from_acct_id,
    class_name: 'Transfer'

  has_many :transfers_to,
    foreign_key: :to_acct_id,
    class_name: 'Transfer'

  def acct_setup
    unless self.external
      self.acct_num ||= rand(10000000..99999999)
      self.routing_num ||= 14952223
      self.balance ||= 0.0
      self.interest_rate ||= ACCT_BENEFITS[acct_type][:interest_rate]
      self.transfer_limit ||= ACCT_BENEFITS[acct_type][:transfer_limit]
      self.nickname ||= ACCT_BENEFITS[acct_type][:nickname]
    end
  end

  def internal_account_info
    return if external
    errors.add(:balance, "can't be blank") unless balance.present?
    errors.add(:interest_rate, "can't be blank") unless interest_rate.present?
    errors.add(:transfer_limit, "can't be blank") unless transfer_limit.present?
  end

  def self.accrue_interest
    
    interest_acct = Account.find_by({nickname: "Master Interest"})
    Account.all.each do |acct| 
      unless acct.id == interest_acct.id || acct.external
        transfer = Transfer.new({ 
          from_acct_id: interest_acct.id,
          to_acct_id: acct.id,
          amount: (acct.balance * acct.interest_rate / 5200),
          memo: 'Daily Interest Accrual',
          user_id: acct.user_id
        })
        if transfer.save
          new_balance = acct.balance + (acct.balance * acct.interest_rate / 5200)
          new_ytd = acct.interest_ytd + (acct.balance * acct.interest_rate / 5200)
          acct.update_attributes({balance: new_balance, interest_ytd: new_ytd })
        end
      end
    end

  end

end
