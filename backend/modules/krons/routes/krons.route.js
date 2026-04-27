import express from "express"
import { addKronsController, deleteKronController } from "../controllers/krons.controller.js"
import { getAllkronsController } from "../controllers/krons.controller.js"

const router = express.Router()
router.get("/krons", getAllkronsController);
router.post("/kron",addKronsController)
router.delete("/kron/:repoId",deleteKronController)

export default router