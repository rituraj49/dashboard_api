import express from 'express';
import { createCar, getAll, getSingle, removeCar, updateCar } from '../controllers/carController.js';

const router = express.Router();

router.post("/create", createCar);
router.get("/get", getAll);
router.get("/get-one/:id", getSingle);
router.delete("/remove/:id", removeCar);
router.put("/update/:id", updateCar);

export default router;