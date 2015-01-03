require 'test_helper'

class SongTest < ActiveSupport::TestCase
  def setup
    @user = users(:paul)
    @song = @user.songs.build(s_id: 3,
                                                 title: "梦的列车",
                                                 artist: "Alex",
                                                 pic: "http://img.xiami.net/images/album/img1/1/11383201444.jpg",
                                                 content: "Good music")
  end

  test "shuold be valid" do 
    assert @song.valid?
  end

  test "s_id should not be blank" do 
    assert_raise(OpenURI::HTTPError) do
      @song.s_id = " "
      assert_not @song.valid?
    end
  end

  test "content should not be blank" do 
    @song.content = " "
    assert_not @song.valid?
  end

  test "s_id should greater than 0" do 
    @song.s_id = 0
    assert_not @song.valid?
  end

  test "content should have maximum length" do 
    @song.content = "a" * 10001
    assert_not @song.valid?
  end
  
  test "associated comments should be destroyed" do 
    comment = comments(:one)
    assert_difference 'Comment.count', -1 do
      comment.song.destroy
    end
  end
end