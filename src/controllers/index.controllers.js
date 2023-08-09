
const mimeTypes = require('mime-types')
const multer = require('multer');
const Image = require('../models/imageSchema');
const { json } = require('express');



const controller = {}

controller.getPagina  = (req, res) => {
  res.render("pagina")
  
}


controller.getJSON  = (req, res) => {
  res.send({status:"todo bien"})
 
}

controller.index = (req, res) => {
 res.render('index.ejs');
}


// Ruta para subir una imagen
controller.upload = async (req, res, next) => {
  try {


    const image = req.file;

    // Verificar si se cargaron los archivos esperados
    if (!image) {
      return res.status(400).send('Se requiere un archivo.');
    }

    // Obtener los detalles del archivo cargado
    const { originalname, buffer, mimetype } = image
      ;

    // Crear una nueva instancia de Image
    const newImage = new Image({
      name: originalname,
      data: buffer,
      contentType: mimetype
    });

    // Guardar la imagen en la base de datos
    const savedImage = await newImage.save();

    res.json({
      resultado: true,
     msj: 'Se guarda la imagen',
      newImage: savedImage
     });
    //Redireccionar a la página de imágenes
    //res.redirect('/api/images');



  } catch (err) {
    console.error('Error al guardar la imagen:', err);
    res.status(500).send('Error al guardar la imagen en la base de datos.');
  }
};


///ruta para ver imagenes
controller.images = async (req, res) => {
  try {
    const images = await Image.find({});

    if (!images ) {
      return res.status(404).send('Imagen no encontrada.');
    }
  ////ruta para ver imagenes por medio de un arreglo
     // Suponiendo que la imagen está almacenada en la base de datos como un campo "data"
    // y que su tipo MIME es "image/jpeg"
     // Crear un arreglo para almacenar las imágenes en formato base64
     const imageArray = [];

     // Recorrer todas las imágenes y agregar sus datos al arreglo
     images.forEach(image => {
       imageArray.push(image.data);
     });
 
     // Ajustar el Content-Type según el tipo MIME correcto de las imágenes en tu base de datos
     res.setHeader('Content-Type', 'image/jpeg');
 
     // Enviar el arreglo de imágenes como respuesta
     res.send(imageArray);
    
  } catch (err) {
    console.error('Error al obtener las imágenes:', err);
    res.status(500).send('Error al obtener las imágenes de la base de datos.');
  }
};
////
controller.delete = async (req, res) => {
  try {
    const imageId = req.body.imageId;
    // Eliminar la imagen por su ID en la base de datos
    if (!imageId) {
      return res.status(404).send('Imagen no encontrada');
    }
    console.log(`imagen borrada ` + req.body.imageId)
    const result = await Image.findByIdAndDelete(imageId);
    //res.status(404).send(`Imagen eliminada correctamente`)

    res.redirect('/images');

  } catch (err) {
    console.error('Error al eliminar la imágen:', err);
    res.status(500).send('Error al eliminar la imágen de la base de datos.');
  }
};
///
///ruta para ver una  imagen
controller.image = async (req, res) => {
  try {
    const imageId = req.body.imageId;
    const image = await Image.findById(imageId);

    if (!image) {
      console.log('Imagen no encontrada')
      return res.status(404).send('Imagen no encontrada');

    }

    res.render('image', { image });
  } catch (err) {
    console.error('Error al obtener la imágen:', err);
    res.status(500).send('Error al obtener la imágen de la base de datos.');
  }
};

///
controller.getPrueba = async (req, res) => {

  try {
    const images = await Image.find({});

    if (!images) {
      return res.status(404).send('Imagen no encontrada');
    }



    res.render('prueba', { images });
  } catch (err) {
    console.error('Error al obtener las imágenes:', err);
    res.status(500).send('Error al obtener las imágenes de la base de datos.');
  }
};
////
controller.prueba = async (req, res) => {
  try {
    const dataPrueba = req.body;
    console.log(`desde Prueba: ${JSON.stringify(dataPrueba)}`);

    const images = await Image.find({});

    if (!images || images.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron imágenes' });
    }

    const data = {
      images: images.map(image => ({
        id: image._id,
        name: image.name,
        // Otros campos que desees incluir
      }))
    };
    //res.render('prueba', { images });  
    res.json(data);



  } catch (err) {
    console.error('Error :', err);
    res.status(500).send('Error datos.');
  }
};
///


module.exports = controller