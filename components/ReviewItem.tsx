import Image from "next/image";
import React, { useLayoutEffect, useState } from "react";
import Star from "react-star-ratings";
import { useToast } from "./ui/use-toast";
import { TUser } from "@/integration/sign";
import { Trash2 } from "lucide-react";
import { Pen } from "lucide-react";
import DeleteReview from "@/integration/delete-review";

function ReviewItem({
  id,
  image,
  userId,
  name,
  rating,
  content,
}: {
  id: string;
  userId: string;
  image: string;
  name: string;
  rating: number;
  content: string;
}) {
  const { toast } = useToast();
  let [user, setUser] = useState<TUser | null>(null);
  useLayoutEffect(() => {
    // @ts-ignore
    const user: TUser = JSON.parse(window.localStorage.getItem("user"));
    setUser(user);
  }, []);

  const DeleteHandle = async () => {
    const responce = await DeleteReview(id);
    if (responce) {
      toast({
        description: "Deleted review successfully",
        className: "bg-green-500 text-white",
        duration: 3000,
      });

      window.location.reload();
      return;
    }

    toast({
      description: "same thing gose wrong",
      variant : "destructive",
      duration: 3000,
    });
    return ;
  };
  return (
    <>
      <div className="flex border p-4 rounded-lg justify-between items-center">
        <div className="flex gap-x-2 lg:gap-x-4">
          <div className="w-[75px] h-[75px] relative">
            <Image
              src={image || "/avtar.png"}
              alt="avatar"
              fill
              className="rounded-full border"
            />
          </div>
          <div className="flex flex-col  text-muted-foreground ">
            <p>{name}</p>
            <Star
              rating={rating}
              starSpacing="2px"
              starDimension="20px"
              starRatedColor="yellow"
            />
            <p>{(content as string).substring(0,10)+"..."}</p>
          </div>
        </div>
        {user?._id == userId ? (
          <div className=" flex items-center gap-x-1 md:gap-x-3">
            <Trash2 className="cursor-pointer" onClick={DeleteHandle} />
          </div>
        ) : null}
      </div>
      {/* <Separator/> */}
    </>
  );
}

export default ReviewItem;
