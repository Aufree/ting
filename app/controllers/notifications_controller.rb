class NotificationsController < ApplicationController
  before_action :require_login

  def index
    @notifications = current_user.notifications
                                                   .order(id: :desc)
                                                   .page(params[:page])
                                                   .per(25)

   @notifications.unread.update_all(read: true, updated_at: Time.now.utc)
   @user_panel = true
  end

  def destroy
    @notification = current_user.notifications.find params[:id]
    @notification.destroy
  end

  def clear
    @notifications = current_user.notifications
    current_user.notifications.delete_all
    respond_to do |format|
      format.html { redirect_to notifications_path }
      format.js 
    end
  end

  def count
    render text: current_user.notifications.unread.count
  end

end