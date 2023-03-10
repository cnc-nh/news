import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import CNCNewsLogo from '../../public/images/CNC_News.svg'
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs"
import { useUser } from "@/context/user"

export default function SignUp() {
    const { user, createAcc } = useUser();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [showPass, setShowPass] = useState(false)
    const router = useRouter();

    function handleRegister() {
        createAcc(name, email, pass);
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
                        <h1 className="text-2xl font-semibold text-center">Staff Registration</h1>
                    </div>
                    <form className="flex flex-col gap-8">
                        <fieldset className="flex flex-col gap-4 w-full">
                            <fieldset className="flex flex-col gap-1">
                                <label htmlFor="name">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input  type="name"
                                        id="name"
                                        className="py-2 px-4 border dark:border-gray-700 rounded-md dark:bg-gray-800 w-full"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        required
                                />
                            </fieldset>
                            <fieldset className="flex flex-col gap-1">
                                <label htmlFor="email">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input  type="email"
                                        id="email"
                                        className=" py-2
                                                    px-4
                                                    border
                                                    dark:border-gray-700
                                                    rounded-md
                                                    dark:bg-gray-800
                                                    peer
                                                    dark:invalid:bg-red-800/40
                                                    dark:invalid:border-red-900
                                                    invalid:border-red-500
                                                    invalid:bg-red-50"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                />
                            </fieldset>
                            <fieldset className="flex flex-col gap-1">
                                <label htmlFor="password">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <div className="flex gap-2">
                                    <input  type={showPass ? "text" : "password"}
                                            id="password"
                                            className=" py-2
                                                        px-4
                                                        border
                                                        dark:border-gray-700
                                                        rounded-md
                                                        dark:bg-gray-800
                                                        dark:invalid:bg-red-800/40
                                                        dark:invalid:border-red-900
                                                        invalid:border-red-500
                                                        invalid:bg-red-50
                                                        grow"
                                            value={pass}
                                            onChange={e => setPass(e.target.value)}
                                            required
                                            minLength={8}
                                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W+).{8,}"
                                            title="Passwords should be at least 8 characters long, have at least 1 uppercase and lowercase letter, at least 1 digit and at least 1 special character."
                                    >
                                    </input>
                                    <button className="text-white z-10 py-2 px-4 border
                                                    dark:border-gray-700
                                                    rounded-md
                                                    dark:bg-gray-800"
                                            onClick={()=>setShowPass(!showPass)}
                                            title="Show password"
                                            type="button">
                                                {showPass ? <BsEyeFill /> : <BsEyeSlashFill />}
                                    </button>
                                </div>
                            </fieldset>
                        </fieldset>
                        <button className="bg-blue-500 p-2 text-white font-bold rounded-md" onClick={(e)=>handleRegister()}>Register</button>
                    </form>
                    <p className="text-sm text-gray-500 text-center">
                        Already have an account? Log in <Link href="./" className="font-bold underline">here.</Link>
                    </p>
                </div>
                <p className="hidden text-red-500 dark:text-red-300"></p>
            </main>
        )
    }
}