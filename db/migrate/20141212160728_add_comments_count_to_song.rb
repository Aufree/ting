class AddCommentsCountToSong < ActiveRecord::Migration
  def change
    add_column :songs, :comments_count, :integer, default: 0
  end
end
