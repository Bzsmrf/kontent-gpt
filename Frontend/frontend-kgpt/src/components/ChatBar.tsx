import React, { useState } from 'react';
import { PlusIcon, } from '@heroicons/react/outline';
import axios from 'axios';
import WelcomeBanner from './WelcomeBanner';
import ChatInterface from './ChatInterface';

interface ChatBarProps {
	email: string | null;
}


const ChatBar: React.FC<ChatBarProps> = ({ email }) => {
	const [isRecording, setIsRecording] = useState(false);
	const [recordedText, setRecordedText] = useState('');
	const [recordedResultText, setRecordedResultText] = useState('');
	const [selectedRadio, setSelectedRadio] = useState<number | null>(null);
	const [requestValue, setRequestValue] = useState<number | null>(null);
	const [isChatStarted, setIsChatStarted] = useState<boolean | null>(false);

	// const isMobile = window.innerWidth <= 768;

	const handleRadioClick = async (value: number) => {
		setSelectedRadio(value);

		if (value == 1) {
			setRequestValue(1);
		}
		else {
			setRequestValue(2);
		}
	};

	let mediaRecorder: MediaRecorder | null = null;

	const handleNewChat = () => {
		window.location.reload();
	};

	// const handleRecordVoice = async () => {
	// 	try {
	// 		const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
	// 		mediaRecorder = new MediaRecorder(stream);

	// 		const audioChunks: Blob[] = [];

	// 		mediaRecorder.start();

	// 		mediaRecorder.addEventListener('dataavailable', (event) => {
	// 			audioChunks.push(event.data);
	// 		});

	// 		mediaRecorder.addEventListener('stop', () => {
	// 			const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });

	// 			stream.getTracks().forEach((track) => {
	// 				track.stop();
	// 			});

	// 			// Convert audio to text using speech recognition (not implemented here)
	// 			// Once you have the text, update the recorded text state
	// 			setRecordedText('Recorded voice message');
	// 		});

	// 		setIsRecording(true);
	// 	} catch (error) {
	// 		console.error('Error accessing microphone:', error);
	// 	}
	// };

	const handleSubmit = async () => {
		if (requestValue == null) return;

		setIsChatStarted(true);

		try {
			if (mediaRecorder && isRecording) {
				mediaRecorder.stop();
				setIsRecording(false);
			}

			// Make an HTTP POST request to your Flask backend
			if (requestValue == 2) {
				const response = await axios.post('https://kontentgpt-production-838d.up.railway.app/submit_with_type', { prompt: recordedText || '', type: "Long Form" });
				console.log('Response from backend:', response.data)
				let outputString = typeof response.data.output === 'string' ? response.data.output : JSON.stringify(response.data.output);

				// Replace ** with an empty string and \n with actual newline character
				outputString = outputString.replace(/\*\*/g, '').replace(/\\n/g, '\n');

				setRecordedResultText(outputString);
			}
			else if (requestValue == 1) {
				const response = await axios.post('https://kontentgpt-production-838d.up.railway.app/submit_with_type', { prompt: recordedText || '', type: "Short Form" });
				console.log('Response from backend:', response.data)
				let outputString = typeof response.data.output === 'string' ? response.data.output : JSON.stringify(response.data.output);

				// Replace ** with an empty string and \n with actual newline character
				outputString = outputString.replace(/\*\*/g, '').replace(/\\n/g, '\n');

				setRecordedResultText(outputString);
			}

			setIsChatStarted(true);

		} catch (error) {
			console.error('Error submitting data:', error);
		}
	};

	return (
		<>
			{!isChatStarted && <WelcomeBanner email={email} />}
			<div className="fixed bottom-7 mt-25 left-0 right-0 top-20 flex justify-end items-center flex-col gap-2">
				{isChatStarted && <ChatInterface email={email}
					question={recordedText}
					answer={recordedResultText}
				/>}
				<div className="relative">
					<input
						type="text"
						placeholder="Type your `script data` and select `LONG` or `SHORT` form..."
						value={recordedText || ''} // Ensure that value is never undefined
						onChange={(e) => setRecordedText(e.target.value)}
						className="h-16 w-96 py-2 px-4 bg-gray-200 text-black border-none rounded-full pr-20"
						style={{ width: 'calc(100vw - 180px)', maxWidth: '800px', minWidth: '320px', fontSize: '16px' }}
					/>
					<button
						className="absolute top-2 right-4 bg-gray-200 text-black rounded-full p-3 hover:bg-gray-300"
						onClick={handleNewChat}
						title='New Chat'
					>
						<PlusIcon className="h-6 w-6" />
					</button>
					<button
						className="absolute top-2 right-16 bg-gray-200 text-black rounded-full p-3 hover:bg-gray-300"
						onClick={handleSubmit}
						title='Submit'
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
							<path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
						</svg>

					</button>
					{/* <div className={`absolute top-2 right-28 bg-blue-200 rounded-full p-3 hover:bg-gray-300 animate-pulse ${isRecording ? '' : 'hidden'}`}>
						<MicrophoneIcon className="h-6 w-6" />
					</div>
					<button
						className={`absolute top-2 right-28 bg-gray-200 text-black rounded-full p-3 hover:bg-gray-300 ${isRecording ? 'hidden' : ''}`}
						onClick={handleRecordVoice}
						title='Use Microphone'
					>
						<MicrophoneIcon className="h-6 w-6" />
					</button> */}
				</div>

				<div className='flex flex-row gap-5'>
					<div className="flex items-center">
						<button
							id="default-radio-1"
							type="button"
							value=""
							name="default-radio"
							className={`w-128 h-8 text-blue-600 border-gray-300 min-w-24 rounded-full focus:ring-blue-500 dark:focus:ring-blue-600 ${selectedRadio === 1 ? 'bg-gradient-to-r from-blue-300 via-purple-400 to-red-300' : 'bg-gradient-to-r from-white to-gray-100'}`}
							onClick={() => handleRadioClick(1)}
						>
							<label id="default-radio-1" className="ms-2 me-2 text-sm font-medium  text-black">Short Form</label>
						</button>
					</div>

					<div className="flex items-center">
						<button
							id="default-radio-2"
							type="button"
							value=""
							name="default-radio"
							className={`w-128 h-8 text-blue-600 border-gray-300 min-w-24 rounded-full focus:ring-blue-500 dark:focus:ring-blue-600 ${selectedRadio === 2 ? 'bg-gradient-to-r from-blue-300 via-purple-400 to-red-300' : 'bg-gradient-to-r from-white to-gray-100'}`}
							onClick={() => handleRadioClick(2)}
						>
							<label id="default-radio-2" className="ms-2 me-2 text-sm font-medium text-black">Long Form</label>
						</button>
					</div>

				</div>

			</div>
		</>
	);
};

export default ChatBar;