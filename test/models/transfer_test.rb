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
require 'test_helper'

class TransferTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
