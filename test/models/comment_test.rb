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

  test 'should notify at_users' do
    count = Notification.count
    user = users(:foo)
    @comment.content = "@#{@comment.song.user.name}"
    @comment.user = user
    @comment.dup.save!
    assert_equal count + 1, Notification.count
  end

  test 'should notify musician' do
    count = Notification.count
    user = users(:foo)
    @comment.user = user
    @comment.dup.save!
    assert_equal count + 1, Notification.count
  end

  test 'should not notify musician' do
    count = Notification.count
    @comment.dup.save!
    assert_equal count, Notification.count
  end
end
