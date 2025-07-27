import { useState } from "react";
import { useEffect } from "react";
import VaultsApi from "../../API/VaultsApi";
import Vault from './VaultCard'

function Vaults() {
    const[vaults, setVaults] = useState([]);

    useEffect(() => {
        (async() => {
            const vaults = await VaultsApi();
            setVaults(vaults);
        })();
    },[])
    
    return ( 
        <>
        {console.log(vaults)}
            {
                vaults.map((v) => {
                    return <Vault key={v._id} name = {v.domainName.replace("https://", "").replace("http://", "").replace(".com", "")} username={v.domainUsername} url={v.domainName} password={v.encryptedPassword} />
                })
            }
        </>
     );
}

export default Vaults;