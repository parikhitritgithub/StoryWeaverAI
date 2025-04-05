import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVolumeUp, faVolumeMute, faCopy, faMagic, faLightbulb, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import storyImage from "../assets/image/634838-studio-ghibli-wallpaper-archives-studio-ghibli-movies.jpg";

const StoryPage = () => {
  const [input, setInput] = useState('');
  const [story, setStory] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  // Sample story ideas
  const storyIdeas = [
    "A robot who wants to be a chef",
    "A magical tree that grants unusual wishes",
    "A shy dragon's first day at school",
    "A time-traveling historian",
    "A detective who can talk to animals"
  ];

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        const preferredVoice = availableVoices.find(voice => 
          voice.lang.includes('en') && voice.name.includes('Natural')
        ) || availableVoices[0];
        setSelectedVoice(preferredVoice);
      }
    };
    
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setError('Please enter a story idea');
      return;
    }
    
    setLoading(true);
    setError('');
    setTitle('');
    setStory('');

    try {
      const response = await fetch('http://127.0.0.1:5000/api/generate/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate story');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setTitle(data.title || 'Your Generated Story');
      setStory(data.story || '');
    } catch (error) {
      console.error('Error fetching story:', error);
      setError(error.message || 'An error occurred while generating the story.');
    } finally {
      setLoading(false);
    }
  };

  const handlePlayPauseAudio = () => {
    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
        return;
      }

      if (!story) return;

      window.speechSynthesis.cancel();

      const newUtterance = new SpeechSynthesisUtterance(story);
      newUtterance.voice = selectedVoice;
      newUtterance.rate = 0.9;
      newUtterance.pitch = 1;
      newUtterance.volume = isMuted ? 0 : 1;
      
      newUtterance.onerror = (event) => {
        console.error('Speech synthesis error:', event.error);
        setIsPlaying(false);
      };

      newUtterance.onend = () => {
        setIsPlaying(false);
      };

      window.speechSynthesis.speak(newUtterance);
      setUtterance(newUtterance);
      setIsPlaying(true);
    }
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    if (utterance) {
      utterance.volume = isMuted ? 1 : 0;
    }
  };

  const copyToClipboard = () => {
    if (!story) return;
    navigator.clipboard.writeText(`${title}\n\n${story}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStoryIdeaClick = (idea) => {
    setInput(idea);
    document.getElementById('storyInput')?.focus();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 flex items-center justify-center p-4 font-roboto">
      {/* Add Roboto font styling */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
        
        .font-roboto {
          font-family: 'Roboto', sans-serif;
        }
        
        .font-roboto-light {
          font-family: 'Roboto', sans-serif;
          font-weight: 300;
        }
        
        .font-roboto-medium {
          font-family: 'Roboto', sans-serif;
          font-weight: 500;
        }
        
        .font-roboto-bold {
          font-family: 'Roboto', sans-serif;
          font-weight: 700;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      {/* Floating magic elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="absolute text-purple-300 opacity-40 animate-float"
            style={{
              fontSize: `${Math.random() * 20 + 10}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            
          </div>
        ))}
      </div>

      {/* Main content container */}
      <div className="relative bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden z-10">
        
        {/* Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative group overflow-hidden">
          <img 
            src={storyImage} 
            alt="Story Weaver Illustration"
            className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none transition-transform duration-700 group-hover:scale-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-xl md:rounded-l-xl md:rounded-tr-none flex items-end p-6">
            <div>
              <h2 className="text-white text-3xl font-bold mb-2 font-roboto-bold">Craft wonder with magic and creativity </h2>
              <p className="text-white/80 text-lg font-roboto-light">Harness the power of AI to co-create enchanting tales , where your imagination  meets endless creative posibilities </p>
            </div>
          </div>
          <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-300 to-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center font-roboto-medium">
            <FontAwesomeIcon icon={faWandMagicSparkles} className="mr-1" /> StoryWeaver AI
          </div>
        </div>
        
        {/* Content Section */}
        <div className="w-full md:w-1/2 p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500 font-roboto-bold mb-2">
              StoryWeaver AI
            </h1>
            <p className="text-purple-700 text-2xl font-roboto-medium">Magical Tales Generator</p>
          </div>

          {/* Story Input Form */}
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="relative">
              <input
                id="storyInput"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`w-full p-4 pr-12 border-2 rounded-lg focus:ring-2 transition-all duration-200 text-gray-800 font-roboto placeholder-purple-300 ${
                  isFocused 
                    ? 'border-purple-500 ring-purple-200' 
                    : 'border-purple-200 hover:border-purple-300'
                }`}
                placeholder="Enter your story idea (e.g., 'A dragon who loves baking')"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className={`absolute right-2 top-2 px-4 py-2 rounded-lg flex items-center transition-all duration-300 font-roboto-medium ${
                  loading || !input.trim()
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]'
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="w-5 h-5 mr-2 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 0116 0H4z"
                      ></path>
                    </svg>
                    Weaving Magic...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faMagic} className="mr-2" />
                    Create Story
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
              <p className="font-roboto">{error}</p>
            </div>
          )}

          {/* Story Output */}
          {title && story && (
            <div className="mt-6 transition-all duration-300 ease-in-out">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-2xl font-bold text-gray-800 font-roboto-bold">{title}</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={copyToClipboard}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      copied ? 'text-green-600 bg-green-50' : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                    } font-roboto`}
                    title="Copy to clipboard"
                  >
                    <FontAwesomeIcon icon={faCopy} />
                    {copied && <span className="ml-1 text-xs">Copied!</span>}
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-64 overflow-y-auto shadow-inner">
                <p className="text-gray-700 whitespace-pre-line font-roboto-light text-lg">{story}</p>
              </div>
              
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <button
                  onClick={handlePlayPauseAudio}
                  className={`p-3 rounded-full ${
                    isPlaying ? 'bg-pink-600' : 'bg-purple-600'
                  } text-white hover:opacity-90 transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-105 font-roboto`}
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="w-5 h-5" />
                </button>
                
                <button
                  onClick={handleToggleMute}
                  className={`p-3 rounded-full ${
                    isMuted ? 'bg-gray-300' : 'bg-gray-200'
                  } text-gray-700 hover:bg-gray-300 transition-all duration-200 shadow-md hover:shadow-lg font-roboto`}
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} className="w-5 h-5" />
                </button>
                
                {voices.length > 0 && (
                  <select
                    value={selectedVoice ? selectedVoice.name : ''}
                    onChange={(e) => {
                      const voice = voices.find(v => v.name === e.target.value);
                      setSelectedVoice(voice);
                    }}
                    className="p-2 rounded border border-gray-300 bg-white text-black  text-sm shadow-md focus:ring-2 focus:ring-purple-200 focus:border-purple-500 font-roboto"
                  >
                    {voices.filter(v => v.lang.includes('en')).map((voice) => (
                      <option key={voice.name} value={voice.name}>
                        {voice.name.replace('Microsoft ', '').replace('Google ', '')}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          )}

          {/* Story Ideas Section */}
          {!story && !loading && (
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <div className="flex items-center mb-3">
                <FontAwesomeIcon icon={faLightbulb} className="text-yellow-500 mr-2 text-xl" />
                <h3 className="font-medium text-purple-800 font-roboto-medium text-xl">Need inspiration? Try these:</h3>
              </div>
              <ul className="space-y-2">
                {storyIdeas.map((idea, index) => (
                  <li 
                    key={idea}
                    className="cursor-pointer p-3 hover:bg-white rounded-lg transition-all duration-200 border border-transparent hover:border-purple-200 hover:shadow-sm flex items-start font-roboto text-purple-900 text-lg"
                    onClick={() => handleStoryIdeaClick(idea)}
                  >
                    <span className="bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0 font-roboto-medium">
                      {index + 1}
                    </span>
                    "{idea}"
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-white/50 text-xs font-roboto">
        Powered by AI magic • StoryWeaver © {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default StoryPage;