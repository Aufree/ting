require 'test_helper'

class CommentTest < ActiveSupport::TestCase
  def setup
    @comment = comments(:one)
  end

  test "should be valid" do 
    assert @comment.valid?
  end

  test "user id should be present" do 
    @comment.user_id = nil
    assert_not @comment.valid?
  end

  test "song id should be present" do 
    @comment.song_id = nil
    assert_not @comment.valid?
  end

  test "content should be present" do
    @comment.content = " "
    assert_not @comment.valid?
  end
end
