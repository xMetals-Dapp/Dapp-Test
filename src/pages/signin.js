import React, { useEffect, useState } from "react";
import theme from "theme";
import { Theme, Box, Button, Image, Text, Link, Section } from "@quarkly/widgets";
import { Helmet } from "react-helmet";
import { GlobalQuarklyPageStyles } from "global-page-styles";
import { RawHtml, Override } from "@quarkly/components";
import * as Components from "components";
import { getWhiteList } from "components/checkWhiteList";
import { useHistory } from "react-router-dom";
import { getTheAddress } from "components/theAddress";

export default (() => {

	
	//useEffect(() => {
	//	  let temp = getWhiteList();
	//	  isWhitelisted(temp);
	//  }, []);
	  
	//  const history = useHistory();

	//  const isWhitelisted = (isWhitelisted) => {
	//   if (isWhitelisted) {
	//	 history.push("/index");     
	//	}
	// };

	const [address, setAddress] = useState('');

	useEffect(() => {
		let tempAddress = getTheAddress();
		setAddress(tempAddress);
	  }, []);
	  

	return <Theme theme={theme}>
		<GlobalQuarklyPageStyles pageUrl={"signin"} />
		<Helmet>
			<title>
				Quarkly export
			</title>
			<meta name={"description"} content={"Web site created using quarkly.io"} />
			<link rel={"shortcut icon"} href={"https://uploads.quarkly.io/readme/cra/favicon-32x32.ico"} type={"image/x-icon"} />
			<meta name={"msapplication-TileColor"} content={"#232323"} />
		</Helmet>
		<Section
			padding="24px 0 60px 0"
			md-padding="30px 0 30px 0"
			background="#23212D"
			flex-direction="column"
			align-items="center"
			justify-content="center"
			height="100%"
		>
			<Override
				slot="SectionContent"
				flex-direction="column-reverse"
				md-flex-wrap="wrap"
				align-items="center"
				justify-content="space-around"
				height="640px"
				md-justify-content="space-around"
			/>
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
				justify-content="flex-start"
				md-width="100%"
				background="#2A2835"
				border-radius="30px"
				align-items="center"
				height="450px"
				lg-height="550px"
				md-height="400px"
				sm-height="500px"
				flex-wrap="wrap-reverse"
			>
				<Box min-width="100px" height="20px" />
				<Image src="https://uploads.quarkly.io/63ff9730b4ef240020700a3c/images/xMetals%20Icon.png?v=2023-03-01T21:55:01.585Z" display="block" width="150px" height="150px" />
				<Box min-width="100px" height="25px" />
				<Text
					margin="0px 0px 0px 0px"
					color="#fff"
					display="flex"
					flex-direction="column"
					font="30px sans-serif"
				>
					Welcome to xMetals
				</Text>
				<Box min-width="100px" min-height="25px" />
				<Box
					min-width="100px"
					width="80%"
					display="flex"
					flex-direction="column"
					align-items="center"
					justify-content="space-around"
					height="15%"
				>
					<Components.ConnectWalletButton />
					<Box width="5%" />
				</Box>
				<Button
			display="inline-block"
			border-radius="18px"
			height="50px"
			width="200px"
			user-select="none"
			pointer-events="auto"
			background="#238DE0"
			disabled={false}
			type="button"
			focus-box-shadow="0 0 0 0px --color-primary"
			disabled-background="#2A2835"
			href="/index"
		>
			Contintue
		</Button>
				<Text margin="0px 0px 0px 0px" color="#D92F25">
					You must be whitelisted to continue.
				</Text>
				<Box min-width="100px" min-height="10px" />
				<Link color="#238DE0" text-decoration-line="underline" href="/index">
					Click here to complete whitelisting
				</Link>
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