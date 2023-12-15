import { Button } from "@/components/ui/button";
import { NewsData } from "@/types";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import { PiHeart } from "react-icons/pi";
import { FcLike } from "react-icons/fc";

export default function Details() {
  const router = useRouter();
  const [news, setNews] = useState<NewsData>({
    id: "",
    isPremium: false,
    title: "",
    desc: "",
    image: "",
    created_at: "",
    updated_at: "",
    category: "",
    like: 0,
  });
  const { id } = router.query;

  const fetcher = useSWR(`http://localhost:9000/news/${id}`, async (url) => {
    const response = await axios.get(url);
    setNews(response.data);
  });
  const { data, mutate } = useSWR("http://localhost:9000/news", async (url) => {
    const response = await axios.get(url);
    return response.data;
  });
  const handleLike = async () => {
    try {
      if (liked && news.like > 0) {
        await axios.patch(`http://localhost:9000/news/${newsId}`, {
          like: news.like - 1,
        });
      }
      if (!liked) {
        await axios.patch(`http://localhost:9000/news/${newsId}`, {
          like: news.like + 1,
        });
      }
      mutate();
      setLiked((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };
  const [liked, setLiked] = useState<boolean>();

  return (
    <div className=" container flex flex-col justify-start px-80 py-20">
      <img src={news.image} className="mb-10" alt=""></img>

      <div className="my-10">
        <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
          {news.title}
        </h1>
        <div className="flex flex-row items-center justify-start gap-2">
          <Button
            variant="ghost"
            className="hover:bg-transparent p-0"
            onClick={() => handleLike()}
          >
            {liked ? <FcLike size={30} /> : <PiHeart size={27} />}
          </Button>
          <p>{news.like <= 0 ? null : news.like}</p>
        </div>
      </div>

      <h3 className="leading-normal sm:text-xl sm:leading-8">{news.desc}</h3>
    </div>
  );
}
