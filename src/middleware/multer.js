import { __dirname } from '../configPath.js';
import multer from 'multer';
import path from 'path';

const getDestination = (req, file, cb) => {
  const fileType = req.body.fileType;
  let destination = '';
  switch (fileType) {
    case 'profile':
      destination = 'profiles';
      break;
    case 'product':
      destination = 'products';
      break;
    case 'document':
      destination = 'documents';
      break;
    default:
      destination = 'uploads';
  }

  cb(null, path.join(__dirname, 'public', destination));
};
const storage = multer.diskStorage({
  destination: getDestination,
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const uploader = multer({ storage });
export { uploader };
