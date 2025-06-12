import { useState, useEffect } from 'react';
import { Play, Instagram } from 'lucide-react';

export default function InstagramReelsGrid() {
  const [reels, setReels] = useState([
    {
      id: 1,
      title: "Sunset in Bali",
      link: "https://www.instagram.com/p/DIgTlbASpnP/",
      hashtags: "#travel #bali #sunset",
      thumbnail: "./images/r1.png",
      views: "1.2M",
      likes: "87K",
      isLoading: true
    },
    {
      id: 2,
      title: "Mountain hiking adventure",
      link: "https://www.instagram.com/reel/DIVxsuNS_vY/",
      hashtags: "#hiking #adventure #nature",
      thumbnail: "./images/r2.png",
      views: "456K",
      likes: "32K",
      isLoading: true
    },
    {
      id: 3,
      title: "Street food tour",
      link: "https://www.instagram.com/doggosheaven_petresort/reel/DHxe7uEylr3/",
      hashtags: "#food #streetfood #foodie",
      thumbnail: "./images/r3.png",
      views: "789K",
      likes: "45K",
      isLoading: true
    },
    {
      id: 4,
      title: "Ocean diving",
      link: "https://www.instagram.com/p/DHc7DL9yO5_/",
      hashtags: "#diving #ocean #marine",
      thumbnail: "./images/r4.png",
      views: "567K",
      likes: "41K",
      isLoading: true
    },
    {
      id: 5,
      title: "Tokyo night market",
      link: "https://www.instagram.com/p/DGM-nLYS6Q0/",
      hashtags: "#tokyo #japan #travel",
      thumbnail: "./images/r5.png",
      views: "892K",
      likes: "63K",
      isLoading: true
    },
    {
      id: 6,
      title: "Safari adventure",
      link: "https://www.instagram.com/p/DFNVEVQPHEQ/",
      hashtags: "#safari #wildlife #africa",
      thumbnail: "./images/r6.png",
      views: "723K",
      likes: "52K",
      isLoading: true
    },
  ]);

  // Simulate loading thumbnails (in a real app, this would fetch actual thumbnails)
  useEffect(() => {
    const loadThumbnails = async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update reels to show they're loaded
      setReels(prevReels => 
        prevReels.map(reel => ({
          ...reel,
          isLoading: false
        }))
      );
    };
    
    loadThumbnails();
  }, []);

  return (
    <div className="bg-[#EFE3C2] min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-[#85A947] p-4">
      
      </header>

      {/* Main content */}
      <main className="p-4">
        {/* Profile summary */}
        <div className="flex items-center mb-6">
          <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-[#85A947] to-[#3E7B27] p-0.5">
            <div className="h-full w-full rounded-full border-2 border-white overflow-hidden flex items-center justify-center bg-white">
              <Instagram className="h-10 w-10 text-[#123524]" />
            </div>
          </div>
          <div className="ml-4">
            <a href='https://www.instagram.com/doggosheaven_petresort/' target="_blank" rel="noopener noreferrer">
              <h2 className="font-bold text-lg text-[#123524]">@doggosheaven_petresort</h2>
            </a>
            <p className="text-sm text-[#3E7B27]">Pet Resort</p>
          </div>
        </div>

        {/* Navigation tabs */}
        <div className="flex border-b border-[#85A947] mb-4">
          <button className="flex items-center px-4 py-2 border-b-2 border-[#3E7B27] text-sm font-medium text-[#3E7B27]">
            <div className="h-4 w-4 mr-1 grid grid-cols-3 gap-px">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="bg-[#3E7B27] w-1 h-1"></div>
              ))}
            </div>
            <span>Reels</span>
          </button>
        </div>

        {/* Reels grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {reels.map((reel) => (
            <a 
              key={reel.id} 
              href={reel.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block relative aspect-[14/16] rounded overflow-hidden group"
            >
              {/* Video Thumbnail */}
              {reel.isLoading ? (
                <div className={`absolute inset-0 bg-gradient-to-br ${getGradientColor(reel.id)}`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </div>
              ) : (
                <img 
                  src={reel.thumbnail} 
                  alt={reel.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              
              <div className="absolute inset-0 flex flex-col">
                <div className="flex-grow flex items-center justify-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#3E7B27] bg-opacity-80 backdrop-blur-sm">
                    <Play className="h-6 w-6 text-[#EFE3C2]" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}

// Helper function to get different gradient colors based on reel ID
function getGradientColor(id) {
  const colors = [
    'from-[#3E7B27] to-[#85A947]',
    'from-[#85A947] to-[#3E7B27]',
    'from-[#123524] to-[#3E7B27]',
    'from-[#3E7B27] to-[#123524]',
    'from-[#85A947] to-[#123524]',
    'from-[#123524] to-[#85A947]'
  ];
  
  return colors[(id - 1) % colors.length];
}