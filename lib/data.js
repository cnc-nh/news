import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), '_content')

export function getAllPosts() {
    console.log(contentDir)
    const allPosts = fs.readdirSync(contentDir);

    const content = allPosts.map(fileName => {
        const slug = fileName.replace('.mdx', '')
        const fileContents = fs.readFileSync(path.join(contentDir, fileName), 'utf-8')
        const {data, content} = matter(fileContents)
        return {
            data,
            content,
            slug
        }
    })
    return content.sort(({ date: a }, { date: b }) => {
        if (a < b) {
        return 1
        } else if (a > b) {
        return -1
        } else {
        return 0
        }
    })
}