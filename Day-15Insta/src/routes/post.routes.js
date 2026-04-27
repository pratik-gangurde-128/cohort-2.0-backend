const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer") // Express ko capable banata hai (File) Read karna jo frontend se aata hai
const upload = multer({ storage: multer.memoryStorage() }) // File store kar rahe hai
const identifyUser = require("../middlewares/auth.middleware")
/**
 * POST /api/posts [protected]
 * - req.body = { caption,image-file }
 */
postRouter.post("/",upload.single("image"),identifyUser,postController.createPostController) // upload.single("image") ==> ("image") mein same name aana chahiye
                                                                                // jo frontend se bheja ho
                                                                                //(identifyUser) Middleware hai(repetation of Code) na ho isiliye use kiya hai

/**
 * GET /api/posts/ [protected]
 */
postRouter.get("/",identifyUser, postController.getPostController)


/**
 * GET /api/posts/details/:postid
 * - return an detail about specific post with the id. also check whether the post belongs to the user that the request come from
 */
postRouter.get("/details/:postId",identifyUser, postController.getPostDetailsController)

module.exports = postRouter