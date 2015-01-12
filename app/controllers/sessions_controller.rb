class SessionsController < ApplicationController
before_action :not_login_user, only: [ :new ]

  def new
    @user = User.new
    render layout: "users_form"
  end

  def create
     if @user = login(params[:session][:email], params[:session][:password], params[:session][:remember])
      flash[:success] = "#{t('.successfully')}"
      respond_to do |format|
        format.html { redirect_back_or_to root_path }
        format.js
      end
    else
      user = User.find_by_email(params[:session][:email])
      if user && user.activation_state == "pending"
        flash.now[:warning] = "sessions.new.inactivation"
        @inactivation = true
      else
        flash.now[:error] = "#{t('sessions.new.invalid_email_password_combination')}"
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
    flash[:success] = "#{t('.successfully')}"
  end

  private

    def not_login_user
    if logged_in?
      redirect_to root_path
      flash[:warning] = "#{t('users.has_already_logged_in')}"
    end
  end

end