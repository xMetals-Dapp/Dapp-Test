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


export default (() => {

		//variable for the amount being minted
		const [amount, setAmount] = useState('');

		//variable that goes in the function for the amount being minted
		const [realAmount, setRealAmount] = useState('');

		//variable for the metal token that is being used
		const [selectedAddress, setSelectedAddress] = useState('');

		//variable for the metal contract that is being used
		const [metalContract, setmetalContract] = useState(null);

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

		useEffect(() => {
			setRealAmount(amount); //when the amount is updated then the realamount is update here
		  }, [amount]);
		
		  //get the amount being minted
		  const handleChange = (event) => {
			const amountValue = event.target.value; //when the amount is changed in the input then this called
			setAmount(Number(amountValue));
			setRealAmount(Number(amountValue));
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
			let temp_contract; //temp contract before it assigned based on which coin is picked
			if (coin === "0") { //pid number for xUSD
				temp_contract = xusdContract; 
			} else if (coin === "1") { //pid number for USDC
				temp_contract = usdcContract; 
			}
			const provider = getProvider();
			setContract_WithSigner(temp_contract(provider)); //sets the contract with the signer and provider
		};

		useEffect(() => {
			setContract(); //when the stable coin option is changed then this calls the function that updates the contract
		}, [coin]);

		//set the Metal Contract and the Price for the token
		const setMetalContract = async () => {
			let _contract; //temp contract of the metal contract
			if (selectedAddress === "0xd7034ae28aDEde1b6d252cAE60F1bc064626b3B4") { //checks the address of the metal contracts
				_contract = xGLDContract;
			} else if (selectedAddress === "0x65B5F9311C0808259B5d5b6eA327d27aedB919B3") {
				_contract = xPTContract;
			} else {
				_contract = undefined;
			}
			const provider = getProvider();
			let displayContract = _contract(provider); 
			setDisplayContract(displayContract); //this sets the Display Contract which is used for finding the price
			const signer = getTheSigner();
			setmetalContract(displayContract.connect(signer)); //sets the metal contract with signer
		};

		useEffect(() => {
			setMetalContract(); //when a different metal option is choosen this calls the setMetalContract function
		}, [selectedAddress]);
		
		//Function that sets Display Price and Price when changing the amount
		const findPrice = async () => {
			let temp_price = await displayContract.price();  //calls the metal contract to get the price
			let price = Math.round(realAmount * (temp_price * 1001)) / 1000; //takes the price and adds 10 bps (for some reason decimals don't work idk...)
			setPrice(price); //sets the price for the minting function using the decimals used by the smart contract 
			let displayPrice = (price / 10 ** 6).toString(); //this sets the price to "look normal" and moves it to a string
			setDisplayPrice(displayPrice); //sets the price for the display 
		}; 

		useEffect(() => {
			if (realAmount && displayContract) { //when either the metal contract or amount is changed then this will function that updates prices
				findPrice();
			}
		}, [realAmount, displayContract]);

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
			let signer = getTheSigner();
			let temp = displayContract.connect(signer);
			const pid = coin; //sets the PID for which stablecoin is being used to mint
			let resp = await temp.mint(realAmount,2); //mints a metal token based on the amount minted and which stable coin is being used
			console.log(resp);
			setSendSuccess("Mint Successful!"); //sets the success message for the transaction
			setTransactionData(resp.hash); //sends the transaction hash 

		} catch(err) {
			console.error(err.message);
			setSendError(err.message); //sets the error message for why the transaction didn't work 
		}
	};

	return <Theme theme={theme}>
		<GlobalQuarklyPageStyles pageUrl={"index3"} />
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
						border-color="#484661"
						border-width="1px"
						border-style="solid"
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
								background="#302E39"
								border-width={0}
								color="#fff"
								border-radius="10px"
								hover-background="#55535D"
								focus-background="#302E39"
								required={false}
								name="--Select--"
								defaultValue="--Select--"
								multiple={false}
								autoFocus={false}
								disabled={false}
								required-background="#55535D"
								sm-white-space="normal"
								white-space="normal"
								value={selectedAddress}
								onChange={handleAddress}
							>
								<Components.QuarklycommunityKitOption label="Select" value= "" disabled={true}  />
								<Components.QuarklycommunityKitOption label="xGLD" value="0x7153e1c4f827c43782439bce4F88b8f01EFB5cce" color="#ffff" />
								<Components.QuarklycommunityKitOption label="xPT" value="0x65B5F9311C0808259B5d5b6eA327d27aedB919B3"  />
								<Components.QuarklycommunityKitOption label="xPD" value="xPD" />
								<Components.QuarklycommunityKitOption label="xRH" value="xRH" />
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
							color="#B1B0B7"
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
							invalid-color="#a51717"
							hover-color="#B1B0B7"
							border-width={0}
							border-style="none"
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
							xMetal Token
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
						border-color="#484661"
						border-width="1px"
						border-style="solid"
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
								background="#302E39"
								border-width={0}
								color="#fff"
								border-radius="10px"
								hover-background="#55535D"
								required={false}
								required-border-color="#aa1212"
								required-border-width="2px"
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
					{displayPrice}
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
							Stable Coin
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
				hover-background="#238DE0"
				focus-background="#238DE0"
				active-background="#55535D"
				disabled={false}
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
						background="#302E39"
						hover-background="#55535D"
						focus-background="#55535D"
						active-background="#238DE0"
						disabled = {false}
						type="button"
						focus-box-shadow="0 0 0 0px --color-primary"
						disabled-background="#302E39"
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
					font="25px sans-serif"
					color="#FFFFFF"
				>
					<Strong>
 					Buy Metal 
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
					<Text margin="0px 0px 0px 0px" width="80%" color="#AAAAB1" font="18px sans-serif">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
					</Text>
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
