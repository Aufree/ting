class UserMailer < ActionMailer::Base
  default from: "freedomlijinfa@gmail.com"

  def reset_password_email(user)
    @user = user
    @url  = edit_password_reset_url(user.reset_password_token)
    mail(:to => user.email,
         :subject => "密码重置")
  end
end
