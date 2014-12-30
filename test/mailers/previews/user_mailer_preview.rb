# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
  # def reset_password_email
  #   @user = User.first
  #   UserMailer.reset_password_email(@user)
  # end

  # http://localhost:3000/rails/mailers/user_mailer/activation_needed_email
  def activation_needed_email
    @user = User.first
    UserMailer.activation_needed_email(@user)
  end

  # http://localhost:3000/rails/mailers/user_mailer/activation_success_email
  def activation_success_email
    @user = User.first
    UserMailer.activation_success_email(@user)
  end

  def reset_password_email
    @user = User.first
    UserMailer.reset_password_email(@user)
  end
end