class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :song, counter_cache: true
  has_many :likeships, as: :likeable, foreign_key: "likeable_id", dependent: :destroy
  validates :user_id, :song_id, :content, presence: true
  validates :content, length: { maximum: 10000 }
end
