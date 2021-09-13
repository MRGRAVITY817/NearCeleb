import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import useSWR from "swr";

export default () => {
  const router = useRouter();
  const { data, error } = useSWR(
    router.query.session_id ? `/api/checkout/${router.query.session_id}` : null,
    (url) => fetch(url).then((res) => res.json())
  );
  return (
    <div>
      <Head>Payment Result | Near Celeb</Head>
      <div className="h-screen">
        <h1>Payment Result</h1>
        <pre>{data ? JSON.stringify(data, null, 2) : `Loading...`}</pre>
        <button></button>
      </div>
    </div>
  );
};
