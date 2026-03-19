const Image = require('../models/Image');
const { uploadToCloudinary } = require('../helpers/cloudinaryHelper');
const { get } = require('mongoose');
const cloudinary = require('../config/cloudinary');

const uploadImageController = async (req, res) => {
    try {
        // check if file is missing in req object 
        if (!req.file) {
            return res.status(400).json({
                sucess: false,
                message: 'file is required .please upload an image'
            })
        }
        //upload to cloudinary
        const { url, publicId } = await uploadToCloudinary(req.file.path);

        //store the image url and public id along with  the uploaded user id in database
        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy: req.userInfo.userId
        });
        //to save in DB
        await newlyUploadedImage.save();


        res.status(201).json({
            sucess: true,
            message: 'Image uploaded sucessfully',
            image: newlyUploadedImage
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            message: 'Somthing went wrong! Please try agian.'
        })

    }
}
const fetchImagesController = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const sortBy = req.query.sortBy || "createdAt";
        const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
        const totalImages = await Image.countDocuments();
        const totalPages = Math.ceil(totalImages / limit);

        const sortObj = {};
        sortObj[sortBy] = sortOrder;

        const images = await Image.find().sort(sortObj).skip(skip).limit(limit);

        if (images) {
            res.status(200).json({
                sucess: true,
                currentPages: page,
                totalPages: totalPages,
                totalImages: totalImages,
                data:images,
            })
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            message: 'Something went wrong! Please try again'
        });
        
        
    }
}

const deleteImageController = async (req, res) => {
    try {
        const getCurrentIdOfImageToBeDeleted = req.params.id;
        const userId = req.userInfo.userId;

        const image = await Image.findById(getCurrentIdOfImageToBeDeleted);

        if (!image) {
            return res.status(500).json({
                sucess: false,
                message: 'No image that has Id! Please try agian.'
            })
        }
        //check if this image is uploaded by the current user who is trying this image or not
        if ( image.uploadedBy.toString() !== userId) {
            return res.status(403).json({
                sucess: false,
                message: ' You are not uthorized to delete images'
            })
        }
        // to delete image in cloudinary 
        await cloudinary.uploader.destroy(image.publicId);

        //to delete url of image if mongoeDB
        await Image.findByIdAndDelete(getCurrentIdOfImageToBeDeleted);

        res.status(200).json({
            sucess: true,
            message:'the image is deleted successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            sucess: false,
            message: 'Somthing went wrong! Please try agian.'
        })
    }
}
module.exports = {
    uploadImageController,
    deleteImageController,
    fetchImagesController
}