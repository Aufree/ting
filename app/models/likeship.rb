class Likeship < ActiveRecord::Base
  belongs_to :user
  belongs_to :likeable, polymorphic: true, touch: true
  validates :user_id, :likeable_id, :likeable_type, presence: true

  def self.likeable(like)
    likeable = { likeable_type: like.class.to_s, likeable_id: like.id }
  end

end