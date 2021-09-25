import type { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';
import Layout from '@/components/theme/app/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  let message = '';
  let status = 500;
  const q = context.query.q;
  if (typeof q == 'string') {
    await fetch(process.env.FUNCTIONS + '/update-anime?q=' + q, {
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
        message: 'ワードを指定してください',
      },
    };
  }
};

const Update: NextPage<Props> = (props) => {
  const router = useRouter();
  if (!props.q) {
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
        <p>
          Sucessfully updated database for word <b>{props.q}</b>! <br />
          It takes a few seconds for new results to appear.
        </p>
      ) : (
        <p>Woops! Try another word.</p>
      )}
      <pre className="bg-gray-300 p-3 rounded-lg">{props.message}</pre>
      <div>
        <Link href="/">
          <a className="block p-3 rounded-xl bg-blue-500 text-white">BACK TO TOP</a>
        </Link>
      </div>
    </Layout>
  );
};

export default Update;
