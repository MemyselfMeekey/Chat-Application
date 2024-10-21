import multer from "multer"
import path from "path"

// Set storage engine
const storage = multer.diskStorage(
    {
    destination: './uploads/', // Path to save the uploaded files
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // File naming
    }
    
});

// Initialize upload
 const uploader = multer({
    storage: storage,
    limits: { fileSize: 50000000 }, // Limit file size to 5MB
}); // 'image' is the name attribute of the file input in the form

export default uploader