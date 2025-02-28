const multer = require('multer');
const path = require('path');
const stream = require('stream');
const { google } = require('googleapis');

const localUpload = multer({
    storage: multer.diskStorage({
        destination: (request: any, file: any, callback: any) => {
            callback(null, './public/upload/medium')
        },
        filename: (request: any, file: any, callback: any) => {
            const { medium_id, med } = request.query;
            const filename = `Foto_${medium_id.toString().padStart(5, '0')}_${med ? med.charAt(0).toUpperCase() : ''}.jpg` 
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
})

const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname + '/googledrive.json'),
    scopes: ['https://www.googleapis.com/auth/drive']
})

const uploadGoogleDrive = async (request: any, fileObject: any) => {
    const {medium_id, med} = request.query;
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
    const { data } = await google.drive({version: 'v3', auth: auth}).files.create({
        media: {
            mimeType: fileObject.mimeType,
            body: bufferStream
        },
        requestBody: {
            name: `Foto_${medium_id.toString().padStart(5, '0')}_${med ? med.charAt(0).toUpperCase() : ''}.jpg`,
            parents: ['1af15mVWJPBdFIifUvWZqfH0ftY7BQ3Ae']
        },
        fields:'id,name'
    })
    return {name: data.name, id: data.id};
}

const googleDriveMulter = multer({
    storage: multer.memoryStorage(),
    fileFilter: (request: any, file: any, callback: any) => {
        const extensionImg = ['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype);
        callback(null, extensionImg);
    }
}).single('image');

const remoteUpload = (request: any, response: any, next: any) => {
    googleDriveMulter(request, response, async (error: any) => {
        if (error) {
            return response.status(500).json({ message: 'Erro ao processar upload', error });
        }

        if (!request.file) {
            return response.status(400).json({ message: 'Nenhum arquivo enviado' });
        }

        try {
            const {name, id} = await uploadGoogleDrive(request, request.file);
            request.file.filename = name; 
            request.file.fileId = id; // Adiciona o ID do arquivo ao request para uso posterior
            next();
        } catch (uploadError) {
            response.status(500).json({ message: 'Erro ao enviar para o Google Drive', error: uploadError });
        }
    });
};

export { localUpload, remoteUpload }