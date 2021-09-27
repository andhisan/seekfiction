import useSWR from 'swr';

/**
 * Fetch index count from meilisearch
 *
 * @see https://docs.meilisearch.com/reference/api/stats.html#get-stat-of-an-index
 */
const getIndexCount = async (indexName: string) => {
  const res = await fetch(`${process.env.MEILI_URL ?? ''}/indexes/${indexName}/stats`, {
    headers: {
      'X-Meili-API-Key': process.env.MEILI_API_KEY ?? '',
    },
  });
  if (!res.ok) {
    const error = new Error(`Error occured while getting index count: ${res.statusText}`);
    throw error;
  }
  return res.json();
};

interface Props {
  indexName: string;
}

const StatsBox: React.FC<Props> = (props) => {
  const { data, error } = useSWR(props.indexName, (indexName) => getIndexCount(indexName), {
    refreshInterval: 0,
    errorRetryCount: 0,
  });
  if (error) return <div>{error.message}</div>;
  return (
    <p className="font-bold text-xl">
      Anime count:{` `}
      <b className="text-2xl">{data ? data.numberOfDocuments : 'Loading...'}</b>
    </p>
  );
};

export default StatsBox;
