import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { PiSparkleLight } from "react-icons/pi";
import { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import { NewsData } from "@/types";

const LatestCard = (news: NewsData) => {
  const { data, mutate } = useSWR("http://localhost:9000/news", async (url) => {
    const response = await axios.get(url);
    return response.data;
  });
  const handleLike = async () => {
    try {
      if (liked && news.like > 0) {
        await axios.patch(`http://localhost:9000/news/${news.id}`, {
          like: news.like - 1,
        });
      }
      if (!liked) {
        await axios.patch(`http://localhost:9000/news/${news.id}`, {
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
    <Card className="flex-1 rounded-sm flex flex-col justify-between w-[300px]">
      <CardHeader className="items-center justify-center">
        <img src={news.image} className="h-[150px] w-min" />
      </CardHeader>
      <CardContent>
        {news.isPremium ? (
          <Badge
            className={`pointer-events-none rounded-sm px-3 font-semibold mb-2 ${
              news.isPremium
                ? "border-none bg-amber-100 text-orange-500"
                : "border-none bg-white "
            }`}
          >
            Premium <PiSparkleLight />
          </Badge>
        ) : null}
        <CardTitle>
          <a href={`/news/${news.id}`} className="p-0 hover:cursor-pointer">
            {news.title}
          </a>
        </CardTitle>
        <CardDescription>
          {news.updated_at === ""
            ? new Date(news.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : new Date(news.updated_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
          {news.like !== 0 ? "· " + news.like + " likes" : null}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default LatestCard;
