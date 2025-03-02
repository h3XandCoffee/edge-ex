import React, { useState } from 'react';
import API from '../../utils/axios';
//import history from 'utils/history';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post('/token/', formData);
            localStorage.setItem('access', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            alert('Login Successful!');
          //history.push('/protected');
        } catch (err) {
            alert('Login Failed!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="username" type="text" placeholder="Username" onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
