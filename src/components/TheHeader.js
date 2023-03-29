import React from "react";
import { useOverrides, Override } from "@quarkly/components";
import { Image, Box, Button, Section } from "@quarkly/widgets";
import ConnectWalletButton  from "./ConnectWalletButton";
import ThreeDot from "./threedots";

const defaultProps = {
	"lg-flex-wrap": "wrap-reverse",
	"background": "#23212D",
	"height": "100%",
	"sm-height": "250px"
};

const overrides = {
	"image": {
		"kind": "Image",
		"props": {
			"src": "https://uploads.quarkly.io/63ff9730b4ef240020700a3c/images/xMetals%20Icon.png?v=2023-03-01T21:55:01.585Z",
			"display": "block",
			"min-width": "auto",
			"min-height": "auto",
			"width": "55px",
			"height": "55px"
		}
	},
	"box": {
		"kind": "Box",
		"props": {
			"width": "3%",
			"lg-width": "2.5%",
			"md-width": "75%",
			"md-height": "10px",
			"sm-width": "9%"
		}
	},
	"button": {
		"kind": "Button",
		"props": {
			"display": "flex",
			"border-radius": "18px",
			"height": "50px",
			"width": "100px",
			"user-select": "none",
			"pointer-events": "auto",
			"background": "#302E39",
			"hover-background": "#55535D",
			"focus-background": "#55535D",
			"active-background": "#55535D",
			"disabled": false,
			"type": "link",
			"focus-box-shadow": "0 0 0 0px --color-primary",
			"quarkly-title": "Buy Button",
			"href": "/index",
			"text-decoration-line": "initial",
			"align-items": "center",
			"justify-content": "center"
		}
	},
	"box1": {
		"kind": "Box",
		"props": {
			"width": "3%",
			"lg-width": "2.5%"
		}
	},
	"button1": {
		"kind": "Button",
		"props": {
			"border-radius": "18px",
			"height": "50px",
			"width": "100px",
			"background": "#302E39",
			"hover-background": "#55535D",
			"focus-background": "#55535D",
			"active-background": "#55535D",
			"disabled": false,
			"type": "link",
			"focus-box-shadow": "0 0 0 0 --color-primary",
			"href": "/index2",
			"user-select": "auto",
			"quarkly-title": "Sell Button",
			"pointer-events": "auto",
			"display": "flex",
			"text-decoration-line": "initial",
			"flex-direction": "column",
			"align-items": "center",
			"justify-content": "center"
		}
	},
	"box2": {
		"kind": "Box",
		"props": {
			"width": "3%",
			"lg-width": "2.5%"
		}
	},
	"button2": {
		"kind": "Button",
		"props": {
			"border-radius": "18px",
			"height": "50px",
			"width": "100px",
			"background": "#302E39",
			"hover-background": "#55535D",
			"focus-background": "#55535D",
			"active-background": "#55535D",
			"type": "link",
			"focus-box-shadow": "0 0 0 0 #0077CC",
			"quarkly-title": "Redeem Button",
			"href": "/index11",
			"align-items": "center",
			"display": "flex",
			"flex-direction": "column",
			"justify-content": "center",
			"text-decoration-line": "initial"
		}
	},

	"box5": {
		"kind": "Box",
		"props": {
			"lg-width": "2.5%",
			"width": "30px"
		}
	},
	
	"threeDot": {
		"kind": "ThreeDot",
		"props": {}
	},

	"box3": {
		"kind": "Box",
		"props": {
			"width": "3%",
			"lg-width": "2.5%"
		}
	},
	"connectWalletButton": {
		"kind": "ConnectWalletButton",
		"props": {}
	}
};

const TheHeader = props => {
	const {
		override,
		children,
		rest
	} = useOverrides(props, overrides, defaultProps);
	return <Section {...rest}>
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
		<Image {...override("image")} />
		<Box {...override("box")} />
		<Button {...override("button")}>
			Buy
		</Button>
		<Box {...override("box1")} />
		<Button {...override("button1")}>
			Sell
		</Button>
		<Box {...override("box2")} />
		<Button {...override("button2")}>
			Redeem
		</Button>
		<Box {...override("box5")} />
		<ThreeDot {...override("threeDot")} />
		<Box {...override("box3")} />
		<ConnectWalletButton {...override("connectWalletButton")} />
		{children}
	</Section>;
};

Object.assign(TheHeader, { ...Section,
	defaultProps,
	overrides
});
export default TheHeader;