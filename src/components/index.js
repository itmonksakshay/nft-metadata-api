import React from 'react';
import Header from './header';
import Footer from './footer';

export default function Index(props){

    return(<div {...props}>
            <Header/>
                {props.children}
            <Footer/>
            </div>);

}
