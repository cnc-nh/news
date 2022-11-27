import Image from 'next/image'
import Link from 'next/link'

const customLoader = ({ src }) => {
    return `/${src}`
}

export default function Layout({ children }) {
    return (
        <div>
            <header className="flex flex-col dark:bg-black">
                <div className="max-w-screen-md mx-10 my-4">
                <Link href='https://cnc.novushierosolymis.ml'>
                    <a href='https://cnc.novushierosolymis.ml'>
                        <Image
                        loader={customLoader}
                        alt=''
                        src="CNC.svg"
                        width={143}
                        height={54}
                        style={{
                            width: 'auto',
                            margin: '0',
                            padding: '0'
                            }}
                        />
                    </a>
                </Link>
                </div>
                <div className="bg-gradient-to-tr from-cncRed to-cncGold px-10 py-1">
                    <h1 className="text-white text-4xl font-semibold">
                        <a href='/'>NEWS</a>
                    </h1>
                </div>
            </header>
            <div className='dark:bg-black'>{children}</div>
            <footer className="bg-gradient-to-tr from-cncRed to-cncGold px-10 py-2 w-screen text-center">
                <p className="text-white text-sm">Copyright © 2022 CNC, Incorporated.</p>
            </footer>
        </div>
    );
}