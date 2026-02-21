"use client";

import { use, useMemo } from "react";
import { motion } from "framer-motion";
import GalleryCard from "@/components/common/GalleryCard";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { GalleryType } from "@/types/gallery";
import { chaptersData } from "@/data/chaptersData";
import { useThemeContext } from "@/context/ThemeContext";
import { useApiQuery } from "@/hooks/useFetch";

interface ChapterGalleryPageProps {
  params: Promise<{ chapter: string }>;
}

export default function ChapterGalleryPage({ params }: ChapterGalleryPageProps) {
  const resolvedParams = use(params);
  const chapter = resolvedParams.chapter;

  const chapterInfo = chaptersData.find((ch) => ch.chapterId === chapter);
  const mainColor = chapterInfo!.color.split("-").slice(0, 2).join("-");
  const { isDark } = useThemeContext();

  const { data, isLoading, isError } = useApiQuery<GalleryType[]>({
    queryKey: ["gallery"],
    url: "https://api.ieeehsb.com/api/gallary",
  });

  // filter gallery by chapter
  const chapterGallery = useMemo(() => {
    if (!data) return [];
    return data.filter(
      (item) => item.chapterId?.toLowerCase() === chapter.toLowerCase()
    );
  }, [data, chapter]);

  return (
    <div className="min-h-screen relative">
      {/* Background pattern */}
      {!isDark && (
        <div
          className="absolute -z-10 inset-0 bg-size-[3rem_3rem] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--${mainColor}-20) 1px, transparent 1px),
              linear-gradient(to bottom, var(--${mainColor}-20) 1px, transparent 1px)
            `,
          }}
        />
      )}

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ color: `var(--${mainColor}-100)` }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold my-4">
              {chapterInfo?.title || "Gallery"}
            </h1>

            <p
              className="text-lg md:text-xl max-w-2xl mx-auto"
              style={{ color: `var(--${mainColor}-80)` }}
            >
              {chapterInfo?.brief ||
                "Explore moments from this chapter events"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-12">
        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner />
          </div>
        )}

        {/* Error */}
        {isError && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              Oops! Something went wrong
            </h3>
          </motion.div>
        )}

        {/* Empty */}
        {!isLoading && !isError && chapterGallery.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">📷</div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              No Gallery Found
            </h3>
            <p className="text-muted-foreground">
              No gallery available for {chapterInfo?.title || chapter} chapter.
            </p>
          </motion.div>
        )}

        {/* Grid */}
        {!isLoading && !isError && chapterGallery.length > 0 && (
          <>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {chapterGallery.map((item, index) => (
                <GalleryCard key={item.id} item={item} index={index} />
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center text-muted-foreground"
            >
              <p>
                Showing{" "}
                <span className="font-semibold text-ieee-aqua-100">
                  {chapterGallery.length}
                </span>{" "}
                items
              </p>
            </motion.div>
          </>
        )}
      </section>
    </div>
  );
}