class CreateUserInstruments < ActiveRecord::Migration[5.2]
  def change
    create_table :user_instruments do |t|
      t.string :name
      t.integer :years_playing
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
