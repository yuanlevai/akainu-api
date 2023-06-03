const UNAUTHORIZED = {
    status: 'failed',
    message: 'unauthorized'
}

module.exports = (req, res, next) => {
    if(!req.is_admin) {
        return res.status(401).json(UNAUTHORIZED)
    }
    next()
}