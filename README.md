#Ting

Ting is a music social networking project written in Ruby on Rails and Semantic-UI.

You can check out the demo at [this link](https://tinger.herokuapp.com).

##Requirements

Ruby 2.0.0 +    
Memcached 1.4 +    
ImageMagick 6.8 +    


##Installation

    $ git clone git://github.com/Aufree/ting.git
    $ cd ting

###Linux(Ubuntu)

    $ sudo apt-get update
    $ sudo apt-get install memcached imagemagick

###Mac OS

    $ brew install memcached && brew install imagemagick

##Run

    $ bundle install
    $ rake db:migrate
    # ensure that memcached has started up
    $ rails s

##Testing

    $ rake test

##License

---------------

Copyright (c) 2014 Paul King

Released under the MIT license:

* [www.opensource.org/licenses/MIT](http://www.opensource.org/licenses/MIT)