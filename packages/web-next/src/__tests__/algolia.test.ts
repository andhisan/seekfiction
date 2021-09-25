import { algolia } from '@/lib/algolia';

describe('Algolia client', () => {
  test('Client is ok', () => {
    expect(algolia.appId.length).toBeGreaterThan(0);
  });
});
