class Api::TransfersController < ApplicationController
  before_action :require_logged_in

  def index
    @transfers = Transfer.all
    render :index
  end

  def create
    @transfer = Transfer.new(transfer_params)
    @transfer.user_id = current_user.id
    if @transfer.save
      render :show
    else
      render json: @transfer.errors.full_messages, status: 422
    end
  end

  def show
    @transfer = Transfer.find_by(id: params[:id])
    if @transfer
      render :show
    else
      render json: { message: "No transfer exists with that id."}, status: 422
    end
  end

  def transfer_params
    params.require(:transfer).permit(:from_acct_id, :to_acct_id, :amount, :memo)
  end
end