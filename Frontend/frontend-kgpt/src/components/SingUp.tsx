import React, { useEffect, useState } from "react";
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
                localStorage.setItem("email", userEmail);
                setEmail(userEmail);
                setDisplayName(userDisplayName);

                // Send POST request to backend to get JWT token
                fetch('https://kontentgpt-production-838d.up.railway.app/profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: userEmail, displayName: userDisplayName }),
                })
                    .then(response => response.json())
                    .then(data => {
                        // Store JWT token in local storage
                        localStorage.setItem('jwtToken', data.token);
                        console.log('JWT Token:', data.token);
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
