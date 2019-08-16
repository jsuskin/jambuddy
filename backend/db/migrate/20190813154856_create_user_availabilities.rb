class CreateUserAvailabilities < ActiveRecord::Migration[5.2]
  def change
    create_table :user_availabilities do |t|
      t.string :day_of_week
      t.string :start_time
      t.string :end_time
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
