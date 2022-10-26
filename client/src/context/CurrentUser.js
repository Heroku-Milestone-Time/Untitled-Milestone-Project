import { createContext, useState, useEffect}  from "react";

export const CurrentUser = createContext()

export default function CurrentUserProvider ({children}) {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const getLoggedInUser = async () => {
            let response = await fetch(`/authentication/profile`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            let user = await response.json()
            
            setCurrentUser(user)
        }
        getLoggedInUser()
    }, [])

    window.setCurrentUser = setCurrentUser
    return (
        <CurrentUser.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </CurrentUser.Provider>
    
    )

}