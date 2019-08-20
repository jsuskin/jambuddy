require 'faker'

UserLocation.destroy_all
UserAvailability.destroy_all
Message.destroy_all
User.destroy_all

# USERS
(0..150).each do |i|
  User.create(username: Faker::Twitter.user[:screen_name], password: "peanuts", image: Faker::Avatar.image, bio: Faker::Hipster.paragraph_by_chars(characters: rand(200..1600), supplemental: true))
end

# USER_LOCATIONS
User.all.each do |user|
  UserLocation.create(user_id: user.id, latitude: rand(40.623..40.74), longitude: -rand(73.70..74.10))
end

# USER_AVAILABILITIES
(0..500).each do |i|
  some_random_start_time = rand(0..20).to_s
  if some_random_start_time.length < 2
    some_random_start_time = "0#{some_random_start_time}"
  end
  some_random_end_time = (some_random_start_time.to_i + rand(1..3)).to_s
  if some_random_end_time.length < 2
    some_random_end_time = "0#{some_random_end_time}"
  end
  minutes = ['00', '15', '30', '45']
  UserAvailability.create(user_id: User.all.sample.id, day_of_week: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].sample, start_time: "#{some_random_start_time}:#{minutes.sample}", end_time: "#{some_random_end_time}:#{minutes.sample}")
end

# MESSAGES
1000.times do
  sender = User.all.sample
  arr = User.all - [*sender]
  receiver = arr.sample
  Message.create(subject: Faker::Hipster.sentences(number: 1)[0], body: Faker::Hipster.paragraph_by_chars(characters: rand(200..1600), supplemental: true), sender_id: sender.id, receiver_id: receiver.id)
end
