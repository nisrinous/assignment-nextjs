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

const LatestCard = ({
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
  function newsDetails() {
    router.push("/news/:id");
  }

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
      <CardFooter>
        <Button>
          <Link href={`/dashboard/news/${newsId}`} passHref>
            More
          </Link>
        </Button>{" "}
      </CardFooter>
    </Card>
  );
};

export default LatestCard;
