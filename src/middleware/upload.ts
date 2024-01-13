const multer = require('multer');
const path = require('path');

module.exports = (multer({
    storage: multer.diskStorage({
        destination: (request: any, file: any, callback: any) => {
            callback(null, './public/upload/medium')
        },
        filename: (request: any, file: any, callback: any) => {
            const { medium_id } = request.query;
            const filename = `Foto_${medium_id.toString().padStart(5, '0')}.jpg` 
            callback(null, filename)
        }
    }),
    fileFilter: (request: any, file: any, callback: any) => {
        const extensionImg = ['image/png', 'image/jpg', 'image/jpeg'].find(acceptedFormat => acceptedFormat === file.mimetype);
        if(extensionImg){
            return callback(null, true)
        }
        return callback(null, false)
    },
    overwrite: true
}))