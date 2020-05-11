class PurchasesAdapter {
    constructor() {
        this.baseUrl = "http://localhost:3000/api/v1/purchases"
    }

    getPurchases() {
        return fetch(this.baseUrl).then(res => res.json())
    }

    createPurchase(titleValue, priceValue, descriptionValue, imageValue) {
        const purchase = {
            title: titleValue,
            price: priceValue,
            description: descriptionValue,
            image: imageValue
        }
        return fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ purchase }),
        }).then(res => res.json())
    }

    updatePurchase(newPurchaseTitle, newPurchasePrice, newPurchaseDescription, newPurchaseImage, id) {
        const purchase = {
            title: newPurchaseTitle,
            price: newPurchasePrice,
            description: newPurchaseDescription,
            image: newPurchaseImage
        }
        return fetch(`${this.baseUrl}/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ purchase }),
        }).then(res => res.json())
    }

    deletePurchase(id) {
        fetch(`${this.baseUrl}/${id}`, {
          method: "DELETE",
        })
        .then(response => response.json())
        .then(response => {return response})
    }

}