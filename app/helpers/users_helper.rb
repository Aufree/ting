module UsersHelper
  # Returns true if the given user is the current user.
  def current_user?(user)
    user == current_user
  end

  def require_login
    if !logged_in?
      redirect_to login_url
      flash[:warning] ="请先登录"
    end
  end
end
