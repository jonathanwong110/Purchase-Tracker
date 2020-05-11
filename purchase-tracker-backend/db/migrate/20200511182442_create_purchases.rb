class CreatePurchases < ActiveRecord::Migration[6.0]
  def change
    create_table :purchases do |t|
      t.string :title
      t.integer :price
      t.string :description
      t.string :image

      t.timestamps
    end
  end
end
