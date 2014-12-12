class UsersController < ApplicationController
before_action :require_login, only: [ :edit, :update, :destroy ]
before_action :find_correct_user, only: [ :edit, :update ]
before_action :not_login_user, only: [ :new, :create ]

  def show
    @user = User.find_by_name(params[:id])
  end

  def new
  	@user = User.new
  end

  def create
  	@user = User.new(user_params)
  	if @user.save
  	  flash[:success] = "Successfully create account!"
  	  redirect_to root_path
  	else
  	  render 'new'
  	end
  end

  def edit
  end

  def update
    if @user.update_attributes(update_user_params)
      flash[:success] = "保存成功"
      respond_to do |format|
        format.html { redirect_to root_path }
        format.js
      end
    else
      flash.now[:error] = "保存失败"
      respond_to do |format|
        format.html { render 'edit' }
        format.js
      end
    end
  end

  private

  def find_correct_user
    @user = User.find_by_name(params[:id])
    unless current_user?(@user)
      flash[:warning] = "无权访问"
      redirect_to root_path
    end
  end

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)   
  end

  def update_user_params
    params.require(:user).permit(:bio, :avatar, :password, :password_confirmation)
  end

  def not_login_user
    if logged_in?
      redirect_to root_path
      flash[:warning] = "你已经登录"
    end
  end
end
