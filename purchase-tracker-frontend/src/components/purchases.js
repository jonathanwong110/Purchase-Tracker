class Purchases {
    constructor() {
        this.purchases = []
        this.adapter = new PurchasesAdapter()
        this.initiBindingsAndEventListeners()
        this.fetchAndLoadPurchases()
    }

    initiBindingsAndEventListeners() {
        this.purchasesContainer = document.getElementById('purchases-container')
        this.body = document.querySelector('body')
        this.purchaseSingleDisplay = document.getElementById('purchase-single-display')
        this.newPurchaseTitle = document.getElementById('new-purchase-title')
        this.newPurchasePrice = document.getElementById('new-purchase-price')
        this.newPurchaseDescription = document.getElementById('new-purchase-description')
        this.newPurchaseImage = document.getElementById('new-purchase-image')
        this.purchaseForm = document.getElementById('new-purchase-form')
        this.purchaseForm = document.getElementById('new-purchase-form')
        this.purchaseForm.addEventListener('submit', this.createPurchase.bind(this))
        this.purchasesContainer.addEventListener('dblclick', this.handlePurchaseClick.bind(this))
        this.body.addEventListener('blur', this.updatePurchase.bind(this), true)
        this.purchasesContainer.addEventListener('click', this.deletePurchase.bind(this), true)
        this.purchasesContainer.addEventListener('click', this.showPurchase.bind(this), true)
        this.purchaseSingleDisplay.addEventListener('click', this.closePurchase.bind(this), true)
    }

    handlePurchaseClick(e) {
        const card = e.target
        if (card.attributes && card.attributes.class && card.attributes.class.value === "selectable") {
            card.contentEditable = true
            card.focus()
            card.classList.add('editable')
        }
    }

    createPurchase(e) {
        e.preventDefault()
        const titleValue = this.newPurchaseTitle.value
        const priceValue = this.newPurchasePrice.value
        const descriptionValue = this.newPurchaseDescription.value
        const imageValue = this.newPurchaseImage.value
        this.adapter.createPurchase(titleValue, priceValue, descriptionValue, imageValue).then(purchase => {
            this.purchases.push(new Purchase(purchase))
            this.newPurchaseTitle.value = ""
            this.newPurchasePrice.value = ""
            this.newPurchaseDescription.value = ""
            this.newPurchaseImage.value = ""
            this.render()
        })
    }

    updatePurchase(e) {
        const card = e.target.parentElement
        card.contentEditable = false
        card.classList.remove('editable')
        const newPurchaseTitle = card.querySelector('h2').innerHTML
        const newPurchasePrice = card.querySelector('h3').innerHTML
        const newPurchaseDescription = card.querySelector('b').innerHTML
        const newPurchaseImage = card.querySelector('img').src
        const id = card.dataset.id
        this.adapter.updatePurchase(newPurchaseTitle, newPurchasePrice, newPurchaseDescription, newPurchaseImage, id)
    }

    deletePurchase(e) {
        e.preventDefault()
        const card = e.target
        if (card.attributes && card.attributes.class && card.attributes.class.value === "removable") {
            const id = card.dataset.purchaseId
            this.adapter.deletePurchase(id)
            card.parentElement.remove()
        }
    }

    closePurchase(e) {
        e.preventDefault()
        const card = e.target
        if (card.attributes.class.value === "closable") {
            const purchaseOuterDisplay = document.getElementById('purchase-single-display')
            purchaseOuterDisplay.innerHTML = ""
        }
    }

    showPurchase(e) {
        e.preventDefault()
        const card = e.target
        if (card.attributes && card.attributes.class && card.attributes.class.value === "viewable") {
            const id = parseInt(card.dataset.purchaseId)
            const purchaseOuterDisplay = document.getElementById('purchase-single-display')
            purchaseOuterDisplay.innerHTML = ""
            const purchaseInnerDisplay = document.createElement("div")
            purchaseInnerDisplay.setAttribute("class", "purchase-show")
            purchaseOuterDisplay.appendChild(purchaseInnerDisplay)
            purchaseInnerDisplay.innerHTML += '<h2>Currently Viewing</h2>'
            let superPurchaseImage = document.createElement("img")
            superPurchaseImage.src = (card.parentElement.children[0].src)
            superPurchaseImage.setAttribute("width", "200")
            superPurchaseImage.setAttribute("height", "200")
            purchaseInnerDisplay.append(superPurchaseImage)
            purchaseInnerDisplay.appendChild(superPurchaseImage)
            let superPurchaseTitle = document.createElement("h2")
            let superPurchaseTitleText = document.createTextNode(card.parentElement.children[1].innerHTML)
            superPurchaseTitle.appendChild(superPurchaseTitleText)
            purchaseInnerDisplay.appendChild(superPurchaseTitle)
            let superPurchasePrice = document.createElement("h3")
            let superPurchasePriceText = document.createTextNode(card.parentElement.children[2].innerHTML)
            superPurchasePrice.appendChild(superPurchasePriceText)
            purchaseInnerDisplay.appendChild(superPurchasePrice)
            let superPurchaseDescription = document.createElement("h3")
            let superPurchaseDescriptionText = document.createTextNode(card.parentElement.children[3].innerHTML)
            superPurchaseDescription.appendChild(superPurchaseDescriptionText)
            purchaseInnerDisplay.appendChild(superPurchaseDescription)
            const commentHeading = `<div id='card-comments-location'>
            <h3>Comments</h3>
            </div>`
            const commentForm = `<input type="text" name="comment-title" id="new-comment-content" placeholder="Submit a Comment">`
            const closableButton = `<br></br> <button class="closable" onClick={closePurchase(e)}> Close </button>`
            purchaseInnerDisplay.innerHTML += commentHeading
            purchaseInnerDisplay.innerHTML += commentForm
            purchaseInnerDisplay.innerHTML += closableButton
            const specificPurchaseComments = this.purchases.filter(purchase => purchase.id === id)[0].comments
            specificPurchaseComments.forEach(function (specificComment) {
                const elementForComment = document.createElement("p")
                const commentDetail = document.createTextNode(specificComment.content)
                elementForComment.appendChild(commentDetail)
                const spaceForComment = document.getElementById('card-comments-location')
                spaceForComment.append(elementForComment)
            })
        }
    }


    fetchAndLoadPurchases() {
        this.adapter.getPurchases().then(purchases => {
            purchases.sort((a, b) => b.id - a.id).forEach(purchase => this.purchases.push(new Purchase(purchase)))
        })
            .then(() => {
                this.render()
            })
    }

    render() {
        this.purchasesContainer.innerHTML = this.purchases.map(purchase => purchase.renderCard()).join('')
    }

}