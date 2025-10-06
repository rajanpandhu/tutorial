import React, { useState, useEffect } from "react";
import InputField from '../loginregister/InputField';
import '../../assets/css/registration.css';

const Registration = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'user'
    });

    const [error, setErrors] = useState({});
    const [users, setUsers] = useState([]);

    // Component load hone par localStorage se data load karo
    useEffect(() => {
        const savedUsers = localStorage.getItem('users');
        if (savedUsers) {
            setUsers(JSON.parse(savedUsers));
        }
    }, []);

    const validateField = (name, value) => {
        let error = '';
        switch(name){
            case 'username':
                if(!value.trim()){
                    error = 'Username is required';
                }
                break;
            case 'email':
                if(!value.includes('@')){
                    error = 'Valid email is required';
                }
                break;
            case 'phone':
                if(!value.trim()){
                    error = 'Phone number is required';
                } else if(!/^\d{10}$/.test(value.replace(/\s/g, ''))){
                    error = 'Phone number must be 10 digits';
                }
                break;
            case 'password':
                if (value.length < 6) {
                    error = 'Password must be at least 6 characters';
                }
                break;
            case 'confirmPassword':
                if (value !== formData.password) {
                    error = 'Passwords do not match';
                }
                break;
            default:
                break;
        }
        return error;
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        const fieldError = validateField(name, value);
        setErrors(prevErrors => {
            const newErrors = {...prevErrors};
            if(fieldError){
                newErrors[name] = fieldError;
            }else{
                delete newErrors[name];
            }

            if(name === 'password' && formData.confirmPassword){
                const confirmError = validateField('confirmPassword', formData.confirmPassword);
                if(confirmError){
                    newErrors.confirmPassword = confirmError;
                }else{
                    delete newErrors.confirmPassword;
                }
            }
            return newErrors;
        });
    }

    const validateAll = () => {
        let newErrors = {};
        Object.keys(formData).forEach(key => {
            if(key !== 'confirmPassword') {
                const error = validateField(key, formData[key]);
                if(error){
                    newErrors[key] = error;
                }
            }
        });
        return newErrors;
    }

    const saveUserData = (userData) => {
        // New user object banao
        const newUser = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            username: userData.username,
            email: userData.email,
            phone: userData.phone,
            role: userData.role || 'user', // Default role 'user'
            password: userData.password, // Production mein hash karna hai
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // Existing users ke saath merge karo
        const updatedUsers = [...users, newUser];
        
        // State update karo
        setUsers(updatedUsers);
        
        // localStorage mein save karo
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        
        // JSON file download karne ka option (optional)
        downloadJSON(updatedUsers);
        
        return newUser;
    }

    const downloadJSON = (data) => {
        const jsonData = JSON.stringify({ users: data }, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'users.json';
        
        // Auto download (optional - comment out if not needed)
        // link.click();
        
        URL.revokeObjectURL(url);
    }

    const handleSubmit = e => {
        e.preventDefault();
        const validationErrors = validateAll();
        
        if (Object.keys(validationErrors).length === 0) {
            // Check if email already exists
            const emailExists = users.some(user => user.email === formData.email);
            if (emailExists) {
                setErrors({ email: 'Email already registered' });
                return;
            }

            // Save user data
            const savedUser = saveUserData(formData);
            
            alert('Registration Successful! ✓\nUser ID: ' + savedUser.id);
            console.log('Saved User:', savedUser);
            console.log('All Users:', users);
            
            // Form reset karo
            setFormData({
                username: '',
                email: '',
                phone: '',
                password: '',
                confirmPassword: '',
                role: 'user'
            });
            setErrors({});
        } else {
            setErrors(validationErrors);
        }
    };

    // Debug ke liye - sabhi users dekho
    const showAllUsers = () => {
        console.log('All Registered Users:', users);
        alert(`Total Users: ${users.length}\nCheck console for details`);
    };

    return(
        <div>
            <form onSubmit={handleSubmit} style={{maxWidth:'400px', margin:'0 auto'}}>
                <h2>Register</h2>
                <InputField 
                    label="Username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    error={error.username}
                />
                <InputField
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={error.email}
                />
                <InputField
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={error.phone}
                    placeholder="10 digit number"
                />
                <InputField
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={error.password}
                />
                <InputField
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={error.confirmPassword}
                />
                <button type="submit" style={{ padding: '10px', width: '100%', marginBottom: '10px' }}>
                    Register
                </button>
                <button 
                    type="button" 
                    onClick={showAllUsers} 
                    style={{ padding: '10px', width: '100%', backgroundColor: '#6c757d' }}
                >
                    View All Users ({users.length})
                </button>
            </form>
        </div>
    )
}

export default Registration;