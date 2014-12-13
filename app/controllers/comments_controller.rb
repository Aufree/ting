class CommentsController < ApplicationController
before_action :require_login
before_action :find_song
  
  def create
    @comment = @song.comments.build(comment_params.merge(user: current_user))
    @comment.save
    @comments = @song.comments.all
    respond_to do |format|
      format.html { redirect_to @song }
      format.js 
    end
  end

  def destroy
    @comment = current_user.comments.find(params[:id])
    @comment.destroy
    respond_to do |format|
      format.html { redirect_to @song }
      format.js
    end
  end

  private
    def comment_params
      params.require(:comment).permit(:content)  
    end

    def find_song
      @song = Song.find(params[:song_id])
    end
end
