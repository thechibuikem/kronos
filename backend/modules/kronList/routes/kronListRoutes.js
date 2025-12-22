import express from "express"
import { addKronsController } from "../controller/kronListController.js"
import { getAllkronsController } from "../controller/kronListController.js"

const router = express.Router()//creating router instance

router.get("/allKrons", getAllkronsController);//route to get all krons
router.post("/addKron",addKronsController)//route to add krons

export default router