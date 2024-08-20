import { Link, Outlet } from "react-router-dom";
import axios from 'axios';
import { useState, ChangeEvent } from "react";

// Define types for the state
interface LoginResponse {
    access: string;
}

function App() {
    const SERVER: string = 'http://127.0.0.1:8000/';  // Ensure protocol is included

    // Define the state with TypeScript types
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [access, setAccess] = useState<string>('');

    // Define the login function with TypeScript
    const login = async () => {
        const data = { username, password }; // Sending data as an object
        try {
            const res = await axios.post<LoginResponse>(`${SERVER}login/`, data);
            setAccess(res.data.access);  // Update state with access token
            localStorage.setItem('access', res.data.access);  // Store access token in localStorage
        } catch (err) {
            console.error('Login error:', err);  // Added error handling
        }
    };

    // Handle change events for input fields
    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <div>
            <h1>Login Page</h1>
            <div>
                Username: 
                <input type="text" onChange={handleUsernameChange} />
            </div>
            <div>
                Password: 
                <input type="password" onChange={handlePasswordChange} />
            </div>
            <div>
                <button onClick={login}>LOGIN</button>
            </div>
            <div>{username} -- {password}</div> {/* Displaying username and password for testing purposes */}
            <hr/>
            {access && (
                <div>
                    <Link to="/products">
                        <button>Go to Products</button>
                    </Link>
                </div>
            )}
            <Outlet />
        </div>
    );
}

export default App;
