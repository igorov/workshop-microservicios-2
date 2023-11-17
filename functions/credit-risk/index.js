const functions = require('@google-cloud/functions-framework');

functions.http('api', (req, res) => {
  const customer = req.query.customer;
  console.log(`Request for ${customer}`);

  //res.send(`Hello ${req.query.name || req.body.name || 'World'}!`);
  // Generar un número aleatorio entre 0 y 1
  const randomValue = Math.random();

  // Asignar el valor de "risk" según las probabilidades especificadas
  let riskValue;
  if (randomValue < 0.4) {
    riskValue = 'medio';
  } else if (randomValue < 0.8) {
    riskValue = 'bajo';
  } else {
    riskValue = 'alto';
  }

  // Obtener la fecha y hora actual para el campo "time"
  const currentTime = new Date();
  const timeValue = currentTime.toISOString();

  // Construir el objeto JSON de respuesta
  const responseJson = {
    risk: riskValue,
    time: timeValue
  };

  // Enviar la respuesta como JSON
  res.json(responseJson);
});
