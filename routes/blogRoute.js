import express from 'express';
const router = express.Router();
import blogModel from '../models/blogModel.js';
import multer from 'multer';
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

router.post('/ajout', upload.any('image') , (req, res)=>{

    let data = req.body;
    let blog = new blogModel(data);
    blog.date = new Date();
    blog.image = filename;
    blog.save()
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
})

router.get('/all', (req, res)=>{
 blogModel.find({})
    .then(
        (blogs)=>{
            res.status(200).send(blogs);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
    
})

router.get('/getbyid/:id', (req, res)=>{
    let id = req.params.id
    blogModel.findOne({ _id: id })
    .then(
        (blog)=>{
            res.status(200).send(blog);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
})

router.get('/getbyidauthor/:id', (req, res)=>{
    let id = req.params.id
    blogModel.find({ idAuthor: id })
    .then(
        (blogs)=>{
            res.status(200).send(blogs);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
})

router.delete('/supprimer/:id', (req, res)=>{
    let id = req.params.id
    blogModel.findByIdAndDelete({_id : id})
    .then(
        (blog)=>{
            res.status(200).send(blog);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
})

router.put('/update/:id',upload.any('image') , (req, res)=>{
    let id = req.params.id
    let data = req.body;
    data.tags = data.tags.split(',');
    if(filename.length > 0){
        data.image = filename;
    }
    
    blogModel.findByIdAndUpdate({_id : id}, data)
    .then(
        (blog)=>{
            res.status(200).send(blog);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
})





export default router;