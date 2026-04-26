const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")


const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})


async function createPostController(req,res){
    console.log(req.body,req.file) // req.body mein data aata hai   req.file mein file aati hai(eg: image)

        const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        // folder: "cohort-2-insta-clone-posts"
    })
    res.send(file)
}

module.exports = {
    createPostController
    }   