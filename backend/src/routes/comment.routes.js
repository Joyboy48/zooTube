import { Router } from 'express';
import {
    addComment,
    deleteComment,
    getVideoComments,
    updateComment,
} from "../controllers/comment.controller.js"
import { verifyJWT, verifyJWTOptional } from "../middlewares/auth.middlewares.js"

const router = Router();

// GET comments — public (guests can read comments)
router.route("/:videoId").get(verifyJWTOptional, getVideoComments);

// POST/DELETE/PATCH — login required
router.route("/:videoId").post(verifyJWT, addComment);
router.route("/c/:commentId").delete(verifyJWT, deleteComment).patch(verifyJWT, updateComment);

export default router;