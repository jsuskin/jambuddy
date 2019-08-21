class User < ApplicationRecord
  has_secure_password

  has_many :user_availabilities
  has_one :user_location

  has_many :received_messages, foreign_key: :receiver_id, class_name: 'Message'
  has_many :senders, through: :received_messages

  has_many :sent_messages, foreign_key: :sender_id, class_name: 'Message'
  has_many :receivers, through: :sent_messages

  has_many :received_jam_requests, foreign_key: :receiver_id, class_name: 'JamRequest'
  has_many :jam_request_senders, through: :received_jam_requests

  has_many :sent_jam_requests, foreign_key: :sender_id, class_name: 'JamRequest'
  has_many :jam_request_receivers, through: :sent_jam_requests

  validates :username, uniqueness: true
end
