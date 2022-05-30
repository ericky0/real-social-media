import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '..', 'public', 'images'))
  },
  filename: (req, file, cb) => {
    crypto.randomBytes(16, (err, hash) => {
      if (err) {
        cb(err, err.toString())
      }

      const fileName = `${hash.toString('hex')}-${file.originalname}`
      cb(null, fileName)
    })
  }
})

export const upload = multer({ storage })
