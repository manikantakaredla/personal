import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Mail, Video, Gift, Sparkles, Play, Pause, 
  Volume2, VolumeX, Sun, Moon, ArrowRight, Lock, 
  Unlock, Cake, Camera, Send
} from 'lucide-react';
import confetti from 'canvas-confetti';

// --- Constants & Types ---

type Page = 'home' | 'video' | 'letter' | 'wishes' | 'gallery';
type Theme = 'light' | 'dark';

const YAMINI_EMOJIS = ['🧸', '🎀', '✨', '💖', '🌸', '🐻', '❄️', '⭐', '🎈', '🍭'];
const FLOWERS = ['🌸', '🌼', '🌷', '🌹', '🌺', '🌻'];

const INTRO_IMAGES = [
  'https://picsum.photos/seed/yamini1/800/1200',
  'https://picsum.photos/seed/yamini2/800/1200',
  'https://picsum.photos/seed/yamini3/800/1200'
];

const GALLERY_IMAGES = [
  {
    url: "/files/album/img1.jpeg",
    caption: "Our first memory 💖"
  },
  {
    url: "/files/album/img2.jpeg",
    caption: "Your beautiful smile ✨"
  },
  {
    url: "/files/album/img3.jpeg",
    caption: "My loveee🌸"
  },
  {
    url: "/files/album/img4.jpeg",
    caption: "My Cutie pie 🧸"
  },
  {
    url: "/files/album/img5.jpeg",
    caption: "Forever us 💞"
  },
  {
    url: "/files/album/img6.jpeg",
    caption: "Love Youu to the Mooon 🌙"
  }
];

// --- Components ---

const Intro = ({ onEnd }: { onEnd: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Video (named intro-bg class) */}
      <div className="absolute inset-0 -z-10 bg-black">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover opacity-60 intro-bg"
          poster="https://picsum.photos/seed/stars/1920/1080"
        >
          {/* Using a high-quality vertical night sky/stars video as placeholder for their intro-bg */}
<source src="/files/intro-bg.mp4" type="video/mp4" />     </video>
      </div>

      {/* Glass Effect Overlay */}
      <div className="absolute inset-0 backdrop-blur-[2px] bg-black/20 pointer-events-none" />

      {/* Floating Moon */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-20 right-10 z-10"
      >
        <div className="text-[100px] moon-glow drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">🌙</div>
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-white/20 blur-[50px] rounded-full"
        />
      </motion.div>

      {/* Floating Stars */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 2 + Math.random() * 3, 
            repeat: Infinity, 
            delay: Math.random() * 5 
          }}
          className="absolute text-neon-pink text-xs"
          style={{ 
            top: `${Math.random() * 80}%`, 
            left: `${Math.random() * 100}%` 
          }}
        >
          ⭐
        </motion.div>
      ))}

      <button 
        onClick={onEnd}
        className="absolute top-8 right-8 z-20 text-white/50 hover:text-white transition-colors text-xs tracking-widest font-bold uppercase border border-white/20 px-4 py-2 rounded-full backdrop-blur-md"
      >
        Skip Intro
      </button>

      <div className="z-10 text-center flex flex-col items-center gap-6">
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="font-pacifico text-5xl md:text-7xl text-white neon-text glow-letters drop-shadow-[0_0_15px_rgba(255,102,204,0.8)]"
        >
          Happy Birthday,<br />Yamini ✨
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ delay: 2 }}
          className="flex gap-4 text-4xl"
        >
          {['🎀', '💖', '⭐', '🌹'].map((e, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            >
              {e}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Bottom Glass Card Decoration */}
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 glass p-6 rounded-[30px] border-white/20 text-white/60 font-black uppercase tracking-[5px] text-[10px]"
      >
        The Celebration Begins
      </motion.div>
    </motion.div>
  );
};

const FloatingElements = () => {
  const elements = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 15}s`,
      duration: `${10 + Math.random() * 10}s`,
      size: `${15 + Math.random() * 20}px`,
      char: i % 2 === 0 ? FLOWERS[Math.floor(Math.random() * FLOWERS.length)] : '💖'
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[5]">
      {elements.map((el) => (
        <div
          key={el.id}
          className="petal select-none"
          style={{
            left: el.left,
            animationDelay: el.delay,
            animationDuration: el.duration,
            fontSize: el.size,
            bottom: '-50px'
          }}
        >
          {el.char}
        </div>
      ))}
    </div>
  );
};

const Fireflies = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[4]">
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="firefly"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 5}s`
          }}
        />
      ))}
    </div>
  );
};

// --- Main Application ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    const saved = localStorage.getItem('activePage');
    return (saved as Page) || 'home';
  });
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'light';
  });
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('isMuted');
    return saved === 'true'; 
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [introActive, setIntroActive] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [yaminiClicks, setYaminiClicks] = useState(() => {
    const saved = localStorage.getItem('yaminiClicks');
    return parseInt(saved || '0');
  });

  const today = new Date();

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  // Audio sync with video
  useEffect(() => {
    if (audioRef.current && hasStarted) {
      if (isVideoPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else if (!isMuted) {
const handleStartApp = () => {
  setHasStarted(true);
  setIntroActive(true);

  if (audioRef.current) {
    audioRef.current.muted = false; // 🔥 important
    audioRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      console.log("Audio blocked by browser");
    });
  }

  setTimeout(() => {
    setIntroActive(false);
  }, 25000);
};        setIsPlaying(true);
      }
    }
  }, [isVideoPlaying, hasStarted, isMuted]);

  const handleStartApp = () => {
    setHasStarted(true);
    setIntroActive(true);
    if (audioRef.current && !isMuted) {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
    // Auto end intro after 8 seconds
    setTimeout(() => {
      setIntroActive(false);
    }, 25000);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleYaminiClick = () => {
    const newCount = yaminiClicks + 1;
    setYaminiClicks(newCount);
    localStorage.setItem('yaminiClicks', newCount.toString());
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMuted) {
        setIsMuted(false);
        audioRef.current.play().catch(console.error);
        setIsPlaying(true);
      } else {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.play().catch(console.error);
          setIsPlaying(true);
        }
      }
    }
  };

  useEffect(() => {
    localStorage.setItem('activePage', currentPage);
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem('isMuted', String(isMuted));
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div className={`min-h-screen relative flex flex-col items-center justify-center p-4 transition-colors duration-1000 ${theme === 'dark' ? 'bg-[#0B0E14] text-white' : 'bg-[#FFF5F7] text-[#5a3e4d]'}`}>
      <AnimatePresence>
        {!hasStarted && (
           <motion.div
             initial={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-[100] bg-black/80 flex flex-col items-center justify-center p-6 text-center"
           >
             <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mb-10"
             >
                <h2 className="text-white text-3xl font-black uppercase tracking-[8px] neon-text">For Yamini</h2>
                <div className="w-16 h-1 bg-neon-pink mx-auto mt-4 rounded-full shadow-[0_0_10px_#FF66CC]" />
             </motion.div>

             <motion.button
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={handleStartApp}
               className="glass px-10 py-5 rounded-full text-white font-black uppercase tracking-[4px] border-white/40 shadow-2xl flex items-center gap-3 group z-[110]"
             >
               <span>Begin the Magic</span>
               <Sparkles className="text-neon-pink group-hover:animate-spin" size={24} />
             </motion.button>
           </motion.div>
        )}

        {introActive && (
          <Intro onEnd={() => setIntroActive(false)} />
        )}
      </AnimatePresence>

      {/* Main Background Video */}
      <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className={`w-full h-full object-cover transition-opacity duration-1000 ${theme === 'dark' ? 'opacity-30' : 'opacity-10'}`}
        >
<source src="/files/intro-bg.mp4" type="video/mp4" />      </video>
      </div>

  <audio
  ref={audioRef}
  src="/files/merge-bg.mp3"
  loop
/>

      {/* Decorative Overlays */}
      <div className={`fixed inset-0 -z-10 transition-opacity duration-1000 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}>
        <div className="stars-container absolute inset-0" />
      </div>
      <div className={`fixed inset-0 -z-10 transition-opacity duration-1000 ${theme === 'light' ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#FFD1DC_0%,transparent_40%),radial-gradient(circle_at_80%_80%,#FFDAB9_0%,transparent_40%)]" />
      </div>
      
      <FloatingElements />
      {theme === 'dark' && <Fireflies />}

      {/* Controls */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3">
        <button
          onClick={toggleMusic}
          className="p-3 glass rounded-full text-neon-pink hover:scale-110 active:scale-95 transition-all shadow-lg"
          aria-label="Toggle Music"
        >
          {isMuted ? <VolumeX size={20} /> : isPlaying ? <Volume2 size={20} className="animate-pulse" /> : <Play size={20} />}
        </button>
        <button
          onClick={toggleTheme}
          className="p-3 glass rounded-full text-neon-pink hover:scale-110 active:scale-95 transition-all shadow-lg"
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>

     
      {/* Page Content */}
      <main className="w-full max-w-lg mb-24 z-20">
        <AnimatePresence mode="wait">
          {hasStarted && !introActive && (
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} theme={theme} />}
              {currentPage === 'video' && <VideoPage setIsVideoPlaying={setIsVideoPlaying} />}
              {currentPage === 'letter' && <LetterPage theme={theme} />}
              {currentPage === 'wishes' && <WishesPage theme={theme} />}
              {currentPage === 'gallery' && <GalleryPage theme={theme} />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Navigation */}
      <nav className={`fixed bottom-6 w-[92%] max-w-sm glass rounded-full p-2 px-4 shadow-2xl z-50 border-white/40`}>
        <div className="flex justify-between items-center px-2">
          <NavButton active={currentPage === 'home'} onClick={() => setCurrentPage('home')} icon={<Heart size={20} />} label="Home" theme={theme} />
          <NavButton active={currentPage === 'gallery'} onClick={() => setCurrentPage('gallery')} icon={<Camera size={20} />} label="Album" theme={theme} />
          <NavButton active={currentPage === 'video'} onClick={() => setCurrentPage('video')} icon={<Video size={20} />} label="Video" theme={theme} />
          <NavButton active={currentPage === 'letter'} onClick={() => setCurrentPage('letter')} icon={<Mail size={20} />} label="Letter" theme={theme} />
          <NavButton active={currentPage === 'wishes'} onClick={() => setCurrentPage('wishes')} icon={<Gift size={20} />} label="Gifts" theme={theme} />
        </div>
      </nav>
    </div>
  );
}

// --- Sub-Pages ---

function HomePage({ onNavigate, theme }: { onNavigate: (p: Page) => void; theme: Theme }) {
  return (
    <div className="flex flex-col items-center gap-12 text-center">
      <header className="space-y-4">
        <div className="flex justify-center gap-4 text-3xl">
          {YAMINI_EMOJIS.slice(0, 3).map((e, i) => <motion.span key={i} animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}>{e}</motion.span>)}
        </div>
        <h1 className="text-6xl md:text-7xl font-black uppercase leading-[0.85] neon-text tracking-tighter">
          Happy<br />Birthday!
        </h1>
        <p className={`text-sm font-bold tracking-[3px] uppercase ${theme === 'dark' ? 'text-pink-300' : 'text-[#d15a9a]'}`}>
          To my  Yamini 🧸
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 w-full px-4">
        <HomeCard 
          onClick={() => onNavigate('gallery')} 
          icon="https://cdn-icons-png.flaticon.com/512/3059/3059984.png" 
          emoji="🎞️" 
          label="GALLERY" 
          desc="Our Private Album" 
          theme={theme}
        />
        <HomeCard 
          onClick={() => onNavigate('video')} 
          icon="https://cdn-icons-png.flaticon.com/512/3096/3096117.png" 
          emoji="🎬" 
          label="VIDEO" 
          desc="Sweet Memories" 
          theme={theme}
        />
        <HomeCard 
          onClick={() => onNavigate('letter')} 
          icon="https://cdn-icons-png.flaticon.com/512/3059/3059984.png" 
          emoji="💌" 
          label="LETTER" 
          desc="My Heart's Notes"
          theme={theme}
        />
        <HomeCard 
          onClick={() => onNavigate('wishes')} 
          icon="https://cdn-icons-png.flaticon.com/512/2917/2917995.png" 
          emoji="🎁" 
          label="GIFTS" 
          desc="Magical Surprises"
          theme={theme}
        />
      </div>
    </div>
  );
}

function VideoPage({ setIsVideoPlaying }: { setIsVideoPlaying: (v: boolean) => void }) {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center space-y-2">
         <div className="inline-flex items-center gap-2 glass px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 border-white/20">
           <Camera size={12} className="text-neon-pink" />
           Memories
         </div>
         <h2 className="text-4xl font-black uppercase neon-text">For You 🎀</h2>
      </div>
      
      {/* Vertical Video Layout */}
      <div className="w-[85%] aspect-[9/16] max-w-[350px] rounded-[40px] overflow-hidden glass border-4 p-2 shadow-2xl relative">
        <div className="w-full h-full rounded-[32px] overflow-hidden bg-black relative group">
           <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover opacity-60 intro-bg"
          poster="https://picsum.photos/seed/stars/1920/1080"
        >
          {/* Using a high-quality vertical night sky/stars video as placeholder for their intro-bg */}
<source src="/files/edit.mp4" type="video/mp4" />     </video>
          <div className="absolute top-4 left-1 -translate-x-1/2 flex gap-1 pointer-events-none">
            {Array.from({ length: 3 }).map((_, i) => <span key={i} className="text-[10px] animate-pulse">💖</span>)}
          </div>
        </div>
      </div>

      <p className="text-center italic font-medium opacity-80 text-lg px-4">
        "Every second with you is magic, Yamini ✨"
      </p>

      <div className="flex gap-4">
        {YAMINI_EMOJIS.slice(2, 6).map((e, i) => (
          <motion.span key={i} animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }} className="text-2xl">
            {e}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function LetterPage({ theme }: { theme: Theme }) {
  return (
    <div className="flex flex-col items-center gap-10">
      <div className="relative w-full max-w-[450px] p-10 md:p-14 rounded-xl glass bg-white/50 dark:bg-black/40 border-white/30 shadow-2xl overflow-hidden">
        {/* Vintage Paper Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-10 pointer-events-none" />
        
        <div className={`space-y-6 leading-relaxed font-serif italic text-xl md:text-2xl ${theme === 'dark' ? 'text-pink-100' : 'text-[#7a3e5d]'}`}>
          <div className="text-sm mb-4 font-bold not-italic">To my dearest Yamini 🧸,</div>
          
          <p>
          Happy Birthday, my dear 🦋❤️

Having you in my life
reminds me that I’m not alone.

Many times when I feel strong,
it’s not because of me… it’s because of you.

Just knowing that you’re beside me
makes me feel like I can face anything.

You’re not just my love,
you’re my strength too.


I love you so much babyy,when you are happy,
it makes my whole day better.

I may not say it often,
but truly…
you are very special to me.

Be like this with me always,
and I’ll always be there for you.

Today, I just want you to smile a lot Be happy Always baby,
because your smile
is my favorite.

Happy Birthday, my love ❤️

          </p>
          
          

          <div className="pt-6 border-t border-pink-200/50 mt-10">
            <div className="not-italic font-bold text-sm uppercase tracking-widest opacity-60 mb-2">With all my heart,</div>
            <div className="text-2xl font-bold font-pacifico text-neon-pink">Your forever  💖</div>
          </div>
        </div>
        
        <div className="absolute -bottom-4 -right-2 text-6xl opacity-20 transform -rotate-12 pointer-events-none">💌</div>
        <div className="absolute top-4 right-4 text-3xl opacity-50">🕯️</div>
      </div>

      <div className="flex gap-3">
        {FLOWERS.map((f, i) => (
          <motion.span key={i} animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 3, delay: i * 0.4 }} className="text-3xl">
            {f}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function GalleryPage({ theme }: { theme: Theme }) {
  const [code, setCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);

  const checkCode = (val: string) => {
    setCode(val);
    const normalized = val.toLowerCase().replace(/\s/g, '');
    if (normalized === '17022022' || normalized === '17feb2022' || normalized === '17february2022' || normalized === '170222') {
      setIsUnlocked(true);
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
  };

  if (!isUnlocked) {
    return (
      <div className="flex flex-col items-center gap-8 py-10">
        <div className="w-20 h-20 bg-neon-pink/20 rounded-full flex items-center justify-center text-neon-pink">
          <Lock size={40} />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black uppercase text-neon-pink">Private Album</h2>
          <p className="text-sm opacity-60 font-bold uppercase tracking-widest italic">Enter our Valentine Date to unlock</p>
        </div>
        <div className="w-full max-w-xs space-y-4">
          <input 
            type="text" 
            placeholder="DD MM YYYY"
            value={code}
            onChange={(e) => checkCode(e.target.value)}
            className="w-full vintage-paper py-4 px-6 rounded-xl text-center font-bold text-xl tracking-[4px] focus:outline-none focus:ring-2 focus:ring-neon-pink/50 transition-all border-[#d4c5b3]"
          />
          <p className="text-[10px] text-center opacity-40 uppercase font-black">Hint: 17 Feb 2022 💝</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <h2 className="text-4xl font-black uppercase neon-text">Our Diary 📖</h2>
        <p className="text-xs font-bold uppercase tracking-widest opacity-60 italic">Flip through our memories</p>
      </div>

      <div className="relative w-full max-w-[400px] aspect-[4/5] vintage-paper p-4 rounded-lg shadow-2xl flex flex-col items-center group">
         <AnimatePresence mode="wait">
           <motion.div
             key={activePhoto}
             initial={{ opacity: 0, rotateY: 90 }}
             animate={{ opacity: 1, rotateY: 0 }}
             exit={{ opacity: 0, rotateY: -90 }}
             transition={{ duration: 0.5 }}
             className="w-full h-full relative"
           >
            <div className="w-full aspect-[4/5] rounded-md overflow-hidden border-4 border-white shadow-inner bg-gray-200">
             <img 
  src={GALLERY_IMAGES[activePhoto].url} 
  alt="Memory" 
  className="w-full h-full object-cover"
/>
             </div>
             <div className="mt-4 text-center font-serif italic text-lg text-gray-700">
               {GALLERY_IMAGES[activePhoto].caption}
             </div>
             <div className="absolute top-2 right-2 text-gray-500 font-bold text-xs">
                {activePhoto + 1} / 10
             </div>
           </motion.div>
         </AnimatePresence>

         <div className="absolute bottom-10 -left-6 flex flex-col gap-4">
           <button 
             onClick={() => setActivePhoto(prev => (prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1))}
             className="w-5 h-5 glass rounded-full flex items-center justify-center text-neon-pink shadow-lg active:scale-90"
           >
             <ArrowRight className="rotate-180" size={20} />
           </button>
         </div>
         <div className="absolute bottom-10 -right-6 flex flex-col gap-4">
           <button 
             onClick={() => setActivePhoto(prev => (prev + 1) % GALLERY_IMAGES.length)}
             className="w-5 h-5 glass rounded-full flex items-center justify-center text-neon-pink shadow-lg active:scale-90"
           >
             <ArrowRight size={20} />
           </button>
         </div>
      </div>

      <div className="flex gap-2">
        {GALLERY_IMAGES.map((_, i) => (
          <div 
            key={i} 
            className={`w-2 h-2 rounded-full transition-all ${i === activePhoto ? 'bg-neon-pink w-6' : 'bg-gray-300'}`} 
          />
        ))}
      </div>
    </div>
  );
}

function WishesPage({ theme }: { theme: Theme }) {
  const [yaminiName, setYaminiName] = useState('');
  const [gameStep, setGameStep] = useState<'input' | 'pick' | 'reveal' | 'mini-game'>('input');
  const [selectedHeart, setSelectedHeart] = useState<number | null>(null);
  const [guessDate, setGuessDate] = useState('');
  const [presents, setPresents] = useState<number[]>([]);

  const wishes = [
    (n: string) => `🌸 ${n}, you make my world blossom! Happy birthday, my love!`,
    (n: string) => `✨ ${n}, every star in the sky shines because of you. Stay magical!`,
    (n: string) => `🧸 ${n}, you are my favorite teddy bear hug. Love you beyond words!`
  ];

  const handleReveal = (index: number) => {
    setSelectedHeart(index);
    setGameStep('reveal');
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFC0CB', '#FF66CC', '#B026FF']
    });
  };

  const togglePresent = (i: number) => {
    if (presents.includes(i)) return;
    setPresents([...presents, i]);
    if (presents.length === 5) {
      confetti({ particleCount: 150, spread: 90 });
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-black uppercase neon-text">Magic Gifts 🎁</h2>
        <p className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-pink-300' : 'text-gray-400'}`}>A surprise in every corner</p>
      </div>

      <div className="w-full glass p-8 rounded-[40px] shadow-2xl space-y-8 relative overflow-hidden bg-white/10">
        <AnimatePresence mode="wait">
          {gameStep === 'input' && (
            <motion.div key="input" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6 py-4">
              <p className="text-center font-bold text-lg italic">Type your name, Yamini, to unlock your wishes!</p>
              <div className="relative">
                <input 
                  type="text" 
                  value={yaminiName}
                  onChange={(e) => setYaminiName(e.target.value)}
                  placeholder="Your name..."
                  className="w-full bg-white/20 border-2 border-neon-pink/30 rounded-2xl py-4 px-6 focus:outline-none focus:border-neon-pink transition-all font-bold text-lg placeholder:text-gray-400/50"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => gameStep === 'input' && yaminiName.trim() && setGameStep('pick')}
                  className="absolute right-2 top-2 h-12 w-12 bg-neon-pink rounded-xl flex items-center justify-center text-white shadow-lg"
                >
                  <ArrowRight size={20} />
                </motion.button>
              </div>
              <button 
                onClick={() => setGameStep('mini-game')}
                className="w-full py-3 rounded-2xl border border-neon-pink/20 text-[10px] font-black uppercase tracking-[3px] opacity-40 hover:opacity-100 transition-opacity"
              >
                Or Play Mini-Game 🎮
              </button>
            </motion.div>
          )}

          {gameStep === 'pick' && (
            <motion.div key="pick" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="space-y-8 py-4">
              <p className="text-center font-bold text-lg italic">Pick a heart, {yaminiName}! 🔐</p>
              <div className="grid grid-cols-3 gap-4">
                {[0, 1, 2].map((i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.1, rotate: i === 1 ? 0 : i === 0 ? -10 : 10 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleReveal(i)}
                    className="aspect-square glass rounded-3xl flex flex-col items-center justify-center gap-2 group transition-all hover:bg-neon-pink/10 border-white/40"
                  >
                    <Lock className="text-neon-pink group-hover:scale-125 transition-transform" />
                    <span className="text-3xl">💖</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {gameStep === 'reveal' && (
            <motion.div key="reveal" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 text-center py-4">
              <div className="text-7xl mb-4">🔓</div>
              <div className="glass p-6 rounded-3xl border-neon-pink/30 bg-white/20">
                <p className="text-xl font-bold italic leading-relaxed">
                  "{wishes[selectedHeart!](yaminiName)}"
                </p>
              </div>
              <button onClick={() => setGameStep('input')} className="text-xs font-black uppercase tracking-widest opacity-40">Restart</button>
            </motion.div>
          )}

          {gameStep === 'mini-game' && (
            <motion.div key="mini" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-center">
               <p className="font-bold italic">Tap all boxes to reveal bonus wish! 📦</p>
               <div className="grid grid-cols-3 gap-4">
                 {Array.from({ length: 9 }).map((_, i) => (
                   <motion.div
                     key={i}
                     onClick={() => togglePresent(i)}
                     animate={presents.includes(i) ? { rotateY: 180, scale: 0.9 } : {}}
                     className={`aspect-square rounded-xl flex items-center justify-center text-2xl cursor-pointer shadow-md transition-colors ${presents.includes(i) ? 'bg-neon-pink/20 text-white' : 'glass bg-white/10'}`}
                   >
                     {presents.includes(i) ? '🎈' : '🎁'}
                   </motion.div>
                 ))}
               </div>
               {presents.length === 9 && (
                 <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-neon-pink font-bold italic">
                    "Yamini, you're the best prize ever! 💝"
                 </motion.div>
               )}
               <button onClick={() => setGameStep('input')} className="text-xs font-black uppercase tracking-widest opacity-40">Back</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- Utility Components ---

function NavButton({ active, icon, label, onClick, theme }: { active: boolean; icon: React.ReactNode; label: string; onClick: () => void; theme: Theme }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center h-12 w-12 rounded-full transition-all duration-500 relative ${
        active 
          ? 'text-white scale-110' 
          : theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
      }`}
    >
      <div className="relative z-10 transition-transform active:scale-90">{icon}</div>
      {active && (
        <motion.div
          layoutId="nav-bg"
          className="absolute inset-0 bg-neon-pink rounded-full shadow-[0_4px_15px_rgba(255,102,204,0.5)] border border-white/30"
        />
      )}
    </button>
  );
}

function HomeCard({ onClick, icon, emoji, label, desc, theme }: { onClick: () => void; icon: string; emoji: string; label: string; desc: string; theme: Theme }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.button
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full glass p-5 rounded-[28px] flex items-center gap-6 group relative overflow-hidden"
    >
      <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center bg-white/20 p-2 shrink-0">
        {!imgError ? (
          <div className="relative w-full h-full flex items-center justify-center">
             <img 
               src={icon} 
               alt={label} 
               className="w-full h-full object-contain group-hover:scale-110 transition-transform" 
               onError={() => setImgError(true)}
               referrerPolicy="no-referrer"
             />
          </div>
        ) : (
          <span className="text-3xl">{emoji}</span>
        )}
      </div>
      <div className="flex flex-col items-start text-left">
        <span className="text-[10px] font-black uppercase tracking-widest opacity-50">{desc}</span>
        <span className={`text-xl font-black uppercase tracking-tight ${theme === 'dark' ? 'text-pink-100' : 'text-[#7a3e5d]'}`}>{label}</span>
      </div>
      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
        <Sparkles size={16} className="text-neon-pink" />
      </div>
    </motion.button>
  );
}
