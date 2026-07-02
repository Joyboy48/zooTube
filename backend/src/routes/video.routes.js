import { Router } from 'express';
import { verifyJWT, verifyJWTOptional } from '../middlewares/auth.middlewares.js';
import { deleteVideo, getAllVideos, getVideoById, publishAVideo, togglePublishStatus, updateVideo } from '../controllers/video.controller.js';
import { upload } from '../middlewares/multer.middlewares.js';

const router = Router();

// ── PUBLIC routes (optional auth so isLiked/isSubscribed still works when logged in) ──
router.route("/").get(verifyJWTOptional, getAllVideos);
router.route("/:videoId").get(verifyJWTOptional, getVideoById);

// ── PROTECTED routes (login required) ──
router.route("/").post(
    verifyJWT,
    upload.fields([
        { name: "videoFile", maxCount: 1 },
        { name: "thumbnail", maxCount: 1 },
    ]),
    publishAVideo
);

router.route("/:videoId")
    .delete(verifyJWT, deleteVideo)
    .patch(verifyJWT, upload.single("thumbnail"), updateVideo);

router.route("/toggle/publish/:videoId").patch(verifyJWT, togglePublishStatus);

export default router;