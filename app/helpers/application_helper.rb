module ApplicationHelper
  def parse_text(text)
    text = text.gsub /@(\w+)/ do |username|
      name = username.gsub('@', '')
      link_to(username, user_path(name))
   end
    sanitize text.gsub(/\n/, '<br/>'), tags: %w{ br a }, attributes: %w{ href }
  end
end