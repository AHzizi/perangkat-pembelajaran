import React, { useState, useEffect } from 'react';
import { Book, Plus, X, ChevronDown, ChevronUp, Moon, Sun, BookOpen, Github, Info, Menu } from 'lucide-react';
import TypingText from './components/TypingText';


interface LearningCard {
  id: string;
  title: string;
  url: string;
  iconColor: string;
}

interface UUDArticle {
  pasal: string;
  linkText: string;
  url: string;
}

const uudArticles: UUDArticle[] = [
  { pasal: "Pasal 1", linkText: "Link Google Form", url: "https://forms.gle/Qq65yQMk9RVbPzBJ7" },
  { pasal: "Pasal 2 & 3", linkText: "Link Google Form", url: "https://docs.google.com/forms/d/e/1FAIpQLSd7pdZBMQU6Saa37FPpHbnU2ljDcxGoeG3ZiN9vNmaiJPcH5w/viewform?usp=sf_link" },
  { pasal: "Pasal 4–8", linkText: "Link CAT", url: "https://forms.gle/Lv5NMXCmUcYDWcGv9" },
  { pasal: "Pasal 9–15", linkText: "Link CAT", url: "https://forms.gle/LHpA8kkdcyJZL8Ch8" },
  { pasal: "Pasal 16", linkText: "Kuis DPA", url: "https://forms.gle/DAK1dhk6RgYAaWiv9" },
  { pasal: "Pasal 17", linkText: "Link CAT", url: "https://forms.gle/TY5iHXdisj96Wxty9" },
  { pasal: "Pasal 18", linkText: "Link CAT", url: "https://forms.gle/QkCoatNYtx5ZssW6A" },
  { pasal: "Pasal 19-20", linkText: "Link CAT", url: "https://forms.gle/iG16tkK883LYg5H6A" },
  { pasal: "Pasal 20A", linkText: "Link CAT", url: "https://forms.gle/tt2h4dpt5ytDUwBj7" },
  { pasal: "Pasal 21-22", linkText: "Link CAT", url: "https://forms.gle/qaWYeHtCoiv4QHcy7" },
  { pasal: "Pasal 22C", linkText: "Link CAT", url: "https://forms.gle/PDKT7g3AZahQNnaN9" },
  { pasal: "Pasal 22D", linkText: "Link CAT", url: "https://forms.gle/qPiXuLzDh5ZX316RA" },
  { pasal: "Pasal 22E", linkText: "Link CAT", url: "https://forms.gle/HdJTbXZFrh1eikuCA" },
  { pasal: "Pasal 23-23D", linkText: "Link CAT", url: "https://forms.gle/wGbSmspHgvroYG8h7" },
  { pasal: "Pasal 23E-23F-23G", linkText: "Link CAT", url: "https://forms.gle/twip8jeQG6J6vR6i6" },
  { pasal: "Pasal 24-24A", linkText: "Link CAT", url: "https://forms.gle/cVAkB7giywmUPbCx7" },
  { pasal: "Pasal 24B-25", linkText: "Link CAT", url: "https://forms.gle/wQti8ZUdUwuxJPKdA" },
  { pasal: "Pasal 26, 27, 28", linkText: "Link CAT", url: "https://forms.gle/wRYtxuB1T8ZJVLjH9" },
  { pasal: "Pasal 28A-28D", linkText: "Link CAT", url: "https://forms.gle/754hEvhqcD8m9JV69" },
  { pasal: "Pasal 28E-28G", linkText: "Link CAT", url: "https://forms.gle/2t3t41p2GV58xuBx9" },
  { pasal: "Pasal 28 H, I, J", linkText: "Link CAT", url: "https://forms.gle/KhfmgX4QqYfamcf49" },
  { pasal: "Pasal 29", linkText: "Link CAT", url: "https://forms.gle/jfseHFgDPvQLickw5" },
  { pasal: "Pasal 30", linkText: "Link CAT", url: "https://forms.gle/4X5mTESp68uZZYKh9" },
  { pasal: "Pasal 31-32", linkText: "Link CAT", url: "https://forms.gle/8KSSxLusKZJe8Khv6" },
  { pasal: "Pasal 33-34", linkText: "Link CAT", url: "https://forms.gle/EnomhPiJfrxsjxAt7" },
  { pasal: "Pasal 35-36C", linkText: "Link CAT", url: "https://forms.gle/rqKVcH1gCm8AZwM38" },
  { pasal: "Pasal 37", linkText: "Link CAT", url: "https://forms.gle/4D86wJ743Pza1Qkd6" },
  { pasal: "UUD 1945 [2]", linkText: "Link CAT", url: "https://forms.gle/P2KQpUk3px6VKcti7" },
  { pasal: "Pembukaan UUD 1945", linkText: "Link CAT", url: "https://forms.gle/tQ7azGsCF6vczXqF6" },
  { pasal: "UUD Amandemen 2", linkText: "Link CAT", url: "https://forms.gle/iRyqvf29sotMnGEQ6" },
  { pasal: "UUD Amandemen 4", linkText: "Link CAT", url: "https://forms.gle/Xhsfd1sVzPUF1n7G9" },
  { pasal: "UUD Amandemen 3", linkText: "Link CAT", url: "https://forms.gle/NJeuruqneWokEWhj6" },
  { pasal: "UUD Amandemen 1", linkText: "Link CAT", url: "https://forms.gle/DVVw1eyfCTVz9URz5" },
  { pasal: "Sejarah UUD 1", linkText: "Link CAT", url: "https://forms.gle/fAVdvJKZT4Jw1BRo7" },
  { pasal: "Sejarah UUD 3", linkText: "Link CAT", url: "https://forms.gle/aU2yjQUwMmKH9kwU6" },
  { pasal: "Sejarah UUD 4", linkText: "Link CAT", url: "https://forms.gle/Zth8uYp45hepyhDQ7" },
  { pasal: "Sejarah UUD 5", linkText: "Link CAT", url: "https://forms.gle/XmbhTtfSEuofKiuq6" },
  { pasal: "Sejarah UUD 6 | Penilaian Masa Orde Baru", linkText: "Link CAT", url: "https://forms.gle/osnyy4WUJirT5GKm8" },
  { pasal: "Sejarah UUD 7", linkText: "Link CAT", url: "https://forms.gle/qiTV4YbRrtcaVAgs6" },
  { pasal: "Sejarah UUD 8", linkText: "Link CAT", url: "https://forms.gle/ZxZd3BiDuvqL7nhv8" },
  { pasal: "Sejarah UUD 9 | Asal dan Tujuan Amandemen UUD", linkText: "Link CAT", url: "https://forms.gle/cfTHuiyzMPtpVnps5" },
  { pasal: "Struktur UUD 1945 [1]", linkText: "Link CAT", url: "https://forms.gle/NBozAEwznjC4wyHv5" },
  { pasal: "Struktur UUD 1945 [2]", linkText: "Link CAT", url: "https://forms.gle/eSZgQvMRj2tKCRYK7" },
  { pasal: "Struktur UUD 1945 [3]", linkText: "Link CAT", url: "https://forms.gle/5w8p5texBqGnCoCaA" },
  { pasal: "Struktur UUD 1945 [4] | Menteri dan Kedudukan DPR", linkText: "Link CAT", url: "https://forms.gle/tZCCsZFKJddf8kyw6" }
];
const twkArticles: UUDArticle[] = [
  { pasal: "1–20", linkText: "Link Google Form", url: "https://forms.gle/14y8ZoLRuhhw3RHt9" },
  { pasal: "21–40", linkText: "Link Google Form", url: "https://forms.gle/AxBZGRdtUy4p8QBh7" },
  { pasal: "41–60", linkText: "Link Google Form", url: "https://forms.gle/dkcTV88tZSnYiNUe8" },
  { pasal: "61–80", linkText: "Link Google Form", url: "https://forms.gle/ST8aJbqAZac8RafP6" },
  { pasal: "81–100", linkText: "Link Google Form", url: "https://forms.gle/QbCNkDoLEUQUeTx79" },
  { pasal: "101–120", linkText: "Link Google Form", url: "https://forms.gle/27NEWmQvQDXfqr1x6" },
  { pasal: "121–140", linkText: "Link Google Form", url: "https://forms.gle/wm9uG3kwRXRcGXy77" },
  { pasal: "141–160", linkText: "Link Google Form", url: "https://forms.gle/mGtmdWNKh9tPwH9AA" },
  { pasal: "161–180", linkText: "Link Google Form", url: "https://forms.gle/8A1ndpKfGUnzVzpH8" },
  { pasal: "181–200", linkText: "Link Google Form", url: "https://forms.gle/riGjdWZ7mi2Bbqke7" }
];

const bahasaIndonesia: UUDArticle[] = [
  { pasal: "1–20", linkText: "Link Google Form", url: "https://docs.google.com/forms/d/e/1FAIpQLSeg8C2ftC9_Ik7raMFT-BkE8ngJxAI65iML07iUadruWoXYxg/viewform" },
  { pasal: "21–40", linkText: "Link Google Form", url: "https://docs.google.com/forms/d/e/1FAIpQLSfc-AbPQ6Xmtr3ExItmeUA1DOUHjY-D6oDel527VZA2kuD6Wg/viewform" },
  { pasal: "41–60", linkText: "Link Google Form", url: "https://docs.google.com/forms/d/e/1FAIpQLScp8RrISyZdRhvrb62Azw5paYK8zp3l4WSBoMKBzKn7vqPbnQ/viewform" },
  { pasal: "61–80", linkText: "Link Google Form", url: "https://docs.google.com/forms/d/e/1FAIpQLSd3VBekjSYxY22qeWI2aDKDpc_o4D__jYskHl4_cQ8TfZPJfw/viewform?usp=sf_link" },
  { pasal: "81–100", linkText: "Link Google Form", url: "https://docs.google.com/forms/d/e/1FAIpQLSfIYld7r0fnn-lSCqTVQt3ht4UMiZXVdduneWtl7NvGkB7XOg/viewform?usp=sf_link" },
];


const initialCards: LearningCard[] = [
  { id: '1', title: 'Tes TWK', url: 'https://tes-twk.vercel.app/', iconColor: 'text-teal-500' },
  { id: '2', title: 'Tes UUD 1945', url: 'https://tes-uud.vercel.app/', iconColor: 'text-sky-500' },
  { id: '3', title: 'Tes UU Desa', url: 'https://tes-uu-desa.vercel.app/', iconColor: 'text-orange-500' },
  { id: '4', title: 'Tes Ukuran Tanah', url: 'https://tanah-kas-desa-1.vercel.app/', iconColor: 'text-green-500' },
  { id: '5', title: 'Try Out 1', url: 'https://try-out-1.vercel.app/', iconColor: 'text-purple-500' },
  { id: '6', title: 'TES PANCASILA', url: 'https://tes-pancasila.netlify.app/', iconColor: 'text-rose-500' },
  { id: '7', title: 'TES TWK INDO II', url: 'https://tes-twk-indonesia.netlify.app/', iconColor: 'text-violet-500' },
  { id: '8', title: 'TES TWK II', url: 'https://tes-twk-ii.netlify.app/', iconColor: 'text-sky-500' },

];

const backgroundImages = [
  'https://res.cloudinary.com/dntbcmcc3/image/upload/v1754908167/b8f1180a76a796c38755e93c7fbf6d19_hfbdtc.jpg',
  'https://res.cloudinary.com/dntbcmcc3/image/upload/v1755051436/BG_Beachside_Night_waifu2x_art_noise3_scale_xlb95f.png',
  'https://res.cloudinary.com/dntbcmcc3/image/upload/v1755051429/BG_Beachside_Sunset_waifu2x_art_noise3_scale_q47ota.png',
  'https://res.cloudinary.com/dntbcmcc3/image/upload/v1755051428/BG_Beachside_waifu2x_art_noise3_scale_mghu0e.png',
  'https://res.cloudinary.com/dntbcmcc3/image/upload/v1755051406/BG_StudentRoom_Night2_waifu2x_art_noise3_scale_osq2sc.png',
  'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
  'https://res.cloudinary.com/dntbcmcc3/image/upload/v1754907649/1350248_odczfx.png',
  'https://res.cloudinary.com/dntbcmcc3/image/upload/v1754907639/BG_Atelier_Night_waifu2x_art_noise3_scale_xeul5y.png',
  'https://res.cloudinary.com/dntbcmcc3/image/upload/v1754907635/4b2e55b89740491cd74ce5908ee3d4a6_bem4zh.jpg',
  'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
  'https://res.cloudinary.com/dntbcmcc3/image/upload/v1754908165/a943d53cea39fefb6e2ea6d8d7a4406f_gwvp2i.jpg',
  'https://res.cloudinary.com/dntbcmcc3/image/upload/v1754908167/8df6c58da5e889db0ff9b8e0151bf7a3_kukqjh.jpg'
  
];

const colorOptions = [
  { name: 'Teal', value: 'text-teal-500' },
  { name: 'Sky Blue', value: 'text-sky-500' },
  { name: 'Orange', value: 'text-orange-500' },
  { name: 'Green', value: 'text-green-500' },
  { name: 'Purple', value: 'text-purple-500' },
  { name: 'Pink', value: 'text-pink-500' },
  { name: 'Indigo', value: 'text-indigo-500' },
  { name: 'Red', value: 'text-red-500' }
];

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [cards, setCards] = useState<LearningCard[]>(initialCards);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUUDModal, setShowUUDModal] = useState(false);
  const [showTWKModal, setShowTWKModal] = useState(false);
  const [showIndoModal, setShowIndoModal] = useState(false);
  const [showIModal, setShowIModal] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [newCard, setNewCard] = useState({ title: '', url: '', iconColor: 'text-teal-500' });
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [manualTheme, setManualTheme] = useState<boolean | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto theme based on time
  useEffect(() => {
    if (manualTheme === null) {
      const hour = currentTime.getHours();
      setIsDarkMode(hour >= 18 || hour < 6);
    } else {
      setIsDarkMode(manualTheme);
    }
  }, [currentTime, manualTheme]);

  // Background rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleString('id-ID', {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleAddCard = () => {
    if (newCard.title && newCard.url) {
      const card: LearningCard = {
        id: Date.now().toString(),
        ...newCard
      };
      setCards([...cards, card]);
      setNewCard({ title: '', url: '', iconColor: 'text-teal-500' });
      setShowAddModal(false);
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setManualTheme(newTheme);
    setIsDarkMode(newTheme);
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-1000 ${isDarkMode ? 'dark' : ''}`}>
      {/* Background Images */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === backgroundIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/60' : 'bg-black/30'} transition-colors duration-500`} />
      </div>



      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-center">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 drop-shadow-lg">
          Perangkat Pembelajaran Perangkat Desa
        </h1>

        {/* Greeting */}
        <h2 className="text-xl md:text-2xl font-semibold text-white/90 mb-4 drop-shadow-md">
          Halo {" "}

        {/*Nama Gw  */}
        <span
            className="inline-block text-transparent bg-clip-text font-bold text-2xl font-sans cursor-pointer"
            style={{
              backgroundImage:
                "linear-gradient(270deg, #facc15, #f43f5e, #ec4899, #22c55e, #3b82f6)",
              backgroundSize: "400% 400%",
              animation: "slow-gradient 8s ease infinite"
            }}
          >
            <a href="https://www.instagram.com/miftakulazizi/" target="_blank" rel="noopener noreferrer">Miftakul Azizi</a>
        </span>
        <style>
        {`
        @keyframes slow-gradient {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        `}
        </style>

          , Belajar Apa Hari Ini ?
          <br />
          <br />
          <TypingText />
        </h2>

        {/* Time Display */}
        <div className="text-lg md:text-xl text-white/80 mb-12 drop-shadow-md font-medium">
          {formatTime(currentTime)}
        </div>

        {/* Learning Cards Dropdown */}
       <div
          className={`w-full max-w-md mb-8 ${
            showCards ? "mb-[120px] sm:mb-8" : "mb-8"
          }`}
        >
        <button
          onClick={() => setShowCards(!showCards)}
          className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-4 text-white hover:bg-white/30 transition-all duration-300 flex items-center justify-between"
        >
          <span className="font-semibold">Materi Pembelajaran</span>
          {showCards ? <ChevronUp /> : <ChevronDown />}
        </button>

        {showCards && (
          <div className="mt-4 space-y-3 animate-in slide-in-from-top-2 duration-300">
            {cards.map((card) => (
              <a
                key={card.id}
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-4 hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center space-x-4">
                  <Book
                    className={`w-6 h-6 ${card.iconColor} transition-transform duration-300 hover:scale-110`}
                  />
                  <span className="text-white font-medium">{card.title}</span>
                </div>
              </a>
            ))}

            {/* Add New Card Button */}
            <button
              onClick={() => setShowAddModal(true)}
              className="w-full bg-teal-500/20 backdrop-blur-md border border-teal-300/50 rounded-xl p-4 text-white hover:bg-teal-500/30 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Tambah Materi Baru</span>
            </button>
          </div>
        )}
       </div>

      </div>

      {/* GitHub Button */}
      <a
        href="https://github.com/ahzizi"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 
          px-4 py-2 text-sm 
          rounded-full shadow-lg hover:shadow-xl 
          transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 
          flex items-center space-x-2 active:scale-95 
          bg-white/30 backdrop-blur-none
          sm:px-6 sm:py-3 sm:text-base"
      >
        <Github className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        <span className="font-semibold text-white">AHzizi</span>
      </a>
      {/* Info */}
       <button
        onClick={() => setShowIModal(true)}
        className="fixed bottom-20 left-6 z-40 
                  px-3 py-2 text-sm sm:px-6 sm:py-3 sm:text-base 
                  bg-white/30 backdrop-blur-none
                  rounded-full shadow-lg hover:shadow-xl 
                  transition-all duration-300 transform 
                  hover:scale-110 hover:-translate-y-1 flex items-center space-x-2 active:scale-95"
      >
        <Info className="w-4 h-4 sm:w-5 sm:h-5 italic text-white" />
      </button>
      
      {/* Tombol Hamburger */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-50 bg-white/20 backdrop-blur-md p-2 rounded-full shadow-lg hover:bg-white/30 transition-all duration-300"
      >
        <Menu className="w-6 h-6 text-white" />
      </button>

      {/* Overlay Blur (klik untuk menutup) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white/20 backdrop-blur-lg border-l border-white/30 shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header Sidebar */}
        <div className="flex items-center justify-between p-4 border-b border-white/30">
          <h2 className="text-lg font-bold text-white">MATERI</h2>
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className=" top-4 right-4 z-50 p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-300 text-white"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button> 
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/30 rounded-full transition"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Konten Sidebar */}
        <div className="p-4 space-y-4">

          {/* Tombol TES TWK */}
          <button
            onClick={() => {
              setShowTWKModal(true);
              setIsOpen(false);
            }}
            className="w-full bg-gradient-to-r from-teal-500 to-sky-500 text-white 
                      px-4 py-3 rounded-lg shadow-lg hover:shadow-xl 
                      text-sm sm:px-6 sm:py-3 sm:text-base
                      transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <BookOpen className="w-5 h-5" />
            <span className="font-semibold">TES TWK</span>
          </button>

          {/* Tombol UUD Kompleks */}
          <button
            onClick={() => {
              setShowUUDModal(true);
              setIsOpen(false);
            }}
            className="w-full bg-gradient-to-r from-teal-500 to-sky-500 text-white 
                      px-4 py-3 rounded-lg shadow-lg hover:shadow-xl 
                      text-sm sm:px-6 sm:py-3 sm:text-base
                      transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <BookOpen className="w-5 h-5" />
            <span className="font-semibold">UUD Kompleks</span>
          </button>
          
          {/* Tombol Bahasa Indonesia */}
          <button
            onClick={() => {
              setShowIndoModal(true);
              setIsOpen(false);
            }}
            className="w-full bg-gradient-to-r from-teal-500 to-sky-500 text-white 
                      px-4 py-3 rounded-lg shadow-lg hover:shadow-xl 
                      text-sm sm:px-6 sm:py-3 sm:text-base
                      transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <BookOpen className="w-5 h-5" />
            <span className="font-semibold">BAHASA INDOESIA I</span>
          </button>
        </div>
      </div>


    
      {/* Add Card Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Tambah Materi Baru</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Judul</label>
                <input
                  type="text"
                  value={newCard.title}
                  onChange={(e) => setNewCard({...newCard, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Masukkan judul materi"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Link URL</label>
                <input
                  type="url"
                  value={newCard.url}
                  onChange={(e) => setNewCard({...newCard, url: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Warna Icon</label>
                <div className="grid grid-cols-4 gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setNewCard({...newCard, iconColor: color.value})}
                      className={`p-2 rounded-lg border-2 transition-colors ${
                        newCard.iconColor === color.value
                          ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <Book className={`w-6 h-6 mx-auto ${color.value}`} />
                      <span className="text-xs text-gray-600 dark:text-gray-400 mt-1 block">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleAddCard}
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-sky-500 text-white rounded-lg hover:from-teal-600 hover:to-sky-600 transition-all duration-300"
              >
                Tambah
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UUD Modal */}
      {showUUDModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">UUD 1945 - Daftar Pasal</h3>
              <button
                onClick={() => setShowUUDModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {uudArticles.map((article, index) => (
                  <a
                    key={index}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-gradient-to-br from-teal-50 to-sky-50 dark:from-teal-900/20 dark:to-sky-900/20 border border-teal-200 dark:border-teal-700 rounded-lg p-4 hover:shadow-md transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="flex items-start space-x-3">
                      <BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                          {article.pasal}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {article.linkText}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* TES TWK */}
      {showTWKModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">TES TWK</h3>
              <button
                onClick={() => setShowTWKModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {twkArticles.map((article, index) => (
                  <a
                    key={index}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-gradient-to-br from-teal-50 to-sky-50 dark:from-teal-900/20 dark:to-sky-900/20 border border-teal-200 dark:border-teal-700 rounded-lg p-4 hover:shadow-md transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="flex items-start space-x-3">
                      <BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                          {article.pasal}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {article.linkText}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TES BAHASA INDONESIA */}
        {showIndoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">TES BAHASA INDONESIA</h3>
              <button
                onClick={() => setShowIndoModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bahasaIndonesia.map((article, index) => (
                  <a
                    key={index}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-gradient-to-br from-teal-50 to-sky-50 dark:from-teal-900/20 dark:to-sky-900/20 border border-teal-200 dark:border-teal-700 rounded-lg p-4 hover:shadow-md transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="flex items-start space-x-3">
                      <BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                          {article.pasal}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {article.linkText}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Modal */}
      {showIModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white pt-6">TENTANG WEB INI</h3>
              <button
                onClick={() => setShowIModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <h1 className='text-white pb-7'>
              Alasan Gw Buat Projek Ini Untuk Memudahkan Gw Belajar Dimanapun dan Kapanpun, Doakan Gw Temen-temen Semoga Dimudahkan Dalan Urusan Apapun, Terutama Semoga Cita-cita Gw Terwujud, Pengen Jadi Perangkat Desa🤲🤲🤲 Aamiin 😁 Seiring Waktu Soal-soal Bakal Gw Update.
              <br />
              <span className='block w-full border-t border-white my-4'></span>
    
              Web Ini Dibuat Penuh 💙, Semangat Serta Diiringi Doa Dengan Berharap Penuh Apa Yang Diharapkan Semuannya Terwujud, Aamiin Aamiin Ya Robbal Alamin🤲🤲🤲
              
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;