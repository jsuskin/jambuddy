class AddStatusToJamRequests < ActiveRecord::Migration[5.2]
  def change
    add_column :jam_requests, :status, :string, default: 'Pending'
  end
end
