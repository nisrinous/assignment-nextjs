import { NewsData } from "@/types";
import axios from "axios";
import { useState } from "react";
import useSWR from "swr";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import TrendingCard from "@/components/card/trending-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewsCard from "@/components/card/news-card";
import Hero from "@/components/hero";
import { ArrowUpDown } from "lucide-react";

export default function Dashboard() {
  const [newsData, setNewsdata] = useState<NewsData[]>([]);
  const [mostLike, setMostLike] = useState<NewsData[]>([]);
  const [sort, setSort] = useState<boolean>(false);

  const fetcher = useSWR("http://localhost:9000/news", async (url) => {
    const response = await axios.get(url);
    setNewsdata(response.data);

    const sortOnLike = newsData.sort((current, next) => {
      return next.like - current.like;
    });
    setMostLike(sortOnLike);
  });

  return (
    <>
      <Hero />
      <div className="container">
        <h3 className="font-heading text-muted-foreground text-xl sm:text-xl md:text-2xl lg:text-3xl">
          Trendings
        </h3>
      </div>
      <ScrollArea className="container">
        <div className="flex flex-col gap-3 mb-10">
          <div className="flex flex-row gap-7">
            {mostLike.slice(0, 5).map((item, i) => (
              <TrendingCard
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
        <div className="flex flex-col md:flex-row gap-10 mb-10">
          <Tabs
            defaultValue="all"
            className="md:w-2/3 md:border-r-2 md:border-white md:pr-10"
          >
            <div>
              <h3 className="font-heading text-muted-foreground text-xl sm:text-xl md:text-2xl lg:text-3xl">
                Latest News
              </h3>
            </div>
            <TabsList className="bg-none w-full items-start justify-start">
              <TabsTrigger
                value="all"
                className="bg-none"
                onClick={() => setSort((prev) => !prev)}
              >
                All
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="premium" className="bg-none">
                Premium
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mb-10">
              <div className="flex flex-col gap-7">
                {newsData
                  .sort((current, next) =>
                    sort
                      ? Date.parse(current.updated_at) -
                        Date.parse(next.updated_at)
                      : Date.parse(next.updated_at) -
                        Date.parse(current.updated_at)
                  )
                  .map((item, i) => (
                    <NewsCard
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
            </TabsContent>
            <TabsContent value="premium" className="mb-10">
              <div className="flex flex-col gap-7">
                {newsData
                  .filter((item) => item.isPremium === true)
                  .map((item, i) => (
                    <NewsCard
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
            </TabsContent>
          </Tabs>
          <Tabs defaultValue="world" className="md:w-1/3 flex-1">
            <h3 className="font-heading text-muted-foreground text-xl sm:text-xl md:text-2xl">
              Based on Category
            </h3>
            <TabsList className="bg-none w-full items-start justify-start">
              <TabsTrigger value="world">World</TabsTrigger>
              <TabsTrigger value="entertainment">Entertainment</TabsTrigger>
              <TabsTrigger value="music">Music</TabsTrigger>
            </TabsList>
            <TabsContent value="world" className="mb-10">
              <div className="flex flex-col gap-7">
                {newsData
                  .filter((item) => item.category.toLowerCase() === "world")
                  .map((item, i) => (
                    <NewsCard
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
            </TabsContent>
            <TabsContent value="entertainment" className="mb-10">
              <div className="flex flex-col gap-7">
                {newsData
                  .filter(
                    (item) => item.category.toLowerCase() === "entertainment"
                  )
                  .map((item, i) => (
                    <NewsCard
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
            </TabsContent>
            <TabsContent value="music" className="mb-10">
              <div className="flex flex-col gap-7">
                {newsData
                  .filter((item) => item.category.toLowerCase() === "music")
                  .map((item, i) => (
                    <NewsCard
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
