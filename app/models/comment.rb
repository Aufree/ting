class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :song, counter_cache: true
  has_many :likeships, as: :likeable, foreign_key: "likeable_id", dependent: :destroy
  has_many :notifications, as: 'subject', dependent: :delete_all
  validates :user_id, :song_id, :content, presence: true
  validates :content, length: { maximum: 10000 }
  after_create :get_at_users
  after_destroy :delete_all_notifications

  def delete_all_notifications
    notifications.delete_all
  end

  def send_notification_to_at_user(at_user)
    unless at_user == self.user 
      Notification.create(user: at_user,
                          subject: self,
                          name: 'mention')
    end
  end

  def send_notification_to_musician(at_user)
    musician = self.song.user
    unless musician == at_user || musician == self.user
      Notification.create(user: musician,
                          subject: self,
                          name: 'comment')   
    end
  end

  private

  def get_at_users
    at_users = []
    self.content.gsub /@(\w+)/ do |username|
      name = username.gsub('@', '')
      user = User.find_by_name(name)
      at_users << user if user.present?
    end

    at_users.each do |at_user| 
      self.send_notification_to_at_user(at_user)
      send_notification_to_musician(at_user)
    end

    if at_users.empty?
      send_notification_to_musician('')
    end
  end
end
