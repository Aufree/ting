class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :song, counter_cache: true, touch: true
  has_many :likeships, as: :likeable, foreign_key: "likeable_id", dependent: :destroy
  has_many :notifications, as: 'subject', dependent: :delete_all
  validates :user_id, :song_id, :content, presence: true
  validates :content, length: { maximum: 10000 }
  after_create :get_at_users
  after_destroy :delete_all_notifications

  def delete_all_notifications
    notifications.delete_all
  end

  def send_notification_to_at_users(at_users)
    (Array.wrap(at_users) - [self.user]).each do |at_user|
      Notification.create(user: at_user, subject: self, name: 'mention')
    end
  end

  def send_notification_to_musician(at_users)
    musician = self.song.user
    comment_owner_id = self.user_id

    if (Array.wrap(at_users).map(&:id) | [comment_owner_id] & [musician.id]).blank?
      Notification.create(user: musician, subject: self, name: 'comment')
    end
  end

  private

  def get_at_users
    mentioned_names_ary = self.content.gsub(/@(\w+)/).each_with_object([]) do |name, ary|
      ary.push name.gsub('@', '')
    end

    at_users = User.where(name: mentioned_names_ary).load
    send_notification_to_at_users(at_users)
    send_notification_to_musician(at_users)
  end

end
