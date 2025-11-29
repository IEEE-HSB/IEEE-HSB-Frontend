import { Home, ArrowLeft, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950/50 to-slate-950">
      {/* Simple animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #3b82f6 1px, transparent 1px),
            linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }} />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 flex h-screen items-center justify-center px-6">
        <div
          className="w-full max-w-2xl text-center"
        >
          {/* Simple illustration */}
          <div
            className="mb-8 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full" />
              <div className="relative w-32 h-32 rounded-full border-4 border-blue-500/30 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
                <AlertCircle className="w-16 h-16 text-cyan-400" strokeWidth={1.5} />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">!</span>
                </div>
              </div>
            </div>
          </div>

          {/* Error Code */}
          <div className="mb-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-mono">
              404 ERROR
            </span>
          </div>
          
          {/* Title */}
          <h1 className="text-5xl md:text-6xl mb-4 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent"
          >
            Page Not Found
          </h1>
          
          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="group relative px-8 py-3.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30">
              <span className="flex items-center justify-center gap-2">
                <ArrowLeft className="w-5 h-5" />
                Back to Chapters
              </span>
            </button>
            
            <button className="px-8 py-3.5 rounded-lg border border-slate-700 bg-slate-800/50 text-slate-300 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-800 hover:text-white hover:scale-105">
              <span className="flex items-center justify-center gap-2">
                <Home className="w-5 h-5" />
                Go to Home
              </span>
            </button>
          </div>
          
          {/* Footer */}
          <div className="mt-16 text-slate-600 text-sm">
            <p>IEEE Helwan Student Branch Platform</p>
          </div>
        </div>
      </div>
    </div>
  );
}



