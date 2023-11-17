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

  console.log(`Mensaje: orden: ${msg.orden}, cliente: ${msg.cliente}, monto: ${msg.monto}, descripcion: ${msg.descripcion}, estado: ${msg.estado}`);
  const firestore = new Firestore();

  const customerURL = process.env.CUSTOMERS_URL;
  const collectionView = process.env.ORDER_VIEW;

  if (!customerURL || !collectionView) {
    throw new Error('Environment variables are not set');
  }

  try {
    const responseCustomer = await fetch(`${customerURL}/customers/${msg.cliente}`);
    const customer = await responseCustomer.json();
    console.log(`Customer: ${customer.nombre}`)

    let collectionRef = firestore.collection(collectionView);
    // Add a document with an auto-generated ID.
    collectionRef.add({
        orden: msg.orden,
        cliente: customer.nombre,
        monto: msg.monto,
        estado: msg.estado,
        descripcion: msg.descripcion
    }).then((documentRef) => {
      console.log(`Added document at ${documentRef.path})`);
    });
  } catch(error) {
    console.log(`Error: ${error}`)
  }
});