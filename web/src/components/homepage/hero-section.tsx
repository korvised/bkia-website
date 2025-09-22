export default function HeroSection() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-48">


      {/* Scroll Indicator */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse-slow"></div>
        </div>
      </div>
    </div>
  );
}
