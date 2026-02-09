'use client';

import { SortOption } from '@/types/knowledge-hub';
import { ArrowUpDown } from 'lucide-react';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm font-medium cursor-pointer hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ieee-blue-100"
      >
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
        <option value="mostViewed">Most Viewed</option>
      </select>
    </div>
  );
}
