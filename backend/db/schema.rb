# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_08_22_175609) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "external_links", force: :cascade do |t|
    t.string "url"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_external_links_on_user_id"
  end

  create_table "jam_locations", force: :cascade do |t|
    t.integer "street_number"
    t.string "street_name"
    t.string "city"
    t.string "state"
    t.integer "zip_code"
    t.bigint "jam_request_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["jam_request_id"], name: "index_jam_locations_on_jam_request_id"
  end

  create_table "jam_requests", force: :cascade do |t|
    t.string "weekday"
    t.string "month"
    t.integer "day"
    t.integer "year"
    t.string "start_time"
    t.string "end_time"
    t.integer "sender_id"
    t.integer "receiver_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "status", default: "Pending"
  end

  create_table "messages", force: :cascade do |t|
    t.string "subject"
    t.text "body"
    t.integer "sender_id"
    t.integer "receiver_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_availabilities", force: :cascade do |t|
    t.string "day_of_week"
    t.string "start_time"
    t.string "end_time"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_user_availabilities_on_user_id"
  end

  create_table "user_instruments", force: :cascade do |t|
    t.string "name"
    t.integer "years_playing"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_user_instruments_on_user_id"
  end

  create_table "user_locations", force: :cascade do |t|
    t.float "latitude"
    t.float "longitude"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_user_locations_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image"
    t.text "bio"
  end

  add_foreign_key "external_links", "users"
  add_foreign_key "jam_locations", "jam_requests"
  add_foreign_key "user_availabilities", "users"
  add_foreign_key "user_instruments", "users"
  add_foreign_key "user_locations", "users"
end
