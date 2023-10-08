const express = require("express");
const router = express.Router();
const toolController = require("../../controller/tools.controller");

router
  .route("/")

  /**
   * @api {get} /tools All tools
   * @apiDescription Get all the tools
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} all the tools.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   **/
  .get(toolController.getAllTools)
  /**
   * @api {get} /Save All tools
   * @apiDescription Save all the tools
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} all the tools.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   **/
  .post(toolController.saveAtool);

router
  .route("/:id")
  .get(toolController.toolDetails)
  .patch(toolController.updateTool)
  .delete(toolController.deleteTool);

module.exports = router;
