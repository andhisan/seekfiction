import searchAniList from './anilist';
import searchJikan from './jikan';
import searchKitsu from './kitsu';
import searchSimkl from './simkl';
import * as admin from 'firebase-admin';
import { groupAnimesByTitleRomaji } from './optimize';
import { SearchAllResult } from '@sasigume/seekfiction-commons';

const firestore = admin.firestore;

/**
 * Search across 4 APIs and return anime data
 * @param {string} searchString Anime title to search
 * @return {void}
 */
export const searchApiAnime = async (searchString: string): Promise<SearchAllResult> => {
  try {
    const createdAt = firestore.Timestamp.fromDate(new Date());
    const jikanResult = await searchJikan(searchString);
    const aniListResult = await searchAniList(searchString);
    const kitsuResult = await searchKitsu(searchString);
    const simklResult = await searchSimkl(searchString);

    const all = [...jikanResult.data, ...aniListResult.data, ...kitsuResult.data, ...simklResult.data];
    const groupedByTitleRomaji = groupAnimesByTitleRomaji(all);
    return {
      searchString,
      createdAt,
      data: groupedByTitleRomaji,
    };
  } catch (e) {
    return { message: JSON.stringify(e) };
  }
};
