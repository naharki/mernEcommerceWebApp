const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, "Please enter the Product Name"]
    },
    description: {
        type: String,
        required:[true, "Please enter the Product Description"]
    },
    price: {
        type: Number,
        required: [true, "Please enter the Product Price"],
        maxLength: [7, " Price cannot exceed 7 character"]
    },

    rating:{
        type: Number,
        default: 0
    },

    images:[
        {
            public_id:{
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            } 
        }
    ],


    catagory: {
        type: String,
        required: [true, "Please enter the product catagory"]
    },

    stock: {
        type: Number,
        required: [true, "Please enter the Product Stock"],
        maxLength: [4, "Stock cannot exceed Four Character"],
        default: 1
    },

    numofReviews: {
        type: Number,
        default: 0
    },

    reviews: [
        {
            name: {
                type: String,
                required: true,
            },

            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Product", productSchema);