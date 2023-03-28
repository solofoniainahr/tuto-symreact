import React from 'react'
import ReactDOM from 'react-dom'
import HomePage from './js/pages/HomePage';
import Navbar from './js/components/Navbar';
import CustomersPage from './js/pages/CustomersPage';
import InvoicesPages from './js/pages/InvoicesPages';

import { HashRouter, Switch, Route } from 'react-router-dom';

/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
import CustomersPageWithPagination from './js/pages/CustomersPageWithPagination';

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';


console.log("hello world!!!")

const App = () => {
    return (
        <HashRouter>
            <Navbar />
            <main className='container pt-5'>
                <Switch>
                    <Route path="/invoices" component={InvoicesPages} />
                    <Route path="/customers" component={CustomersPage} />
                    <Route path="/" component={HomePage} />
                </Switch>
                
            </main>
        </HashRouter>
    )
}


const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);