import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

async function signUpApi(formData) {
    const response = await axiosInstance.post('/signup', {
      username : formData.firstName + " " + formData.lastName,
      email : formData.email,
      password : formData.password,
      confirmPassword : formData.confirmPassword
    }, {withCredentials : true});
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
      console.log(response.data);
      return {success : true, user: response.data.user};
    }
}

export default signUpApi;