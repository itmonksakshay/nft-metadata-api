import React,{Component,useState,useEffect} from 'react';
import {Web3ReactProvider,useWeb3React,UnsupportedChainIdError} from "@web3-react/core";
import {NoEthereumProviderError,UserRejectedRequestError as UserRejectedRequestErrorInjected} from "@web3-react/injected-connector";
import { Web3Provider } from "@ethersproject/providers";
import {Contract} from "@ethersproject/contracts";
import { formatEther } from "@ethersproject/units";
import {injected} from './connector';
import ArtMoksha from './contracts/ArtMoksha.json';


const getLibrary=(provider)=>{
    const library = new Web3Provider(provider);
    library.pollingInterval = 8000;
    return library;
}

const getContract=(address,abi,signer)=>{
        const contract = new Contract(address,abi,signer);
        return contract;
}

async function getTotalSupply(contract){
    const totalSupply = await contract.totalSupply();
    for (var i = 1; i <= 2; i++) {
        var owner = await contract.ownerOf(i);
        var metadata = await contract.tokenURI(i);
        fetch(metadata,{mode: 'no-cors'}).then(response => response.json()).then(data => console.log(data));}
    console.log(owner);
    return totalSupply;
}


const MainPage=({context})=>{
    const {active,error,account,chainId,library} = context;   
    const [contract, setContract] = useState(0);
    const networkData = ArtMoksha.networks[chainId];

    if(networkData){
        const abi = ArtMoksha.abi;
        const address = networkData.address;
        const contract = getContract(address,abi,library.getSigner());
        getTotalSupply(contract);
        console.log(contract);
        return(<div><h1>Wallet : </h1>
            <h2>Account :{account}</h2>
            <h2>Network Name: {chainId}</h2>
            <h2>Total Supply : </h2></div>);
    }

        return(<div><h1>Wallet : </h1>
            <h2>Account :{account}</h2>
            <h2>Network Name: {chainId}</h2></div>);

}



const Wallet=()=> {
    const context = useWeb3React();
    const {connector,library,chainId,account,activate,deactivate,active,error} = context;
    console.log(context);
    const onClick=()=>(activate(injected));
    return(<div>{active ?(<MainPage context={context}/>) : 
            (<button type="button" onClick={onClick}>Connect</button>)
    }</div>);

}


export default function App(){

    return(<Web3ReactProvider getLibrary={getLibrary}>
                <Wallet/>
            </Web3ReactProvider>);

}
