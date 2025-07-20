import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

async function LogInApi(formData) {
    const response = await axiosInstance.post('/api/login', formData, {withCredentials: true});
    if(response.data.error){
        toast.error(response.data.error, {
        duration: 4000,
        position: 'top-center'
     })
     return {success: false};
    }else{
        toast.success(response.data.message, {
            duration : 4000
        })
        return {success : true, user : response.data.user};
    }
}

export default LogInApi;