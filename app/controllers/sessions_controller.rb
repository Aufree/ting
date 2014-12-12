class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    if @user = login(params[:session][:email], params[:session][:password])
      flash[:success] = "登录成功"
      respond_to do |format|
        format.html { redirect_back_or_to root_path }
        format.js
      end
    else
      flash.now[:error] = "邮箱或密码有误"
      respond_to do |format|
        format.html { render action: 'new' }
        format.js
      end
    end
  end

  def destroy
    logout
    redirect_to root_path
    flash[:success] = "退出成功"
  end

end