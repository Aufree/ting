module SongsHelper
  require 'open-uri'
  require 'json'

  def get_xiami_info(object = {})
      begin
        url = "http://xiamirun.avosapps.com/run?song=http://www.xiami.com/song/" + object.s_id.to_s
        doc = JSON.parse(open(url).read)
      rescue JSON::ParserError
        object.title = ""
      else
        object.title = doc['title']
        object.artist = doc['artist']
        object.pic = doc['cover']
      end
  end
end
