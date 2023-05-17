import React, { useEffect, useState } from "react";
import theme from "theme";
import { Theme, Input, Box, Strong, Text, Hr, Button, Section } from "@quarkly/widgets";
import { Helmet } from "react-helmet";
import { GlobalQuarklyPageStyles } from "global-page-styles";
import { RawHtml, Override } from "@quarkly/components";
import * as Components from "components";
import { getTheSigner } from "components/wallet";
import { getProvider } from "components/theProvider";
import xusdContract from "components/xUSD";
import usdcContract from "components/USDC";
import xGLDContract from "components/xGLD";
import xPTContract from "components/xPT";
import xPDContract from "components/xPD";
import { getTheAddress } from "components/theAddress";


export default (() => {


       //variable for the amount being minted
       const [amount, setAmount] = useState('0');


       //variable that goes in the function for the amount being minted
       const [realAmount, setRealAmount] = useState('0');

       //variable that checks the decimal places on the amount
       const [stringAmount, setStringAmount] = useState('0');


       //variable for the metal token that is being used
       const [selectedAddress, setSelectedAddress] = useState('');


       //variable for the stable coin that is being used
       const [coin, setCoin] = useState('');


       //variable for the stable coin contract that is being used
       const [contract_WithSigner, setContract_WithSigner] = useState(null);


       //variable for the error message that is passed
       const [sendError, setSendError] = useState("");


       //variable for a successful of the transaction being passed
       const [sendSuccess, setSendSuccess] = useState("");


       //variable for the transaction hash that is passed
       const [transactionData, setTransactionData] = useState("");

       //variable for the price of the metal token (with mark up)
       const [price, setPrice] = useState("0");

       //variable for the price that is displayed
       const [displayPrice, setDisplayPrice] = useState("0");

       //variable for the contract used to find the price
       const [displayContract, setDisplayContract] = useState(null);

	   //variable for storing the allowance of a contract
		const [allowance, setAllowance] = useState();

		//variable to get the users balance of stable coin tokens 
		const [balance, setBalance] = useState();

        //variable to get the metal price for display purposes 
		const [metalPrice, setMetalPrice] = useState();

         //variable to get the users balance of stable coins for display purposes 
		const [stableBalance, setStableBalance] = useState();

        //variable for the user's balance of metal tokens for display purposes
        const [metalBalance, setMetalBalance] = useState();

        //variable for the mintable tokens available
        const [mintableTokens, setMintableTokens] = useState("");


       useEffect(() => {
           setRealAmount(amount); //when the amount is updated then the realamount is update here
         }, [amount]);
      
         //get the amount being minted
         const handleChange = (event) => {
           const amountValue = event.target.value; //when the amount is changed in the input then this called
           setAmount(Number(amountValue));
           setRealAmount(Number(amountValue));
           if (amountValue.indexOf('.') !== -1) {
            const [integerPart, decimalPart] = (amountValue.toString()).split('.');
            setStringAmount(decimalPart);
        } else {
            setStringAmount('');
        }
         };


         // gets the address for the metal token
         const handleAddress = (event) => {
           setSelectedAddress(event.target.value); //when the metal token options are changed then this is called
         };


        
         //gets the stable coin being used
         const handleContract = (event) => {
           setCoin(event.target.value); //when the stable coin option is changed then this called
         };
      
         //set the stable coin contract
         const setContract = async () => {
            let temp_contract;
            if (coin === "0") {
              temp_contract = xusdContract;
             } else if (coin === "1") {
               temp_contract = usdcContract;
             }
             let address = getTheAddress();
             const provider = getProvider();
             let contract_withProvider = temp_contract(provider);
             let balance = await contract_withProvider.balanceOf(address);
             let newBalance = balance.isZero() ? 0 : balance / (10 ** 6);
             setStableBalance(newBalance);
             setContract_WithSigner(temp_contract(provider));
            };

       useEffect(() => {
           setContract(); //when the stable coin option is changed then this calls the function that updates the contract
       }, [coin]);


       //set the Metal Contract and the Price for the token
       const setMetalContract = async () => {
           let theContract; //temp contract of the metal contract
           if (selectedAddress === "0xb3d7F29ff6f3842e887b71747770a795E8746e48") { //checks the address of the metal contracts
               theContract = xGLDContract;
           } else if (selectedAddress === "0x05007B35710212FE8a4b1D9E879a05f98648be3B") {
               theContract = xPTContract;
           } else if (selectedAddress === "0xc3AC01B7E31708D51539931ad694566FfAEB88D9") {
            theContract = xPDContract;
        }   else {
               theContract = undefined;
           }

           const provider = getProvider();
           const address = getTheAddress();
           let displayContract = theContract(provider);
           let temp_price = await displayContract.price();  //calls the metal contract to get the price
           let metalPrice = (temp_price * 1001) / (10**9);
           setMetalPrice(metalPrice);
           let newBalance = await displayContract.balanceOf(address);
           setMetalBalance(newBalance / (10 ** 6));
           let mintable = await displayContract._mintableTokens();
           setMintableTokens(mintable/ (10 ** 6));
           setDisplayContract(displayContract); //this sets the Display Contract which is used for finding the price
       };

       useEffect(() => {
           setMetalContract(); //when a different metal option is choosen this calls the setMetalContract function
       }, [selectedAddress]);
      
       //Function that sets Display Price and Price when changing the amount
       const findPrice = async () => {
           let temp_price = await displayContract.price();  //calls the metal contract to get the price
           let price = Math.round(realAmount * (temp_price * 1010)) / 1000; //takes the price and adds 10 bps (for some reason decimals don't work idk...)
           setPrice(price); //sets the price for the minting function using the decimals used by the smart contract
           let displayPrice = (price / 10 ** 6).toString(); //this sets the price to "look normal" and moves it to a string
           setDisplayPrice(displayPrice); //sets the price for the display
       };

       useEffect(() => {
           if (realAmount && displayContract) { //when either the metal contract or amount is changed then this will function that updates prices
               findPrice();
           }
       }, [realAmount, displayContract]);

	   const findAllowance = async () => {
		
        let address = getTheAddress(); //gets the address of the wallet that is connects 
		
        //gets the allowance for sending the stable coin to the selected metals contract
        let allowance = await contract_WithSigner.allowance(address,selectedAddress);
		let newAllowance = allowance.toString();
		setAllowance(newAllowance);

        //gets the stablecoin balance of the wallet connected 
		let balance = await contract_WithSigner.balanceOf(address);
		let newBalance = balance.toString();
		setBalance(newBalance);
        setStableBalance(newBalance / (10 ** 6));

        let newMetalBalance = await displayContract.balanceOf(address);
        setMetalBalance(newMetalBalance / (10 ** 6));
	}
	
	useEffect(() => {
		findAllowance();
		const interval = setInterval(() => {
			findAllowance();
		  }, 5000);
		
		  // clear the interval when the component unmounts
		  return () => clearInterval(interval);
	});


       // function for the approve purchase transaction
       const approveTransaction = async () => {
               setSendError(""); //resets the error
               setSendSuccess(""); //resets the Success message
               setTransactionData("") //resets the transaction data
           try{
               const signer = getTheSigner();
               let temp = contract_WithSigner.connect(signer);
               let resp = await temp.approve(selectedAddress,price); //approve the spending amount to the metal contract for minting
               console.log(resp);
               setSendSuccess("Approval Successful!"); //sets the success message
               setTransactionData(resp.hash); //sends the transaction hash
  
           } catch(err) {
               console.error(err.message);
               setSendError(err.message); //sets the error message for why the transaction didn't work
           }
       };


       // function for the purchase tokens
       const mintTransaction = async () => {
           setSendError(""); //resets the error message
           setSendSuccess(""); //resets the success message
           setTransactionData("") //resets the transaction data
       try{
           let mintAmount = realAmount * 100
           let signer = getTheSigner();
           let temp = displayContract.connect(signer);
           let resp = await temp.mint(mintAmount,coin); //mints a metal token based on the amount minted and which stable coin is being used
           console.log(resp);
           setSendSuccess("Mint Successful!"); //sets the success message for the transaction
           setTransactionData(resp.hash); //sends the transaction hash


       } catch(err) {
           console.error(err.message);
           setSendError(err.message); //sets the error message for why the transaction didn't work
       }
   };


   return <Theme theme={theme}>
       <GlobalQuarklyPageStyles pageUrl={"index"} />
       <Helmet>
       <title>
				xMetals | Dapp
			</title>
			<meta name={"xMetals App"} content={"App created by xMetals"} />
			<link rel={"shortcut icon"} href={"https://uploads.quarkly.io/63ff9730b4ef240020700a3c/images/xMetals%20Icon.png?v=2023-03-01T21:55:01.585Z"} type={"image/x-icon"} />
       </Helmet>
       <Components.TheHeader>
           <Override slot="button" background="#55535D" />
           <Override slot="connectWalletButton" />
           <Override slot="button1" href="/index2" />
       </Components.TheHeader>
       <Section padding="24px 0 60px 0" md-padding="30px 0 30px 0" height="90%" background="#23212D">
           <Override slot="SectionContent" flex-direction="row" md-flex-wrap="wrap" />
           <Box
               width="50%"
               md-width="100%"
               md-align-items="center"
               md-justify-content="center"
               empty-border-width="1px"
               empty-border-style="solid"
               empty-border-color="LightGray"
               md-margin="0px 0px 30px 0px"
               empty-min-width="64px"
               empty-min-height="64px"
               md-display="flex"
               background="#2A2835"
               border-radius="30px"
               height="450px"
               display="flex"
               flex-direction="column"
               align-items="center"
               justify-content="center"
           >
               <Box
                   width="85%"
                   height="20%"
                   display="flex"
                   flex-direction="column-reverse"
                   justify-content="space-between"
               >
                   <Box
                       background="#3B394C"
                       border-radius="20px"
                       width="100%"
                       display="flex"
                       flex-direction="row"
                       align-items="center"
                       justify-content="space-between"
                       height="70%"
                       style={{ borderColor: (stringAmount.length > 2 || realAmount < 0 ) ? "#FF1314" : "#484661", borderWidth: "1px", borderStyle: "solid" }}

                   >
                       <Components.QuarklycommunityKitForm
                           position="relative"
                           top="auto"
                           left="auto"
                           bottom="auto"
                           right="-15px"
                           border-radius="18px"
                           width="100px"
                           autoComplete="off"
                           sm-color="#fff"
                       >
                           <Components.QuarklycommunityKitSelect
                               border-radius="10px"
                               background={selectedAddress.length > 1 ? "#55535D" : "#302E39"}
                               border-width={0}
							   border-style="none"
							   color="#fff"
                               value={selectedAddress}
                               onChange={handleAddress}
                           >
                               <Components.QuarklycommunityKitOption label="Select" value= "" disabled={true}  />
                               <Components.QuarklycommunityKitOption label="xGLD" value="0xb3d7F29ff6f3842e887b71747770a795E8746e48" color="#ffff" />
                               <Components.QuarklycommunityKitOption label="xPT" value="0x05007B35710212FE8a4b1D9E879a05f98648be3B"  />
                               <Components.QuarklycommunityKitOption label="xPD" value="0xc3AC01B7E31708D51539931ad694566FfAEB88D9" />
                           </Components.QuarklycommunityKitSelect>
                       </Components.QuarklycommunityKitForm>
                       <Input
                          		display="block"
                                  placeholder-color="#B1B0B7"
                                  background="#3B394C"
                                  width="126.50118371212125px"
                                  required-align-self="auto"
                                  required-order="0"
                                  defaultValue="0"
                                  placeholder="0"
                                  required={false}
                                  text-align="center"
                                  style={{ color: (realAmount >= 0.01 || realAmount == 0) && stringAmount.length <= 2 ? "#B1B0B7" :  "#a51717"}}
                                  border-color="#3B394C"
                                  position="static"
                                  bottom="auto"
                                  height="39.86908143939394px"
                                  left="385px"
                                  right="auto"
                                  top="215px"
                                  hover-border-width={0}
                                  focus-border-width={0}
                                  required-border-width={0}
                                  placeholder-border-width={0}
                                  invalid-border-width={0}
                                  disabled-border-width={0}
                                  type="number"
                                  name="Mint_Tokens"
                                  hover-color="#B1B0B7"
                                  onChange={handleChange}
                                  value={amount}
                       />
                   </Box>
                   <Text margin="0px 0px 0px 0px" color="#fff" font="20px sans-serif">
                       <Strong
                           overflow-wrap="normal"
                           word-break="normal"
                           white-space="normal"
                           text-indent="0"
                           text-overflow="clip"
                           hyphens="manual"
                           user-select="auto"
                           pointer-events="auto"
                       >
                           xMetals
                       </Strong>
                   </Text>
               </Box>
			  
               <Box
                   width="75%"
                   height="10%"
                   display="flex"
                   flex-direction="column"
                   justify-content="center"
               >
                   <Hr min-height="10px" min-width="100%" margin="0px 0px 0px 0px" border-color="#403E4A" />
               </Box>
               <Box
                   width="85%"
                   height="20%"
                   display="flex"
                   flex-direction="column-reverse"
                   justify-content="space-between"
               >
                   <Box
                       background="#3B394C"
                       border-radius="20px"
                       width="100%"
                       display="flex"
                       flex-direction="row"
                       align-items="center"
                       justify-content="space-between"
                       height="70%"
					   style={{ borderColor: balance < price || price < 0 ? "#FF1314" : "#484661", borderWidth: "1px", borderStyle: "solid" }}
                   >
                       <Components.QuarklycommunityKitForm
                           position="relative"
                           top="auto"
                           left="auto"
                           bottom="auto"
                           right="-15px"
                           border-radius="18px"
                           width="100px"
                       >
                           <Components.QuarklycommunityKitSelect
                               border-radius="10px"
                               background={coin.length > 0 ? "#55535D" : "#302E39"}
                               border-width={0}
							   border-style="none"
							   color="#fff"
                               value={coin}
                               onChange={handleContract}
                           >
                               <Components.QuarklycommunityKitOption label="Select" value = "" disabled={true} />
                               <Components.QuarklycommunityKitOption label="xUSD" value= "0"  />
                               <Components.QuarklycommunityKitOption label="USDC" value= "1" />
                           </Components.QuarklycommunityKitSelect>
                       </Components.QuarklycommunityKitForm>
                       <Text
                   margin="0px 0px 0px 0px"
                   width="126.50118371212125px"
                   min-width="auto"
                   height="39.86908143939394px"
                   min-height="auto"
                   display="flex"
                   flex-direction="column"
                   align-items="center"
                   justify-content="center"
                   color="#B1B0B7"
                   font="16px"
               >
                {selectedAddress.length >= 1 && realAmount >= .01 && stringAmount.length <= 2 ? `${displayPrice}` : "0"}
               </Text>
                   </Box>
                   <Text margin="0px 0px 0px 0px" color="#fff" font="20px sans-serif">
                       <Strong
                           overflow-wrap="normal"
                           word-break="normal"
                           white-space="normal"
                           text-indent="0"
                           text-overflow="clip"
                           hyphens="manual"
                           user-select="auto"
                           pointer-events="auto"
                       >
                           Stablecoin
                       </Strong>
                   </Text>
               </Box>
			   <Box
			display="flex"
			flex-direction="column"
			align-items="flex-start"
			align-content="flex-start"
			width="75%"
		>
			<Text margin="0px 0px 0px 0px" font="14px sans-serif" color="#FF1314">
			{balance < price || price < 0 ? "Insufficient Balance" : ""}
			</Text>
		</Box>
               <Box
                   width="75%"
                   height="10%"
                   display="flex"
                   flex-direction="column"
                   justify-content="center"
               >
                   <Hr min-height="10px" min-width="100%" margin="0px 0px 0px 0px" border-color="#403E4A" />
               </Box>
               <Box
                   min-width="100px"
                   width="80%"
                   display="flex"
                   flex-direction="row"
                   align-items="center"
                   justify-content="space-around"
                   height="15%"
               >
                   <Button
               display="inline-block"
               border-radius="18px"
               height="50px"
               width="200px"
               user-select="none"
               pointer-events="auto"
			   background="#238DE0"
			   focus-background="#238DE0"
			   active-background="#55535D"
			   disabled-background="#302E39"
               disabled={!(coin >= 0 && coin <= 1 && realAmount >= .01 && stringAmount.length <= 2 && allowance < price && balance >= price  && realAmount <= mintableTokens)}
               type="button"
               focus-box-shadow="0 0 0 0px --color-primary"
               onClick={approveTransaction}
           >
               Approve
           </Button>
                   <Button
                       display="inline-block"
                       border-radius="18px"
                       height="50px"
                       width="200px"
                       user-select="none"
                       pointer-events="auto"
					   background="#238DE0"
					   focus-background="#238DE0"
					   active-background="#55535D"
					   disabled={!(coin >= 0 && coin <= 1 && realAmount >= .01 && stringAmount.length <= 2 && allowance >= price && balance >= price)}
					   disabled-background="#302E39"
                       type="button"
                       focus-box-shadow="0 0 0 0px --color-primary"
                       href="/index3"
                       onClick = {mintTransaction}
                   >
                       Purchase
                   </Button>
               </Box>
               <Box width="75%">
               <Text margin="0px 0px 0px 0px" font="18px " color="#FF1314">
                   {sendError && ( <div className ="send-Error">{sendError} </div>)}
               </Text>
               <Text margin="0px 0px 0px 0px" color="#2fb04b" font="18px ">
                   {sendSuccess && ( <div className ="send-Error">{sendSuccess} </div>)}
               </Text>
               <Text margin="0px 0px 0px 0px" font="18px " color="#fff">
                   {transactionData ? `Transaction hash: ${transactionData}` : ""}
               </Text>
               </Box>
           </Box>
           <Box
               min-width="50px"
               min-height="100px"
               md-height="10px"
               md-width="100%"
               md-min-height={0}
               md-min-width={0}
           />
           <Box
               flex-direction="column"
               empty-min-width="64px"
               empty-min-height="64px"
               empty-border-width="1px"
               empty-border-style="solid"
               empty-border-color="LightGray"
               width="60%"
               display="flex"
               justify-content="center"
               md-width="100%"
               background="#2A2835"
               border-radius="30px"
               align-items="center"
               height="450px"
               lg-height="550px"
               md-height="400px"
               sm-height="500px"
           >
               <Text
                   margin="0px 0px 0px 0px"
                   display="flex"
                   position="relative"
                   font="35px sans-serif"
                   color="#FFFFFF"
               >
                   <Strong>
                   {selectedAddress === "0xb3d7F29ff6f3842e887b71747770a795E8746e48"
                         ? "Buy xGLD"
                         : selectedAddress === "0x05007B35710212FE8a4b1D9E879a05f98648be3B"
                         ? "Buy xPT"
                         : selectedAddress === "0xc3AC01B7E31708D51539931ad694566FfAEB88D9"
                         ? "Buy xPD"
                         : "Buy xMetals"}
                   </Strong>
               </Text>
               <Box
			min-width="100px"
			min-height="100px"
			background="#3C394C"
			width="85%"
			height="60%"
			border-radius="30px"
			position="relative"
			bottom="-10px"
			left="auto"
			right="auto"
			top="35px"
			display="flex"
			flex-direction="column"
			align-items="center"
			justify-content="center"
			border-color="#484661"
			border-width="1px"
			border-style="solid"
			lg-height="70%"
			md-height="60%"
			sm-height="70%"
		>
			<Box
				min-height="110px"
				width="85%"
				display="flex"
				justify-content="space-between"
				flex-direction="row"
				align-items="center"
			>
				<Box
					min-height="110px"
					min-width="50px"
					width="45%"
					display="flex"
					flex-direction="column"
					align-items="center"
					justify-content="center"
				>
					<Text
						margin="0px 0px 0px 0px"
						color="#fff"
						display="flex"
						flex-direction="column"
						align-items="center"
						justify-content="center"
						font="25px sans-serif"
					>
						 {selectedAddress === "0xb3d7F29ff6f3842e887b71747770a795E8746e48"
                         ? "xGLD Balance"
                         : selectedAddress === "0x05007B35710212FE8a4b1D9E879a05f98648be3B"
                         ? "xPT Balance"
                         : selectedAddress === "0xc3AC01B7E31708D51539931ad694566FfAEB88D9"
                         ? "xPD Balance"
                         : "xMetals Balance"}
					</Text>
					<Text
						margin="0px 0px 0px 0px"
						color="#B1B0B6"
						display="flex"
						flex-direction="column"
						align-items="center"
						justify-content="center"
						font="25px sans-serif"
					>
                    {selectedAddress.length > 0 && !metalBalance ? "0" : metalBalance}
					</Text>
				</Box>
				<Hr
					min-height="80%"
					margin="0px 0px 0px 0px"
					border-color="#403E4A"
					min-width="1px"
					height={0}
					background="#2A2835"
				/>
				<Box
					min-height="110px"
					min-width="50px"
					width="45%"
					display="flex"
					flex-direction="column"
					align-items="center"
					justify-content="center"
				>
					<Text
						margin="0px 0px 0px 0px"
						color="#fff"
						display="flex"
						flex-direction="column"
						align-items="center"
						justify-content="center"
						font="25px sans-serif"
					>
						Price / Oz
					</Text>
					<Box display="flex" flex-direction="row">
						<Text
							margin="0px 0px 0px 0px"
							color="#B1B0B6"
							display="flex"
							flex-direction="column"
							align-items="center"
							justify-content="center"
							font="25px sans-serif"
						>
							    {selectedAddress.length > 1 ? "$" : ""}
						</Text>
						<Text
							margin="0px 0px 0px 0px"
							color="#B1B0B6"
							display="flex"
							flex-direction="column"
							align-items="center"
							justify-content="center"
							font="25px sans-serif"
						>
							{metalPrice}
						</Text>
					</Box>
				</Box>
			</Box>
			<Hr min-height="10px" min-width="85%" margin="0px 0px 0px 0px" border-color="#23212D" />
			<Box
				min-height="110px"
				width="85%"
				display="flex"
				justify-content="space-between"
				flex-direction="row"
				align-items="center"
				font="25px sans-serif"
			>
				<Box
					min-height="110px"
					min-width="50px"
					width="45%"
					display="flex"
					flex-direction="column"
					align-items="center"
					justify-content="center"
				>
					<Text
						margin="0px 0px 0px 0px"
						color="#fff"
						display="flex"
						flex-direction="column"
						align-items="center"
						justify-content="center"
						font="25px sans-serif"
					>
						{coin === "0"
                         ? "xUSD Balance"
                         : coin === "1"
                         ? "USDC Balance"
                         : "Stablecoin Balance"}
					</Text>
					<Box display="flex" flex-direction="row">
						<Text
							margin="0px 0px 0px 0px"
							color="#B1B0B6"
							display="flex"
							flex-direction="column"
							align-items="center"
							justify-content="center"
							font="25px sans-serif"
						>
							{coin === "0"
                         ? "$"
                         : coin === "1"
                         ? "$"
                         : ""}
						</Text>
						<Text
							margin="0px 0px 0px 0px"
							color="#B1B0B6"
							display="flex"
							flex-direction="column"
							align-items="center"
							justify-content="center"
							font="25px sans-serif"
						>
                            {stableBalance}
						</Text>
					</Box>
				</Box>
				<Hr
					min-height="80%"
					margin="0px 0px 0px 0px"
					border-color="#403E4A"
					min-width="1px"
					height={0}
					background="#2A2835"
				/>
				<Box
					min-height="110px"
					min-width="50px"
					width="45%"
					display="flex"
					flex-direction="column"
					align-items="center"
					justify-content= "center"
				>
					<Text
						margin="0px 0px 0px 0px"
                        color={selectedAddress > 0 && realAmount > mintableTokens ? "#FF1314" : "#fff"}
						display="flex"
						flex-direction="column"
						align-items="center"
						justify-content="center"
						font="25px sans-serif"
					>
                        Max Purchase
					</Text>
					<Box display="flex" flex-direction="row">
						<Text
							margin="0px 0px 0px 0px"
                            color={selectedAddress > 0 && realAmount > mintableTokens ? "#FF1314" : "#B1B0B6"}
							display="flex"
							flex-direction="column"
							align-items="center"
							justify-content="center"
							font="25px sans-serif"
						>
						{selectedAddress.length > 0  ? `${mintableTokens}` : ""}
						</Text>
                        <Box min-width="10px" min-height="10px" />
						<Text
							margin="0px 0px 0px 0px"
                            color={selectedAddress > 0 && realAmount > mintableTokens ? "#FF1314" : "#B1B0B6"}
							display="flex"
							flex-direction="column"
							align-items="center"
							justify-content="center"
							font="25px sans-serif"
						>
                        {selectedAddress === "0xb3d7F29ff6f3842e887b71747770a795E8746e48"
                         ? "xGLD"
                         : selectedAddress === "0x05007B35710212FE8a4b1D9E879a05f98648be3B"
                         ? "xPT"
                         : selectedAddress === "0xc3AC01B7E31708D51539931ad694566FfAEB88D9"
                         ? "xPD"
                         : ""}
						</Text>
					</Box>
				</Box>
			</Box>
		</Box>
           </Box>
       </Section>
       <Section
           lg-flex-wrap="wrap-reverse"
           background="#23212D"
           height="100%"
           sm-height="250px"
           min-height="100px"
       >
           <Override slot="SectionContent" flex-direction="row" flex-wrap="wrap" />
       </Section>
       <RawHtml>
           <style place={"endOfHead"} rawKey={"6166a2b829a0a1001e6ca5fb"}>
               {":root {\n  box-sizing: border-box;\n}\n\n* {\n  box-sizing: inherit;\n}"}
           </style>
           <script
               type={""}
               async={false}
               src={""}
               place={"endOfBody"}
               rawKey={"63e557ee91ffd30edad848d5"}
           />
       </RawHtml>
   </Theme>;
});



