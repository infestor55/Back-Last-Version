import subCategoryModel from "../models/subCategoryModel.js";


//----------------- CREATE SUB-CATEGORIES CONTROLLER ------------------
export const addSubCategoryController = async(req,res)=>{
    try{
        const {category_id, sub_category} = req.body
        if(!category_id) {
            return res.status(401).send({message: 'category_id is Required'})
        }
        if(!sub_category) {
            return res.status(401).send({message: 'sub_category is Required'})
        }
        const subCategory = await new subCategoryModel({category_id,sub_category}).save();
        res.status(201).send({
            success: true,
            message: 'new Sub-category Created',
            subCategory
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Failed to add a subCategory',
            error
        })
    }
};

//----------------- UPDATE SUB-CATEGORIES CONTROLLER ------------------

export const updateSubCategoryController = async(req,res)=>{
    try{
        const {category_id, sub_category} = req.body
        const {id} = req.params
        const category = await subCategoryModel.findByIdAndUpdate(id, {category_id, sub_category}, {new: true})
        res.status(200).send({
            success: true,
            message: "Sub-Category Updated successfully",
            category
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error updating Sub-category'
        })
    }
}
//----------------- GET ALL SUB-CATEGORIES CONTROLLER ------------------
export const subCategoriesController = async(req,res)=>{
    try{
        const category = await subCategoryModel.find({});
        res.status(200).send({
            success: true,
            message: 'All Sub-categories List has been provided',
            category,
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Failed to get all Sub-categories'
        })
    }
}
//----------------- GET A SINGLE SUB-CATEGORY CONTROLLER ------------------
export const singleSubCategoryController = async(req,res)=>{
    try{
        const {id} = req.params
        const category = await subCategoryModel.findOne({})
        res.status(200).send({
            success: true,
            message: 'sub-category provided with success',
            category
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Failed to provide the Sub-category',
            error
        });
    }
};
//----------------- DELETE SUB-CATEGORY CONTROLLER ------------------
export const deleteSubCategoryController = async(req,res)=>{
    try{
        const {id} = req.params
        await subCategoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: 'Sub-Category deleted successfully....'
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Failed to delete Sub_category',
            error
        })
    }
};