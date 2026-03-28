import { useState } from 'react';
import './App.css';
import MyInput from './components/input.jsx';

function App() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  // A single function to handle all input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page refresh
    console.log("Form data submitted:", formData);
    alert(`Welcome, ${formData.email}!`);
  };

  return (
    <div className='bg'>
      {/* Right Side: Form Content */}
      <div className="right">
        <div className="form-container">
          <h1 className='title'>HELLO</h1>
          <p className="subtitle">Sign in to your account</p>
          
          <form onSubmit={handleSubmit}>
            <MyInput 
              label="Email" 
              type="email" 
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            <MyInput 
              label="Password" 
              type="password" 
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />

            <div className='form-options'>
              <div className="checkbox-wrapper">
                <input 
                  type="checkbox" 
                  id="rememberMe" 
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label htmlFor="rememberMe"> Remember Me</label> 
              </div>
              <a href="#" className="forgot-link">Forgot Password?</a>
            </div>

            <button type="submit" className='btn'>Submit</button>
          </form>
        </div>
      </div>

      {/* Left Side: Welcome Message */}
      <div className="left">
        <div className="info">
          <h1>Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>
        </div>
      </div>
    </div>
  );
}

export default App;