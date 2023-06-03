const {Item} = require("../models")

class ItemRepository {
    constructor() {
        this.ItemModel = Item
    }

    async getProductByID(id) {
        let data = null
        try {
            data = await this.ItemModel.findOne({
                where: {
                    id: id
                }
            })
        } catch (err) {
            console.log(err)
            return null
        }
        return data
    }

    async getProducts(filters) {
        if (filters != null) {
            return await this.ItemModel.findAll({
                where: filters
            })
        }

        return await this.ItemModel.findAll()
    }

    async createItem(item_data) {
        let item = null
        try {
            item = await Item.create(item_data)
        } catch (e) {
            console.error(e)
        }
        return item
    }

    async deleteItem(id) {
        try {
            await Item.destroy({
                where: {
                    id: id
                }
            })
        } catch (e) {
            console.error(e)
        }
    }
}

module.exports = ItemRepository