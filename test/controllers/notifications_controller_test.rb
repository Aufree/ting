require 'test_helper'

class NotificationsControllerTest < ActionController::TestCase
  test "should redirect index when not logged in" do 
    get :index
    assert_redirected_to login_url
  end

  test "should update attribute after current user get index" do 
    login_user(users(:paul))
    get :index
    assert_response :success
    assert_equal true, notifications(:one).read
  end

  test "should redirect destroy for wrong user" do 
    login_user(users(:paul))
    assert_raise(ActiveRecord::RecordNotFound) do
      xhr :delete, :destroy, id: notifications(:two)
    end
  end

  test "should destroy for correct user" do 
    login_user(users(:paul))
    assert_difference "Notification.count", -1 do
      xhr :delete, :destroy, id: notifications(:one)
    end
  end

  test "should destroy all notifications" do
    user = users(:paul)
    login_user(user)
    xhr :delete, :clear
    assert_equal 0, user.notifications.count
  end
end
