const functions = require('@google-cloud/functions-framework');
const { Firestore } = require('@google-cloud/firestore');

// Register a CloudEvent callback with the Functions Framework that will
// be executed when the Pub/Sub trigger topic receives a message.
functions.cloudEvent('helloPubSub', async (cloudEvent) => {
  // The Pub/Sub message is passed as the CloudEvent's data payload.
  const base64name = cloudEvent.data.message.data;

  const data = base64name
    ? Buffer.from(base64name, 'base64').toString()
    : 'World';

  var msg = JSON.parse(data);
  console.log(`Mensaje: orden: ${msg.orden}, result: ${msg.result}`);
  const firestore = new Firestore();
  const collectionView = process.env.ORDER_VIEW;

  try {
    // Obtener referencia al documento por el campo de búsqueda
    const collection = firestore.collection(collectionView);
    const query = collection.where("orden", '==', msg.orden);
    let retries = 0;
    let ordenDB;

    while (retries < 6) {
      console.log(`Retry: ${retries}`)
      const querySnapshot = await query.get();
      if(!querySnapshot.empty) {
        console.log("Documento encontrado")
        ordenDB = querySnapshot.docs[0].ref;
        break;
      }
      console.log('No hay documentos con el ID de orden buscado');
      await new Promise((resolve) => setTimeout(resolve, 10000)); // Esperar 10 segundo antes de reintentar
      retries++;
    }

    if(ordenDB) {
      console.log(`ordenDB: ${ordenDB.path}`);

      if(msg.result === 'OK') {
        estado = 'a'
      } else {
        estado = 'd'
      }
      console.log("Actualizando...")
      await ordenDB.update({
        estado
      });

      console.log('Actualizado');
    } else {
      console.log("Cantidad maxima de reintentos")
    }

  } catch (error) {
    console.error("Error al obtener el documento:", error);
    return null;
  }
});