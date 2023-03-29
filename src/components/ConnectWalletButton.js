import React, { useEffect, useState } from "react";
import { Button } from "@quarkly/widgets";
import { ethers } from "ethers";
import { setSigner } from "./wallet";
import { setProvider } from "./theProvider";
import { setAddress } from "./theAddress";
import xusdContract from "./xUSD";


const ConnectWalletButton = props => {
   const [walletAddress, setWalletAddress] = useState("");
  const [userChainId, setUserChainId] = useState(null);
  const [whitelist, setWhiteList] = useState('');




  useEffect(() => {
      getCurrentWalletConnected();
      addWalletListener();
      addChainListener();
      setAddress(walletAddress);
    //  isWhitelisted();
  });








  const connectWallet = async () => {
      if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
          try {
              /* get provider */
              const provider = new ethers.providers.Web3Provider(window.ethereum);
              setProvider(provider);
              //interProvider(provider);
            
              /* get accounts */
              const accounts = await provider.send("eth_requestAccounts", []);
              setWalletAddress(accounts[0]);
            
              /* get signer */
              setSigner(provider.getSigner());
            
              /* get network */
              const network = await provider.getNetwork();
              setUserChainId(network.chainId);




              /* get whiteList */
              const whiteList = await (xusdContract(provider)).whitelists(accounts[0]);
              setWhiteList(whiteList);




          } catch (err) {
              console.error(err.message);
          }
      } else {
          /* MetaMask is not installed */
          console.log("Please install MetaMask");
      }
  };




  const getCurrentWalletConnected = async () => {
      if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
          try {
              /* get provider */
              const provider = new ethers.providers.Web3Provider(window.ethereum);
              setProvider(provider);
              //interProvider(provider);
            
              const network = await provider.getNetwork();
              setUserChainId(network.chainId);
            
              /* get accounts */
              const accounts = await provider.send("eth_accounts", []);
              if (accounts.length > 0) {
                  /* get signer */
                  setWalletAddress(accounts[0]);
                  setSigner(provider.getSigner());




                  //gets if the user is whitelisted
                  const whiteList = await (xusdContract(provider)).whitelists(accounts[0]);
                  setWhiteList(whiteList);
            
              } else {
                  console.log("Connect to MetaMask using the Connect button");
                
              }
          } catch (err) {
              console.error(err.message);
          }
      } else {
          /* MetaMask is not installed */
          console.log("Please install MetaMask");
      }
  };




  const addWalletListener = async () => {
      if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
          window.ethereum.on("accountsChanged", accounts => {
              setWalletAddress(accounts[0]);
              console.log(accounts[0]);
          });
      } else {
          setWalletAddress("");
          console.log("Please install MetaMask");
      }
  };








  const addChainListener = async () => {
      if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        window.ethereum.on("chainChanged", chainId => {
          setUserChainId(parseInt(chainId, 16));
        });
      }
    };


    const changeNetwork = async () => {
     try {
       console.log("0x11155111");
       await window.ethereum.request({
         method: "wallet_addEthereumChain",
         params: [
           {
             chainId: "0xaa36a7",
             chainName: "Sepolia",
             nativeCurrency: {
               name: "SepoliaETH",
               symbol: "ETH",
               decimals: 18,
             },
             rpcUrls: ["https://rpc.sepolia.org"], // Replace this with the actual Sepolia RPC URL
             blockExplorerUrls: ["https://sepolia.etherscan.io"], // Replace this with the actual Sepolia block explorer URL
           },
         ],
       });
     } catch (error) {
       console.error(error);
       // handle error
     }
   };
  
  
    const handleClick = async () => {
      await connectWallet();
      if (userChainId !== 11155111) {
        await changeNetwork();
      }
    };




    const isWhitelisted = async () => {
      if (!whitelist) {
        window.open("/signin", "_self");
      }
    };
  
      const defaultProps = {
          "border-radius": "18px",
          "height": "50px",
          "width": "177px",
          "background": userChainId === 11155111 ? "#302E39" : "#FF1314",
          "hover-background": "#55535D",
          "type": "button",
          "focus-box-shadow": "0 0 0 0 #0077CC",
          "quarkly-title": "Connect Wallet Button",
          "onClick": handleClick
      };
 
      return <Button {...defaultProps} >
             
  {walletAddress && walletAddress.length > 0 ?
(userChainId === 11155111 ?
  `${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}` :
  "Change Network") :
"Connect Wallet"
}


      </Button>;
   };
   export default ConnectWalletButton;


