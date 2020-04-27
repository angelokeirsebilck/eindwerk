import Loader from 'react-loader-spinner'
import React from 'react';

 export default class App extends React.Component {
  //other logic
    render() {
	 return(
	  <Loader
	     type="Bars"
	     color="#f9a373"
	     height={50}
	     width={50}
	     timeout={3000} //3 secs
	  />
	 );
    }
 }