class Song < ActiveRecord::Base
  include SongsHelper
  belongs_to :user
  has_many :comments, dependent: :delete_all
  has_many :likeships, as: :likeable, foreign_key: "likeable_id", dependent: :destroy
  validates :user_id, presence: true
  validates :content, presence: true, length: { maximum: 10000 }
  validates :title, :artist, presence: { message: "未被抓取" }
  validates :s_id, presence: true, uniqueness: true, numericality: { greater_than: 0 }

  #测试出错的位置 uniqueness 拿掉就行
  # validates :user_id, uniqueness: { scope: :s_id }

  before_validation :set_xiami_info

  def set_xiami_info
      get_xiami_info(self)
  end
end