class PurchasesAdapter {
    constructor() {
        this.baseUrl = "http://localhost:3000/api/v1/purchases"
    }

    getPurchases() {
        return fetch(this.baseUrl).then(res => res.json())
    }

}