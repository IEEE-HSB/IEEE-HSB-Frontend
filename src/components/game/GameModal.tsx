import { Dialog, DialogContent } from '../ui/dialog';
import { Game3DScene } from './Game3DScene';
import { X } from 'lucide-react';

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GameModal({ isOpen, onClose }: GameModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full h-[90vh] p-0 bg-gradient-to-br from-ieee-blue-100 via-ieee-blue-80 to-ieee-blue-100 border-2 border-ieee-aqua-100/50 overflow-hidden">
        {/* Header */}
        <div className=" absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/50 to-transparent p-6 flex items-center justify-between">
          <div>
            <h2 className="text-white mb-1">IEEE Communities Explorer</h2>
            <p className="text-white/70">Click on buildings to test your knowledge</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all border border-white/20"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* 3D Game Scene */}
        <div className="w-full h-full">
          <Game3DScene />
        </div>

        {/* Bottom Instructions */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/50 to-transparent p-6">
          <div className="flex items-center justify-center gap-6 text-white/70">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#FFD100] rounded-full animate-pulse"></div>
              <span>Drag to rotate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#009CA6] rounded-full animate-pulse"></div>
              <span>Scroll to zoom</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#00629B] rounded-full animate-pulse"></div>
              <span>Click buildings to play</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
