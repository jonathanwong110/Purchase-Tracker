class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :purchase_id
  belongs_to :purchase
end
