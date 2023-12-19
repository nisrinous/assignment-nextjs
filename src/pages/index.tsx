import { NewsData } from "@/types";
import axios from "axios";
import { useState } from "react";
import useSWR from "swr";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import LatestCard from "@/components/card/latestcard";
import FavoriteCard from "@/components/card/favoritecard";

export default function Dashboard() {
  const [mostLike, setMostLike] = useState<NewsData[]>([]);
  const [latest, setLates] = useState<NewsData[]>([]);

  const fetcher = useSWR("http://localhost:9000/news", async (url) => {
    const response = await axios.get(url);
    const fetchedNews: NewsData[] = response.data;

    const sortOnLatest = fetchedNews.sort((current, next) => {
      return Date.parse(next.created_at) - Date.parse(current.created_at);
    });
    setLates(sortOnLatest);

    const sortOnLike = fetchedNews.sort((current, next) => {
      return next.like - current.like;
    });
    setMostLike(sortOnLike);
  });

  return (
    <>
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="container mx-auto flex w-full flex-col items-center justify-center gap-4 py-12 text-center md:py-32"
      >
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          Swiftly informed: Dive into Taylor's latest stories!
        </h1>
        <h3 className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          From chart-topping hits to exclusive behind-the-scenes, uncover the
          essence of Taylor Swift's ever-envolving narrative.
        </h3>
      </section>
      <div className="container">
        <h3 className="font-heading text-muted-foreground text-xl sm:text-xl md:text-2xl lg:text-3xl">
          Trendings
        </h3>
      </div>
      <ScrollArea className="container">
        <div className="flex flex-col gap-3 mb-10">
          <div className="flex flex-row gap-7">
            {latest.slice(0, 5).map((item, i) => (
              <LatestCard
                key={i}
                title={item.title}
                desc={item.desc}
                image={item.image}
                isPremium={item.isPremium}
                id={item.id}
                like={item.like}
                created_at={item.created_at}
                updated_at={item.updated_at}
                category={item.category}
                share={item.share}
              />
            ))}
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="container">
        <h3 className="font-heading text-muted-foreground text-xl sm:text-xl md:text-2xl lg:text-3xl">
          Latest News
        </h3>
        <div className="flex flex-col gap-7">
          {mostLike.map((item, i) => (
            <FavoriteCard
              key={i}
              title={item.title}
              desc={item.desc}
              image={item.image}
              isPremium={item.isPremium}
              newsId={item.id}
              likes={item.like}
            />
          ))}
        </div>
      </div>
    </>
  );
}
