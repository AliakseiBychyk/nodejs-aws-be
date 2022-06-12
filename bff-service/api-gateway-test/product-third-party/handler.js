module.exports.product = (event, context, cb) => {
  const appResponse = {
    api: 'product-third-party',
    id: '68523',
    name: 'third-party-productName',
    quantity: 20,
    manufacturer: 'Horizont'
  };

  const response = {
    statusCode: 200,
    body: JSON.stringify(appResponse)
  };
  
  cb(null, response);
}
