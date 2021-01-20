import { MINT_NFT,LOAD_WEB3} from "../constants";

export function mintNft(payload){
    return {type:MINT_NFT,payload};

}

export function loadWeb3(payload){
    return {type:LOAD_WEB3,payload};
}
