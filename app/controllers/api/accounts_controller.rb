class Api::AccountsController < ApplicationController
  before_action :require_logged_in
  
  def index
    @accounts = Account.where(user_id: current_user.id)
    render :index
  end

  def create
    @account = Account.new(account_params)
    @account.user_id = current_user.id
    if @account.save
      render :show
    else
      render json: @account.errors.full_messages, status: 422
    end
  end

  def show
    @account = Account.find_by(id: params[:id])
    if @account
      render :show
    else
      render json: { message: "No account exists with that id."}, status: 422
    end
  end

  def update
    @account = Account.find_by(id: params[:id])
    if @account
      if @account.update_attributes(account_params)
        render :show
      else
        render json: @account.errors.full_messages, status: 422
      end
    else
      render json:  { message: "No account exists with that id."}, status: 422
    end
  end

  def destroy
    @account = Account.find_by(id: params[:id])
    if @account.balance === 0
      @account.destroy
      render :show
    else
      render json: ["An account must be at a zero balance to be closed."], status: 422
    end
  end

  def account_params
    params.require(:acct_data).permit(:nickname, :acct_num, :routing_num, :acct_type, :external, :balance, :interest_rate, :transfer_limit)
  end
end