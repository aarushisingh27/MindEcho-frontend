
import React from 'react';

const AuraBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#fafbff]">
      {/* Lavender Blob */}
      <div 
        className="aura-blob absolute -top-[15%] -left-[10%] w-[70%] h-[70%] rounded-full blur-[140px] bg-purple-200/40 opacity-70"
      />
      {/* Peach Blob */}
      <div 
        className="aura-blob-reverse absolute top-[15%] -right-[15%] w-[60%] h-[60%] rounded-full blur-[140px] bg-orange-100/40 opacity-60"
      />
      {/* Mint Blob */}
      <div 
        className="aura-blob absolute -bottom-[15%] left-[10%] w-[65%] h-[65%] rounded-full blur-[140px] bg-emerald-100/40 opacity-50"
      />
      {/* Light Blue Blob */}
      <div 
        className="aura-blob-reverse absolute bottom-[5%] right-[5%] w-[55%] h-[55%] rounded-full blur-[140px] bg-blue-100/40 opacity-60"
      />
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
    </div>
  );
};

export default AuraBackground;
