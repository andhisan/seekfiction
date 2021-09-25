import axios from 'axios';

// Somehow simply putting .env cannot set env WHY???
// I still need to set env in shell
const baseUri = process.env.FUNCTIONS;
const token = process.env.FUNCTIONS_AUTH;

describe('Check API status', () => {
  const path = '/status';
  test(`GET ${path}`, async () => {
    const response = await axios(`${baseUri}${path}`, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    });
    console.debug(response.data);
    expect(response.data.message).toEqual('OK');
  });
});
