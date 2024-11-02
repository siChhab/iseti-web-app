"use client";

import React, { useState, useEffect } from 'react';

// Define types for the app status
interface DownloadInfo {
  valid: boolean;
  link: string;
}

interface AppStatus {
  android: DownloadInfo;
  ios: DownloadInfo;
}

interface Update {
  version: string;
  details: string;
}

interface UpdatesData {
  updates: Update[];
  downloads: AppStatus;
}

const Home: React.FC = () => {
  const [showContact, setShowContact] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  const [updates, setUpdates] = useState<UpdatesData | null>(null);
  const [appStatus, setAppStatus] = useState<AppStatus>({ 
    android: { valid: false, link: '' }, 
    ios: { valid: false, link: '' } 
  });
  const [showUpdatesPopup, setShowUpdatesPopup] = useState(false); // State for updates popup

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/siChhab/iseti-web/refs/heads/main/isetiUpdates.json');
      const data = await response.json();
      setUpdates(data);
      setAppStatus(data.downloads);
      setShowUpdatesPopup(true); // Automatically show the updates popup after fetching updates
    } catch (error) {
      console.error("Error fetching updates:", error);
    }
  };

  const handleContactToggle = () => {
    setShowContact(!showContact);
  };

  const shareWebsite = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setShareMessage("Lien du site copié !");
      setTimeout(() => setShareMessage(''), 3000); 
    });
  };

  const handleDownload = (platform: 'android' | 'ios') => {
    if (appStatus[platform].valid) {
      window.open(appStatus[platform].link, '_blank');
    } else {
      setShareMessage("L'application sera bientôt disponible !");
      setTimeout(() => setShareMessage(''), 3000);
    }
  };

  // Function to toggle the updates popup
  const toggleUpdatesPopup = () => {
    setShowUpdatesPopup(!showUpdatesPopup);
  };

  return (
    <div className="bg-[#1D375C] min-h-screen flex flex-col items-center justify-center p-4 relative">
      
      <button 
        className="absolute top-4 right-4 text-[#F0C800] cursor-pointer text-3xl transform transition-transform duration-300 hover:scale-125 animate-pulse" 
        onClick={shareWebsite}
        title="Partager le lien"
      >
        🤝 
      </button>

      {shareMessage && (
        <div className="absolute top-16 right-4 bg-[#F0C800] text-[#1D375C] p-2 rounded-lg shadow-lg">
          {shareMessage}
        </div>
      )}

      <h1 className="text-4xl md:text-5xl font-bold text-[#F0C800] mb-4 text-center">
        🚀 Téléchargez l'application ISETI
      </h1>
      <p className="text-lg md:text-xl text-white mb-8 text-center max-w-md">
        Accédez à ISETI mobile pour Android et iOS, conçue pour calculer vos moyennes et offrir des fonctionnalités futures pour les étudiants de l'ISET.
      </p>

      <div className="flex flex-col md:flex-row gap-4">
        <button 
          onClick={() => handleDownload('android')}
          className="bg-[#F0C800] text-[#1D375C] py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 text-lg font-semibold"
        >
          Télécharger pour Android
        </button>
        <button 
          onClick={() => handleDownload('ios')}
          className="bg-[#F0C800] text-[#1D375C] py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 text-lg font-semibold"
        >
          Télécharger pour iOS
        </button>
      </div>

      <footer className="mt-8 text-sm text-white text-center flex flex-col items-center">
        <p className="mb-2">
          🌟 Cette application n&apos;est pas officielle d&apos;ISET, mais est faite avec amour par un seul développeur. ❤️
        </p>
        <button 
          className="text-[#F0C800] underline cursor-pointer" 
          onClick={handleContactToggle}
        >
          Contactez le développeur
        </button>
      </footer>

      {/* Updates Popup */}
      {showUpdatesPopup && updates && (
        <div className="mt-4 bg-white text-black p-4 rounded-lg shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <button 
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={toggleUpdatesPopup}
            title="Fermer"
          >
            ❌
          </button>
          <h2 className="text-lg font-bold mb-2">Mises à jour</h2>
          {updates.updates.map((update: { version: string; details: string }, index: number) => (
            <div key={index} className="mb-2">
              <strong>Version {update.version}:</strong> {update.details}
            </div>
          ))}
          {/* Copyright Information */}
          <div className="mt-2 text-center text-xs text-gray-600">
            <p>&copy; {new Date().getFullYear()} ISETI. Développée pour les étudiants, non affiliée à ISETI.</p>
          </div>
        </div>
      )}

      {/* Contact Info Popup */}
      {showContact && (
        <div className="mt-4 bg-white text-black p-4 rounded-lg shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <button 
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={handleContactToggle}
            title="Fermer"
          >
            ❌
          </button>
          <p>
            📧 Email: <a href="mailto:mohamedaminechehab.isetma@gmail.com" className="text-[#1D375C] underline">mohamedaminechehab.isetma@gmail.com</a>
          </p>
          <p>
            💬 Contactez-moi sur: 
            <a 
              href="https://twitter.com/si_chhab" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#1D375C]"
            >
              Twitter (x.com)
            </a> | 
            <a 
              href="https://www.linkedin.com/in/mohamedamch/" 
              className="text-[#1D375C] ml-1"
            >
              LinkedIn
            </a>
          </p>

          {/* Vocaroo Embed */}
          <div className="mt-4">
            <iframe width="300" height="60" src="https://vocaroo.com/embed/1na09s3R4eed?autoplay=0" frameBorder="0" allow="autoplay"></iframe>
          </div>

          {/* Copyright Information */}
          <div className="mt-2 text-center text-xs text-gray-600">
            <p>&copy; {new Date().getFullYear()} ISETI. Développée pour les étudiants, non affiliée à ISETI.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
