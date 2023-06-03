class Item {
    constructor(itemRepository) {
        this.itemRepository = itemRepository
    }

    async getProductByID(id) {
        return await this.itemRepository.getProductByID(id)
    }

    async getProducts(filters) {
        return await this.itemRepository.getProducts(filters)
    }

    async createItem(item) {
        return await this.itemRepository.createItem(item)
    }

    async deleteItem(id) {
        await this.itemRepository.deleteItem(id)
    }
}

module.exports = Item;