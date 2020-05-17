class Api::V1::CommentsController < ApplicationController
  before_action :set_comment, only: [:show, :update, :destroy]

  def index
    @comments = Comment.all

    render json: @comments, status: 200
  end

  def show
    render json: @comment, status: 200
  end

  def create
    @comment = Comment.new(comment_params)
    @purchase = Purchase.find(@comment.purchase_id)
    if @comment.save
      @purchase.comments << @comment
      render json: @comment, status: 200
    end
  end

  def update
    if @comment.update(comment_params)
      render json: @comment, status: 200
    end
  end

  def destroy
    @comment.destroy
    render json: {commentId: @comment.id}
  end

  private
    def set_comment
      @comment = Comment.find(params[:id])
    end

    def comment_params
      params.require(:comment).permit(:content, :purchase_id)
    end
end
