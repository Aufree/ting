module UsersHelper
  # Returns true if the given user is the current user.
  def current_user?(user)
    user == current_user
  end
end
