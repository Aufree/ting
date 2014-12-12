require 'test_helper'

class UsersControllerTest < ActionController::TestCase

  def setup
      @user = users(:paul)
      @other_user = users(:foo)
  end

  test "new" do
    get :new
    assert_response :success
  end

  test "should redirect edit when not logined in" do
    get :edit, id: @user
    assert_not flash.empty?
    assert_redirected_to login_url
  end

  test "should redirect update when not logined in" do
    patch :update, id: @user, user: { name: @user.name, email: @user.email, bio: @user.bio }
    assert_not flash.empty?
    assert_redirected_to login_url
  end

  test "should redirect edit when user successfully update profile" do
    login_user(@user)
    patch :update, id: @user, user: { name: @user.name, email: @user.email, bio: @user.bio }
    assert_not flash.empty?
    assert_redirected_to root_url
  end

  test "should redirect new when user already logined in" do
    login_user(@user)
    get :new
    assert_not flash.empty?
    assert_redirected_to root_url
  end

  test 'should redirect edit when user logined in as wrong user' do
    login_user(@other_user)
    get :edit, id: @user
    assert_not flash.empty?
    assert_redirected_to root_url
  end

  test "should redirect update when user logined in as wrong user" do
    login_user(@other_user)
    patch :update, id: @user, user: { name: @user.name, email: @user.email, bio: @user.bio }
    assert_not flash.empty?
    assert_redirected_to root_url
  end

end
