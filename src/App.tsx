import React, { useState, useEffect } from 'react';
import { Book, Plus, X, ChevronDown, ChevronUp, Moon, Sun, BookOpen, Github } from 'lucide-react';

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

const initialCards: LearningCard[] = [
  { id: '1', title: 'Tes TWK', url: 'https://tes-twk.vercel.app/', iconColor: 'text-teal-500' },
  { id: '2', title: 'Tes UUD 1945', url: 'https://tes-uud.vercel.app/', iconColor: 'text-sky-500' },
  { id: '3', title: 'Tes UU Desa', url: 'https://tes-uu-desa.vercel.app/', iconColor: 'text-orange-500' },
  { id: '4', title: 'Tes Ukuran Tanah', url: 'https://tanah-kas-desa-1.vercel.app/', iconColor: 'text-green-500' },
  { id: '5', title: 'Try Out 1', url: 'https://try-out-1.vercel.app/', iconColor: 'text-purple-500' }
];

const backgroundImages = [
  'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
  'https://res.cloudinary.com/dntbcmcc3/image/upload/v1754907649/1350248_odczfx.png',
  'https://res.cloudinary.com/dntbcmcc3/image/upload/v1754907639/BG_Atelier_Night_waifu2x_art_noise3_scale_xeul5y.png',
  'https://res.cloudinary.com/dntbcmcc3/image/upload/v1754907635/4b2e55b89740491cd74ce5908ee3d4a6_bem4zh.jpg',
  'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
  'https://res.cloudinary.com/dntbcmcc3/image/upload/v1754908165/a943d53cea39fefb6e2ea6d8d7a4406f_gwvp2i.jpg',
  'https://res.cloudinary.com/dntbcmcc3/image/upload/v1754908167/8df6c58da5e889db0ff9b8e0151bf7a3_kukqjh.jpg',
  'https://res.cloudinary.com/dntbcmcc3/image/upload/v1754908167/b8f1180a76a796c38755e93c7fbf6d19_hfbdtc.jpg'
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
  const [showCards, setShowCards] = useState(false);
  const [newCard, setNewCard] = useState({ title: '', url: '', iconColor: 'text-teal-500' });
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [manualTheme, setManualTheme] = useState<boolean | null>(null);

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

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-300 text-white"
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-center">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 drop-shadow-lg">
          Perangkat Pembelajaran Perangkat Desa
        </h1>

        {/* Greeting */}
        <h2 className="text-xl md:text-2xl font-semibold text-white/90 mb-4 drop-shadow-md">
          Halo Miftakul Azizi, Belajar Apa Hari Ini ?
          <br />
          <br />
          Have a Great Day :)
        </h2>

        {/* Time Display */}
        <div className="text-lg md:text-xl text-white/80 mb-12 drop-shadow-md font-medium">
          {formatTime(currentTime)}
        </div>

        {/* Learning Cards Dropdown */}
        <div className="w-full max-w-md mb-8">
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
                    <Book className={`w-6 h-6 ${card.iconColor} transition-transform duration-300 hover:scale-110`} />
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
        className="fixed bottom-6 left-6 z-40 px-6 py-3  rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 flex items-center space-x-2 active:scale-95 bg-white/30 backdrop-blur-none"
      >
        <Github className="w-5 h-5 text-white" />
        <span className="font-semibold text-white">AHzizi</span>
      </a>

      {/* UUD Kompleks Floating Button */}
      <button
        onClick={() => setShowUUDModal(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-teal-500 to-sky-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 flex items-center space-x-2 active:scale-95"
      >
        <BookOpen className="w-5 h-5" />
        <span className="font-semibold">UUD Kompleks</span>
      </button>

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
    </div>
  );
}

export default App;