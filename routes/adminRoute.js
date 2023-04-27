import express from 'express';
const router = express.Router();
import adminModel from '../models/adminModel.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

router.post('/admin-register', (req,res)=>{
   const data = req.body;
   const admin = new adminModel(data);
   const salt = bcrypt.genSaltSync(10)
    admin.password = bcrypt.hashSync(data.password, salt);

    admin.save()
    .then(
        (savedadmin)=>{
            
            res.status(200).send(savedadmin)
        }
    )
    .catch(
        err=>{
            res.status(400).send(err)
        }
        
    )
})
router.post('/admin-login', (req,res)=>{
   const data = req.body
  adminModel.findOne({email: data.email})
   .then(
       (admin)=>{
           let valid = bcrypt.compareSync(data.password,admin.password)
           if(!valid){
               res.send('email or password invalid')
           }else{
               let payload = {
                   _id:admin.id,
                   email:admin.email,
                   
                   

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
export default router