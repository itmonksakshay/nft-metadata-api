import { MINT_NFT,LOAD_WEB3 } from "../constants";

const initialWeb3 = {web3:null};
const initialContract={contract:null};

export function loadWeb3(state = initialWeb3, action){
    switch (action.type) {
        case LOAD_WEB3:return {web3:action.context};
        default:return state;       
    }
}

export function loadContract(state=initialContract,action){
    
        switch(action.type){
                case MINT_NFT:return{contract:1};
                default:return state;
        }

}

