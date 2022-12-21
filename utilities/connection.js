const mongoose = require("mongoose");
const url='mongodb://localhost:27017/weCare';

mongoose.connect(url)

const customerSchema = new mongoose.Schema({
    customerName :{
        type:String,
        required:true,
    },
    username :{
        type:String,
        unique:true,
        required:true,
    },
    customerId:
    {
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    totalPurchase:
    {
      type:Number
    },
    emailId:
    {
        type:String,
        required:true,
        validate:[
            function(value)
            {
                const pattern=/^[a-zA-Z]+[0-9]*@(gmail|hotmail|yahoo)\.(com|in)$/g;
                return pattern.test(value);
            },
            "Email address isn't applicable, please use a valid service!",
        ]
    },
    primeMembership:
    {
        type:String,
        enum:{values : ["Yearly","Monthly"], message:"{VALUE} is not supported!"}
    }
});

const sellerSchema = new mongoose.Schema({
    username :{
        type:String,
        unique:true,
        required:true,
    },
    sellerName:
    {
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    sellerId:
    {
        type:Number,
        required:true,
        unique:true,
    },
    emailId:
    {
        type:String,
        required:true,
        validate:[
            function(value)
            {
                const pattern=/^[a-zA-Z]+[0-9]*@(gmail|hotmail|yahoo)\.(com|in)$/g;
                return pattern.test(value);
            },
            "Email address isn't applicable, please use a valid service!",
        ]
    },
    address:{
        type:String,
        required:true,
    },
    totalSale:
    {
      type:Number
    },
});

const productSchema = new mongoose.Schema({
    productName:
    {
        type:String,
        required:true
    },
    productId:
    {
        type:String,
        required:true,
        unique:true,
    },
    Price:
    {
        type:Number,
        required:true,

    },
   Category:
    {
        type:String,
        required:true,
       
        // enum:{values : ["Books","Electronics","Groceries","Jewelry","Furniture","Human Care","Home exercise equipment","Phones and Tablets","Clothing","Pet","Toys"], message:"{VALUE} is not supported!"}
    }
});

const ecomDb = {};
ecomDb.getUserCollection = async () =>
{
    const model = await mongoose.model("customers",customerSchema);
    return model;
}
ecomDb.getSellerCollection = async () =>
{
    const model = await mongoose.model("sellers",sellerSchema);
    return model;
}
ecomDb.getProductCollection = async () =>
{
    const model = await mongoose.model("products",productSchema);
    return model;
}


module.exports = ecomDb;