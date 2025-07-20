import { useNavigate } from "react-router";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({children}){
    const navigate = useNavigate();
    const {user, loading} = useAuth();
    if(loading){
        return(
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-20 h-20 border-6 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
         </div>
        )
    }
    if(!user)  navigate('/login');

    return children;
}