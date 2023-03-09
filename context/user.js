import { createContext, useState, useEffect, useContext } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Context = createContext();

const Provider = ({ children }) => {
    const [user, setUser] = useState(auth.currentUser)
    const router = useRouter()

    useEffect(() => {
        onAuthStateChanged(auth, () => {
            setUser(auth.currentUser)
        })
    }, [])

    const signIn = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password).then((credentials)=>{
            console.log(credentials.user())
            router.push('/dashboard')
        }).catch(err => {
            toast.error(`The email or password is incorrect.`)
        })
    }

    const signOut = async () => {
        await signOut(auth).then(()=>{
            setUser(null);
            router.push('/auth')
        }).catch((err)=>{
            toast.error("Encountered an error signing out.")
        })
    }

    const createAcc = async (name, email, password) => {
        console.log(name, email, password);
        await createUserWithEmailAndPassword(auth, email, password).then(creds => {
            console.log(`Successfully logged in user: ${creds.user.uid}`)
            updateProfile(auth.currentUser, {displayName: name, photoURL: ''}).then(()=>{
                console.log(`Successfully updated user display name: ${name}`)
                router.push('/dashboard')
            }).catch(err => {
                toast.error('We encountered an error creating your account. Please try reloading the page then registering again.')
            })
        }).catch(err => {
            console.error(err)
        })
    }

    const exposed = {
        user,
        signIn,
        signOut,
        createAcc,
    }

    return (
        <Context.Provider value={exposed}>
            { children }
        </Context.Provider>
    )
}

export const useUser = () => useContext(Context);

export default Provider;