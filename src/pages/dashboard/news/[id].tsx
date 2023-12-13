import { NewsData } from "@/types";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

export default function Details() {
  const router = useRouter();
  const [news, setNews] = useState<NewsData | null>(null);
  const { id } = router.query;

  const fetcher = useSWR(`http://localhost:9000/news/${id}`, async (url) => {
    const response = await axios.get(url);
    setNews(response.data);
  });

  return (
    <div className=" container flex flex-col justify-center p-10">
      <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-center m-10">
        {news?.title}
      </h1>
      <img src={news?.image} className="p-40"></img>
      <h3 className="p-10 leading-normal sm:text-xl sm:leading-8">
        {news?.desc}
      </h3>
    </div>
  );
}
