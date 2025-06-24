import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

async function LogInApi(formData) {
    const response = await axiosInstance.post('/login', formData);
    if(response.data.error){
        toast.error(response.data.error, {
        duration: 4000,
        position: 'top-center'
     })
     return false;
    }else{
        toast.success(response.data.message, {
            duration : 4000  
        })
        return true;
    }
}

export default LogInApi;