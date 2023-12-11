import NewsCard from "@/components/card/newscard";
import { NewsData } from "@/types";
import axios from "axios";
import { useState } from "react";
import useSWR from "swr";

export default function Dashboard() {
  const [news, setNews] = useState<NewsData[]>([]);

  const fetcher = useSWR("http://localhost:9000/news", async (url) => {
    const response = await axios.get(url);
    const fetchedNews: NewsData[] = response.data;

    const sorted = fetchedNews.sort((current, next) => {
      return next.like - current.like;
    });
    setNews(sorted);
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
      <div className="flex flex-row lg:flex-col gap-3">
        <div className="m-3 flex flex-col lg:flex-row gap-7">
          {news.map((item, i) => (
            <NewsCard
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
