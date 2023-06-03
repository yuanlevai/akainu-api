module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Items", [
            {
                name: "Bakso",
                category: "makanan",
                price: 25000,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Nasi Goreng",
                category: "makanan",
                price: 10000,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Es Teh",
                category: "minuman",
                price: 2000,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Items", null, {})
    }
}