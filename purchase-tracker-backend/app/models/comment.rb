class Comment < ApplicationRecord
    belongs_to :purchase
    validates_presence_of :content
end
