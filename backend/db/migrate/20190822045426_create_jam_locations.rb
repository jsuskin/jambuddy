class CreateJamLocations < ActiveRecord::Migration[5.2]
  def change
    create_table :jam_locations do |t|
      t.integer :street_number
      t.string :street_name
      t.string :city
      t.string :state
      t.integer :zip_code
      t.references :jam_request, foreign_key: true

      t.timestamps
    end
  end
end
