import React from "react";
import { transformVar } from "@quarkly/atomize";
import { createGlobalStyle } from "styled-components";


const pageStyles = {
   "404": {
       "background": "--color-dark"
   },
   "index1": {
       "background": "--color-dark"
   },
   "index": {
       "background": "--color-dark"
   },
   "index2": {
       "background": "--color-dark"
   },
   "index11": {
       "background": "--color-dark"
   },
   "index12": {
       "background": "--color-dark"
   },
   "index121": {
       "background": "--color-dark"
   },
   "index1211": {
       "background": "--color-dark"
   },
   "index1212": {
       "background": "--color-dark"
   },
   "index3": {
       "background": "--color-dark"
   },
   "signin": {
       "background": "--color-dark"
   },
   "index12111": {
       "background": "--color-dark"
   },
   "index121111": {
       "background": "--color-dark"
   },
   "index1211111": {
       "background": "--color-dark"
   }
};


const PageStyles = createGlobalStyle`
   body {
       ${({ styles }) =>
           Object.entries(styles || {}).map(
               ([prop, value]) => `${prop}: ${transformVar(prop, value)};`
           )}
   }
`;
export const GlobalQuarklyPageStyles = ({ pageUrl }) => <PageStyles styles={pageStyles[pageUrl]} />





