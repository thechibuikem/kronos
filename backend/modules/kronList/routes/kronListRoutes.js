import express from "express"
import { addKronsController, deleteKronController } from "../controller/kronListController.js"
import { getAllkronsController } from "../controller/kronListController.js"

const router = express.Router()//creating router instance
//routes for the kron service
router.get("v1/krons", getAllkronsController);//route to get all krons
router.post("v1/kron",addKronsController)//route to add krons
router.delete("v1/kron/:repoId",deleteKronController)

export default router