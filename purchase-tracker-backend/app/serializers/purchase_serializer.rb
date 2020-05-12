class PurchaseSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :title, :price, :description, :image
  has_many :comments
end
