const jwt = require('jsonwebtoken')

class Auth {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    async login(email,password) {
        let res_data = {
            is_success: false,
            reason: "",
            data: null
        }
        let user = await this.userRepository.loginUser(email, password)
        if(user == null) {
            res_data.reason = "invalid username or password!"
            return res_data
        }
        res_data.is_success = true
        res_data.data = this.generateAccessToken(user)
        return res_data
    }

    generateAccessToken(user_data) {
        let user = {
            id: user_data.id,
            name: user_data.name,
            email: user_data.email,
            address: user_data.address,
        }
        let payload = {
            user: user,
            is_admin: user_data.is_admin
        }
        let jwt_str = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '15m'
        })
        return {
            user: user,
            access_token: jwt_str
        }
    }

    async register(user_data) {
        let return_data = {
            is_success: false,
            reason: "",
            data: null
        }
        if(typeof user_data.password !== "string" || typeof  user_data.email !== "string" ) {
            return return_data
        }
        let user = this.userRepository.getUserByEmail(user_data.email)
        if(user != null) {
           return_data.reason = "email already exist!";
           return_data;
        }
        user = await this.userRepository.registerUser(user_data)
        if(user == null) {
            return_data.reason = "something went wrong!"
        }
        return_data.data = this.generateAccessToken(user)
        return_data.is_success = true
        return return_data
    }
}

module.exports = Auth