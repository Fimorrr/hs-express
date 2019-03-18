import { Router } from 'express'
import multer from 'multer'
import path from 'path';
import { getLast, search, cancel, confirm, complete, checkPicture, savePicture } from './controllers'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { schema } from '../../models/game'

const router = new Router()

var upload = multer({
  dest: __dirname + '/../../public/uploads/',
  fileFilter: (req, file, next) => {
    let ext = path.extname(file.originalname);
    console.log(ext);
    if (ext == '.jpg' || ext == '.jpeg' || ext == '.png') {
      next(null, true);
    }
    next(null, false);  
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
  token({ required: false }),
  checkPicture,
  upload.single('picture'),
  savePicture);

export default router
