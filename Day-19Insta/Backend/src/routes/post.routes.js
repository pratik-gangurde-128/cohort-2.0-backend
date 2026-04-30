const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer") // Express ko capable banata hai (File) Read karna jo frontend se aata hai
const upload = multer({ storage: multer.memoryStorage() }) // File store kar rahe hai
const identifyUser = require("../middlewares/auth.middleware")
/**
 * POST /api/posts [protected]
 * - req.body = { caption,image-file }
 * @description Create a post with the content and image (optional) provided in the request body. The post should be associated with the user that the request come from
*/
postRouter.post("/",upload.single("image"),identifyUser,postController.createPostController) // upload.single("image") ==> ("image") mein same name aana chahiye
                                                                                // jo frontend se bheja ho
                                                                                //(identifyUser) Middleware hai(repetation of Code) na ho isiliye use kiya hai

/**
 * GET /api/posts/ [protected]
* @description Get all the posts created by the user that the request come from. also return the total number of posts created by the user 
*/
postRouter.get("/",identifyUser, postController.getPostController)


/**
 * GET /api/posts/details/:postid
 * - return an detail about specific post with the id. also check whether the post belongs to the user that the request come from
 * @description return an detail about specific post with the id. also check whether the post belongs to the user that the request come from 
*/
postRouter.get("/details/:postId",identifyUser, postController.getPostDetailsController)


/**
 * @route POST /api/posts/like/:postid
 * @description like a post with the id provided in the request params. 
 */
postRouter.post("/like/:postId", identifyUser, postController.likePostController)



/**
 * @route GET /api/posts/feed
 * @description get all the post created in the DB
 * @access private
 */
postRouter.get("/feed", identifyUser, postController.getFeedController)

module.exports = postRouter