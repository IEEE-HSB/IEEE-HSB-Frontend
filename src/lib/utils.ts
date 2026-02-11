import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
//for normalizing strings to be used in URLs or comparisons in quiz filtering
export const normalizeString = (value?: string) =>
  value?.toLowerCase().replace(/\s+/g, "-") ?? "";

export const formatCommitteeName = (committee?: string) => {
  if (!committee) return "";
  const decoded = decodeURIComponent(committee);
  return decoded
    .replace(/[-_]/g, " ")
    .split(/([&\s]+)/)
    .map((part) =>
      /^[&\s]+$/.test(part)
        ? part
        : part.charAt(0).toUpperCase() + part.slice(1),
    )
    .join("");
};

interface Chapter {
  chapterId: string;
  color: string;
}

export const getChapterMainColor = (
  chapterId?: string,
  chaptersData: Chapter[] = [],
) => {
  if (!chapterId) return "gray";

  const chapterInfo = chaptersData.find(
    (ch) => ch.chapterId.toLowerCase() === chapterId.toLowerCase(),
  );

  if (!chapterInfo || !chapterInfo.color) return "gray";

  const parts = chapterInfo.color.split("-");
  return parts.length >= 2 ? parts.slice(0, 2).join("-") : "gray";
};