import React, { useState } from "react";
import InputField from '../loginregister/InputField';

const Registration = () => {
    const [formData, setFormData] = useState({
        username : '',
        email : '',
        password : '',
        confirmPassword : ''
    })

    const [error, setErrror] = useState({});
    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validate = () => {
        let newError = {};
        if(!formData.username.trim()){
            newError.username = 'Username is required';
        }
        if(!formData.email.includes('@')){
            newError.email = 'Valid email is required';
        }

        if(formData.password.length < 6){
            newError.password = 'Password must be at least 6 Characters';
        }
        if(formData.password !== formData.confirmPassword){
            newError.confirmPassword = 'Password do not Match'
        }
        return newError;
    }

      const handleSubmit = e => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      alert('Registration Successful!');
      // submit to backend here
    } else {
      setErrror(validationErrors);
    }
  };

    return(
        <form onSubmit={handleSubmit} style={{maxWidth:'400px', margin:'0 auto'}}>
            <h2>Register</h2>
            <InputField 
            label = "username"
            type = "text"
            name = "username"
            value = {formData.username}
            onChange = {handleChange}
            error = {error.username}
            />
            <InputField
                label = "Email"
                type = "email"
                name = "email"
                value = {formData.email}
                onChange = {handleChange}
                error = {error.email}
            />
            <InputField
                label = "Password"
                type = "password"
                name = "password"
                value={formData.password}
                onChange={handleChange}
                error={error.password}
            />
            <InputField
                label = "Confirm Password"
                type = "password"
                name = "confirmPassword"
                value = {formData.confirmPassword}
                onChange = {handleChange}
                error={error.confirmPassword}
            />
            <button type="submit" style={{ padding: '10px', width : '100%'}}>Register</button>

        </form>
    )

}

export default Registration;