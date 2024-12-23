import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email || !password) {
            setError('Please fill in both email and password');
            return;
        }
        setLoading(true);
        setError('');
    
        console.log('Email:', email);
        console.log('Password:', password);

        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });
            console.log(response.data); // API response logged

            if (response.data.message === "Login successful") {
                // Assuming successful login returns user data
                localStorage.setItem('user', JSON.stringify(response.data));
                window.location.href = '/dashboard';
            } else {
                setError(response.data.message || 'Login failed');
            }
        } catch (err) {
            console.error('Login failed:', err);
            setLoading(false);
            setError('An error occurred during login. Please try again later.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Logging In...' : 'Login'}
                    </button>
                </form>
                <div className="signup-link">
                    <p>Don't have an account? <a href="/register">Sign Up</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
