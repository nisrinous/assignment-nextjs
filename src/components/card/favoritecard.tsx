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

const FavoriteCard = ({
  image,
  title,
  desc,
  isPrem,
  newsId,
}: {
  image: string;
  title: string;
  desc: string;
  isPrem: boolean;
  newsId: string;
}) => {
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
          <Link href={`/dashboard/news/${newsId}`} passHref>
            <Button>More</Button>
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
};

export default FavoriteCard;
