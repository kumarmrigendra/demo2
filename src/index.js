// var hello = document.getElementById("hello");  
// hello.innerHTML = "Hello World!"; 
// console.log1("fdfd")
import React from 'react';
import { Router, browserHistory } from 'react-router';
import { render } from 'react-dom';
import routes from './routes';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './components/App';
console.log(routes);
// render(
//   <Router routes={routes} history={BrowserRouter} />,
//   document.getElementById('hello')
// );


render((
     <BrowserRouter>
          <Route path="/" component={App}/>
     </BrowserRouter>
     ),
     document.getElementById('hello')
);