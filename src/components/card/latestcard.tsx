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

const LatestCard = ({
  image,
  title,
  desc,
  isPrem,
}: {
  image: string;
  title: string;
  desc: string;
  isPrem: boolean;
}) => {
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
        <CardDescription>{desc.substring(0, 120)}...</CardDescription>
      </CardContent>
      <CardFooter>
        <Button>More...</Button>
      </CardFooter>
    </Card>
  );
};

export default LatestCard;
