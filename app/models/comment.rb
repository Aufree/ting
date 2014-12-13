class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :song, counter_cache: true
  validates :user_id, :song_id, :content, presence: true
  validates :content, length: { maximum: 10000 }
end
