import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBiking, FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Call the generate OTP API
            const response = await axios.post("http://localhost:4000/api/v1/generate-otp", {
                email: formData.email,
            });

            if (response.data.success) {
                alert("OTP sent to your email.");
                // Navigate to OTP page with user form data
                navigate('/otpVerification', { state: formData });
            } else {
                alert(response.data.message || "Failed to send OTP.");
            }
        } catch (error) {
            alert(error.response?.data?.message || "Error sending OTP.");
        }
    };

    return (
        <section className="bg-[#f0f9f4] py-16 flex justify-center items-center min-h-screen">
            <div className="bg-white rounded-xl shadow-[10px_0_20px_rgba(0,0,0,0.1),_-10px_0_20px_rgba(0,0,0,0.1),_0_10px_25px_rgba(0,0,0,0.1)] p-8 w-full max-w-md text-center">

                <div className="w-20 h-20 flex items-center justify-center bg-green-100 text-green-600 rounded-full mx-auto mb-4">
                    <FaBiking className="text-4xl" />
                </div>

                <h2 className="text-2xl font-bold text-green-900 mb-6">BikeRent</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="E-mail Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="New Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <div
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-green-600"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-colors"
                    >
                        Verify Email
                    </button>
                </form>

                <p className="text-sm text-gray-600 mt-4">
                    Remember password? <a href="/login" className="text-green-600 hover:underline">Sign In</a>
                </p>
            </div>
        </section>
    );
};

export default SignupForm;
