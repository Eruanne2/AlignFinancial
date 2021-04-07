class Api::AccountsController < ApplicationController
  before_action :require_logged_in
  
  def index
    @accounts = Account.where(user_id: current_user.id)
    render :index
  end

  def create
    @account = Account.new(accounts_params)
    if @account.save
      render :show
    else
      render json: @account.errors.full_messages, status: 422
    end
  end

  def show
    @account = Account.find_by(id: params[:id])
    render :show
  end

  def destroy
    @account = Account.find_by(id: params[:id])
    @account.destroy
    redirect_to api_accounts_url
  end

  def accounts_params
    params.require(:account).permit(:act_num, :routing_num, :acct_type, :user_id, :external, :balance, :interest_rate, :transfer_limit)
  end
end