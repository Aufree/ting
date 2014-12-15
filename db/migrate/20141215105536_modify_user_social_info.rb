class ModifyUserSocialInfo < ActiveRecord::Migration
  def change
    rename_column :users, :weibo, :douban
    remove_column :users, :weixin
  end
end
