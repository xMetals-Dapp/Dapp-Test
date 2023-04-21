import React from "react";
import theme from "theme";
import { Theme, Image, Text, Box, Strong, LinkBox, Section } from "@quarkly/widgets";
import { Helmet } from "react-helmet";
import { GlobalQuarklyPageStyles } from "global-page-styles";
import { RawHtml, Override } from "@quarkly/components";
import * as Components from "components";
export default (() => {
	return <Theme theme={theme}>
		<GlobalQuarklyPageStyles pageUrl={"index11"} />
		<Helmet>
		<title>
				xMetals | Dapp
			</title>
			<meta name={"xMetals App"} content={"App created by xMetals"} />
			<link rel={"shortcut icon"} href={"https://uploads.quarkly.io/63ff9730b4ef240020700a3c/images/xMetals%20Icon.png?v=2023-03-01T21:55:01.585Z"} type={"image/x-icon"} />
		</Helmet>
		<Components.TheHeader>
	<Override slot="button2" background="#55535D" />
</Components.TheHeader>
<Section
	padding="24px 0 60px 0"
	md-padding="30px 0 30px 0"
	background="#23212D"
	flex-direction="row"
	display="flex"
	height="100%"
	width="100%"
	md-justify-items="center"
>
	<Override
		slot="SectionContent"
		flex-direction="row"
		align-items="center"
		justify-content="space-around"
		flex-wrap="wrap"
		width="100%"
		height="100%"
	/>
	<LinkBox width="23.5%" href="/index1211" md-width="45%" sm-height="330px">
		<Box
			width="100%"
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
			height="400px"
			display="flex"
			flex-direction="column"
			align-items="center"
			justify-content="center"
			hover-border-color="#238DE0"
			hover-border-width="1px"
			hover-border-style="solid"
			box-shadow="-10px 10px 20px 1px rgba(0, 0, 0, 0.46)"
			sm-height="100%"
		>
			<Image
				src="https://uploads.quarkly.io/63e1507af2f031001fb80741/images/Palladiuum.jpg?v=2023-04-21T18:20:03.929Z"
				display="block"
				width="100%"
				height="80%"
				object-fit="cover"
				position="static"
				top="-30px"
				bottom="5px"
				border-radius="30px 30px 0px 0px"
			/>
			<Box
				position="static"
				top="auto"
				right="auto"
				bottom="0px"
				left="64px"
				width="100%"
				background="302E39"
				height="20%"
				border-radius="0px 0px 30px 30px"
				border-color="#484661"
				border-width="1px"
				border-style="solid"
				display="flex"
				flex-direction="column"
				justify-content="center"
				align-items="flex-end"
				lg-height="25%"
				sm-height="35%"
			>
				<Text
					margin="0px 0px 0px 0px"
					color="#fff"
					font="150% sans-serif"
					width="95%"
					display="flex"
					justify-content="flex-end"
					flex-direction="column-reverse"
				>
					1 Ounce Palladium
				</Text>
				<Box width="100%" height="10%" />
				<Text
					margin="0px 0px 0px 0px"
					color="#fff"
					font="100% sans-serif"
					width="95%"
					display="flex"
					justify-content="flex-start"
				>
					<Strong>
						1 xPD + $100
					</Strong>
				</Text>
			</Box>
		</Box>
	</LinkBox>
	<LinkBox width="23.5%" href="/index121" md-width="45%" sm-height="330px">
		<Box
			width="100%"
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
			height="400px"
			display="flex"
			flex-direction="column"
			align-items="center"
			justify-content="center"
			hover-border-color="#238DE0"
			hover-border-width="1px"
			hover-border-style="solid"
			box-shadow="-10px 10px 20px 1px rgba(0, 0, 0, 0.46)"
			sm-height="100%"
		>
			<Image
				src="https://uploads.quarkly.io/63e1507af2f031001fb80741/images/Gold.jpg?v=2023-04-21T18:20:03.931Z"
				display="block"
				width="100%"
				height="80%"
				object-fit="cover"
				position="static"
				top="-30px"
				bottom="5px"
				border-radius="30px 30px 0px 0px"
			/>
			<Box
				position="static"
				top="auto"
				right="auto"
				bottom="0px"
				left="64px"
				width="100%"
				background="302E39"
				height="20%"
				border-radius="0px 0px 30px 30px"
				border-color="#484661"
				border-width="1px"
				border-style="solid"
				display="flex"
				flex-direction="column"
				justify-content="center"
				align-items="flex-end"
				lg-height="25%"
				sm-height="35%"
			>
				<Text
					margin="0px 0px 0px 0px"
					color="#fff"
					font="150% sans-serif"
					width="95%"
					display="flex"
					justify-content="flex-end"
					flex-direction="column-reverse"
				>
					1 Ounce Gold
				</Text>
				<Box width="100%" height="10%" />
				<Text
					margin="0px 0px 0px 0px"
					color="#fff"
					font="100% sans-serif"
					width="95%"
					display="flex"
					justify-content="flex-start"
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
						1 xGLD + $100
					</Strong>
				</Text>
			</Box>
		</Box>
	</LinkBox>
	<LinkBox width="23.5%" href="/index12" md-width="45%" sm-height="330px">
		<Box
			width="100%"
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
			height="400px"
			display="flex"
			flex-direction="column"
			align-items="center"
			justify-content="center"
			hover-border-color="#238DE0"
			hover-border-width="1px"
			hover-border-style="solid"
			box-shadow="-10px 10px 20px 1px rgba(0, 0, 0, 0.46)"
			as="div"
			sm-height="100%"
		>
			<Image
				src="https://uploads.quarkly.io/63e1507af2f031001fb80741/images/Platinum.jpg?v=2023-04-21T18:20:03.924Z"
				display="block"
				width="100%"
				height="80%"
				object-fit="cover"
				position="static"
				top="-30px"
				bottom="5px"
				border-radius="30px 30px 0px 0px"
			/>
			<Box
				position="static"
				top="auto"
				right="auto"
				bottom="0px"
				left="64px"
				width="100%"
				background="302E39"
				height="20%"
				border-radius="0px 0px 30px 30px"
				border-color="#484661"
				border-width="1px"
				border-style="solid"
				display="flex"
				flex-direction="column"
				justify-content="center"
				align-items="flex-end"
				lg-height="25%"
				sm-height="35%"
			>
				<Text
					margin="0px 0px 0px 0px"
					color="#fff"
					font="150% sans-serif"
					width="95%"
					display="flex"
					justify-content="flex-end"
					flex-direction="column-reverse"
				>
					1 Ounce Platinum
				</Text>
				<Box width="100%" height="10%" />
				<Text
					margin="0px 0px 0px 0px"
					color="#fff"
					font="100% sans-serif"
					width="95%"
					display="flex"
					justify-content="flex-start"
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
						1 xPT + $100
					</Strong>
				</Text>
			</Box>
		</Box>
	</LinkBox>
	<LinkBox
		width="23.5%"
		href="/index1212"
		md-width="45%"
		sm-height="330px"
		justify-content="flex-start"
	>
		<Box
			width="100%"
			md-width="100%"
			md-align-items="center"
			md-justify-content="space-between"
			empty-border-width="1px"
			empty-border-style="solid"
			empty-border-color="LightGray"
			md-margin="0px 0px 30px 0px"
			empty-min-width="64px"
			empty-min-height="64px"
			md-display="flex"
			background="#010101"
			border-radius="30px"
			height="400px"
			display="flex"
			flex-direction="column"
			align-items="center"
			justify-content="space-between"
			hover-border-color="#238DE0"
			hover-border-width="1px"
			hover-border-style="solid"
			box-shadow="-10px 10px 20px 1px rgba(0, 0, 0, 0.46)"
			sm-height="100%"
		>
			<Box min-width="10px" />
			<Image
				src="https://uploads.quarkly.io/63e1507af2f031001fb80741/images/USDC2.jpg?v=2023-04-21T18:25:32.332Z"
				display="block"
				object-fit="cover"
				position="static"
				top="-30px"
				bottom="5px"
				border-radius="30px 30px 0px 0px"
				width="100%"
				height="80%"
			/>
			<Box
				position="static"
				top="auto"
				right="auto"
				bottom="0px"
				left="64px"
				width="100%"
				background="#2A2835"
				height="20%"
				border-radius="0px 0px 30px 30px"
				border-color="#484661"
				border-width="1px"
				border-style="solid"
				display="flex"
				flex-direction="column"
				justify-content="center"
				align-items="flex-end"
				lg-height="25%"
				sm-height="35%"
			>
				<Text
					margin="0px 0px 0px 0px"
					color="#fff"
					font="150% sans-serif"
					width="95%"
					display="flex"
					justify-content="flex-end"
					flex-direction="column-reverse"
				>
					1 USDC
				</Text>
				<Box width="100%" height="10%" />
				<Text
					margin="0px 0px 0px 0px"
					color="#fff"
					font="100% sans-serif"
					width="95%"
					display="flex"
					justify-content="flex-start"
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
						1 xUSD
					</Strong>
				</Text>
			</Box>
		</Box>
	</LinkBox>
</Section>
<Section
	padding="24px 0 60px 0"
	md-padding="30px 0 30px 0"
	height="100%"
	background="#23212D"
	flex-direction="row"
	width="100%"
	display="flex"
	box-shadow="0 0 0 0 #000000"
>
	<Override
		slot="SectionContent"
		flex-direction="row"
		md-flex-wrap="wrap"
		width="100%"
		height="100%"
		align-items="center"
		justify-content="space-around"
		flex-wrap="wrap"
	/>
	<LinkBox width="23.5%" href="/index12111" md-width="45%" sm-height="330px">
		<Box
			width="100%"
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
			height="400px"
			display="flex"
			flex-direction="column"
			align-items="center"
			justify-content="center"
			hover-border-color="#238DE0"
			hover-border-width="1px"
			hover-border-style="solid"
			box-shadow="-10px 10px 20px 1px rgba(0, 0, 0, 0.46)"
			sm-height="100%"
		>
			<Image
				src="https://uploads.quarkly.io/63e1507af2f031001fb80741/images/Palladium_Kilo.jpg?v=2023-04-21T18:35:41.084Z"
				display="block"
				width="100%"
				height="80%"
				object-fit="cover"
				position="static"
				top="-30px"
				bottom="5px"
				border-radius="30px 30px 0px 0px"
			/>
			<Box
				position="static"
				top="auto"
				right="auto"
				bottom="0px"
				left="64px"
				width="100%"
				background="302E39"
				height="20%"
				border-radius="0px 0px 30px 30px"
				border-color="#484661"
				border-width="1px"
				border-style="solid"
				display="flex"
				flex-direction="column"
				justify-content="center"
				align-items="flex-end"
				lg-height="25%"
				sm-height="35%"
			>
				<Text
					margin="0px 0px 0px 0px"
					color="#fff"
					font="150% sans-serif"
					width="95%"
					display="flex"
					justify-content="flex-end"
					flex-direction="column-reverse"
				>
					1 Kilo Palladium
				</Text>
				<Box width="100%" height="10%" />
				<Text
					margin="0px 0px 0px 0px"
					color="#fff"
					font="100% sans-serif"
					width="95%"
					display="flex"
					justify-content="flex-start"
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
						32.1507 xPD + $100
					</Strong>
				</Text>
			</Box>
		</Box>
	</LinkBox>
	<LinkBox width="23.5%" href="/index1211111" md-width="45%" sm-height="330px">
		<Box
			width="100%"
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
			height="400px"
			display="flex"
			flex-direction="column"
			align-items="center"
			justify-content="center"
			hover-border-color="#238DE0"
			hover-border-width="1px"
			hover-border-style="solid"
			box-shadow="-10px 10px 20px 1px rgba(0, 0, 0, 0.46)"
			sm-height="100%"
		>
			<Image
				src="https://uploads.quarkly.io/63e1507af2f031001fb80741/images/Gold_Kilo.jpg?v=2023-04-21T18:35:41.083Z"
				display="block"
				width="100%"
				height="80%"
				object-fit="cover"
				position="static"
				top="-30px"
				bottom="5px"
				border-radius="30px 30px 0px 0px"
			/>
			<Box
				position="static"
				top="auto"
				right="auto"
				bottom="0px"
				left="64px"
				width="100%"
				background="302E39"
				height="20%"
				border-radius="0px 0px 30px 30px"
				border-color="#484661"
				border-width="1px"
				border-style="solid"
				display="flex"
				flex-direction="column"
				justify-content="center"
				align-items="flex-end"
				lg-height="25%"
				sm-height="35%"
			>
				<Text
					margin="0px 0px 0px 0px"
					color="#fff"
					font="150% sans-serif"
					width="95%"
					display="flex"
					justify-content="flex-end"
					flex-direction="column-reverse"
				>
					1 Kilo Gold
				</Text>
				<Box width="100%" height="10%" />
				<Text
					margin="0px 0px 0px 0px"
					color="#fff"
					font="100% sans-serif"
					width="95%"
					display="flex"
					justify-content="flex-start"
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
						32.1507 xGLD + $100
					</Strong>
				</Text>
			</Box>
		</Box>
	</LinkBox>
	<LinkBox width="23.5%" href="/index121111" md-width="45%" sm-height="330px">
		<Box
			width="100%"
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
			height="400px"
			display="flex"
			flex-direction="column"
			align-items="center"
			justify-content="center"
			hover-border-color="#238DE0"
			hover-border-width="1px"
			hover-border-style="solid"
			box-shadow="-10px 10px 20px 1px rgba(0, 0, 0, 0.46)"
			sm-height="100%"
		>
			<Image
				src="https://uploads.quarkly.io/63e1507af2f031001fb80741/images/Platinum_Kilo.jpg?v=2023-04-21T18:35:41.079Z"
				display="block"
				width="100%"
				height="80%"
				object-fit="cover"
				position="static"
				top="-30px"
				bottom="5px"
				border-radius="30px 30px 0px 0px"
			/>
			<Box
				position="static"
				top="auto"
				right="auto"
				bottom="0px"
				left="64px"
				width="100%"
				background="302E39"
				height="20%"
				border-radius="0px 0px 30px 30px"
				border-color="#484661"
				border-width="1px"
				border-style="solid"
				display="flex"
				flex-direction="column"
				justify-content="center"
				align-items="flex-end"
				lg-height="25%"
				sm-height="35%"
			>
				<Text
					margin="0px 0px 0px 0px"
					color="#fff"
					font="150% sans-serif"
					width="95%"
					display="flex"
					justify-content="flex-end"
					flex-direction="column-reverse"
				>
					1 Kilo Gold
				</Text>
				<Box width="100%" height="10%" />
				<Text
					margin="0px 0px 0px 0px"
					color="#fff"
					font="100% sans-serif"
					width="95%"
					display="flex"
					justify-content="flex-start"
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
						32.1507 xGLD + $100
					</Strong>
				</Text>
			</Box>
		</Box>
	</LinkBox>
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
