import express from 'express';
import multer from 'multer';
import { analyzeResume } from '../controllers/resumeAnalysisController.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const upload = multer({ dest: `${process.env.UPLOAD_DIR}` });

router.post('/analyze-resume', upload.single('resume'), analyzeResume);

export default router;
