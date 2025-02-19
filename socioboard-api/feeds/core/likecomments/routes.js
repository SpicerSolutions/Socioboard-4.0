var routes = require('express').Router();
const likeController = require('./controllers/likecommentcontrollers');

/**
 * @swagger
 * /v1/likecomments/fblike:
 *   post:
 *     operationId: secured_Like_Facebook
 *     summary: Secured, Please update the access token after current route executed successfully 
 *     security:
 *     - AccessToken: []
 *     tags:
 *       - LikeComment
 *     description: To request for making like to a post   
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: query
 *         description: Facebook accountId
 *         name: accountId
 *         type: string
 *       - in: query
 *         description: Team Id
 *         name: teamId
 *         type: integer
 *       - in: query
 *         description: Enter postId 
 *         name: postId
 *         type: string
 *     responses:
 *       200:
 *         description: Return success!
 *       404: 
 *         description: Return Not Found or ErrorMessage
 *       401:
 *         $ref: "#/responses/unauthorizedError"
 */
routes.post('/fblike', likeController.facebookLike);


/**
 * @swagger
 * /v1/likecomments/fbcomment:
 *   post:
 *     operationId: secured_Comment_Facebook
 *     summary: Secured, Please update the access token after current route executed successfully 
 *     security:
 *     - AccessToken: []
 *     tags:
 *       - LikeComment
 *     description: To request for posting commment to a post    
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: query
 *         description: Facebook accountId
 *         name: accountId
 *         type: string
 *       - in: query
 *         description: Team Id
 *         name: teamId
 *         type: integer
 *       - in: query
 *         description: Enter Your postId 
 *         name: postId
 *         type: string
 *       - in: query
 *         description: Enter Your Comment To Post
 *         name: comment
 *         type: string
 *     responses:
 *       200:
 *         description: Return success!
 *       404: 
 *         description: Return Not Found or ErrorMessage
 *       401:
 *         $ref: "#/responses/unauthorizedError"
 */
routes.post('/fbcomment', likeController.facebookComment);


/**
 * @swagger
 * /v1/likecomments/twtlike:
 *   post:
 *     operationId: secured_Like_Twitter
 *     summary: Secured, Please update the access token after current route executed successfully 
 *     security:
 *     - AccessToken: []
 *     tags:
 *       - LikeComment
 *     description: To request for making like to a post   
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: query
 *         description: Twitter accountId
 *         name: accountId
 *         type: string
 *       - in: query
 *         description: Team Id
 *         name: teamId
 *         type: integer
 *       - in: query
 *         description: Enter TweetId 
 *         name: tweetId
 *         type: string
 *     responses:
 *       200:
 *         description: Return success!
 *       404: 
 *         description: Return Not Found or ErrorMessage
 *       401:
 *         $ref: "#/responses/unauthorizedError"
 */
routes.post('/twtlike', likeController.twitterLike);


/**
 * @swagger
 * /v1/likecomments/twtdislike:
 *   post:
 *     operationId: secured_Unlike_Twitter
 *     summary: Secured, Please update the access token after current route executed successfully 
 *     security:
 *     - AccessToken: []
 *     tags:
 *       - LikeComment
 *     description: To request for making unlike to a post   
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: query
 *         description: Twitter accountId
 *         name: accountId
 *         type: string
 *       - in: query
 *         description: Team Id
 *         name: teamId
 *         type: integer
 *       - in: query
 *         description: Enter TweetId 
 *         name: tweetId
 *         type: string
 *     responses:
 *       200:
 *         description: Return success!
 *       404: 
 *         description: Return Not Found or ErrorMessage
 *       401:
 *         $ref: "#/responses/unauthorizedError"
 */
routes.post('/twtdislike', likeController.twitterDislike);


/**
 * @swagger
 * /v1/likecomments/twtcomment:
 *   post:
 *     operationId: secured_comment_Twitter
 *     summary: Secured, Please update the access token after current route executed successfully 
 *     security:
 *     - AccessToken: []
 *     tags:
 *       - LikeComment
 *     description: To request for posting commment for a tweet in twitter    
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: query
 *         description: Twitter accountId
 *         name: accountId
 *         type: string
 *       - in: query
 *         description: Team Id
 *         name: teamId
 *         type: integer
 *       - in: query
 *         description: Enter TweetId 
 *         name: tweetId
 *         type: string
 *       - in: query
 *         description: Comment 
 *         name: comment
 *         type: string
 *     responses:
 *       200:
 *         description: Return success!
 *       404: 
 *         description: Return Not Found or ErrorMessage
 *       401:
 *         $ref: "#/responses/unauthorizedError"
 */
routes.post('/twtcomment', likeController.twitterComment);


/**
 * @swagger
 * /v1/likecomments/twtcomment:
 *   delete:
 *     operationId: secured_delete_comment_Twitter
 *     summary: Secured, Please update the access token after current route executed successfully 
 *     security:
 *     - AccessToken: []
 *     tags:
 *       - LikeComment
 *     description: To request for deleting commment for a tweet in twitter    
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: query
 *         description: Twitter accountId
 *         name: accountId
 *         type: string
 *       - in: query
 *         description: Team Id
 *         name: teamId
 *         type: integer
 *       - in: query
 *         description: Enter TweetId 
 *         name: tweetId
 *         type: string
 *     responses:
 *       200:
 *         description: Return success!
 *       404: 
 *         description: Return Not Found or ErrorMessage
 *       401:
 *         $ref: "#/responses/unauthorizedError"
 */
routes.delete('/twtcomment', likeController.twitterDeleteComment);


/**
 * @swagger
 * /v1/likecomments/ytlike:
 *   post:
 *     operationId: secured_Like_youtube
 *     summary: Secured, Please update the access token after current route executed successfully 
 *     security:
 *     - AccessToken: []
 *     tags:
 *       - LikeComment
 *     description: To request for making like, to a post   
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: query
 *         description: Youtube accountId
 *         name: accountId
 *         type: string
 *       - in: query
 *         description: Team Id
 *         name: teamId
 *         type: integer
 *       - in: query
 *         description: Enter Youtube VideoId 
 *         name: videoId
 *         type: string
 *       - in: query
 *         description: Enter Rating  [like, dislike]
 *         name: rating
 *         type: string
 *     responses:
 *       200:
 *         description: Return success!
 *       404: 
 *         description: Return Not Found or ErrorMessage
 *       401:
 *         $ref: "#/responses/unauthorizedError"
 */
routes.post('/ytlike', likeController.youtubeLike);

/**
 * @swagger
 * /v1/likecomments/ytcomment:
 *   post:
 *     operationId: secured_comment_youtube
 *     summary: Secured, Please update the access token after current route executed successfully 
 *     security:
 *     - AccessToken: []
 *     tags:
 *       - LikeComment
 *     description: To request for posting commment for a tweet in twitter    
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: query
 *         description: Youtube accountId
 *         name: accountId
 *         type: string
 *       - in: query
 *         description: Team Id
 *         name: teamId
 *         type: integer
 *       - in: query
 *         description: Youtube videoId
 *         name: videoId
 *         type: string
 *       - in: query
 *         description: Comment 
 *         name: comment
 *         type: string
 *     responses:
 *       200:
 *         description: Return success!
 *       404: 
 *         description: Return Not Found or ErrorMessage
 *       401:
 *         $ref: "#/responses/unauthorizedError"
 */
routes.post('/ytcomment', likeController.youtubeComment);


/**
 * @swagger
 * /v1/likecomments/ytreplycomment:
 *   post:
 *     operationId: secured_comment_ytreplycomment
 *     summary: Secured, Please update the access token after current route executed successfully 
 *     security:
 *     - AccessToken: []
 *     tags:
 *       - LikeComment
 *     description: To request for posting commment for a tweet in twitter    
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: query
 *         description: Youtube accountId
 *         name: accountId
 *         type: string
 *       - in: query
 *         description: Team Id
 *         name: teamId
 *         type: integer
 *       - in: query
 *         description: Youtube Comment Id
 *         name: commentId
 *         type: string
 *       - in: query
 *         description: Comment 
 *         name: comment
 *         type: string
 *     responses:
 *       200:
 *         description: Return success!
 *       404: 
 *         description: Return Not Found or ErrorMessage
 *       401:
 *         $ref: "#/responses/unauthorizedError"
 */
routes.post('/ytreplycomment', likeController.youtubeReplyComment);

/**
 * @swagger
 * /v1/likecomments/instabusinesscomment:
 *   get:
 *     operationId: secured_comment_instabusinesscomment
 *     summary: Secured, Please update the access token after current route executed successfully 
 *     security:
 *     - AccessToken: []
 *     tags:
 *       - LikeComment
 *     description: To request for getting commments of instagram business accounts  
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: query
 *         description: instagram business accountId
 *         name: accountId
 *         type: string
 *       - in: query
 *         description: Team Id
 *         name: teamId
 *         type: integer
 *       - in: query
 *         description: Media Id
 *         name: mediaId
 *         type: string
 *     responses:
 *       200:
 *         description: Return success!
 *       404: 
 *         description: Return Not Found or ErrorMessage
 *       401:
 *         $ref: "#/responses/unauthorizedError"
 */
routes.get('/instabusinesscomment', likeController.instabusinesscomment);

// /**
//  * @swagger
//  * /v1/likecomments/instabusinesscommentreply:
//  *   post:
//  *     operationId: secured_comment_instabusinesscommentreply
//  *     summary: Secured, Please update the access token after current route executed successfully 
//  *     security:
//  *     - AccessToken: []
//  *     tags:
//  *       - LikeComment
//  *     description: To request for posting commments in instagram business account  
//  *     produces:
//  *       - application/json
//  *     consumes:
//  *       - application/x-www-form-urlencoded
//  *     parameters:
//  *       - in: query
//  *         description: instagram business accountId
//  *         name: accountId
//  *         type: string
//  *       - in: query
//  *         description: Team Id
//  *         name: teamId
//  *         type: integer
//  *       - in: query
//  *         description: instaBusiness Comment Id
//  *         name: commentId
//  *         type: string
//  *       - in: query
//  *         description: comment
//  *         name: comment
//  *         type: string
//  *     responses:
//  *       200:
//  *         description: Return success!
//  *       404: 
//  *         description: Return Not Found or ErrorMessage
//  *       401:
//  *         $ref: "#/responses/unauthorizedError"
//  */
// routes.post('/instabusinesscommentreply', likeController.instabusinesscommentreply);

module.exports = routes;