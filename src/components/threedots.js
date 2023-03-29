import React, { useEffect, useState } from "react";
import QuarklycommunityKitOption from "./QuarklycommunityKitOption";
import QuarklycommunityKitSelect from "./QuarklycommunityKitSelect";
import QuarklycommunityKitForm from "./QuarklycommunityKitForm";


const ThreeDot = props => {
    
    const [link, setLink] = useState("");

    const handleSelectChange = (event) => {
      let temp = event.target.value;
      setLink(temp);
      window.open(temp, "_blank");
      };

      useEffect(() => {
        if (link !== '') {
          setLink('');
        }
      }, [link]);
		
	return <QuarklycommunityKitForm  position="relative"
    top="auto"
    left="auto"
    bottom="auto"
    right="-15px"
    border-radius="18px"
    width="100px"
    autoComplete="off"
    sm-color="#fff">

	<QuarklycommunityKitSelect 
       background= "#302E39"
       width= "75px"
       height= "50px"
       color= "#fff"
       name= "•••"
       border-width= "0px"
       border-radius= "18px"
       value={link}
       onChange={handleSelectChange}
       >
			<QuarklycommunityKitOption label="•••" value= "" disabled={true} />
			<QuarklycommunityKitOption label="Docs" value= "https://docs.xmetals.io/" />
			<QuarklycommunityKitOption label="Audit" value= "https://docs.xmetals.io/proof-of-assets" />
			<QuarklycommunityKitOption label="Blog" value= "https://xmetals.medium.com/" />
		</QuarklycommunityKitSelect>
	</QuarklycommunityKitForm>;
};

export default ThreeDot;