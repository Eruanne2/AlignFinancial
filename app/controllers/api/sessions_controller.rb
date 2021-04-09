class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(params[:user_creds][:username], params[:user_creds][:password])
    if @user
      login!(@user)
      render 'api/users/show'
    else
      render json: ["The username and password you entered isn't valid. Try again."], status: 401
    end
  end

  def destroy
    if logged_in?
      logout
      render json: { message: "Log out successful."}
    else 
      render json: { message: "There is no user logged in."}
    end
  end
end