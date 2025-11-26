"use client";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-ieee-aqua-20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-ieee-aqua-100 rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
}
