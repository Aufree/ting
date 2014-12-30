class User < ActiveRecord::Base
  authenticates_with_sorcery!
  mount_uploader :avatar, AvatarUploader
  has_many :songs, dependent: :delete_all
  has_many :comments, dependent: :destroy
  has_many :likeships, foreign_key: "user_id", dependent: :destroy
  has_many :notifications, dependent: :delete_all
  VALID_EMAIL_REGEX =/\A[\w+\-.]+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
  VALID_NAME_REGEX = /\A[A-Za-z][A-Za-z0-9._-]{2,19}\z/
  validates :name, presence: true, 
                            length: { maximum: 50 }, 
                            format: { with: VALID_NAME_REGEX },
                            uniqueness: { case_sensitive: false }
  validates :email, presence: true,
                            format: { with: VALID_EMAIL_REGEX },
                            uniqueness: { case_sensitive: true }
  validates :password, presence: true, 
                                  confirmation: true,
                                  length: { in: 6..16 },
                                  on: :create
  validates :bio, length: { maximum: 140 }

  #Find user by name
  def to_param
    name
  end
  
  #Like
  def liking?(likeable)
    likeships.find_by(likeable)
  end

  def like!(type, id)
    likeships.create!(likeable_type: type, likeable_id: id)
  end  

  def unlike!(type, id)
    likeships.find_by(likeable_type: type, likeable_id: id).destroy
  end
end
