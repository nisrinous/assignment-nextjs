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
import Link from "next/link";
import { PiHeart } from "react-icons/pi";
import { FcLike } from "react-icons/fc";
import { useState } from "react";
import useSWR from "swr";
import { NewsData } from "@/types";
import axios from "axios";
import { boolean, undefined } from "zod";

const FavoriteCard = ({
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
    <Card className="w-full flex-1 rounded-sm flex flex-col md:flex-row items-center">
      <CardHeader className="relative p-3">
        <div>
          <img src={image} />
        </div>
      </CardHeader>
      <div className="my-3">
        <CardContent className="pb-5 w-11/12">
          {isPrem ? (
            <Badge
              className={`w-24 mb-3 mx-auto pointer-events-none rounded-sm px-3 pl-4 font-semibold ${
                isPrem ? "border-none bg-amber-100 text-orange-500" : ""
              }`}
            >
              Premium <PiSparkleLight />
            </Badge>
          ) : null}
          <CardTitle>{title}</CardTitle>
          <CardDescription className="mt-3">
            {desc.substring(0, 250)}...
          </CardDescription>
        </CardContent>
        <CardFooter className="pb-0">
          <Link href={`/news/${newsId}`} passHref>
            <Button>More..</Button>
          </Link>
          <Button
            variant="ghost"
            className="right-0 top-0 h-full pl-5 pr-1 py-1 hover:bg-transparent"
            onClick={() => handleLike()}
          >
            {liked ? <FcLike size={30} /> : <PiHeart size={27} />}
          </Button>
          <p>{likes <= 0 ? null : likes}</p>
        </CardFooter>
      </div>
    </Card>
  );
};

export default FavoriteCard;
