class SorceryCore < ActiveRecord::Migration
  def change
    create_table :users do |t|
    	t.string :name
      t.string :email,            :null => false
      t.string :crypted_password, :null => false
      t.string :salt,             :null => false
      t.string :avatar
      t.string :bio
      t.string :locale

      t.timestamps
    end

    add_index :users, :email, unique: true
  end
end