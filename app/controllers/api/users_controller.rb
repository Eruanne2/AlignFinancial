class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.find_by(id: params[:id])
    render :show
  end

  def update
    @user = User.find_by(id: params[:id])
    if @user
      if @user.update_attributes(user_params)
        render :show
      else
        render json: @user.errors.full_messages, status: 422
      end
    else
      render json: ["Uh-oh! Something went wrong..."], status: 422
    end
  end

  def user_params
    params.require(:userData).permit(:username, :password, :fname, :lname, :email, :address, :phone)
  end
end