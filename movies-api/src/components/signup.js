import React, { useState } from 'react';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom'; // Add this import
import '../componentsStyles/signup.css';

function Signup() {
  const [activeForm, setActiveForm] = useState('signIn');
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({ name: '', email: '', password: '', confirm_password: '' });

  //const navigate = useNavigate(); // Add this line

  const handleToggle = (formName) => {
    setActiveForm(formName);
  };

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeForm === 'signIn') {
      try {
        const res = await axios.post('/api/users/login', signInData);
        alert(res.data.message); // or handle login success (e.g., save token, redirect)

        //localStorage.setItem('isLoggedIn', 'true');
        //navigate('/'); // Redirect to homepage

      } catch (err) {
        alert(err.response?.data?.message || 'Sign In failed');
      }
    } else {
      if (signUpData.password !== signUpData.confirm_password) {
        alert("Passwords do not match");
        return;
      }
      try {
        const { name, email, password } = signUpData;
        const res = await axios.post('/api/users/register', { name, email, password });
        alert(res.data.message); // or handle sign up success
        
      } catch (err) {
        alert(err.response?.data?.message || 'Sign Up failed');
      }
    }
  };

  return (
    <div className="auth-container">
        <div className="auth-form">
            <h2>{activeForm === 'signIn' ? 'Sign In' : 'Sign Up'}</h2>
            <form onSubmit={handleSubmit}>
            {activeForm === 'signUp' && (
                <>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={signUpData.name}
                    onChange={handleSignUpChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={signUpData.email}
                    onChange={handleSignUpChange}
                    required
                />
                </>
            )}
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={activeForm === 'signIn' ? signInData.email : signUpData.email}
                onChange={activeForm === 'signIn' ? handleSignInChange : handleSignUpChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={activeForm === 'signIn' ? signInData.password : signUpData.password}
                onChange={activeForm === 'signIn' ? handleSignInChange : handleSignUpChange}
                required
            />
            {activeForm === 'signUp' && (
                <input
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                value={signUpData.confirm_password}
                onChange={handleSignUpChange}
                required
                />
            )}
            <button type="submit">{activeForm === 'signIn' ? 'Sign In' : 'Sign Up'}</button>
            </form>
            <p>
            {activeForm === 'signIn'
                ? "Don't have an account? "
                : 'Already have an account? '}
            <span onClick={() => handleToggle(activeForm === 'signIn' ? 'signUp' : 'signIn')}>
                {activeForm === 'signIn' ? 'Sign Up' : 'Sign In'}
            </span>
            </p>
        </div>
    </div>
  );
}

export default Signup;
