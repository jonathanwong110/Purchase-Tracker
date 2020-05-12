class PurchaseSerializer < ActiveModel::Serializer
  attributes :id, :title, :price, :description, :image
  has_many :comments
end
