import type { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';
import Layout from '@/components/theme/app/Layout';
import { useRouter } from 'next/router';
import { useLoading } from '@/lib/loading-hook';
import PreBox from '@/components/atoms/PreBox';
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

/**
 * Send update request on server side
 *
 * @param context
 * @returns
 */
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  let message = 'Error message not returned from API';
  let status = 500;
  const q = context.query.q;
  if (typeof q == 'string') {
    await fetch(process.env.FUNCTIONS + '/update-anime?q=' + encodeURIComponent(q), {
      method: 'GET',
      headers: {
        Authorization: process.env.FUNCTIONS_AUTH ?? '',
      },
    })
      .then(async (res) => {
        const json = await res.json();
        message = json.message;
        status = res.status;
      })
      .catch((e) => console.error(e));

    return {
      props: {
        message,
        status,
        q,
      },
    };
  } else {
    return {
      props: {
        message: 'Please specify word',
        status: 422,
      },
    };
  }
};

/**
 * User move to this page after press enter key
 * @param props
 * @returns
 */
const Update: NextPage<Props> = (props) => {
  const router = useRouter();
  const { setLoading } = useLoading();

  // Back to top
  const handleBack = () => {
    setLoading(false);
    router.push('/');
  };

  if (!props.q) {
    // Back to home
    if (typeof window !== 'undefined') {
      console.error(props.message);
      router.push('/');
    }
    return null;
  }

  return (
    <Layout>
      <p>Thank you for using seekfiction!</p>
      {props.status == 200 ? (
        <>
          <p>
            Sucessfully updated database for word <b>{props.q}</b>! <br />
            Message from server shown below:
          </p>
          <pre className="bg-gray-300 p-3 rounded-lg">{props.message}</pre>
        </>
      ) : (
        <>
          <p>Woops! Error shown below:</p>
          <PreBox>
            {props.status} / {props.message}
          </PreBox>
        </>
      )}

      <div>
        <a onClick={handleBack} className="cursor-pointer block p-3 rounded-xl bg-blue-500 text-white">
          BACK TO TOP
        </a>
      </div>
    </Layout>
  );
};

export default Update;
