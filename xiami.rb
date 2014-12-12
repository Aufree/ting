require 'rubygems'
require  'nokogiri'
require 'open-uri'
require 'json'

# 网易
url = "http://music.163.com/api/song/detail/?ids=[686361]"
    headers = {        
            'Accept' => '*/*',
            'Accept-Encoding' => 'deflate,sdch',
            'Accept-Language' => 'zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
            'Connection' => 'keep-alive',
            'Content-Type' => 'application/x-www-form-urlencoded',
            'Host' => 'music.163.com',
            'Referer' => 'http://music.163.com/search/',
            'User-Agent' => 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_0 like Mac OS X; en-us) AppleWebKit/532.9 (KHTML, like Gecko) Version/4.0.5 Mobile/8A293 Safari/6531.22.7'
    }
doc = Nokogiri.HTML(open(url, headers))
doc = JSON(doc)['songs'][0]

# 中文歌曲名称出现乱码
puts doc['name']
