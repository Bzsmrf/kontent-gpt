import React, { useState, useEffect } from 'react';
import k from '../assets/logo/k.png';
import LoadingAnimation from './LoadingAnimation'; // Import your loading animation component

interface ChatInterfaceProps {
    question: string;
    answer: string;
    email: string | null;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ question, answer, email }) => {
    const isMobile = window.innerWidth <= 768;
    const [loading, setLoading] = useState(false); // Initially not loading
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Initially assume not logged in

    // useEffect(() => {
    //     // Check if the user is logged in when the email changes
    //     setIsLoggedIn(email !== null);
    // }, [email]); // Trigger effect when email changes

    useEffect(() => {
        // Function to send request to backend
        const sendRequestToBackend = () => {
            // Simulate request to backend
            setLoading(true); // Set loading to true while waiting for response

            // Simulate loading delay (replace with actual fetch or backend call)
            setTimeout(() => {
                setLoading(false); // Set loading to false once response is received
            }, 30000); // 2 seconds for demonstration
        };

        // Call sendRequestToBackend whenever you want to send a request for the answer
        // For demonstration, calling it immediately when the component is rendered
        sendRequestToBackend();
    }, []); // Empty dependency array to ensure it runs only once when component mounts

    return (
        <div className='w-full h-full flex flex-col gap-5 overflow-y-auto items-center ' style={{ scrollbarWidth: 'thin', scrollbarColor: 'inherit' }}>
            {/* {isLoggedIn ? ( // If user is logged in, render question */}
            <div className={`${isMobile ? 'w-full' : 'w-1/2'} h-auto flex flex-row gap-5 p-5 justify-start items-center`}>
                <img src={k} className='h-10' alt="Logo" />
                <p>{question}</p>
            </div>
            {/* ) : null} */}
            {/* {!isLoggedIn ? ( */}
            <div className={`${isMobile ? 'w-full' : 'w-1/2'} h-full flex flex-row gap-5 p-5 justify-center items-start`}>
                {loading ? (
                    <LoadingAnimation />
                ) : (
                    <>
                        <img src={k} className='h-10' alt="Logo" />
                        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', maxHeight: '100%', }}>{answer}</pre>
                    </>
                )}
            </div>
            {/* ) : null} */}
        </div>
    );
};

export default ChatInterface;
