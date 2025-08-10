import axiosInstance from "../utils/axiosInstance";
import toast from 'react-hot-toast'

async function getVaultsApi(){
    const vaults = await axiosInstance.get('/api/vault');
    return vaults.data.message;
}

async function deleteVaultsApi(id){
    const deleted = await axiosInstance.delete(`/api/vault/${id}`);
    if(deleted.data.error) toast.error('Vault not deleted, check vault id');
    else toast.success(deleted.data.message);
}

async function addVaultApi(vault){
    const newVault = await axiosInstance.post('/api/vault', vault);
    console.log(newVault.data);
    if(newVault.data.error) toast.error('Vault not added, check all fields!');
    else toast.success(newVault.data.message);
}

export {getVaultsApi, deleteVaultsApi, addVaultApi};