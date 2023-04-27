import express from 'express';
const router = express.Router();
import userModel from '../models/userModel.js';
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


router.post('/user-register', upload.any('image') , (req,res)=>{
   const data = req.body;
   const user = new userModel(data);
    user.image = filename;
   const salt = bcrypt.genSaltSync(10)
    user.password = bcrypt.hashSync(data.password, salt);

    user.save()
    .then(
        (saveduser)=>{
            filename = '';
            res.status(200).send(saveduser)
        }
    )
    .catch(
        err=>{
            res.status(400).send(err)
        }
        
    )

})
router.post('/user-login', (req,res)=>{
    let data = req.body
    userModel.findOne({email: data.email})
    .then(
        (user)=>{
            let valid = bcrypt.compareSync(data.password, user.password)
            if(!valid){
                res.send('email or password invalid')
            }else{
                let payload = {
                    _id: user.id,
                    email: user.email,
                   

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
router.get('/all-users', (req,res)=>{
    userModel.find({})
    .then(
        (users)=>{
            res.status(200).send(users);
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
    userModel.findOne({ _id: id })
    .then(
        (user)=>{
            res.status(200).send(user);
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
    userModel.findByIdAndDelete({_id : id})
    .then(
        (user)=>{
            res.status(200).send(user);
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
    
    userModel.findByIdAndUpdate({_id : id}, data)
    .then(
        (user)=>{
            res.status(200).send(user);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
})




export default router;
