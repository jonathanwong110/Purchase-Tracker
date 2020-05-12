class PurchaseSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :price, :description, :image
  has_many :comments
end
