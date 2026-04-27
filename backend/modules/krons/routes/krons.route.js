import express from "express"
import { addKronsController, deleteKronController } from "../controllers/krons.controller.js"
import { getAllkronsController } from "../controllers/krons.controller.js"
import { verifyrefreshToken } from "../../../core/middlewares/refreshToken.middleware.js"

const router = express.Router()
router.get("/krons", verifyrefreshToken,getAllkronsController);
router.post("/kron",verifyrefreshToken,addKronsController)
router.delete("/kron/:repoId",verifyrefreshToken,deleteKronController)

export default router