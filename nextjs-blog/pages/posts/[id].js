import utilStyles from "../../styles/utils.module.css";
import Head from "next/head";
import Layout from "../../components/layout";
import Date from "../../components/date";
import { getAllPostIds, getPostData } from "../../lib/posts";

export default function Post({ postData, id }) {
  console.log(id);
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      {postData.title}
      <br />
      {postData.id}
      <br />
      <Date dateString={postData.date} />
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
      id: params.id,
    },
  };
}
