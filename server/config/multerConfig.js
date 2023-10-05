import multer from "multer";

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'image/header');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = file.mimetype === 'image/jpeg' ? 'jpeg' : 'png';
    cb(null, uniqueSuffix + '.' + extension); // กำหนดชื่อไฟล์ใหม่และนามสกุลไฟล์
  }
});

export const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
    cb(new Error('Only image files are allowed.'), false);
  }
};

export const storageUsers = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'image/users');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = file.mimetype === 'image/jpeg' ? 'jpeg' : 'png';
    cb(null, uniqueSuffix + '.' + extension);
  }
});

export const fileFilterUsers = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed.'), false);
  }
};


