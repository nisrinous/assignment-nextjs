import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Subscription() {
  return (
    <div className="w-screen p-10 bg-white">
      <div className="my-10 flex-col text-left">
        <h1 className="font-bold tracking-tighter lg:leading-[1.1] text-2xl md:text-3xl">
          Subscriptions
        </h1>
        <h3 className="leading-tight text-muted-foreground sm:text-xl sm:leading-8">
          Manage subscription
        </h3>
      </div>
      <div className="w-full">
        <h1 className="text-xl font-semibold sm:text-2xl">
          Subscription Plans
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
              <Button>Subscribe</Button>
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
              <Button>Subscribe</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
