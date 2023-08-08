function changeColor() {
  
   
     buttonMenssage.style.background = "red";

   

 }


 
 const data2 = {
    campo1: document.getElementById(`id`).value,
    campo2: `prueba`
  };
  
  fetch('/pruebaFetch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data2)
  })
    .then(response => response.json())
    .then(data => {
      // Aquí puedes acceder a los datos recibidos
      const images = data.images;
      images.forEach(image => {
        console.log(`>>>> id `+image.id);
        console.log(`>>>> nombre `+image.name);
        // Aquí puedes acceder a cualquier otro campo que hayas incluido en el objeto image
      },
      document.getElementById(`id1`).value = images[1].id,
      alert(images[1].id)
      );
  
      //console.log(`desde la ruta: ${JSON.stringify(data)}`);
    })
    .catch(error => {
      // Aquí puedes manejar cualquier error que ocurra
      console.error('Error:', error);
    });
