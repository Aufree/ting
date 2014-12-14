require 'test_helper'

class LikeshipTest < ActiveSupport::TestCase
  def setup
    @user = users(:paul)
    @like_song = @user.likeships.new(likeable_type: "Song", likeable_id: 1)
    @like_comment = @user.likeships.new(likeable_type: "Comment", likeable_id: 2)
  end

  test "should be valid" do 
    assert @like_song.valid?
    assert @like_comment.valid?
  end

  test "user id should be present" do 
    @like_song.user_id = nil
    assert_not @like_song.valid?
  end

  test "likeable type should be present" do 
    @like_song.likeable_type = nil
    assert_not @like_song.valid?
  end

  test "likeable id should be present" do 
    @like_song.likeable_id = nil
    assert_not @like_song.valid?
  end
end
