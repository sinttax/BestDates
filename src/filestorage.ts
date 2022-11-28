import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './frontend/photo');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now().toString()}.jpg`);
  },
});

export const upload = multer({ storage: storage });
