class CreateJamRequests < ActiveRecord::Migration[5.2]
  def change
    create_table :jam_requests do |t|
      t.string :weekday
      t.string :month
      t.integer :day
      t.integer :year
      t.string :start_time
      t.string :end_time
      t.integer :sender_id
      t.integer :receiver_id
      t.boolean :accepted, default: false

      t.timestamps
    end
  end
end
