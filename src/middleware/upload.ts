const multer = require('multer');
const path = require('path');

module.exports = (multer({
    storage: multer.diskStorage({
        destination: (request: any, file: any, callback: any) => {
            callback(null, './public/upload/medium')
        },
        filename: (request: any, file: any, callback: any) => {
            callback(null, Date.now().toString() + path.extname(file.originalname))
        }
    }),
    fileFilter: (request: any, file: any, callback: any) => {
        const extensionImg = ['image/png', 'image/jpg', 'image/jpeg'].find(acceptedFormat => acceptedFormat === file.mimetype);
        if(extensionImg){
            return callback(null, true)
        }
        return callback(null, false)
    }
}))