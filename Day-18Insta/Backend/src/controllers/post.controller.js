const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken") // Token Generate keliye
const likeModel = require("../models/like.model")

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})


async function createPostController(req,res){
    console.log(req.body,req.file) // req.body mein data aata hai   req.file mein file aati hai(eg: image)

    
    const token = req.cookies.token // Token ki request kar rahe hai

    if (!token) {
        return res.status(401).json({
            message: "Token not provided, Unauthorized access"
        })
    }


    // Verify kar rahe hai ki token humare server ne hi create kiya ya nahi
    // Decoded ke andar same data aata hai jo 
    // token create karte waqt hum pass kar rahe they

    let decoded = null //Scoping ki wajah decoded null diya hai

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({
            message: "user not authorized"
        })
    }


    console.log(decoded)

    const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), 'file'),
    fileName: "Test",
    folder: "cohort-2-insta-posts" //Specific Folder mein upload karne keliye
    })

    // res.send(file)

    const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.id
    })

    res.status(201).json({
        message: "Post created successfully.",
        post
    })

}


async function getPostController(req, res) {

    const userId = req.user.id

    const posts = await postModel.find({
        user: userId
    })

    res.status(200)
        .json({
            message: "Posts fetched successfully.",
            posts
        })

}


async function getPostDetailsController(req, res) {


    const userId = req.user.id // Jo bhi user ne request kee hogi uski id mil jayegi
    const postId = req.params.postId

    const post = await postModel.findById(postId) //Post id ke basis par post find karenge

    if (!post) {
        return res.status(404).json({
            message: "Post not found."
        })
    }

    const isValidUser = post.user.toString() === userId   // Check ho raha hai ki Post ka USER(owner) kon hai , 
                                                            // and compare kar raha hai konse user ne request ki hai
                                                            //Kyuki Real User(Owner Of the Post) hi Khudki Createkiye hue post dekh sakta hai
    if (!isValidUser) {
        return res.status(403).json({
            message: "Forbidden Content."
        })
    }

    return res.status(200).json({
        message: "Post fetched  successfully.",
        post
    })

}

async function likePostController(req, res) {

    const username = req.user.username
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: "Post not found."
        })
    }

    const like = await likeModel.create({
        post: postId,
        user: username
    })

    res.status(200).json({
        message: "Post liked successfully.",
        like
    })

}


module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController
    }   