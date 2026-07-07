import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext.jsx"; 
import { useNavigate } from "react-router-dom";

const eyeOpen = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const eyeClosed = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export default function AureviaLuxe() {
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const submitRef = useRef(null);

  // Safely consume context parameters from your capitalized AuthContext file
  const contextData = React.useContext(AuthContext);
  const { getUserProfile, serverurl } = contextData || {};
  const navigate = useNavigate();

  const handleLoginLogic = async () => {
    // Validation rules
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const pwdOk = password.length >= 8; // standard secure layout check
    setEmailError(!emailOk);
    setPwdError(!pwdOk);

    if (!emailOk || !pwdOk) return;

    setLoading(true);
    try {
      const res = await axios.post(
        `${serverurl}/api/auth/adminlogin`,
        { email, password },
        {
          withCredentials: true,
        },
      );
      console.log("Login successful", res.data);
      setSuccess(true);
      
      if (getUserProfile) {
        await getUserProfile(); 
      }
      
      // Delay navigation slightly so the customer sees your success overlay animations
      setTimeout(() => {
        navigate("/"); 
      }, 1500);
    } catch (error) {
      console.error("Error in logging in user", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Enter") handleLoginLogic();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [email, password]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;700&display=swap');

        :root {
          --cream: #f5f0e8;
          --warm-white: #faf8f4;
          --charcoal: #1a1a18;
          --gold: #c9a84c;
          --muted: #8a8578;
          --border: #ddd8ce;
          --error: #c0392b;
          --aurevia-forest: #2d3e33;
          --aurevia-terra: #d4703a;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; font-family: 'DM Sans', sans-serif; background: var(--cream); overflow: hidden; }

        .luxe-wrapper {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          height: 100vh;
        }

        /* --- LEFT PANEL --- */
        .panel-left {
          position: relative;
          background-color: var(--aurevia-forest);
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          padding: 80px;
          align-items: center;
          overflow: hidden;
        }

        .leaf-bg {
          position: absolute;
          inset: 0;
          opacity: 0.12;
          pointer-events: none;
          z-index: 1;
        }

        .brand-name {
          position: absolute;
          top: 50px;
          left: 80px;
          z-index: 10;
          font-family: 'Cormorant Garamond', serif;
          font-size: 38px;
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.5px;
        }
        .brand-name span { color: var(--aurevia-terra); }

        .content-col { position: relative; z-index: 10; padding-right: 20px; }
        
        .hero-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--aurevia-terra);
          margin-bottom: 20px;
          display: block;
        }

        .content-col h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(40px, 4.5vw, 60px);
          line-height: 1.05;
          color: #fff;
          margin-bottom: 25px;
          font-weight: 500;
        }

        .content-col p {
          font-size: 14px;
          line-height: 1.8;
          color: rgba(255,255,255,0.65);
          margin-bottom: 40px;
          max-width: 400px;
        }

        .btn-explore {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: var(--aurevia-terra);
          color: #fff;
          padding: 18px 36px;
          border-radius: 2px;
          text-transform: uppercase;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          cursor: pointer;
          border: none;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        .btn-explore:hover {
          background: #e88653;
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(212,112,58,0.4);
        }
        .btn-explore svg { transition: transform 0.3s ease; }
        .btn-explore:hover svg { transform: translateX(5px); }

        .image-display {
          position: relative;
          height: 480px;
          z-index: 5;
        }
        .img-main {
          width: 85%;
          height: 100%;
          background: #34473a;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 40px 80px rgba(0,0,0,0.4);
        }
        .img-overlap {
          position: absolute;
          bottom: -30px;
          left: -40px;
          width: 65%;
          height: 50%;
          border: 10px solid var(--aurevia-forest);
          background: #405547;
          border-radius: 4px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
          overflow: hidden;
        }
        .display-img { width: 100%; height: 100%; object-fit: cover; }

        /* --- RIGHT PANEL --- */
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
        .form-container { width: 100%; max-width: 400px; }
        .form-header { margin-bottom: 40px; }
        .form-header h2 { font-family: 'Cormorant Garamond', serif; font-size: 38px; font-weight: 300; color: var(--charcoal); }
        .form-header p { margin-top: 8px; font-size: 13.5px; color: var(--muted); font-weight: 300; }
        .form-header p a { color: var(--gold); text-decoration: none; font-weight: 500; border-bottom: 1px solid transparent; transition: border-color 0.2s; }
        .form-header p a:hover { border-color: var(--gold); }
        .field { position: relative; margin-bottom: 22px; }
        .field label { display: block; font-size: 11px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); margin-bottom: 9px; }
        .field input { width: 100%; background: transparent; border: none; border-bottom: 1.5px solid var(--border); padding: 10px 0; font-size: 15px; color: var(--charcoal); outline: none; transition: border-color 0.25s; }
        .field input:focus { border-color: var(--gold); }
        .field input.error-field { border-color: var(--error); }
        .eye-btn { position: absolute; right: 0; bottom: 10px; background: none; border: none; cursor: pointer; color: var(--muted); display: flex; align-items: center; padding: 0; }
        .options-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px; }
        .btn-primary { width: 100%; padding: 16px; background: var(--charcoal); color: var(--cream); border: none; font-size: 12px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; position: relative; overflow: hidden; }
        .btn-primary::after { content: ''; position: absolute; inset: 0; background: var(--gold); transform: translateX(-101%); transition: transform 0.4s cubic-bezier(0.4,0,0.2,1); }
        .btn-primary:hover::after { transform: translateX(0); }
        .btn-primary span { position: relative; z-index: 1; }
        .success-overlay { position: absolute; inset: 0; background: var(--warm-white); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 10; }

        @media (max-width: 1024px) {
          .luxe-wrapper { grid-template-columns: 1fr; overflow-y: auto; }
          .panel-left { display: none; }
          .panel-right { padding: 50px 32px; min-height: 100vh; }
        }
      `}</style>

      <div className="luxe-wrapper">
        {/* Left Aspect Grid Banner */}
        <div className="panel-left">
          <svg className="leaf-bg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M10,20 Q30,5 50,25 T90,10" fill="none" stroke="white" strokeWidth="0.1" />
            <path d="M5,50 Q25,35 45,55 T85,40" fill="none" stroke="white" strokeWidth="0.1" />
            <path d="M20,80 Q40,65 60,85 T100,70" fill="none" stroke="white" strokeWidth="0.1" />
          </svg>

          <div className="brand-name">
            Aurevia<span>.</span>
          </div>

          <div className="content-col">
            <span className="hero-eyebrow">Artisanal Nomad</span>
            <h1>Bohemian<br />Rhapsody Redux</h1>
            <p>
              This theme explores innovative fabrics, futuristic designs, and
              sleek silhouettes inspired by the digital age. A fusion of style
              and functionality for the modern minimalist.
            </p>
            <button className="btn-explore">
              Explore Collection
              <svg width="18" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

          <div className="image-display">
            <div className="img-main">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800"
                className="display-img"
                alt="Fashion"
              />
            </div>
            <div className="img-overlap">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=600"
                className="display-img"
                alt="Details"
              />
            </div>
          </div>
        </div>

        {/* Form Interactive Layout Grid */}
        <div className="panel-right">
          <div className="form-container">
            <div className="form-header">
              <h2>Welcome back</h2>
              <p>Don't have an account? <a href="/signup">Create one</a></p>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="field">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(false);
                  }}
                  className={emailError ? "error-field" : ""}
                />
                {emailError && (
                  <div style={{ fontSize: "11.5px", color: "var(--error)", marginTop: "5px" }}>
                    Please enter a valid email address.
                  </div>
                )}
              </div>

              <div className="field">
                <label htmlFor="password">Password</label>
                <input
                  type={showPwd ? "text" : "password"}
                  id="password"
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPwdError(false);
                  }}
                  className={pwdError ? "error-field" : ""}
                />
                <button
                  className="eye-btn"
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                >
                  {showPwd ? eyeClosed : eyeOpen}
                </button>
                {pwdError && (
                  <div style={{ fontSize: "11.5px", color: "var(--error)", marginTop: "5px" }}>
                    Password must be at least 8 characters.
                  </div>
                )}
              </div>

              <div className="options-row">
                <label style={{ display: "flex", alignItems: "center", gap: "9px", cursor: "pointer", fontSize: "13px", color: "var(--muted)" }}>
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  Remember me
                </label>
                <a href="#" style={{ fontSize: "13px", color: "var(--muted)", textDecoration: "none" }}>
                  Forgot password?
                </a>
              </div>

              <button
                className={`btn-primary ${loading ? "loading" : ""}`}
                type="button"
                onClick={handleLoginLogic}
                disabled={loading}
                ref={submitRef}
              >
                <span>{loading ? "Verifying..." : "Sign In"}</span>
              </button>
            </form>
          </div>

          {/* Success Animation Notification Layer */}
          {success && (
            <div className="success-overlay">
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  border: "2px solid var(--gold)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "24px",
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.8">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 style={{ fontFamily: "Cormorant Garamond", fontSize: "32px", fontWeight: 300 }}>
                You're in!
              </h3>
              <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--muted)" }}>
                Redirecting to your account…
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}