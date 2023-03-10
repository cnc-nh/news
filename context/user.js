import { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { doc, getDoc } from "@firebase/firestore"

const Context = createContext();

const Provider = ({ children }) => {
    const [user, setUser] = useState(auth.currentUser)
    const router = useRouter()

    useEffect(() => {
        onAuthStateChanged(auth, () => {
            setUser(auth.currentUser)
        })
    }, [])

    const logIn = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password).then((credentials)=>{
            console.log("Success login")
            router.push('/dashboard')
        }).catch(err => {
            toast.error(`The email or password is incorrect.`)
        })
    }

    const logOut = async () => {
        await signOut(auth).then(()=>{
            console.log("success logout")
            setUser(null)
            router.push('/auth')
        }).catch((err)=>{
            toast.error("Encountered an error signing out.")
        })
    }

    const createAcc = async (name, email, password) => {
        const staffEmailsRef = doc(db, "staff_emails", "email_array")
        const docSnap = await getDoc(staffEmailsRef)
        const emails = docSnap.get("email")
        console.log(emails)

        if (emails.includes(email)) {
            await createUserWithEmailAndPassword(auth, email, password).then(creds => {
                updateProfile(auth.currentUser, {displayName: name, photoURL: ''}).then(()=>{
                    console.log("Success register")
                    router.push('/dashboard')
                }).catch(err => {
                    toast.error('We encountered an error creating your account. Please try reloading the page then registering again.')
                })
            }).catch(err => {
                const error = err;
            })
        } else {
            toast.error("You cannot register, as you are not a CNC News staff member.")
        }
    }

    const exposed = {
        user,
        logIn,
        logOut,
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