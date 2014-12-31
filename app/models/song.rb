class Song < ActiveRecord::Base
  include SongsHelper
  belongs_to :user
  has_many :comments, dependent: :delete_all
  has_many :likeships, as: :likeable, foreign_key: "likeable_id", dependent: :destroy
  validates :user_id, presence: true
  validates :content, presence: true, length: { maximum: 10000 }
  validates :title, :artist, presence: { message: :fetch }
  validates :s_id, presence: true, uniqueness: true, numericality: { greater_than: 0 }

  before_validation :set_xiami_info

  scope :hot_songs, -> { joins(:likeships).
                                       group('songs.id').
                                       order('count(likeships.id) desc').
                                       limit(10) }

  def set_xiami_info
      get_xiami_info(self)
  end

end