class Api::V1::PurchasesController < ApplicationController
  before_action :set_purchase, only: [:show, :update, :destroy]

  def index
    @purchases = Purchase.all

    render json: @purchases
  end

  def show
    render json: @purchase
  end

  def create
    @purchase = Purchase.new(purchase_params)

    if @purchase.save
      render json: @purchase, status: :created
    else
      render json: @purchase.errors, status: :unprocessable_entity
    end
  end

  def update
    if @purchase.update(purchase_params)
      render json: @purchase
    else
      render json: @purchase.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @purchase.destroy
  end

  private
    def set_purchase
      @purchase = Purchase.find(params[:id])
    end

    def purchase_params
      params.require(:purchase).permit(:title, :price, :description, :image)
    end
end
