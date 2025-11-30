import { Podcast } from "@/types/podcast";

export const podcastsData: Podcast[] = [
    {
        id: 1,
        title: 'Stress',
        episodeNum: 2,
        description: `Press play to “stress free” relief.🙂‍↕️
Our second episode on the WIE podcast💜`,
        chapterId: 'wie',
        by: 'Tasneem',
        episode: (<iframe src="https://www.facebook.com/plugins/video.php?height=270&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F814286284555552%2F&show_text=false&width=560&t=0" width={560} height={270} style={{border: 'none', overflow: 'hidden'}} scrolling="no" frameBorder={0} allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" />)
    }
]
