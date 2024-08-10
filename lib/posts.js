import fs from 'fs'; //是一個 Node.js 模組，可以讓你從檔案系統中讀取檔案
import matter from 'gray-matter'; //是一個函式庫，可以讓你解析 markdown 檔案中的 metadata
import path from 'path'; //是一個 Node.js 模組，可以讓你操作檔案路徑
import {remark} from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
	// 拿取 /posts 資料夾中的所有檔案名稱
	const fileNames = fs.readdirSync(postsDirectory);
	const allPostsData = fileNames.map((fileName) => {
		// 移除名稱中的 ".md"，並將它當作 id
		const id = fileName.replace(/\.md$/, '');

		// 將 markdown 內容轉換為字串
		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, 'utf8');

		// 使用 gray-matter 解析 metadata 區塊
		const matterResult = matter(fileContents);

		// 將資料與 id 結合
		return {
			id,
			...matterResult.data,
		};
	});
	// 依照日期排序
	return allPostsData.sort((a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	});
}

//這個函式會回傳一個在 posts 路徑底下檔案名稱（不包含 .md）的清單
export function getAllPostIds() {
	const fileNames = fs.readdirSync(postsDirectory);

	// Returns an array that looks like this:
	// [
	//   {
	//     params: {
	//       id: 'ssg-ssr'
	//     }
	//   },
	//   {
	//     params: {
	//       id: 'pre-rendering'
	//     }
	//   }
	// ]
	return fileNames.map((fileName) => {
		return {
			params: {
				id: fileName.replace(/\.md$/, ''),
			},
		};
	});
}

//會根據 id 回傳文章資料
//重要： 這裡與先前比較增加了async,因為我們需要在 remark 部分使用 await，所以我們新增了關鍵字 async 到 getPostData。 async/await的作用是可以讓你以非同步的方式來請求資料。
export async function getPostData(id) {
	const fullPath = path.join(postsDirectory, `${id}.md`);
	const fileContents = fs.readFileSync(fullPath, 'utf8');

	// Use gray-matter to parse the post metadata section
	const matterResult = matter(fileContents);

	// Use remark to convert markdown into HTML string
	const processedContent = await remark().use(html).process(matterResult.content);
	const contentHtml = processedContent.toString();

	// Combine the data with the id and contentHtml
	return {
		id,
		contentHtml,
		...matterResult.data,
	};
}
