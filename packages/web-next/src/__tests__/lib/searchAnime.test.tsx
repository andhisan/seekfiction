import axios from 'axios';

// Somehow simply putting .env cannot set env WHY???
// I still need to set env in shell
const baseUri = process.env.NEXT_PUBLIC_FUNCTIONS;
const token = process.env.NEXT_PUBLIC_FUNCTIONS_AUTH;

const searchWord = 'のんのんびより';

describe('Search anime', () => {
  test(`Search by word ${searchWord}`, async () => {
    const response = await axios(`${baseUri}/search-all`, {
      method: 'GET',
      params: {
        q: searchWord,
      },
      headers: {
        Authorization: token,
      },
    });
    const data = response.data.data;
    const count = data.jikan.length + data.aniList.length + data.kitsu.length + data.simkl.length;
    console.debug(`Found ${count} anime`);
    count > 0 && console.info('にゃんPASSー');
    expect(count).toBeGreaterThan(0);
  });
});
