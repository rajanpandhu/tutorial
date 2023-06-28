
import React, {useState} from 'react';

const SignUP =()=>{
    const [name , setName] = useState("");
    const [password , setPassword] = useState("");
    const [email , setEmail] = useState("");

    console.warn(name, email, password)

    return(
        <div className='register'>
            <h1>Registration</h1>
            <input className='inputBox' type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
            <input className='inputBox' type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
            <input className='inputBox' type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
            <button className='appbutton' type="button">Sign Up</button>
        </div>
    )
}

export default SignUP;