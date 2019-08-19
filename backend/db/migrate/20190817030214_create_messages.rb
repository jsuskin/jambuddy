class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.string :subject
      t.text :body
      t.integer :sender_id
      t.integer :receiver_id

      t.timestamps
    end
  end
end
