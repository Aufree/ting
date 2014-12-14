require 'test_helper'

class NotificationTest < ActiveSupport::TestCase
  test "should decrease notification count" do 
    assert_difference "Notification.count", -1 do 
      notifications(:one).destroy
    end
  end
end