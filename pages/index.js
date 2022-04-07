import Head from 'next/head'
import Link from 'next/link'
import { getAllPosts } from '../lib/data'
import { format, parseISO } from 'date-fns'
import Layout from '../components/layout'

export async function getStaticProps() {
    const allPosts = getAllPosts();
    const posts = allPosts.map(({ data, content, slug }) => ({
                    ...data,
                    date: data.date.toISOString(),
                    description: data.description,
                    content,
                    slug,
                  }))
    posts.sort((a, b) => a.position > b.position ? 1 : -1 );
    return {
        props: {
            posts
        },
    }
}

export default function Home({ posts }) {
  return (
    <Layout>
      <div className='max-w-3xl xl:max-w-5xl mx-auto px-10 dark:bg-black'>
        <Head>
          <title>CNC News - Home</title>
          <meta name="description" content="Vigilant, neutral and authoritative news for Novohierosolymians." />
          <meta property="og:title" content="CNC News - Home" />
          <meta property="og:type" content="website" />
          <meta property='og:description' content='Vigilant, neutral and authoritative news for Novohierosolymians.'/>
          <meta property="og:url" content="https://cnc-news.novushierosolymis.ml" />
          <meta property='og:image' content='https://cnc-news.novushierosolymis.ml/CNCsocialPic.png'/>
          <meta name="theme-color" content="#FFC133" />
          <link rel="icon" href='/CNCfavicon.png' />
        </Head>

        <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
          {posts.map((item) => (  
            <ListArticles key={item.slug} {...item} />  
          ))}  
        </ul>  
      </div>
    </Layout>
  )
}

function ListArticles({ slug, title, date, description }) {
  return (
    <li className='py-12'>
      <article>
        <div className='space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0'>
          <dl>
            <dt className="sr-only">{'Published on'}</dt>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={date}>{format(parseISO(date), 'MMMM dd, uuu')}</time>
            </dd>
          </dl>
          <div className="space-y-5 xl:col-span-3">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold leading-8 tracking-tight">
                <Link href={`/articles/${slug}`}>
                  <a className='text-gray-900 dark:text-gray-100'>{title}</a>
                </Link>
              </h2>
            </div>
            <div className="prose max-w-none text-gray-500 dark:text-gray-400">
              {description}
            </div>
          </div>
          <div className="text-base font-medium leading-6">
            <Link href={`/articles/${slug}`}>
                  <a className='text-black hover:text-gray-800 dark:text-gray-500 dark:hover:text-gray-400 transition transition-duration-300' aria-label={`Read "${title}"`}>Read more →</a>
            </Link>
          </div>
        </div>
        </div>
      </article>
    </li>
  )                
}
