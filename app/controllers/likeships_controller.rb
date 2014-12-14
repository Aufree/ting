class LikeshipsController < ApplicationController
  before_action :require_login, :find_likeable
  
  include LikeshipsHelper
  def create
    current_user.like!(params[:likeable_type], params[:likeable_id])
    respond_to do |format|
      format.html { redirect_to correct_path }
      format.js
    end
  end

  def destroy
    current_user.unlike!(params[:likeable_type], params[:likeable_id])
    respond_to do |format|
      format.html { redirect_to correct_path }
      format.js
    end
  end
 
  private
    def find_likeable
      @likeable = Likeship.likeable(Kernel.const_get(params[:likeable_type]).find(params[:likeable_id])) 
    end

end