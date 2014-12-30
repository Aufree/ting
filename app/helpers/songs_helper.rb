module SongsHelper
  require 'nokogiri'
  require 'open-uri'
  
  def get_xiami_info(object = {})
      url = "http://www.xiami.com/song/playlist/id/" + object.s_id.to_s

      # Fetch xiami info
      doc = Nokogiri::XML(open(url, 'User-Agent' => 'ruby'))
      object.title = doc.search("title").text.to_s
      object.artist = doc.search("playlist trackList artist").text.to_s
      object.pic = doc.search("playlist trackList album_pic").text.to_s
      if object.artist.empty?
        object.title = ""
        errors[:base] << "#{I18n.t('songs.cant_fetch')}"
      end
  end
end