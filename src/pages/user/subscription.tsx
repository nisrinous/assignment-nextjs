import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { UserData } from "@/types";
import axios from "axios";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import useSWR from "swr";

export default function Subscription() {
  const [onSubs, setOnSubs] = useState<boolean>(false);
  const [type, setType] = useState<number>();
  const [user, setUser] = useState<UserData>();

  const handleSubscription = (type: number) => {
    setOnSubs(true);
    setType(type);
  };

  const { data, mutate } = useSWR(
    "http://localhost:9000/users/2",
    async (url) => {
      const response = await axios.get(url);
      const fetchedUser: UserData = response.data;
      setUser(fetchedUser);
    }
  );

  const activateSubscription = async (userId: string, type: number) => {
    try {
      let previousDate = user?.expired_subs;
      const millisecondsInADay = 1000 * 60 * 60 * 24;
      if (previousDate === "") {
        previousDate = new Date();
      }

      await axios.patch(`http://localhost:9000/users/2`, {
        membership: "premium",
        expired_subs: new Date(
          previousDate.getTime() + millisecondsInADay * 30 * type
        ),
      });
      mutate();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-screen p-10 h-full bg-white">
      <div className="my-10 flex-col text-left">
        <h1 className="font-bold tracking-tighter lg:leading-[1.1] text-2xl md:text-3xl">
          Subscriptions
        </h1>
        <p className="leading-tight text-muted-foreground sm:text-lg sm:leading-8 border-b pb-5">
          Manage your subscription
        </p>
      </div>
      {!onSubs ? (
        <div className="w-full">
          <h1 className="text-xl font-semibold sm:text-2xl my-3">
            Subscribe Plans
          </h1>
          <div className="flex flex-col sm:flex-row items-end gap-10">
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Monthly</CardTitle>
                <CardDescription>
                  Subscribe our premium news monthly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  $9
                  <span className="text-sm font-normal text-muted-foreground">
                    /month
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex items-center p-6 w-full">
                <Button onClick={() => handleSubscription("for a month")}>
                  Subscribe
                </Button>
              </CardFooter>
            </Card>
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Yearly</CardTitle>
                <CardDescription>
                  Subscribe our premium news for a year
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  $99
                  <span className="text-sm font-normal text-muted-foreground">
                    /year
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex items-center p-6 w-full">
                <Button onClick={() => handleSubscription("for a year")}>
                  Subscribe
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <h1 className="text-xl font-semibold sm:text-2xl mt-3">
            Subscribe {type}
          </h1>
          <p className="text-muted-foreground">
            Complete this payment to enjoy premium news
          </p>
          <div className="flex flex-col gap-3 my-20">
            <div className="text-6xl font-bold">
              ${type === "for a year" ? 99 : 9}
            </div>
            <ul>
              <li className="flex flex-row gap-3 text-muted-foreground">
                <FaCheck />
                Benefit 1
              </li>
              <li className="flex flex-row gap-3 text-muted-foreground">
                <FaCheck />
                Benefit 2
              </li>
              <li className="flex flex-row gap-3 text-muted-foreground">
                <FaCheck />
                Benefit 3
              </li>
              <li className="flex flex-row gap-3 text-muted-foreground">
                <FaCheck />
                Benefit 4
              </li>
            </ul>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button>Payment Details</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-3xl mb-5">Payment</DialogTitle>
                <DialogDescription className="text-base">
                  <div className="flex flex-col p-3 gap-2">
                    <h3 className="text-3xl mb-3">Yearly Subscription</h3>
                    <div className="flex flex-row justify-between">
                      <p className="text-muted-foreground">Subtotal</p>
                      <p className="text-muted-foreground">
                        ${type === "for a year" ? 99 : 9}
                      </p>
                    </div>
                    <div className="flex flex-row justify-between border-b-2 border-gray-500">
                      <p className="text-muted-foreground">Tax</p>
                      <p className="text-muted-foreground pb-1">$0.7</p>
                    </div>
                    <div className="flex flex-row justify-between my-5">
                      <p className="text-muted-foreground font-bold">Total</p>
                      <p className="text-muted-foreground">
                        ${type === "for a year" ? 99.7 : 9.7}
                      </p>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose>
                  <Button
                    type="button"
                    onClick={() => activateSubscription(user.id, type)}
                  >
                    Place my order
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
