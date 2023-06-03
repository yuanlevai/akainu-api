module.exports = {
    list: async (req, res) => {
        let items = await req.itemUC.getProducts(null)
        if (items == null) {
            items = []
        }
        res.status(200).json({
            status: 'ok',
            data: items
        })
    },
    getById: async (req, res) => {
        let id = req.params.id
        let item = await req.itemUC.getProductByID(id)
        if (item == null) {
            return res.status(400).json(null)
        }
        res.json(item)
    },
    delete: async (req, res) => {
        let res_data = {
            status: 'ok',
            message: "",
            data: null
        }

        let id = req.params.id
        await req.itemUC.deleteItem(id)
        res.json(res_data)
    },
    create: async (req, res) => {
        let res_data = {
            status: 'failed',
            message: "",
            data: null
        }

        let item = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            img_url: req.body.img_url
        }

        item = await req.itemUC.createItem(item)
        if (item == null) {
            return res.status(400).json(res_data)
        }

        res_data.status = 'success'
        res_data.data = item
        res.json(res_data)
    }
}