class RemoveAcceptedFromJamRequests < ActiveRecord::Migration[5.2]
  def change
    remove_column :jam_requests, :accepted, :boolean
  end
end
