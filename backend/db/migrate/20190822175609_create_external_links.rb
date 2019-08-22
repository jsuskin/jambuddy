class CreateExternalLinks < ActiveRecord::Migration[5.2]
  def change
    create_table :external_links do |t|
      t.string :url
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
