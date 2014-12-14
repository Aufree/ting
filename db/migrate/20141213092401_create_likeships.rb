class CreateLikeships < ActiveRecord::Migration
    def change
    create_table :likeships do |t|
      t.integer :user_id
      t.integer :likeable_id
      t.string  :likeable_type

      t.timestamps
    end
    add_index :likeships, [:user_id, :likeable_id, :likeable_type], unique: true
  end
end