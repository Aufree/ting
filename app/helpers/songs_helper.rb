module SongsHelper
  require 'open-uri'
  require 'json'
  
  def get_xiami_info(object = {})
      begin
        url = "http://inmusic.sinaapp.com/xiami_api/" + object.s_id.to_s
        doc = JSON.parse(open(url).read)
      rescue JSON::ParserError
        object.title = ""
      else
        object.title = doc['title']
        object.artist = doc['singer']
        object.pic = doc['pic2x']
      end
  end
end