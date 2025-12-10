import express from 'express';
import {
  insertStudent,
  getStudents,getStudentById,
  updateStudent,
  deleteStudent
} from '../controllers/studentController.js';

const router = express.Router();

router.post('/', insertStudent);
router.get('/', getStudents);
router.get('/:id', getStudentById);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

export default router;