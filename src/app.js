import React,{Component,useState,useEffect} from 'react';
import {Web3ReactProvider,useWeb3React,UnsupportedChainIdError} from "@web3-react/core";
import {NoEthereumProviderError,UserRejectedRequestError as UserRejectedRequestErrorInjected} from "@web3-react/injected-connector";
import { Web3Provider } from "@ethersproject/providers";
import {Contract} from "@ethersproject/contracts";
import { formatEther } from "@ethersproject/units";
import {injected} from './connector';
import ArtMoksha from './contracts/ArtMoksha.json';

const ParentDiv = {
display: "grid",
gridTemplateColumns: "repeat(2, 1fr)",
gridTemplateRows: "1fr",
griColumnGap: "5px",
gridRowGap: "5px"
};

const ChildOne = { gridArea: "1 / 2 / 2 / 3" }
const ChildTwo   ={ gridArea: "1 / 1 / 2 / 2" }


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
    }
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
            <h2>Total Supply : </h2>
            {(account =="0x64b58066E2cB05D1993E2bFFA7621f6Fcfd3E508")?(
           <div style={ParentDiv}><div style={ChildOne}><h1>Dave StarBelly</h1><img style={{height:"300px"}} src="https://nft-metadata-api.herokuapp.com/images/1.png"/><p> Friendly OpenSea Creature that enjoys long swims in the </p></div>
                <div style={ChildTwo}><h1>AK Bhatt</h1><img style={{height:"300px"}} src="https://nft-metadata-api.herokuapp.com/images/2.png"/><p>Akshay Bhatt</p></div></div>):null}
                </div>);
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
