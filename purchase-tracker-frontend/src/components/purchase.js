class Purchase {
    constructor(purchaseJSON) {
        this.baseUrl = 'http://localhost:3000/api/v1/purchases'
        this.id = purchaseJSON.id
        this.title = purchaseJSON.title
        this.price = purchaseJSON.price
        this.description = purchaseJSON.description
        this.image = purchaseJSON.image
        this.comments = purchaseJSON.comments
    }

    renderCard() {
        const purchaseCard = `<div class='card' data-id='${this.id}'>
        <img class="selectable" src='${this.image}' height="100" width="100">
        <h2 class="selectable"> ${this.title} </h2>
        <h3 class="selectable"> $${this.price} </h3>
        <b class="selectable"> ${this.description} </b> <br></br>
        <button class="viewable" data-purchase-id=${this.id}> View More </button>
        <button class="removable" data-purchase-id=${this.id}> X </button>
        <br></br>
        </div>`
        return purchaseCard
    }
}