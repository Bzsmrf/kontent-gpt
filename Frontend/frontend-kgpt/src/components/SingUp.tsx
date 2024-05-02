import React, { useEffect, useState } from "react";
import axios from 'axios'; // Import Axios
import "./SingUp.css";
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
import ChatBar from "./ChatBar";

const SignUp: React.FC = () => {
    const [email, setEmail] = useState<string | null>(null);
    const [displayName, setDisplayName] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const isMobile = window.innerWidth < 768;

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    const handleClick = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const userEmail = result.user.email;
                const userDisplayName = result.user.displayName;
                console.log(userEmail, userDisplayName);
                localStorage.setItem("email", result.user);
                setEmail(userEmail);
                setDisplayName(userDisplayName);

                // Send POST request to backend to get JWT token using Axios
                axios.post('https://kontentgpt-production-838d.up.railway.app/profile', { email_id: result.user.email, name: result.user.displayName })
                    .then(response => {
                        // Store JWT token in local storage
                        localStorage.setItem('jwtToken', response.data);
                        // Console log the JWT token
                        console.log('JWT Token:', response.data);
                    })
                    .catch(error => {
                        setError(error.message);
                    });
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <div>
            {email ? (
                <div className={`${isMobile ? 'w-400px h-400px' : 'w-full'}`}>
                    <ChatBar email={email} displayName={displayName} />
                </div>
            ) : (
                <div className="sign-up-container">
                    <h1>Sign Up</h1>
                    <form id="Signupform">
                        <button type="button" onClick={handleClick}>Sign Up with Gmail</button>
                        {error && <p className="error">{error}</p>}
                    </form>
                </div>
            )}
        </div>
    );
};

export default SignUp;
