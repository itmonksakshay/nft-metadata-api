import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {useWeb3React} from "@web3-react/core";
import {loadWeb3} from '../actions';
import {injected} from '../connector';
function Wallet(){
    const context = useWeb3React();
    console.log(context);
    const {connector,library,chainId,account,activate,deactivate,active,error} = context;
    const onClick=()=>(activate(injected));
    return(<div>{active ?(<MainPage context={context}/>) : 
            (<button type="button" onClick={onClick}>Connect</button>)
    }</div>);

}
export default Wallet;

