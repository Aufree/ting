class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    if @user = login(params[:session][:email], params[:session][:password])
      redirect_back_or_to root_path
      flash[:success] = "成功登录"
    else
      flash[:error] = "邮箱或密码有误"
      render action: 'new'
    end
  end

  def destroy
    logout
    redirect_to root_path
    flash[:success] = "成功退出"
  end

end