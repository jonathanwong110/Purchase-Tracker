class Api::V1::PurchasesController < ApplicationController
  before_action :set_purchase, only: [:show, :update, :destroy]

  def index
    @purchases = Purchase.all

    render json: @purchases, status: 200
  end

  def show
    render json: @purchase, status: 200
  end

  def create
    @purchase = Purchase.new(purchase_params)

    if @purchase.save
      render json: @purchase, status: 200
    end
  end

  def update
    if @purchase.update(purchase_params)
      render json: @purchase, status: 200
    end
  end

  def destroy
    @purchase.destroy
    render json: {purchaseId: @purchase.id}
  end

  private
    def set_purchase
      @purchase = Purchase.find(params[:id])
    end

    def purchase_params
      params.require(:purchase).permit(:title, :price, :description, :image)
    end
end
