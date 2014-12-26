class SessionsController < ApplicationController
  def new
    @user = User.new
    render layout: "users_form"
  end

  def create
     if @user = login(params[:session][:email], params[:session][:password], params[:session][:remember])
      flash[:success] = "登录成功"
      respond_to do |format|
        format.html { redirect_back_or_to root_path }
        format.js
      end
    else
      user = User.find_by_email(params[:session][:email])
      if user && user.activation_state == "pending"
        flash.now[:warning] = "账号尚未通过验证"
        @inactivation = true
      else
        flash.now[:error] = "邮箱或密码有误"
      end
        respond_to do |format|
          format.html { render action: 'new' }
          format.js
        end
    end
  end

  def destroy
    logout
    redirect_to root_path
    flash[:success] = "成功退出"
  end

end