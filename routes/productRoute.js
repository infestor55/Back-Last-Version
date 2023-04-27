import express from 'express';
import Product from '../models/productModel.js'
import productModel from '../models/productModel.js';
import multer from 'multer';
const router = express.Router();
let filename = '';
const mystorage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file , redirect)=>{
        let date = Date.now();
        let fl = date + '.' + file.mimetype.split('/')[1];
        redirect(null , fl);
        filename = fl;
    }
})

const upload = multer({storage: mystorage})


router.post('/createProduct', upload.any('image'), (req, res) => {
  let data = req.body;
  let product = new productModel(data);
  product.image = filename;
  product.save()
  .then(
      (saved)=>{
          filename = '';
          res.status(200).send(saved);
      }
  )
      .catch(
          err=>{
              res.status(400).send(err)
          }
      )
  });

  router.get('/all', (req,res)=>{
    productModel.find({})
    .then(
        (products)=>{
            res.status(200).send(products);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
})
 
  export default router;