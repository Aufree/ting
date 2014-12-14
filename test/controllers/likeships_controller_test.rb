require 'test_helper'

class LikeshipsControllerTest < ActionController::TestCase
  def setup
    @song = songs(:one)
    @paul_likeship = likeships(:one)
    @paul_likeship.id = @song.id
    @foo_likeship = likeships(:two)
  end

  test "should redirect create when not logged in" do 
    assert_no_difference 'Likeship.count' do
      post :create, likeship: @paul_likeship.attributes
    end
    assert_redirected_to login_url
  end

  test "should redirect destroy when not logged in" do
    assert_no_difference "Likeship.count" do
      unlike!(@paul_likeship)
    end
    assert_redirected_to login_url
  end

  test "should create when user logged in" do
      login_user(users(:paul))
      assert_difference "Likeship.count", +1 do
        like!(@paul_likeship)
      end
  end
end
