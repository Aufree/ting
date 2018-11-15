# Ting

[![Build Status](https://travis-ci.org/Aufree/ting.svg?branch=master)](https://travis-ci.org/Aufree/ting)

Ting is a music social networking project written in Ruby on Rails and Semantic-UI.

You can check out the demo at [this link](http://tinger.herokuapp.com).

**You can ping me on [Twitter](https://twitter.com/_Paul_King_) or follow me on [Weibo](http://weibo.com/jinfali).**

## Screen Shots

![](http://ww1.sinaimg.cn/large/76dc7f1bgw1ent5zzgeyvj21kw11416d.jpg)

![](http://ww1.sinaimg.cn/large/76dc7f1bgw1ent5xvakuyj21kw114qce.jpg)

![](http://ww4.sinaimg.cn/large/76dc7f1bgw1ent5z2xqrnj21kw114n2c.jpg)

![](http://ww4.sinaimg.cn/large/76dc7f1bgw1ent60hhp39j21kw11443g.jpg)

![](http://ww1.sinaimg.cn/large/76dc7f1bgw1ent60ssvxgj21kw1147aa.jpg)

## Requirements

Ruby 2.0.0 +    
Memcached 1.4 +    
ImageMagick 6.8 +    


## Installation

    $ git clone git://github.com/Aufree/ting.git
    $ cd ting

### Linux(Ubuntu)

    $ sudo apt-get update
    $ sudo apt-get install memcached imagemagick

### Mac OS

    $ brew install memcached && brew install imagemagick

## Run

    $ bundle install
    $ rake db:migrate
    # ensure that memcached has started up
    $ rails s

## Testing

    $ rake test

## License

Copyright (c) 2015 Paul King

---------------

Released under the MIT license:

* [www.opensource.org/licenses/MIT](http://www.opensource.org/licenses/MIT)
