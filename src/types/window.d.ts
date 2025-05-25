declare global {
  interface Window {
    Speech_T_text: (projectName: string, language: string) => Promise<string>;
    webkitSpeechRecognition: any;
    i2i_BV: {
      speak: (text: string, voice: string, options: {
        rate: number;
        pitch: number;
        onstart: () => void;
        onend: () => void;
      }) => void;
      cancel: () => void;
    };
  }
}

export {};
