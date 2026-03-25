import express from "express"
import { addKronsController, deleteKronController } from "../controller/kronListController.js"
import { getAllkronsController } from "../controller/kronListController.js"

const router = express.Router()//creating router instance
//routes for the kron service
router.get("/krons", getAllkronsController);//route to get all krons
router.post("/kron",addKronsController)//route to add krons
router.delete("/kron/:repoId",deleteKronController)

export default router