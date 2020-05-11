class Purchase < ApplicationRecord
    has_many :comments
    validates_presence_of :title, :price, :description, :image
end
