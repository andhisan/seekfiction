import searchAniList from './anilist';
import searchJikan from './jikan';
import searchKitsu from './kitsu';
import searchSimkl from './simkl';
import * as admin from 'firebase-admin';
const firestore = admin.firestore;

export const searchAllApi = async (searchString: string) => {
  try {
    const createdAt = firestore.Timestamp.fromDate(new Date());
    const jikanResult = await searchJikan(searchString);
    const aniListResult = await searchAniList(searchString);
    const kitsuResult = await searchKitsu(searchString);
    const simklResult = await searchSimkl(searchString);
    return {
      searchString,
      createdAt,
      data: {
        jikan: jikanResult.data,
        aniList: aniListResult.data,
        kitsu: kitsuResult.data,
        simkl: simklResult.data,
      },
    };
  } catch (e) {
    return { message: JSON.stringify(e) };
  }
};
