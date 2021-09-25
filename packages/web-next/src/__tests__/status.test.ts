import axios from 'axios';

// Somehow simply putting .env cannot set env WHY???
// I still need to set env in shell
const baseUri = process.env.NEXT_PUBLIC_FUNCTIONS;
const token = process.env.NEXT_PUBLIC_FUNCTIONS_AUTH;

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
    response.status == 200 && console.info('にゃんPASSー');
    expect(response.status).toEqual(200);
  });
});
