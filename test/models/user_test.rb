require 'test_helper'

class UserTest < ActiveSupport::TestCase
  
  def setup
    @user = User.new(name: "Aufree", email: "user@example.com",
                                 password: "foobar", password_confirmation: "foobar")
  end
  
  test "should be valid" do
    assert @user.valid?
  end
  
  test "name should be present" do
    @user.name = "     "
    assert_not @user.valid?
  end
  
  test "email should be present" do
    @user.email = "     "
    assert_not @user.valid?
  end
  
  test "name should not be too long" do
    @user.name = "a" * 51
    assert_not @user.valid?
  end
  
  test "bio should not be too long" do
    @user.bio = "a" * 141
    assert_not @user.valid?
  end

  test "name validation should accept valid format" do
    invalid_names = %w["au free", "张三"]
    invalid_names.each do |invalid_name|
      @user.name = invalid_name
      assert_not @user.valid?
    end
  end
  
  test "email validation should accept valid addresses" do
    valid_addresses = %w[user@example.com USER@foo.COM A_US-ER@foo.bar.org
                         first.last@foo.jp alice+bob@baz.cn]
    valid_addresses.each do |valid_address|
      @user.email = valid_address
      assert @user.valid?, "#{valid_address.inspect} should be valid"
    end
  end
  
  test "email validation should reject invalid addresses" do
    invalid_addresses = %w[user@example,com user_at_foo.org user.name@example.
                           foo@bar_baz.com foo@bar+baz.com]
    invalid_addresses.each do |invalid_address|
      @user.email = invalid_address
      assert_not @user.valid?, "#{invalid_address.inspect} should be invalid"
    end
  end
  
  test "user name should be unique" do
    duplicate_user = @user.dup
    duplicate_user.name = @user.name.upcase
    @user.save
    assert_not duplicate_user.valid?
  end
  
  test "email address should be unique" do
    duplicate_user = @user.dup
    duplicate_user.email = @user.email.upcase
    @user.save
    assert_not duplicate_user.valid?
  end
  
  test "password should have a minimum length" do
    @user.password = @user.password_confirmation = "a" * 5
    assert_not @user.valid?
  end
  
  test "password should have a maximum length" do
    @user.password = @user.password_confirmation = "a" * 17
    assert_not @user.valid?
  end

  test "bio should have a maximum length" do
    @user.bio = "a" * 141
    assert_not @user.valid?
  end
  
  # test "associated songs should be destroyed" do 
  #   @user.save
  #   @user.songs.create!(s_id: 100, title: "lorem ipsum", artist: "k", content: "cool")
  #   assert_difference 'Song.count', -1 do
  #     @user.destroy
  #   end
  # end
  
  test "associated comments should be destroyed" do 
    comment = comments(:one)
    assert_difference 'Comment.count', -1 do
      comment.user.destroy
    end
  end
  
end
