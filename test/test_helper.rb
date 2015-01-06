ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require  'minitest/reporters'
Minitest::Reporters.use!
include Sorcery::TestHelpers::Rails::Controller

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

   def like!(likeship)
     post :create, 
     likeable_type: likeship.likeable_type,
     likeable_id: likeship.id
   end

   def unlike!(likeship)
      delete :destroy, 
      likeable_type: likeship.likeable_type, 
      likeable_id: likeship.id
   end
end
