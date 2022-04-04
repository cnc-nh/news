import Head from 'next/head'
import { getAllPosts } from '../../lib/data'
import { format, parseISO } from 'date-fns'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

export async function getStaticPaths() {
    return {
        paths: getAllPosts().map((post) => ({
            params: {
                slug: post.slug,
            },
        })),
        fallback: false,
    }
}

export async function getStaticProps(context) {
    const allPosts = getAllPosts();
    const { params } = context;
    const { data, content } = allPosts.find((item) => item.slug === params.slug)
    const mdxSource = await serialize(content)
    return {
        props: {
            ...data,
            date: data.date.toISOString(),
            content: mdxSource,
            description: data.description,
            slug: params.slug,
            socialImage: data.socialPic,
        },
    }
}

export default function ArticlePage({ slug, title, date, description, content, socialImage }) {
    return (
        <div className='dark:bg-black'>
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:type" content="article" />
            <meta property='og:description' content={description}/>
            <meta property="og:url" content={`https://cnc-news.novushierosolymis.ml/articles/${slug}`} />
            <meta property='og:image' content={`${socialImage}`}/>
            <meta name="theme-color" content="#FFC133" />
            <link rel="icon" href='/CNCfavicon.png' />
        </Head>

        <main className='flex justify-center items-center'>
            <div className='divide-y divide-gray-400 max-w-3xl lg:max-w-5xl p-4'>
                <div className='p-4'>
                    <h1 className='text-3xl font-semibold dark:text-white'>{title}</h1>
                    <p className='text-sm font-light text-gray-500'>{format(parseISO(date), 'MMMM dd, uuu')}</p>
                </div>
                <div className='p-8 prose dark:prose-invert max-w-none'><MDXRemote {...content} /></div>
            </div>
        </main>
        </div>
    )
}