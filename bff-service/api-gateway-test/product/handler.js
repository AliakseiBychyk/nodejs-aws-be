module.exports.product = (event, context, cb) => {
  const appResponse = {
    api: 'product',
    id: '12345',
    name: 'productName',
    quantity: 20,
    manufacturer: 'Matsushita Denki'
  };

  const response = {
    statusCode: 200,
    body: JSON.stringify(appResponse)
  };
  
  cb(null, response);
}
