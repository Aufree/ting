# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20141208045147) do

  create_table "songs", force: true do |t|
    t.integer  "s_id"
    t.string   "title"
    t.string   "artist"
    t.string   "pic"
    t.text     "content"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "songs", ["user_id", "created_at"], name: "index_songs_on_user_id_and_created_at"

  create_table "users", force: true do |t|
    t.string   "name"
    t.string   "email",                           null: false
    t.string   "crypted_password",                null: false
    t.string   "salt",                            null: false
    t.string   "avatar"
    t.string   "bio"
    t.string   "weibo"
    t.string   "weixin"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "remember_me_token"
    t.datetime "remember_me_token_expires_at"
    t.string   "reset_password_token"
    t.datetime "reset_password_token_expires_at"
    t.datetime "reset_password_email_sent_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["remember_me_token"], name: "index_users_on_remember_me_token"
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token"

end
