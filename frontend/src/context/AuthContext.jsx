import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance.js";
import toast from "react-hot-toast";

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

function AuthProvider({children}){
    let [user, setUser] = useState(null);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async() => {
            try{
                const response = await axiosInstance.get('/api/me', {withCredentials : true});
                if(response.data.error) throw new Error(response.data.error); 
                setUser(response.data.user);
            }
            catch(e) {
                toast.error(e.message || 'Backend is down!');
            }
            finally{
                setLoading(false);
            }
        }
        fetchUser();
    }, [])

    return <AuthContext.Provider value={{user, setUser, loading}}>{children}</AuthContext.Provider>
}

export { useAuth, AuthProvider };