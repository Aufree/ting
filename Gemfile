source 'https://ruby.taobao.org'


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# Use CoffeeScript for .js.coffee assets and views
gem 'coffee-rails', '~> 4.0.1'

# Compass
gem 'sass-rails', '~> 4.0.5'
gem 'compass-rails'

# Use jquery as the JavaScript library
gem 'jquery-rails'

# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'

# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

# Font-awesome
gem "font-awesome-rails"

  # Upload avatar
  gem 'carrierwave'
  gem 'mini_magick'
  gem 'remotipart'

  # Pagination
  gem 'kaminari'

  # Parse XML data
 gem 'nokogiri'

 # Authentication
 gem 'sorcery', '0.9.0'

 # Slim
 gem 'slim'

 # Memcached
 gem 'dalli'

 # i18n
 gem 'rails-i18n'

group :production do
  gem 'pg', '0.15.1'
  gem 'rails_12factor', '0.0.2'
end

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'
  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0.0.beta4'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
end


group :development do
  gem 'sqlite3'
  gem "better_errors"
  gem 'binding_of_caller'
  gem 'meta_request'
  gem 'traceroute'
end

group :test do
  gem 'minitest-reporters', '1.0.5'
  gem 'guard-minitest',     '2.3.1'
end

# require: false so bcrypt is loaded only when has_secure_password is used.
# This is to avoid ActiveModel (and by extension the entire framework)
# being dependent on a binary library.
gem 'bcrypt', require: false

