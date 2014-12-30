  class SongsController < ApplicationController
  before_action :require_login, only: [ :new, :create, :collect, :edit, :update, :destroy ]
  before_action :find_song, only: [ :edit, :update, :destroy ]

  def index
    @songs = Song.includes(:user).all.order("created_at desc").page params[:page]
    @hot_songs = Song.hot_songs
    @user_panel = true
  end

  def new
    @song = current_user.songs.build
  end

  def show
    @song = Song.includes(:comments).find(params[:id])
    @comments = @song.comments.includes(:user, :likeships).page(params[:page]).per(25)
  end

  def collect
    songs_id = current_user.likeships.where("likeable_type = ?", "Song").collect(&:likeable_id)
    songs = Song.find(songs_id).reverse!
    @user_panel = true
    if songs.empty?
      @recommend = true
      @songs = Song.hot_songs.page params[:page]
    else
      @songs = Kaminari.paginate_array(songs).page(params[:page])
    end
  end
  
  def create
   @song = current_user.songs.build(song_params)
    if @song.save
      flash.now[:success] = "#{t('.success')}"
      respond_to do |format|
        format.html { redirect_to root_path }
        format.js
      end
    else
      flash.now[:error] = "#{t('.faild')}"
      respond_to do |format|
        format.html { render 'new' }
        format.js
      end
    end
  end

  def edit
  end

  def update
    if @song.update_attributes params.require(:song).permit(:content)
      flash.now[:success] = "#{t('.successfully')}"
      respond_to do |format|
        format.html { redirect_to @song }
        format.js
      end
    else
      respond_to do |format|
        format.html { render 'edit' }
        format.js
      end
    end
  end

  def destroy
    @song = current_user.songs.find(params[:id])
    if @song.destroy
      flash[:success] = "#{t('.successfully')}"
      respond_to do |format|
        format.html { redirect_to root_path }
        format.js
      end
    end
  end

  private

  def song_params
    params.require(:song).permit(:s_id, :content)
  end

  def find_song
    @song = current_user.songs.find(params[:id])
    rescue ActiveRecord::RecordNotFound
    flash[:warning] = "#{t('permission_denied')}"
    redirect_to root_path
  end

end
