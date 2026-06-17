import axios from 'axios';
import React from 'react'
import { useState, useEffect, useRef } from "react";
import AuthContext from '../context/AuthContext.jsx';
import { UserContext } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from "firebase/auth"; // Usually direct from node_modules
import { auth, provider } from '../utils/Firebase.jsx'; // Your Firebase config file
const eyeOpen = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const eyeClosed = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

export default function AureviaSignup() {
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { serverurl } = React.useContext(AuthContext).value;
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { getUserProfile } = React.useContext(UserContext);
  const navigate = useNavigate();
  const googleauth=async()=>{
    try {
      const signin=await signInWithPopup(auth, provider);
      console.log("Google Sign-In successful:", signin);
      let user=signin.user;
      const res = await axios.post(`${serverurl}/api/auth/google`, {
        name: user.displayName,
        email: user.email,
        
      }, {
        withCredentials: true
      });
      console.log("Server response after Google Sign-In:", res.data);
      setSuccess(true);
      
    } catch (error) {
      console.error("Google Sign-In failed:", error);
    }
  };
  const handlesignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${serverurl}/api/auth/register`, {
        name, email, password
      }, {
        withCredentials: true
      });
      
      console.log("Signup successful:", res.data);
      setSuccess(true);
      await getUserProfile(); // Fetch user profile after successful login
      navigate("/"); 
    } catch (error) {
  console.log(error.response?.data);
  console.log(error.response?.status);
  console.log(error.message);
}finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPwd(!showPwd);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,500;0,600;1,400&family=Montserrat:wght@300;400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --aurevia-forest: #2d3e33;
          --aurevia-terra: #d4703a;
          --aurevia-cream: #fdfaf5;
          --warm-white: #faf8f4;
          --charcoal: #1a1a18;
          --muted: #8a8578;
          --border: #ddd8ce;
          --gold: #c9a84c;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { height: 100vh; font-family: 'DM Sans', sans-serif; background: var(--aurevia-cream); overflow: hidden; }

        .signup-wrapper {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          height: 100vh;
        }

        .brand-section {
          background-color: var(--aurevia-forest);
          position: relative;
          padding: 60px 80px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: #fff;
          overflow: hidden;
        }
        .ginkgo-pattern {
          position: absolute;
          top: -10%; right: -10%; width: 80%; height: 120%; opacity: 0.08; pointer-events: none; transform: rotate(15deg);
        }
        .brand-logo {
          position: absolute; top: 50px; left: 80px; font-family: 'Cormorant Garamond', serif; font-size: 34px; font-weight: 600;
        }
        .hero-content { position: relative; z-index: 5; max-width: 500px; }
        .hero-content h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(40px, 5vw, 68px); line-height: 1.1; margin: 20px 0; font-weight: 500; }
        .hero-content p { font-size: 15px; line-height: 1.8; color: rgba(255,255,255,0.7); margin-bottom: 40px; font-weight: 300; }
        .image-stack { position: relative; width: 100%; height: 450px; margin-top: 20px; }
        .img-main { width: 75%; height: 100%; background: #3a4d40; border-radius: 2px; overflow: hidden; box-shadow: 0 25px 50px rgba(0,0,0,0.3); }
        .img-sub { position: absolute; bottom: -30px; right: 10%; width: 50%; height: 60%; border: 10px solid var(--aurevia-forest); background: #4a5f51; border-radius: 2px; box-shadow: 0 15px 30px rgba(0,0,0,0.4); overflow: hidden; }
        .display-photo { width: 100%; height: 100%; object-fit: cover; }

        .panel-right {
          background: var(--warm-white);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 72px;
          position: relative;
        }
        .panel-right::before {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 240px; height: 240px;
          background: radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .form-container {
          width: 100%;
          max-width: 400px;
        }

        .form-header { margin-bottom: 40px; }
        .form-header h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 38px;
          font-weight: 300;
          color: var(--charcoal);
          letter-spacing: -0.01em;
        }
        .form-header p {
          margin-top: 8px;
          font-size: 13.5px;
          color: var(--muted);
          font-weight: 300;
        }
        .form-header p a {
          color: var(--gold);
          text-decoration: none;
          font-weight: 500;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s;
        }
        .form-header p a:hover { border-color: var(--gold); }

        .field { position: relative; margin-bottom: 22px; }
        .field label {
          display: block;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 9px;
        }
        .field input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1.5px solid var(--border);
          padding: 10px 0;
          font-size: 15px;
          font-family: 'DM Sans', sans-serif;
          color: var(--charcoal);
          outline: none;
          transition: border-color 0.25s;
        }
        .field input:focus { border-color: var(--gold); }

        .eye-btn {
          position: absolute;
          right: 0;
          bottom: 10px;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--muted);
          display: flex;
          align-items: center;
        }

        .btn-primary {
          width: 100%;
          padding: 16px;
          background: var(--charcoal);
          color: #fff;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          margin-top: 10px;
        }
        .btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--gold);
          transform: translateX(-101%);
          transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .btn-primary:hover::after { transform: translateX(0); }
        .btn-primary span { position: relative; z-index: 1; }

        .or-divider {
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 28px 0;
        }
        .or-divider::before, .or-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border);
        }
        .or-divider span {
          font-size: 11px;
          letter-spacing: 0.1em;
          color: #c5bfb5;
          text-transform: uppercase;
        }
        .social-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .btn-social {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 12px;
          background: transparent;
          border: 1.5px solid var(--border);
          font-size: 13px;
          color: var(--charcoal);
          cursor: pointer;
        }

        .success-overlay {
          position: absolute;
          inset: 0;
          background: var(--warm-white);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        @media (max-width: 1100px) {
          .signup-wrapper { grid-template-columns: 1fr; overflow-y: auto; }
          .brand-section { display: none; }
          .panel-right { padding: 80px 40px; min-height: 100vh; }
        }
      `}</style>

      <div className="signup-wrapper">
        <section className="brand-section">
          <svg className="ginkgo-pattern" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 100C50 100 40 70 10 60C30 50 50 60 50 60C50 60 70 50 90 60C60 70 50 100 50 100Z" fill="white" />
            <path d="M20 40C20 40 15 25 5 20C15 15 25 20 25 20C25 20 35 15 45 20C35 25 30 40 30 40" fill="white" transform="translate(10, 10)" />
          </svg>
          <div className="brand-logo">Aurevia.</div>
          <div className="hero-content">
            <span style={{color: 'var(--aurevia-terra)', fontSize: '11px', fontWeight: '700', letterSpacing: '3px'}}>EST. 2026</span>
            <h1>Create Your<br/>Legacy.</h1>
            <p>Join Aurevia to save your favorites, track shipments, and receive early access to our limited artisanal drops.</p>
            <div className="image-stack">
              <div className="img-main">
                <img src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=800" className="display-photo" alt="Model" />
              </div>
              <div className="img-sub">
                <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=500" className="display-photo" alt="Fabric Detail" />
              </div>
            </div>
          </div>
        </section>

        <section className="panel-right">
          <div className="form-container">
            <div className="form-header">
              <h2>Join Aurevia</h2>
              <p>Already have an account? <a href="/login">Sign in</a></p>
            </div>

            <form onSubmit={handlesignup}>
              <div className="field">
                <label>Full Name</label>
                <input 
                  type="text" 
                  placeholder="Jane Doe"  
                  onChange={(e) => setName(e.target.value)} 
                  value={name} 
                  required 
                />
              </div>

              <div className="field">
                <label>Email Address</label>
                <input 
                  type="email" 
                  placeholder="jane@aurevia.com"  
                  onChange={(e) => setEmail(e.target.value)} 
                  value={email} 
                  required 
                />
              </div>

              <div className="field">
                <label>Password</label>
                <input 
                  type={showPwd ? "text" : "password"} 
                  placeholder="Min. 8 characters"  
                  onChange={(e) => setPassword(e.target.value)} 
                  value={password} 
                  required 
                />
                <button 
                  className="eye-btn" 
                  type="button" 
                  onClick={togglePasswordVisibility}
                >
                  {showPwd ? eyeClosed : eyeOpen}
                </button>
              </div>

              <button className="btn-primary" type="submit" disabled={loading}>
                <span>{loading ? "Registering..." : "Create Account"}</span>
              </button>
            </form>

            <div className="or-divider"><span>or continue with</span></div>

            <div className="social-row">
              <button className="btn-social" type="button" onClick={googleauth}>
                <svg width="17" height="17" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Google
              </button>
              <button className="btn-social" type="button">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                Apple
              </button>
            </div>
          </div>

          {success && (
            <div className="success-overlay">
              <div style={{width:'64px', height:'64px', borderRadius:'50%', border:'2px solid var(--gold)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'24px'}}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.8"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3 style={{fontFamily:'Cormorant Garamond', fontSize:'32px', fontWeight:300}}>Welcome to Aurevia</h3>
              <p style={{marginTop:'8px', fontSize:'14px', color:'var(--muted)'}}>Your account has been created successfully.</p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}