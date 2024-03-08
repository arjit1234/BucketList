import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [flashMessage, setFlashMessage] = useState({ message: '', type: '' });
    const [flashMessageType, setFlashMessageType] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/login', {
                email,
                password,
            });

            if (response.data) {
                setFlashMessage({ message: 'Login successful', type: 'success' });
                setFlashMessageType('success');
                navigate('/buckets');
            } 
        } catch (error) {
            if (error.response.status === 401) {
                setFlashMessage({ message: 'Invalid credentials', type: 'danger' });
                setFlashMessageType('danger');
            } else {
                console.error('Error logging in:', error);
                setFlashMessage({ message: 'An error occurred while logging in. Please try again.', type: 'danger' });
                setFlashMessageType('danger');
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <div className="md:w-1/2  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <img className="sm:w-96 w-48" src="https://i.ibb.co/2M7rtLk/Remote1.png" alt="image2" />
            </div>
            <div className="md:w-1/2 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                {flashMessage.message && (
                    <div className={`bg-${flashMessageType === 'success' ? 'green' : 'red'}-100 border border-${flashMessageType === 'success' ? 'green' : 'red'}-400 text-${flashMessageType === 'success' ? 'green' : 'red'}-700 px-4 py-3 rounded relative`} role="alert">
                        <span className="block sm:inline">{flashMessage.message}</span>
                    </div>
                )}
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                    </div>
                    <form className="mt-8 space-y-6 py-8" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <NavLink to="/register" className="font-medium text-red-600 hover:text-red-500">
                                    Don't have an account? Sign up
                                </NavLink>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
