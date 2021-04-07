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
require 'test_helper'

class AccountTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
