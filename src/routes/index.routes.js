const multer = require('multer');
const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();



  
// Configuración de Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


  
router.post('/upload', upload.single('imagen'), require('../controllers/index.controllers.js').upload);

  // index page
  router.get('/index',require('../controllers/index.controllers.js').index)
  
  router.post('/delete-image',require('../controllers/index.controllers.js').delete )
  router.post('/image',require('../controllers/index.controllers.js').image )
  router.post('/prueba',require('../controllers/index.controllers.js').getPrueba )
  router.get('/images',require('../controllers/index.controllers.js').images )
 




  module.exports = router;