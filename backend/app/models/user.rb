class User < ApplicationRecord
  has_secure_password

  has_many :user_availabilities
  has_one :user_location

  validates :username, uniqueness: true
end
