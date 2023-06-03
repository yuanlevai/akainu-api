const path = require('path')
const fs = require('fs')

const multer = require('multer')
const cloudinary = require('cloudinary').v2

const UPLOAD_DIR = path.join(__dirname,'..' ,process.env.UPLOAD_DIR)

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, UPLOAD_DIR)
    },
    filename: (req, file, callback) => {
        const uniqueSuffix = new Date().getTime()
        callback(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req,file,callback) => {
        if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
            return callback(null,true)
        } else {
            callback(null, false)
            return callback(new Error("unsupported file type!"))
        }
    }
})

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

async function cloudinaryUpload(filePath, folder) {
    if(typeof folder != "string") {
        folder = 'images'
    }
    if(folder === "") {
        folder = 'images'
    }
    let result
    try {
        result = await cloudinary.uploader.upload(filePath, {
            use_filename: true,
            folder: folder
        })
    } catch (e) {
        console.error(e)
        return ""
    }

    fs.unlinkSync(filePath)
    return result.url
}

module.exports = {
    upload,
    cloudinaryUpload
}