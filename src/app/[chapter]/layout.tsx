import Sidebar from "@/components/common/Sidebar";
import { chaptersData } from "@/data/chaptersData";
import { ReactNode } from "react";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/app-sidebar"

export default function ChapterLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { chapter: string };
}) {

  const { color } = chaptersData.find((ch) => ch.chapterId === params.chapter) || { color: 'ieee-blue-100' };
  const chapterData = chaptersData.find((ch) => ch.chapterId === params.chapter);
    if (!chapterData) return <div>Chapter not found</div>;

  return (

    

    <main className="flex mt-5">

      <Sidebar color={color} /> 
        <div className="ml-[70px] w-full mx-auto">

      {children}
      </div>
    </main>


  );
}
