import express from 'express';
const router = express.Router();
import authorModel from '../models/authorModel.js'
import multer from 'multer';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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


router.post('/register', upload.any('image') , (req,res)=>{
   const data = req.body;
   const author = new authorModel(data);
    author.image = filename;
   const salt = bcrypt.genSaltSync(10)
    author.password = bcrypt.hashSync(data.password, salt);

    author.save()
    .then(
        (savedAuthor)=>{
            filename = '';
            res.status(200).send(savedAuthor)
        }
    )
    .catch(
        err=>{
            res.status(400).send(err)
        }
        
    )

})
router.post('/login', (req,res)=>{
    let data = req.body
    authorModel.findOne({email: data.email})
    .then(
        (author)=>{
            let valid = bcrypt.compareSync(data.password, author.password)
            if(!valid){
                res.send('email or password invalid')
            }else{
                let payload = {
                    _id: author.id,
                    email: author.email,
                    fullname: author.name + ' ' + author.lastname

                }
                let token = jwt.sign(payload, '123456789');
                res.send({mytoken : token })
            }
        }
    )
    .catch(
        err=>{
            res.send(err)
        }
    )
})
router.get('/all', (req,res)=>{
    authorModel.find({})
    .then(
        (authors)=>{
            res.status(200).send(authors);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
})
router.get('/getbyid/:id', (req,res)=>{
    let id = req.params.id
    authorModel.findOne({ _id: id })
    .then(
        (author)=>{
            res.status(200).send(author);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
    
})
router.delete('/supprimer/:id', (req,res)=>{
    let id = req.params.id
    authorModel.findByIdAndDelete({_id : id})
    .then(
        (author)=>{
            res.status(200).send(author);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
})
router.put('/update/:id', upload.any('image'), (req,res)=>{
    let id = req.params.id
    let data = req.body;
    
    if(filename.length > 0){
        data.image = filename;
    }
    
    authorModel.findByIdAndUpdate({_id : id}, data)
    .then(
        (author)=>{
            res.status(200).send(author);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
})




export default router;
