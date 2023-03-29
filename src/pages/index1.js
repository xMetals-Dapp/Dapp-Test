import React from "react";
import theme from "theme";
import { Theme, Text, Box, Button, Section } from "@quarkly/widgets";
import { Helmet } from "react-helmet";
import { GlobalQuarklyPageStyles } from "global-page-styles";
import { RawHtml, Override } from "@quarkly/components";
import * as Components from "components";

export default (() => {


	const handleSelectChange = async () => {
		// const selectedValue = event.target.value;
		 // Redirect the user to the selected URL
		// window.location.href = selectedValue;
		window.open("https://www.google.com/", "_self");
	   };


	return <Theme theme={theme}>
		<GlobalQuarklyPageStyles pageUrl={"index1"} />
		<Helmet>
		<title>
				xMetals | Dapp
			</title>
			<meta name={"xMetals App"} content={"App created by xMetals"} />
			<link rel={"shortcut icon"} href={"https://uploads.quarkly.io/63ff9730b4ef240020700a3c/images/xMetals%20Icon.png?v=2023-03-01T21:55:01.585Z"} type={"image/x-icon"} />
		</Helmet>
		<Section lg-flex-wrap="wrap-reverse" background="#23212D" height="100%" sm-height="250px">
			<Override
				slot="SectionContent"
				flex-direction="row"
				flex-wrap="wrap"
				sm-align-items="center"
				sm-display="flex"
				sm-justify-content="center"
				sm-flex-wrap="wrap"
				sm-align-content="space-between"
			/>
			<Text
				font="--headline4"
				color="--light"
				margin="0px 0px 0px 0px"
				lg-font="normal 700 50px/1.2 --fontFamily-googleAlegreyaSans, sans-serif"
				md-font="normal 700 40px/1.2 --fontFamily-googleAlegreyaSans, sans-serif"
				md-margin="0px 0px 24px 0px"
				sm-width="100%"
				sm-align-items="center"
				sm-display="flex"
				sm-flex-direction="column"
				sm-justify-content="center"
			>
				xMetals
			</Text>
			<Box
				width="3%"
				lg-width="2.5%"
				md-width="75%"
				md-height="10px"
				sm-width="9%"
			/>
			<Button
				display="inline-block"
				border-radius="18px"
				height="50px"
				width="100px"
				user-select="none"
				pointer-events="auto"
				background="#302E39"
				hover-background="#55535D"
				focus-background="#55535D"
				active-background="#55535D"
				disabled={false}
				type="button"
				focus-box-shadow="0 0 0 0px --color-primary"
				quarkly-title="Buy Button"
				onClick={handleSelectChange}
			>
				Buy
			</Button>
			<Box width="3%" lg-width="2.5%" />
			<Button
				border-radius="18px"
				height="50px"
				width="100px"
				background="#302E39"
				hover-background="#55535D"
				focus-background="#55535D"
				active-background="#55535D"
				disabled={false}
				type="link"
				focus-box-shadow="0 0 0 0 --color-primary"
				href="/index2"
				user-select="auto"
				quarkly-title="Sell Button"
				pointer-events="auto"
				display="flex"
				text-decoration-line="initial"
				flex-direction="column"
				align-items="center"
				justify-content="center"
			>
				Sell
			</Button>
			<Box width="3%" lg-width="2.5%" />
			<Button
				border-radius="18px"
				height="50px"
				width="100px"
				background="#302E39"
				hover-background="#55535D"
				focus-background="#55535D"
				active-background="#55535D"
				type="link"
				focus-box-shadow="0 0 0 0 #0077CC"
				quarkly-title="Redeem Button"
				href="/index11"
				align-items="center"
				display="flex"
				flex-direction="column"
				justify-content="center"
				text-decoration-line="initial"
			>
				Redeem
			</Button>
			<Box width="3%" lg-width="2.5%" />
			<Button
				border-radius="18px"
				height="50px"
				width="161px"
				background="#302E39"
				hover-background="#55535D"
				focus-background="#55535D"
				active-background="#55535D"
				type="button"
				focus-box-shadow="0 0 0 0 #0077CC"
				quarkly-title="Redeem Button"
			>
				Connect Wallet
			</Button>
		</Section>
		<Components.TheHeader />
		<Section background="#23212D" />
		<Components.ConnectWalletButton />
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