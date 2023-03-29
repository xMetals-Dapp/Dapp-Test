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
import xGLDContract from "components/xGLD";
import xPTContract from "components/xPT";
import xPDContract from "components/xPD";
import usdcContract from "components/USDC";
import { getTheAddress } from "components/theAddress";

export default (() => {

//variable for the amount being minted
const [amount, setAmount] = useState('');

//variable that goes in the function for the amount being minted
const [realAmount, setRealAmount] = useState('');

//variable that checks the decimal places on the amount
const [stringAmount, setStringAmount] = useState('0');

//variable for the stable coin that is being used
const [coin, setCoin] = useState('');

//variable for the stable coin contract that is being used
const [contract_withProvider, setContract_withProvider] = useState(null);

//variable for the error message that is passed
const [sendError, setSendError] = useState("");

//variable for a successful of the transaction being passed
const [sendSuccess, setSendSuccess] = useState("");

//variable for the transaction hash that is passed
const [transactionData, setTransactionData] = useState("");

//variable for the price that is displayed
const [displayPrice, setDisplayPrice] = useState("0");

//variable for storing the allowance of a contract
const [allowance, setAllowance] = useState();

//variable to get the users balance of metal tokens 
const [balance, setBalance] = useState();

//variable for the price of the metal token 
const [metalPrice, setMetalPrice] = useState();

//variable for xusd balance of the address
const [xusdBalance, setXusdBalance] = useState();

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

//gets the stable coin being used
	const handleContract = (event) => {
	setCoin(event.target.value); //when the stable coin option is changed then this called
};

//set the stable coin contract 
const setContract = async () => {
	let temp_contract; //temp contract before it assigned based on which coin is picked
	if (coin === "0") { //pid number for xUSD
		temp_contract = xGLDContract; 
	} else if (coin === "1") { //pid number for USDC
		temp_contract = xPTContract; 
	} else if (coin === "2") { //pid number for USDC
		temp_contract = xPDContract; 
	}else if (coin === "3") { //pid number for USDC
		temp_contract = usdcContract; 
		const provider = getProvider();
		setContract_withProvider(temp_contract(provider));
		setMetalPrice(1);
		return
	}	
	else {
		temp_contract = undefined;
	}
	const provider = getProvider();
	let contract_withProvider = temp_contract(provider)
	let temp_price = await contract_withProvider.price();
	let metalPrice = Math.round(temp_price * 990) / (10 ** 9);
	setMetalPrice(metalPrice);
	setContract_withProvider(contract_withProvider); //sets the contract with the signer and provider
	};

useEffect(() => {
	setContract(); //when the stable coin option is changed then this calls the function that updates the contract
}, [coin]);

//Function that sets Display Price and Price when changing the amount
const findPrice = async () => {
	if (coin === "3") {
		setDisplayPrice(realAmount); //sets the price for the display 
	} else{ 
	let temp_price = await contract_withProvider.price();  //calls the metal contract to get the price
	let price = Math.round(realAmount * (temp_price * 990) / 1000); //takes the price and adds 10 bps (for some reason decimals don't work idk...)
	let displayPrice = (price / 10 ** 6).toString(); //this sets the price to "look normal" and moves it to a string
	setDisplayPrice(displayPrice); //sets the price for the display 
}
}; 

useEffect(() => {
	if (realAmount && contract_withProvider) { //when either the metal contract or amount is changed then this will function that updates prices
		findPrice();
	}
}, [realAmount, contract_withProvider]);


const findAllowance = async () => {
	let address = getTheAddress();
	let provider = getProvider();
	let temp_contract = xusdContract(provider);
	let xusdBalance = await temp_contract.balanceOf(address);
	setXusdBalance(xusdBalance/(10**6));
	let allowance = await contract_withProvider.allowance(address,"0x960D76D96ba60Efb0E63527A92B36bD72eA21258");
	let tempAllowance = allowance / (10 ** 6);
	let newAllowance = tempAllowance.toString();
	setAllowance(newAllowance);
	let balance = await contract_withProvider.balanceOf(address);
	let tempBalance = balance / (10 ** 6);
	let newBalance = tempBalance.toString();
	setBalance(newBalance);
	if (coin === "3") {
		setMetalPrice(1); //sets the price for the display 
	} else{ 
	let temp_price = await contract_withProvider.price();
	let metalPrice = Math.round(temp_price * 990) / (10 ** 9);
	setMetalPrice(metalPrice);
	}
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
	let temp = contract_withProvider.connect(signer);
	let newAmount = realAmount * (10 ** 6);
	let resp = await temp.approve("0x960D76D96ba60Efb0E63527A92B36bD72eA21258",newAmount); //approve the spending amount to the metal contract for minting
	console.log(resp);
	setSendSuccess("Approval Successful!"); //sets the success message
	setTransactionData(resp.hash); //sends the transaction hash 

} catch(err) {
	console.error(err.message);
	setSendError(err.message); //sets the error message for why the transaction didn't work 
}
};


const mintTransaction = async () => {
	setSendError(""); //resets the error message 
	setSendSuccess(""); //resets the success message 
	setTransactionData("") //resets the transaction data
try{
	let mintAmount = realAmount * 100
	let signer = getTheSigner();
	let provider = getProvider();
	let temp = xusdContract(provider);
	let newtemp = temp.connect(signer);
	let resp = await newtemp.mint(mintAmount, coin); //mints a metal token based on the amount minted and which stable coin is being used
	console.log(resp);
	setSendSuccess("Mint Successful!"); //sets the success message for the transaction
	setTransactionData(resp.hash); //sends the transaction hash 


} catch(err) {
	console.error(err.message);
	setSendError(err.message); //sets the error message for why the transaction didn't work 
}
};



	return <Theme theme={theme}>
		<GlobalQuarklyPageStyles pageUrl={"index2"} />
		<Helmet>
		<title>
				xMetals | Dapp
			</title>
			<meta name={"xMetals App"} content={"App created by xMetals"} />
			<link rel={"shortcut icon"} href={"https://uploads.quarkly.io/63ff9730b4ef240020700a3c/images/xMetals%20Icon.png?v=2023-03-01T21:55:01.585Z"} type={"image/x-icon"} />
		</Helmet>
		<Components.TheHeader>
			<Override slot="button1" background="#55535D" />
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
						style={{ borderColor: (balance < realAmount || stringAmount.length > 2 || realAmount < 0) ? "#FF1314" : "#484661", borderWidth: "1px", borderStyle: "solid" }}

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
								<Components.QuarklycommunityKitOption label="Select" disabled={true} />
								<Components.QuarklycommunityKitOption label="xGLD" value="0" />
								<Components.QuarklycommunityKitOption label="xPT" value="1" />
								<Components.QuarklycommunityKitOption label="xPD" value="2" />
								<Components.QuarklycommunityKitOption label="USDC" value="3" />
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
							xMetal Token
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
					{balance < realAmount ? "Insufficient Balance" : ""}
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
						<Box
							width="100px"
							height="40px"
							background="#55535D"
							position="relative"
							top="auto"
							left="auto"
							bottom="auto"
							right="-15px"
							border-radius="10px"
							align-items="center"
							display="flex"
							flex-direction="column"
							justify-content="center"
						>
							<Text margin="0px 0px 0px 0px" color="#ffff" font="18px sans-serif">
								xUSD
							</Text>
						</Box>
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
				{coin.length >= 1 && realAmount >= .01 && stringAmount.length <= 2 ? `${displayPrice}` : "0"}
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
						focus-background="#238DE0"
						active-background="#55535D"
						disabled={!(coin >= 0 && coin <= 3 && realAmount >= .01 && stringAmount.length <= 2 && allowance < realAmount && balance >= realAmount)}
						disabled-background="#302E39"
						type="button"
						focus-box-shadow="0 0 0 0px --color-primary"
						onClick={approveTransaction}
					>
						Approve
					</Button>
					<Box width="5%" />
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
						disabled={!(coin >= 0 && coin <= 3 && realAmount >= .01 && stringAmount.length <= 2 && allowance >= realAmount && balance >= realAmount)}
						disabled-background="#302E39"
						type="button"
						focus-box-shadow="0 0 0 0px --color-primary"
						onClick = {mintTransaction}
					>
						Sell
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
			<Box min-width="50px" min-height="100px" md-min-height={0} md-height="1%" />
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
			>
				<Text
					margin="0px 0px 0px 0px"
					display="flex"
					position="relative"
					font="35px sans-serif"
					color="#FFFFFF"
				>
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
						{coin === "0"
                         ? "Sell xGLD"
                         : coin === "1"
                         ? "Sell xPT"
                         : coin === "2"
                         ? "Sell xPD"
                         : coin === "3"
                         ? "Sell USDC"
                         : "Sell xMetals Tokens"}
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
						{coin === "0"
                         ? "xGLD Balance"
                         : coin === "1"
                         ? "xPT Balance"
                         : coin === "2"
                         ? "xPD Balance"
                         : coin === "3"
                         ? "USDC Balance"
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
						{balance}
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
  					{coin === "3" ? "Conversion" : "Price Per Oz"}
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
  						{coin.length >= 1 && coin !== "3" ? "$" : ""}
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
							{coin === "3" ? "1:1" : metalPrice}
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
						xUSD Balance
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
							$
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
							{xusdBalance}
						</Text>
					</Box>
				</Box>
				<Hr
					min-height="80%"
					min-width="1px"
					margin="0px 0px 0px 0px"
					border-color="#403E4A"
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
						Total Proceeds
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
							{coin.length >= 1 && realAmount >= .01 && stringAmount.length <= 2 ? "$" : ""}

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
							{coin.length >= 1 && realAmount >= .01 && stringAmount.length <= 2 ? `${displayPrice}` : ""}

						</Text>
					</Box>
				</Box>
			</Box>
		</Box>
			</Box>
		</Section>
		<Section min-height="100px" height="100%" background="#23212D" />
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