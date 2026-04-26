const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer") // Express ko capable banata hai (File) Read karna jo frontend se aata hai
const upload = multer({ storage: multer.memoryStorage() }) // File store kar rahe hai

/**
 * POST /api/posts [protected]
 * - req.body = { caption,image-file }
 */
postRouter.post("/",upload.single("image"),postController.createPostController) // upload.single("image") ==> ("image") mein same name aana chahiye
                                                                                // jo frontend se bheja ho

module.exports = postRouter