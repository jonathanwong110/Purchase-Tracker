class Purchases {
    constructor() {
        this.purchases = []
        this.adapter = new PurchasesAdapter()
        this.initiBindingsAndEventListeners()
        this.fetchAndLoadPurchases()
    }

    initiBindingsAndEventListeners() {
        this.purchasesContainer = document.getElementById('purchases-container')
        this.purchaseSingleDisplay = document.getElementById('purchase-single-display')
        this.commentSubmission = document.getElementById('purchase-comment-submission')
        this.newPurchaseTitle = document.getElementById('new-purchase-title')
        this.newPurchasePrice = document.getElementById('new-purchase-price')
        this.newPurchaseDescription = document.getElementById('new-purchase-description')
        this.newPurchaseImage = document.getElementById('new-purchase-image')
        this.purchaseForm = document.getElementById('new-purchase-form')
        this.purchaseForm.addEventListener('submit', this.createPurchase.bind(this))
        this.purchasesContainer.addEventListener('dblclick', this.handlePurchaseClick.bind(this))
        this.purchasesContainer.addEventListener('blur', this.updatePurchase.bind(this), true)
        this.purchasesContainer.addEventListener('click', this.deletePurchase.bind(this), true)
        this.purchasesContainer.addEventListener('click', this.showPurchase.bind(this), true)
        this.newCommentContent = document.getElementById('new-comment-content')
        this.commentSubmission.addEventListener('submit', this.createComment.bind(this), true)
        this.purchaseSingleDisplay.addEventListener('click', this.deleteComment.bind(this), true)
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

    showPurchase(e) {
        e.preventDefault()
        const card = e.target
        let highlightedProductId = parseInt(card.parentElement.dataset.id)
        if (card.attributes && card.attributes.class && card.attributes.class.value === "viewable") {
            const id = parseInt(card.dataset.purchaseId)
            const purchaseOuterDisplay = document.getElementById('purchase-single-display')
            purchaseOuterDisplay.innerHTML = ""
            const productCommentSubmission = document.getElementById('purchase-comment-submission')
            productCommentSubmission.innerHTML = ""
            const purchaseInnerDisplay = document.createElement("div")
            purchaseInnerDisplay.setAttribute("id", "purchase-show")
            purchaseInnerDisplay.setAttribute("data-id", highlightedProductId)
            purchaseOuterDisplay.appendChild(purchaseInnerDisplay)
            purchaseInnerDisplay.innerHTML += '<h2>Currently Viewing</h2>'
            const specificPurchase = this.purchases.filter(purchase => purchase.id === id)[0]
            purchaseInnerDisplay.innerHTML += (specificPurchase.renderCard(false))
            const commentHeading = `<div id='card-comments-location'>
            </div>`
            const commentForm = `<form id="new-comment-content"> 
            <input type="text" name="comment-title" id="new-comment-content"> <br></br>
            <input id="create-comment" type="submit" value="Submit Comment">
            </form>`
            purchaseInnerDisplay.innerHTML += commentHeading
            productCommentSubmission.innerHTML += commentForm
            this.displayComments(specificPurchase)
        }
    }

    displayComments(specificPurchase) {
        const spaceForComment = document.getElementById('card-comments-location')
        spaceForComment.innerHTML = "<h3>Comments</h3>"
        specificPurchase.comments.forEach(function (specificComment) {
            const elementForComment = document.createElement("p")
            const elementforDeleteComment = `<button class="delete-comment" data-comment-id=${specificComment.id}> X </button>`
            const commentDetail = document.createTextNode(specificComment.content)
            elementForComment.appendChild(commentDetail)
            elementForComment.innerHTML += elementforDeleteComment
            spaceForComment.append(elementForComment)
        })
    }

    createComment(e) {
        e.preventDefault()
        const card = e.target
        const newCommentContent = card[0].value
        const purchaseIdValue = parseInt(document.getElementById('purchase-single-display').children[0].dataset.id)
        this.adapter.createComment(newCommentContent, purchaseIdValue).then(comment => {
            const purchase = this.purchases.filter(purchase => purchase.id === purchaseIdValue)[0]
            purchase.comments.push(comment)
            card[0].value = ""
            this.displayComments(purchase)
        })
    }

    deleteComment(e) {
        e.preventDefault()
        const card = e.target
        if (card.attributes && card.attributes.class && card.attributes.class.value === "delete-comment") {
            const id = parseInt(card.dataset.commentId)
            this.adapter.deleteComment(id)
            card.parentElement.remove()
        }
    }

    fetchAndLoadPurchases() {
        this.adapter.getPurchases().then(purchases => {
            purchases.forEach(purchase => this.purchases.push(new Purchase(purchase)))
        })
            .then(() => {
                this.render()
            })
    }

    render() {
        this.purchasesContainer.innerHTML = this.purchases.map(purchase => purchase.renderCard()).join('')
    }

}