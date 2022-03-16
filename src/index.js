/*import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AppProvider} from "@shopify/polaris";
import en from '@shopify/polaris/locales/en.json';
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/
import React from "react";
import ReactDOM from "react-dom";
import {AppProvider} from "@shopify/polaris";
import en from '@shopify/polaris/locales/en.json';

import App from "./App";
import "@shopify/polaris/build/esm/styles.css";

ReactDOM.render(<AppProvider i18n={en} theme={{colorScheme: "light"}}><App /></AppProvider>, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
