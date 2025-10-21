const express = require('express');
const router = express.Router()

router.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

router.get('/api/signup',(req,res)=>{

})

export default router