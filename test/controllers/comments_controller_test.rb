require 'test_helper'

class CommentsControllerTest < ActionController::TestCase
  def setup
    @comment = comments(:one)
    @other_comment = comments(:two)
    songs(:one)
  end

  test "should be valid" do 
    assert @comment.valid?
  end

  test "should redierct create when not logged in" do 
    assert_no_difference "Comment.count" do
      post :create, comment: @comment.attributes, song_id: @comment.song_id
    end
    assert_redirected_to login_url
  end

  test "should redierct destroy when not logged in" do 
    assert_no_difference "Comment.count" do
      delete :destroy, id: @comment, song_id: @comment.song_id
    end
    assert_redirected_to login_url
  end

  test "should redirect destroy for wrong comment" do
    login_user(users(:paul))
        assert_no_difference 'Comment.count' do
          assert_raise(ActiveRecord::RecordNotFound) do
            delete :destroy, id: @other_comment, song_id: @comment.song_id
          end
       end
  end

  test "should redirect destroy when comment successfully destroyed" do
    login_user(@comment.user)
        assert_difference 'Comment.count', -1 do
          delete :destroy, id: @comment, song_id: @comment.song_id
       end
       assert_redirected_to @comment.song
  end
end
