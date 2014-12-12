module ApplicationHelper
  def parse_text(text)
    sanitize text.gsub(/\n/, '<br/>'), tags: ["br"]
  end
end
