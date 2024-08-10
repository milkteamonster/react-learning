import Layout from '../../components/layout';
import {getAllPostIds, getPostData} from '../../lib/posts';

// export default function Post() {
// 	return <Layout>...</Layout>;
// }
export default function Post({postData}) {
	return (
		<Layout>
			{postData.title}
			<br />
			{postData.id}
			<br />
			{postData.date}
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
	const postData = getPostData(params.id);
	return {
		props: {
			postData,
		},
	};
}
