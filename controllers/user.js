module.exports = {
    get_profile: async (req,res) => {
        return res.json({
            status: 'success',
            message: 'ok',
            data: req.user
        })
    }
}