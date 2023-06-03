const {User} = require('../models')
const bcrypt = require('bcrypt')

class UserRepository {
    constructor() {

    }

    async registerUser(user_data) {
        user_data.password = bcrypt.hashSync(user_data.password, 10)
        user_data.is_admin = false

        let user = null
        try {
            user = await User.create(user_data)
        } catch (e) {
            console.error(e)
            return null
        }

        return user
    }
    async loginUser(email,password) {
        let user = null
        try {
            user = await this.getUserByEmail(email)
            if(user === null) {
                return user
            }
        } catch (e) {
            console.error(e)
            return null
        }

        if(!bcrypt.compareSync(password, user.password)) {
            return null
        }

        return user
    }
    async getUserByEmail(email) {
        try {
            return await User.findOne({
                where: {
                    email: email
                }
            })
        } catch (e) {
            console.error(e)
            return null
        }
    }
}

module.exports = UserRepository