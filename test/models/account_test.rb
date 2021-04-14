# == Schema Information
#
# Table name: accounts
#
#  id             :bigint           not null, primary key
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
#  nickname       :string           default("Nickname"), not null
#
require 'test_helper'

class AccountTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
