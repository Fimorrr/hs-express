import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import { getLast, search, cancel, confirm, complete, checkPicture, savePicture, getPicture } from './controllers'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { schema } from '../../models/game'

const router = new Router()

let storage = multer.diskStorage({
  destination: (req, file, next) => {
    next(null, __dirname + '/../../public/uploads/');
  },
  filename: (req, file, next) => {
    let name = Math.random().toString().slice(8) + Date.now() + path.extname(file.originalname);
    next(null, name);
  }
});

let upload = multer({
  storage: storage,
  fileFilter: (req, file, next) => {
    let ext = path.extname(file.originalname);
    if (ext == '.jpg' || ext == '.jpeg' || ext == '.png') {
      next(null, true);
    }
    else {
      next(null, false);  
    }
  },
  limits: {
    fileSize: 1024 * 1024
  }
});

const {
  option
} = schema.tree

router.get('/',
  token({ required: true }),
  getLast)

router.get('/search',
  token({ required: true }),
  search)

router.get('/cancel',
  token({ required: true }),
  cancel)

router.get('/confirm',
  token({ required: true }),
  confirm)

router.post('/complete',
  token({ required: true }),
  body({ option }),
  complete)

router.post('/upload',
  token({ required: true }),
  checkPicture,
  upload.single('picture'),
  savePicture)

router.get('/picture/:number',
  token({ required: false }),
  getPicture)

export default router
