import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance"

export const logOutApi = async() => {
    const response =  await axiosInstance.post('/api/logout', {}, {withCredentials: true});
    if(response.data.error){
        toast.error(response.data.error);
        return false;
    }
    toast.success(response.data.message);
    return true;
}