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

ActiveRecord::Schema.define(version: 2021_04_12_180634) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.bigint "acct_num", null: false
    t.bigint "routing_num", null: false
    t.string "acct_type", null: false
    t.integer "user_id", null: false
    t.boolean "external", null: false
    t.float "balance"
    t.float "interest_rate"
    t.integer "transfer_limit"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "nickname", default: "Nickname", null: false
    t.index ["acct_num"], name: "index_accounts_on_acct_num", unique: true
    t.index ["user_id"], name: "index_accounts_on_user_id"
  end

  create_table "transfers", force: :cascade do |t|
    t.integer "from_acct_id", null: false
    t.integer "to_acct_id", null: false
    t.float "amount", null: false
    t.string "memo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id", null: false
    t.index ["from_acct_id"], name: "index_transfers_on_from_acct_id"
    t.index ["to_acct_id"], name: "index_transfers_on_to_acct_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.string "fname", null: false
    t.string "lname", null: false
    t.string "email", null: false
    t.string "address"
    t.string "phone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["password_digest"], name: "index_users_on_password_digest"
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

end
