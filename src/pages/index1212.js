import React, { useEffect, useState } from "react";
import theme from "theme";
import { Theme, Text, Box, Input, Strong, Hr, Button, Image, Section } from "@quarkly/widgets";
import { Helmet } from "react-helmet";
import { GlobalQuarklyPageStyles } from "global-page-styles";
import { RawHtml, Override } from "@quarkly/components";
import * as Components from "components";
import { getTheSigner } from "components/wallet";
import { getProvider } from "components/theProvider";
import xusdContract from "components/xUSD";
import xusdNFTContract from "components/xUSD_NFT";
import { getTheAddress } from "components/theAddress";

export default (() => {


//variable for the amount being minted
const [amount, setAmount] = useState('');

//variable that goes in the function for the amount being minted
const [realAmount, setRealAmount] = useState("0");

//variable that checks the decimal places on the amount
const [stringAmount, setStringAmount] = useState('');

//variable for the error message that is passed
const [sendError, setSendError] = useState("");

//variable for a successful of the transaction being passed
const [sendSuccess, setSendSuccess] = useState("");

//variable for the transaction hash that is passed
const [transactionData, setTransactionData] = useState("");

//variable for the price that is displayed
const [displayPrice, setDisplayPrice] = useState("0");

//variable for the stable coin balance held by the user
const [stableBalance, setStableBalance] = useState();

//variable for the stable coin allowance to spend 
const [stableAllowance, setStableAllowance] = useState();


useEffect(() => {
	setRealAmount(amount); //when the amount is updated then the realamount is update here
	findPrice();
  });

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

//set the stable coin contract 
const findAllowance = async () => {
	
	//sets the allowance and balance of the stable coin 
	let provider = getProvider();
	let address = getTheAddress();
	let tContract = xusdContract(provider);
	let stableAllowance = await tContract.allowance(address,"0xA7f9de8da83dB3940c3996F2cFA582DA0789eA6E");
	setStableAllowance(stableAllowance/(10 ** 6));
	let stableBalance = await tContract.balanceOf(address);
	setStableBalance(stableBalance/(10 ** 6));
	};

//Function that sets Display Price and Price when changing the amount
const findPrice = async () => {
	setDisplayPrice(realAmount); //sets the price for the display 
}; 

useEffect(() => {
	if (realAmount) { //when the amount is changed then this will function that updates prices
		findPrice();
		findAllowance();
	}
}, [realAmount]);


useEffect(() => {
	findAllowance();
	const interval = setInterval(() => {
		findAllowance();
	  }, 5000);
	
	  //clear the interval when the component unmounts
	  return () => clearInterval(interval);
});


// function for the approve purchase transaction 
const approveTransaction = async () => {
	setSendError(""); //resets the error 
	setSendSuccess(""); //resets the Success message 
	setTransactionData("") //resets the transaction data
try{
	const provider = getProvider();
	const signer = getTheSigner();
	let temp = (xusdContract(provider)).connect(signer);
	let newPrice = displayPrice * (10 ** 6);
	let resp = await temp.approve("0xA7f9de8da83dB3940c3996F2cFA582DA0789eA6E",newPrice); //approve the spending amount to the metal contract for minting
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
	let signer = getTheSigner();
	let provider = getProvider();
	let temp = (xusdNFTContract(provider)).connect(signer);
	let resp = await temp.mint(realAmount); //mints a metal token based on the amount minted and which stable coin is being used
	console.log(resp);
	setSendSuccess("Mint Successful!"); //sets the success message for the transaction
	setTransactionData(resp.hash); //sends the transaction hash 

} catch(err) {
	console.error(err.message);
	setSendError(err.message); //sets the error message for why the transaction didn't work 
}
};



	return <Theme theme={theme}>
		<GlobalQuarklyPageStyles pageUrl={"index121"} />
		<Helmet>
		<title>
				xMetals | Dapp
			</title>
			<meta name={"xMetals App"} content={"App created by xMetals"} />
			<link rel={"shortcut icon"} href={"https://uploads.quarkly.io/63ff9730b4ef240020700a3c/images/xMetals%20Icon.png?v=2023-03-01T21:55:01.585Z"} type={"image/x-icon"} />
		</Helmet>
		<Components.TheHeader />
		<Section padding="24px 0 60px 0" md-padding="30px 0 30px 0" height="100%" background="#23212D">
			<Override
				slot="SectionContent"
				flex-direction="row"
				md-flex-wrap="wrap-reverse"
				md-flex-direction="row-reverse"
				md-display="flex"
			/>
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
				overflow-x="visible"
				overflow-y="visible"
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
						style={{ borderColor: (stableBalance < realAmount || realAmount < 0 || stringAmount.length > 0) ? "#FF1314" : "#484661", borderWidth: "1px", borderStyle: "solid" }}
					>
						<Box
							width="100px"
							height="40px"
							background="#55535D"
							border-radius="10px"
							position="relative"
							left="auto"
							top="auto"
							bottom="auto"
							right="-15px"
							align-items="center"
							display="flex"
							flex-direction="column"
							justify-content="center"
						>
							<Text
								margin="0px 0px 0px 0px"
								color="#fff"
								font="20px sans-serif"
								display="flex"
								flex-direction="column"
								align-items="center"
							>
								xUSD
							</Text>
						</Box>
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
							style={{ color: realAmount >= 0 && stringAmount.length <1 ? "#B1B0B7" :  "#a51717"}}
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
							Quantity
							<br />
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
			{stableBalance < realAmount  ? "Insufficient Balance" : ""}
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
							border-radius="10px"
							position="relative"
							left="auto"
							top="auto"
							bottom="auto"
							right="-15px"
							align-items="center"
							display="flex"
							flex-direction="column"
							justify-content="center"
						>
							<Text
								margin="0px 0px 0px 0px"
								color="#fff"
								font="20px sans-serif"
								display="flex"
								flex-direction="column"
								align-items="center"
							>
								USDC
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
			display="flex"
			flex-direction="column"
			align-items="flex-start"
			align-content="flex-start"
			width="75%"
		>
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
						disabled={!(stableAllowance < displayPrice && realAmount > 0 && stringAmount.length === 0 &&  stableBalance >= displayPrice)}
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
						disabled-background="#302E39"
						disabled={!( stableAllowance >= displayPrice && realAmount > 0 && stringAmount.length === 0 && stableBalance >= displayPrice)}
						type="button"
						focus-box-shadow="0 0 0 0px --color-primary"
						onClick ={mintTransaction}
					>
						Redeem for USDC
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
				md-width="100%"
				md-height="2%"
				md-min-height={0}
			/>
			<Box
				flex-direction="column"
				empty-min-width="64px"
				empty-min-height="64px"
				empty-border-width="1px"
				empty-border-style="solid"
				empty-border-color="LightGray"
				width="40%"
				display="flex"
				justify-content="center"
				md-width="100%"
				background="#010101"
				border-radius="30px"
				align-items="center"
			>
				<Image src="https://uploads.quarkly.io/63e1507af2f031001fb80741/images/xUSD%20v5.png?v=2023-03-15T23:56:54.050Z" display="block" width="100%" border-radius="30px 30px 0px 00px" />
				<Box />
				<Box display="flex" 
				flex-direction="column" 
				align-items="center" 
				justify-content="center"
				background="#3B394C"
				border-radius="0px 0px 30px 30px"
				>
					<Box height="5%" />
					<Text
						margin="0px 0px 0px 0px"
						color="#AAAAB1"
						font="30px sans-serif"
						display="flex"
						justify-content="flex-start"
						width="95%"
					>
						<br />
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
						</Strong>
						USDC
					</Text>
					<Text
						margin="0px 0px 0px 0px"
						color="#AAAAB1"
						font="20px sans-serif"
						display="flex"
						justify-content="flex-start"
						width="95%"
					>
						<br />
						1 xUSD = 1 USDC
					</Text>
					<Text
						margin="0px 0px 0px 0px"
						color="#AAAAB1"
						font="20px sans-serif"
						display="flex"
						justify-content="flex-start"
						width="95%"
					>
						<br />
						Settled in 2-3 business days
						<br />
						<br />
						Redeem your xUSD tokens for USDC, on a 1:1 basis with no fees. For example, 500 xUSD = 500 USDC. You will be issued a non-transferable receipt and then settled with the corresponding amount of USDC in 2-3 business days.
					</Text>
					<Box height="40%" />
				</Box>
			</Box>
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
