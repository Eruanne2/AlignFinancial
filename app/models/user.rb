# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  fname           :string           not null
#  lname           :string           not null
#  email           :string           not null
#  address         :string
#  phone           :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  after_initialize :ensure_session_token
  validates :username, :password_digest, :session_token, :fname, :lname, :email, presence: true
  validates :username, :session_token, :email, uniqueness: true
  validates :password, length: { minimum: 6 }, allow_nil: true

  has_many :accounts,
    foreign_key: :user_id,
    class_name: 'Account'

  attr_reader :password

  def self.find_by_credentials(username, pw)
    user = User.find_by(username: username)
    (user && user.is_password?(pw)) ? user : nil
  end

  def password=(pw)
    @password = password
    self.password_digest = BCrypt::Password.create(pw)
  end

  def is_password?(pw)
    BCrypt::Password.new(self.password_digest).is_password?(pw)
  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64(16)
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64(16)
  end

end
