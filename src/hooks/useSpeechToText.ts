import { useState, useCallback, useRef } from 'react';

interface UseSpeechToTextOptions {
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
}

interface UseSpeechToTextReturn {
  transcript: string;
  isListening: boolean;
  isSupported: boolean;
  startListening: (projectName?: string) => Promise<string>;
  stopListening: () => void;
  resetTranscript: () => void;
  error: string | null;
}

export const useSpeechToText = (options: UseSpeechToTextOptions = {}): UseSpeechToTextReturn => {
  const {
    language = 'en-US',
    continuous = false,
    interimResults = false
  } = options;

  const [transcript, setTranscript] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const resolveRef = useRef<((value: string) => void) | null>(null);
  const rejectRef = useRef<((reason: string) => void) | null>(null);

  // Check if speech recognition is supported
  const isSupported = typeof window !== 'undefined' && 
    ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);

  const startListening = useCallback(async (projectName?: string): Promise<string> => {
    if (!isSupported) {
      const errorMsg = 'Speech recognition not supported in this browser';
      setError(errorMsg);
      throw new Error(errorMsg);
    }

    setError(null);
    setIsListening(true);

    // Create new recognition instance
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = language;
    recognition.continuous = continuous;
    recognition.interimResults = interimResults;

    recognitionRef.current = recognition;

    return new Promise<string>((resolve, reject) => {
      resolveRef.current = resolve;
      rejectRef.current = reject;

      recognition.onstart = () => {
        setIsListening(true);
        // Show status indicator if element exists
        const statusEl = document.getElementById('status');
        if (statusEl) {
          statusEl.style.display = 'block';
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        // Hide status indicator if element exists
        const statusEl = document.getElementById('status');
        if (statusEl) {
          statusEl.style.display = 'none';
        }
      };

      recognition.onresult = async (event: SpeechRecognitionEvent) => {
        if (event.results.length > 0) {
          const result = event.results[0][0].transcript;
          setTranscript(result);
          
          // Optional: Send data to server if projectName is provided
          if (projectName) {
            try {
              const data = JSON.stringify({
                project_name: projectName,
                user_id: 'N/A',
                userQuestion: '',
                bot_answer: result,
                similarity: 100,
              });
              // You can implement server communication here
              console.log('Speech data:', data);
            } catch (serverError) {
              console.error('Error sending speech data to server:', serverError);
            }
          }
          
          resolve(result);
        } else {
          const errorMsg = 'Try again, something went wrong...';
          setError(errorMsg);
          reject(errorMsg);
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        const errorMsg = `Speech recognition error: ${event.error}`;
        setError(errorMsg);
        setIsListening(false);
        reject(errorMsg);
      };

      recognition.start();
    });
  }, [language, continuous, interimResults, isSupported]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setError(null);
  }, []);

  return {
    transcript,
    isListening,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
    error
  };
};
