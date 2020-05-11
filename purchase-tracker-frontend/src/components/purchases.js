class Purchases {
    constructor() {
        this.purchases = []
        this.adapter = new PurchasesAdapter()
        this.initiBindingsAndEventListeners()
        this.fetchAndLoadPurchases()
    }

    initiBindingsAndEventListeners() {
        this.purchasesContainer = document.getElementById('purchases-container')
        this.newPurchaseTitle = document.getElementById('new-purchase-title')
        this.newPurchasePrice = document.getElementById('new-purchase-price')
        this.newPurchaseDescription = document.getElementById('new-purchase-description')
        this.newPurchaseImage = document.getElementById('new-purchase-image')
        this.purchaseForm = document.getElementById('new-purchase-form')
    }

    fetchAndLoadPurchases() {
        this.adapter.getPurchases().then(purchases => {
            console.log(purchases)
        })
    }

}