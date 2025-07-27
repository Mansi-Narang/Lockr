import axiosInstance from "../utils/axiosInstance";

async function VaultsApi(){
    const vaults = await axiosInstance.get('/api/vault');
    return vaults.data.message;
}
export default VaultsApi;