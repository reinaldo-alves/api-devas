const multer = require('multer');
const path = require('path');

function generateRandomHash() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let hash = '';
    for (let i = 0; i < 6; i++) {
        hash += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return hash;
}

module.exports = (multer({
    storage: multer.diskStorage({
        destination: (request: any, file: any, callback: any) => {
            callback(null, './public/upload/medium')
        },
        filename: (request: any, file: any, callback: any) => {
            const { medium_id } = request.query;
            const filename = `Foto_${medium_id.toString().padStart(5, '0')}_${generateRandomHash()}.jpg` 
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