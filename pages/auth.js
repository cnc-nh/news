import Link from "next/link";
import { useState } from "react";
import CNCNewsLogo from '../public/images/CNC_News.svg'
import { useUser } from "@/context/user";
import { useRouter } from "next/router";

export default function LogIn() {

    const { user, logIn } = useUser();
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    function handleSignIn() {
        logIn(email, pass);
        event.preventDefault();
    }

    if (user) {
        router.push('/dashboard')
    } else {
        return (
            <main className="flex items-center justify-center w-screen h-screen bg-blue-50 dark:text-white dark:bg-slate-900">
                <div className="w-auto sm:w-1/2 md:w-1/3 p-8 shadow-lg rounded-lg border-gray-100 border flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 dark:border-gray-800">
                    <div className="flex flex-col items-center gap-3">
                        <CNCNewsLogo className='w-48 h-11 object-fit' />
                        <h1 className="text-2xl font-semibold text-center">Staff Login</h1>
                    </div>
                    <form className="flex flex-col gap-8">
                        <fieldset className="flex flex-col gap-4">
                            <fieldset className="flex flex-col gap-1">
                                <label htmlFor="email">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input  type="email"
                                        id="email"
                                        className="py-2 px-4 shadow-inner shadow-gray-300 dark:shadow-slate-900 rounded-md dark:bg-gray-800"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                />
                            </fieldset>
                            <fieldset className="flex flex-col gap-1">
                                <label htmlFor="password">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <input  type="password"
                                        id="password"
                                        className="py-2 px-4 shadow-inner shadow-gray-300 dark:shadow-slate-900 rounded-md dark:bg-gray-800"
                                        value={pass}
                                        onChange={e => setPass(e.target.value)}
                                        required
                                />
                            </fieldset>
                        </fieldset>
                        <button className="bg-blue-500 p-2 text-white font-bold rounded-md" onClick={(e) => {handleSignIn()}}>Log in</button>
                    </form>
                    <p className="text-sm text-gray-500 text-center">
                        No account? Register <Link href="./auth/register" className="font-bold underline">here.</Link>
                    </p>
                </div>
            </main>
        )
    }
}