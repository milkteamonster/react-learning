import Head from 'next/head';
import Date from '../../components/date';
import Layout from '../../components/layout';
import {getAllPostIds, getPostData} from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';

// export default function Post() {
// 	return <Layout>...</Layout>;
// }
export default function Post({postData}) {
	return (
		<Layout>
			<Head>
				<title>{postData.title}</title>
			</Head>
			<article>
				<h1 className={utilStyles.headingXl}>{postData.title}</h1>
				<div className={utilStyles.lightText}>
					<Date dateString={postData.date} />
				</div>
				<div dangerouslySetInnerHTML={{__html: postData.contentHtml}} />
			</article>
		</Layout>
	);
}

// Return a list of possible value for id (我們需要為 id 回傳一個可能的值的清單)
export async function getStaticPaths() {
	const paths = getAllPostIds();
	return {
		paths,
		fallback: false,
	};
}

// Fetch necessary data for the blog post using params.id (使用 id 去抓取部落格文章需要的資料)
export async function getStaticProps({params}) {
	// Add the "await" keyword like this:
	//這裡與先前比較增加了 await, 因為post.js那邊使用了async
	const postData = await getPostData(params.id);
	return {
		props: {
			postData,
		},
	};
}
