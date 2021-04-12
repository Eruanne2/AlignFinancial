class Api::TransfersController < ApplicationController
  before_action :require_logged_in
  
  def index
    @transfers = Transfer.all
    render :index
  end
  
  def show
    @transfer = Transfer.find_by(id: params[:id])
    if @transfer
      render :show
    else
      render json: { message: "No transfer exists with that id."}, status: 422
    end
  end

  def create
    @from_acct = Account.find_by(id: params[:transfer_data][:from_acct_id])
    @to_acct = Account.find_by(id: params[:transfer_data][:to_acct_id])

    @transfer = Transfer.new(transfer_params)
    @transfer.user_id = current_user.id

    if !@from_acct
      render json: ["Invalid 'from' account."], status: 422
      return
    elsif @from_acct.balance < @transfer.amount
      render json: ["'From' account does not have the available funds to make this transfer."], status: 401
      return
    end

    if !@to_acct
      render json: ["Invalid 'to' account."], status: 422
      return
    end
    
    if @transfer.save
      if @from_acct.update_attributes({ balance: @from_acct.balance - @transfer.amount})
        if @to_acct.update_attributes({ balance: @to_acct.balance + @transfer.amount})
          render json: { message: 'Successful transfer'}
        else
          raise ActiveRecord::Rollback  # roll back @from_acct balance update
          raise ActiveRecord::Rollback  # roll back transfer creation
          render json: [`Transfer could not go through due to 'from' account error`], status: 422
        end
      else
        raise ActiveRecord::Rollback  # roll back transfer creation
        render json: [`Transfer could not go through due to 'to' account error`], status: 422
      end
    else
      render json: @transfer.errors.full_messages, status: 422
    end
  end

  def transfer_params
    params.require(:transfer_data).permit(:from_acct_id, :to_acct_id, :amount, :memo)
  end
end