import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobile, setMobile] = useState('');
    const [qualification, setQualification] = useState('');
    const [university, setUniversity] = useState('');
    const [password, setPassword] = useState('');
    const [flashMessage, setFlashMessage] = useState('');
    const [flashMessageType, setFlashMessageType] = useState('');

    const handleMobileChange = (e) => {
        const value = e.target.value.replace(/\D/, '');
        setMobile(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/register', { email, firstName, lastName, mobile, qualification, university, password });
            setFlashMessage('User registered successfully');
            setFlashMessageType('success');
            // Reset form fields after successful registration
            setEmail('');
            setFirstName('');
            setLastName('');
            setMobile('');
            setQualification('');
            setUniversity('');
            setPassword('');
        } catch (error) {
            if (error.response.status === 400) {
                setFlashMessage('User with this email already exists');
                setFlashMessageType('danger');
            } else {
                // Handle other errors
                console.error('Error registering user:', error);
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <div className="md:w-1/2 bg-red-600 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <img className="sm:w-96 w-48" src="https://i.ibb.co/2M7rtLk/Remote1.png" alt="image2" />
            </div>
            <div className="md:w-1/2 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                {flashMessage && (
                        <div className={`bg-${flashMessageType === 'success' ? 'green' : 'red'}-100 border border-${flashMessageType === 'success' ? 'green' : 'red'}-400 text-${flashMessageType === 'success' ? 'green' : 'red'}-700 px-4 py-3 rounded relative`} role="alert">
                            <span className="block sm:inline">{flashMessage}</span>
                        </div>
                    )}
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register for an account</h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="first-name" className="sr-only">First Name</label>
                                <input
                                    id="first-name"
                                    name="first-name"
                                    type="text"
                                    autoComplete="given-name"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="last-name" className="sr-only">Last Name</label>
                                <input
                                    id="last-name"
                                    name="last-name"
                                    type="text"
                                    autoComplete="family-name"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="mobile" className="sr-only">Mobile</label>
                            <div className="flex items-center">
                                <input
                                    id="mobile"
                                    name="mobile"
                                    type="tel"
                                    autoComplete="tel"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-r-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                    placeholder="Mobile"
                                    value={mobile}
                                    onChange={handleMobileChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="qualification" className="sr-only">Qualification</label>
                            <input
                                id="qualification"
                                name="qualification"
                                type="text"
                                autoComplete="qualification"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                placeholder="Qualification"
                                value={qualification}
                                onChange={(e) => setQualification(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="university" className="sr-only">University or College</label>
                            <input
                                id="university"
                                name="university"
                                type="text"
                                autoComplete="university"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                placeholder="University or College"
                                value={university}
                                onChange={(e) => setUniversity(e.target.value)}
                            />
                        </div>
                        {/* <div>
                            <label htmlFor="address" className="sr-only">Address</label>
                            <input
                                id="address"
                                name="address"
                                type="text"
                                autoComplete="address"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div> */}
                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <NavLink to="/login" className="font-medium text-red-600 hover:text-red-500">
                                    Already have an account? Sign in
                                </NavLink>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
