import React, { useState } from 'react';
import API from '../../utils/axios';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/register/', formData);
            alert('Registration Successful!');
        } catch (err) {
            alert('Registration Failed!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="username" type="text" placeholder="Username" onChange={handleChange} />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
