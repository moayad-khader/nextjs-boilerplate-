import React, { useState } from 'react';
import { useSpeechToText } from '@/hooks/useSpeechToText';

interface SpeechToTextComponentProps {
  projectName?: string;
  language?: string;
  onTranscriptReceived?: (transcript: string) => void;
}

export const SpeechToTextComponent: React.FC<SpeechToTextComponentProps> = ({
  projectName = '',
  language = 'en-US',
  onTranscriptReceived
}) => {
  const {
    transcript,
    isListening,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
    error
  } = useSpeechToText({ language });

  const [lastTranscript, setLastTranscript] = useState<string>('');

  const handleStartListening = async () => {
    try {
      const result = await startListening(projectName);
      setLastTranscript(result);
      onTranscriptReceived?.(result);
    } catch (err) {
      console.error('Error starting speech recognition:', err);
    }
  };

  const handleStopListening = () => {
    stopListening();
  };

  const handleReset = () => {
    resetTranscript();
    setLastTranscript('');
  };

  if (!isSupported) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-700">
          Speech recognition is not supported in this browser. 
          Please use Chrome, Edge, or Safari.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-2">
        <button
          onClick={handleStartListening}
          disabled={isListening}
          className={`px-4 py-2 rounded-md text-white font-medium ${
            isListening
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isListening ? 'Listening...' : 'Start Recording'}
        </button>
        
        <button
          onClick={handleStopListening}
          disabled={!isListening}
          className={`px-4 py-2 rounded-md text-white font-medium ${
            !isListening
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          Stop Recording
        </button>
        
        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-md bg-gray-500 hover:bg-gray-600 text-white font-medium"
        >
          Reset
        </button>
      </div>

      {/* Status indicator */}
      {isListening && (
        <div id="status" className="flex items-center gap-2 text-blue-600">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span>Recording...</span>
        </div>
      )}

      {/* Current transcript */}
      {transcript && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
          <h4 className="font-medium text-blue-900 mb-1">Current Transcript:</h4>
          <p className="text-blue-800">{transcript}</p>
        </div>
      )}

      {/* Last completed transcript */}
      {lastTranscript && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-md">
          <h4 className="font-medium text-green-900 mb-1">Last Completed:</h4>
          <p className="text-green-800">{lastTranscript}</p>
        </div>
      )}

      {/* Error display */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <h4 className="font-medium text-red-900 mb-1">Error:</h4>
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Language and project info */}
      <div className="text-sm text-gray-600">
        <p>Language: {language}</p>
        {projectName && <p>Project: {projectName}</p>}
      </div>
    </div>
  );
};
