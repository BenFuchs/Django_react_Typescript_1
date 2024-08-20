import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Products from './Products';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

// Ensure `root` is correctly typed
const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error('Failed to find the root element');
}

const root = ReactDOM.createRoot(rootElement);

// Render the app
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} >
                    <Route path='/products' element={<Products />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
