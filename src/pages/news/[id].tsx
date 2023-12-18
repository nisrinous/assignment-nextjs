import { Button } from "@/components/ui/button";
import { NewsData } from "@/types";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import { PiHeart } from "react-icons/pi";
import { FcLike } from "react-icons/fc";
import { PiSparkleLight, PiShareFatLight } from "react-icons/pi";
import { IconContext } from "react-icons";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
    share: 0,
  });
  const { id } = router.query;

  const { data, mutate } = useSWR(
    `http://localhost:9000/news/${id}`,
    async (url) => {
      const response = await axios.get(url);
      setNews(response.data);
    }
  );

  const handleLike = async () => {
    try {
      if (liked && news.like > 0) {
        await axios.patch(`http://localhost:9000/news/${id}`, {
          like: news.like - 1,
        });
      }
      if (!liked) {
        await axios.patch(`http://localhost:9000/news/${id}`, {
          like: news.like + 1,
        });
      }
      setLiked((prev) => !prev);
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleShare = async () => {
    try {
      console.log(news.share);
      await axios.patch(`http://localhost:9000/news/${id}`, {
        share: news.share + 1,
      });
      console.log(news.share + 1);
      mutate();
    } catch (error) {
      console.log(error);
    }
  };
  const [liked, setLiked] = useState<boolean>();

  return (
    <div className="relative">
      {news.isPremium ? (
        <div className="absolute protected-news h-1/2 w-full bottom-0">
          <div className="absolute bottom-40 right-0 left-0">
            <h1 className="tracking-tighter lg:leading-[1.1] text-2xl md:text-3xl text-center flex flex-row justify-center">
              <Link href="/profile/subscription">
                <Button
                  variant="link"
                  className="tracking-tighter lg:leading-[1.1] text-2xl md:text-3xl text-center"
                >
                  Subscribe premium for more
                </Button>
              </Link>
              <IconContext.Provider value={{ color: "yellow" }}>
                <PiSparkleLight />
              </IconContext.Provider>
            </h1>
          </div>
        </div>
      ) : null}
      <div className="container flex flex-col justify-start px-80 py-20">
        <img src={news.image} className="mb-10" alt=""></img>

        <div className="my-10">
          <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
            {news.title}
          </h1>
          <div className="text-muted-foreground">
            {news.updated_at === ""
              ? "Created at: " +
                new Date(news.created_at).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Last updated: " +
                new Date(news.updated_at).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
          </div>
          <div className="flex flex-row items-center justify-start gap-2">
            <div className="gap-0 flex flex-row justify-center items-center">
              <Button
                variant="ghost"
                className="hover:bg-transparent p-0"
                onClick={() => handleLike()}
              >
                {liked ? <FcLike size={30} /> : <PiHeart size={27} />}
              </Button>
              <p>{news.like <= 0 ? null : news.like}</p>
            </div>
            <div className="gap-1 flex flex-row justify-center items-center ml-1">
              <Dialog>
                <DialogTrigger asChild className="hover:cursor-pointer">
                  <PiShareFatLight size={29} />
                </DialogTrigger>
                <p>{news.share === 0 ? null : news.share}</p>{" "}
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-3xl">Send a link</DialogTitle>
                    <DialogDescription className="text-base">
                      Link to share
                    </DialogDescription>
                    <DialogDescription className="text-base border-b-2 py-1 border-purple-200">
                      {router.pathname}
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose>
                      <Button type="button" onClick={() => handleShare()}>
                        Copy link
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <h3 className="leading-normal sm:text-xl sm:leading-8">{news.desc}</h3>
      </div>
    </div>
  );
}
