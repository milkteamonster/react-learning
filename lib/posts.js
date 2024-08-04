import fs from 'fs'; //是一個 Node.js 模組，可以讓你從檔案系統中讀取檔案
import matter from 'gray-matter'; //是一個函式庫，可以讓你解析 markdown 檔案中的 metadata
import path from 'path'; //是一個 Node.js 模組，可以讓你操作檔案路徑

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
