const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Virgo_images', 
        format: async (req, file) => {
            const allowedFormats = ['jpg', 'jpeg', 'png', 'webp'];
            const fileFormat = file.mimetype.split('/')[1];
            if (allowedFormats.includes(fileFormat)) {
                return fileFormat;
            }
            throw new Error('Unsupported file format');
        },
        public_id: (req, file) => file.originalname.split('.')[0], 
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            return cb(new Error('Only JPG, JPEG, PNG, or WEBP files are allowed!'), false);
        }
        cb(null, true);
    },
});

module.exports = upload;
