const media_handler = require('../lib/media_handler')

module.exports = {
    upload: async (req, res) => {
        let url = await media_handler.cloudinaryUpload(req.file.path, req.params.folder)
        let res_data = {
            url: url
        }
        res.json(res_data)
    }
}