import React from "react";
import { useOverrides } from "@quarkly/components";
import { Input } from "@quarkly/widgets";

const defaultProps = {
	"display": "block",
	"placeholder-color": "#B1B0B7",
	"background": "#3B394C",
	"width": "126.50118371212125px",
	"required-align-self": "auto",
	"required-order": "0",
	"defaultValue": "0",
	"placeholder": "0",
	"required": false,
	"text-align": "center",
	"color": "#B1B0B7",
	"border-color": "#3B394C",
	"position": "static",
	"bottom": "auto",
	"height": "39.86908143939394px",
	"left": "385px",
	"right": "auto",
	"top": "215px",
	"hover-border-width": 0,
	"focus-border-width": 0,
	"required-border-width": 0,
	"placeholder-border-width": 0,
	"invalid-border-width": 0,
	"disabled-border-width": 0,
	"type": "number",
	"name": "Mint_Tokens",
	"invalid-color": "#a51717",
	"hover-color": "#B1B0B7",
	"border-width": 0,
	"border-style": "none"
};
const overrides = {};

const InputCom = props => {
	const {
		rest
	} = useOverrides(props, overrides, defaultProps);
	return <Input {...rest} />;
};

Object.assign(InputCom, { ...Input,
	defaultProps,
	overrides
});
export default InputCom;