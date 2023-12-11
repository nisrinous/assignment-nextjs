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
        className="container mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 py-12 text-center md:pt-32"
      >
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          Swiftly informed: Dive into Taylor's latest stories!
        </h1>
        <h3 className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          From chart-topping hits to exclusive behind-the-scenes, uncover the
          essence of Taylor Swift's ever-envolving narrative.
        </h3>
      </section>
      <ScrollArea className="container">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-7">
            {latest.slice(0, 5).map((item, i) => (
              <LatestCard
                key={i}
                title={item.title}
                desc={item.desc}
                image={item.image}
                isPrem={item.isPremium}
              />
            ))}
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="container">
        <div className="my-10">
          <h3 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            Most Likes{" "}
          </h3>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Explore most favorite news
          </p>
        </div>
        <div className="flex flex-col gap-7 my-10">
          {mostLike.slice(0, 5).map((item, i) => (
            <FavoriteCard
              key={i}
              title={item.title}
              desc={item.desc}
              image={item.image}
              isPrem={item.isPremium}
            />
          ))}
        </div>
      </div>
    </>
  );
}
