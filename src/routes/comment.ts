import express from "express";
import { CommentController } from '../controllers';

const router = express.Router();

router.post('/', CommentController.create);

export default router;
