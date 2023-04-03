class Good {
    constructor(id, code, name, description, sizes, price, available) {
        this.id = id
        this.code = code
        this.name = name
        this.description = description
        this.sizes = sizes
        this.price = price
        this.available = available
    }

    setAvailable(available) {
        this.available = available
    }
}

class GoodsList {
    #goods = []
    filter = null
    sortPrice = false
    sortDir = true

    get list() {
        const filteredGoods = this.#goods.filter(good => this.filter ? this.filter.test(good.name) : true)
        const sortedGoods = this.sortPrice ? filteredGoods.sort((a, b) => this.sort.Dir ? a.price - b.price : b.price - a.price) : filteredGoods
        return sortedGoods.filter(good => good.available)
    }

    add(good) {
        this.#goods.push(good)
    }

    remove(id) {
        this.#goods = this.#goods.filter(good => good.id != id)
    }
}

class BasketGood extends Good {
    constructor(good, amount) {
        super(good.id, good.code, good.name, good.description, good.sizes, good.price, good.available)
        this.amount = amount
    }
}

class Basket {
    goods = []

    get totalAmount() {
        return this.goods.reduce((total, good) => total + good.amount * good.price, 0)
    }

    get totalSum() {
        return this.goods.reduce((total, good) => total + good.amount, 0)
    }

    add(good, amount) {
        const existingGood = this.goods.find(g => g.id === good.id)
        if (existingGood) {
            existingGood.amount += amount
        } else {
            this.goods.push(new BasketGood(good, amount))
        }
    }

    remove(good, amount) {
        const existingGood = this.goods.find(g => g.id === good.id)
        if (existingGood) {
            existingGood.amount -= amount
            if (existingGood.amount <= 0) {
                this.goods = this.goods.filter(g => g.id !== good.id)
            }
        }
    }

    clear() {
        this.goods = []
    }

    removeUnavailable() {
        this.goods = this.goods.filter(good => good.available)
    }
}

// create some Good instances
const good1 = new Good(1, 'P001', 'Product 1', 'Product 1 description', ['S', 'M', 'L'], 10, true)
const good2 = new Good(2, 'P002', 'Product 2', 'Product 2 description', ['M', 'L'], 20, false)
const good3 = new Good(3, 'P003', 'Product 3', 'Product 3 description', ['S', 'L'], 30, true)
const good4 = new Good(4, 'P004', 'Product 4', 'Product 4 description', ['M', 'L'], 40, true)
const good5 = new Good(5, 'P005', 'Product 5', 'Product 5 description', ['S', 'M'], 50, true)

// Creating an instance of GoodsList class
const goodsList = new GoodsList()

// Adding goods to the catalogue
goodsList.add(good1)
goodsList.add(good2)
goodsList.add(good3)
goodsList.add(good4)
goodsList.add(good5)

// Setting filter and sorting conditions
goodsList.filter = /Hoodie/
goodsList.sortPrice = true
goodsList.sortDir = false

// Printing filtered and sorted catalogue of goods
console.log(goodsList.list)

// Creating an instance of Basket class
const basket = new Basket()

// Adding goods to the basket
basket.add(good1, 2)
basket.add(good3, 1)

// Printing total amount and quantity of items in the basket
console.log(`Total amount: ${basket.totalAmount}`)
console.log(`Total quantity: ${basket.totalSum}`)