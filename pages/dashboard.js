import { auth } from "@/lib/firebase";
import Link from "next/link";
import CNCNewsLogo from '../public/images/CNC.svg'
import { BsBoxArrowRight } from "react-icons/bs";
import { useUser } from "@/context/user";

export default function Dashboard() {
    const { user, signOut } = useUser()

    if (user) {
        console.log(user)

        const name = user.displayName.split(" ");
        return (
            <main className="bg-slate-50 dark:bg-slate-900 dark:text-slate-50 text-slate-900 w-screen h-screen">
                <nav className="flex justify-between px-6 py-4 bg-gray-100 dark:bg-gray-800">
                    <p className="flex items-center gap-1 text-2xl"><CNCNewsLogo className="w-24 h-11" alt="Logo of CNC"/> Staff Dashboard</p>
                    <button onClick={e => signOut()} title="Log out" className="text-3xl"><BsBoxArrowRight /></button>
                </nav>
                <section className="px-12 py-8">
                    <h1 className="text-3xl font-semibold">Welcome, {name[0]}</h1>
                </section>
            </main>
        )
    } else {
        return (
            <main className="flex flex-col gap-2 justify-center items-center bg-slate-50 dark:bg-slate-900 dark:text-slate-50 text-slate-900 w-screen h-screen">
                <CNCNewsLogo className="w-48 h-11"/>
                <p>You cannot access this page.</p>
            </main>
        )
    }
}