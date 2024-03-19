import React from 'react';

interface ChatInterfaceProps {
    question: string;
    answer: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ question, answer }) => {
    const isMobile = window.innerWidth <= 768;
    return (
        <div className='w-full h-full flex flex-col gap-5 overflow-y-auto items-center ' style={{ scrollbarWidth: 'thin', scrollbarColor: 'inherit' }}>
            <div className={`${isMobile ? 'w-full' : 'w-1/2'} h-auto flex flex-row gap-5 p-5 justify-start items-center`}>
                <img src="../assets/logo/k.png" alt='Not Found' className='size-10 p-5' style={{ zIndex: 1 }} />
                <p>{question}</p>
            </div>
            <div className={`${isMobile ? 'w-full' : 'w-1/2'} h-full flex flex-row gap-5 p-5 justify-center items-start`}>
                <img src="../assets/logo/brand_logo1.png" className='size-10 p-5' alt='Not Found' />
                <p>{answer}</p>
            </div>
        </div>
    );
};

export default ChatInterface;
