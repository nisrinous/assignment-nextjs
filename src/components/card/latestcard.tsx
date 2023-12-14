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
import router from "next/router";
import Link from "next/link";
import { PiHeart } from "react-icons/pi";
import { FcLike } from "react-icons/fc";
import { useState } from "react";
import useSWR from "swr";
import axios from "axios";

const LatestCard = ({
  image,
  title,
  desc,
  isPrem,
  newsId,
  likes,
}: {
  image: string;
  title: string;
  desc: string;
  isPrem: boolean;
  newsId: string;
  likes: number;
}) => {
  const { data, mutate } = useSWR("http://localhost:9000/news", async (url) => {
    const response = await axios.get(url);
    return response.data;
  });
  const handleLike = async () => {
    try {
      if (liked && likes > 0) {
        await axios.patch(`http://localhost:9000/news/${newsId}`, {
          like: likes - 1,
        });
      }
      if (!liked) {
        await axios.patch(`http://localhost:9000/news/${newsId}`, {
          like: likes + 1,
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
      <CardHeader className="relative">
        <img src={image} />
        {isPrem ? (
          <Badge
            className={`pointer-events-none absolute right-6 bottom-3 rounded-sm px-3 py-1 font-semibold ${
              isPrem
                ? "border-none bg-amber-100 text-orange-500"
                : "border-none bg-white "
            }`}
          >
            Premium <PiSparkleLight />
          </Badge>
        ) : null}
      </CardHeader>
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="line-clamp-3">{desc}</CardDescription>
      </CardContent>
      <CardFooter className="flex flex-row justify-between">
        <Button>
          <Link href={`/news/${newsId}`} passHref>
            More
          </Link>
        </Button>
        <div className="flex flex-row items-center">
          <Button
            variant="ghost"
            className="right-0 top-0 h-full pl-5 pr-1 py-1 hover:bg-transparent text-black"
            onClick={() => handleLike()}
          >
            {liked ? <FcLike size={30} /> : <PiHeart size={27} />}
          </Button>
          <p>{likes <= 0 ? null : likes}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LatestCard;
