class Purchases {
    constructor() {
        this.purchases = []
        this.adapter = new PurchasesAdapter()
        this.fetchAndLoadPurchases()
    }

    fetchAndLoadPurchases() {
        this.adapter.getPurchases().then(purchases => {
            console.log(purchases)
        })
    }

}