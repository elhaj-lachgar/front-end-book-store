"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Star from "react-star-ratings";
import { PenBox } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import CreateReview from "../integration/create-review";
import { toast } from "./ui/use-toast";
import Laoding from "@/app/(home)/products/[id]/loading";
import LaoderButton from "./LaoderButton";
function CreateReviewModule({ id }: { id: string }) {
  let [rating, setRating] = useState(0);
  let [loading, setLaoding] = useState(false);
  // const r = useRef()
  let [content, setContent] = useState<null | string>(null);
  let [error, setError] = useState<string | null>(null);

  const CreateReviewHandler = async () => {
    if (!content) {
      setError("content is empty");
      return;
    }
    const response = await CreateReview(id, content, rating);

    if (response?.data) {
      toast({
        description: "thanks! for your feedback",
        duration: 3000,
        className: "bg-green-500 text-white",
      });
      setLaoding(false);
      window.location.reload();
      return;
    }

    setLaoding(false);
    toast({
      description: "same thing gose wrong",
      duration: 3000,
      variant: "destructive",
    });
    return;
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="bg-white w-[50px] h-[50px] flex justify-center items-center rounded-full border cursor-pointer">
          <PenBox />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className="lg:px-5 px-2 justify-center w-full flex flex-col gap-y-4 mx-auto">
          <Star
            changeRating={(rating) => setRating(rating)}
            starDimension="25px"
            starSpacing="3px"
            starRatedColor="yellow"
            starHoverColor="yellow"
            rating={rating}
          />
          <Textarea
            className="h-[50px]"
            placeholder="Entre your feed back..."
            onChange={(e) => setContent(e.currentTarget.value)}
          />

          <div className=" flex w-full justify-end gap-x-3 items-center relative">
            {loading ? (
              <LaoderButton />
            ) : (
              <Button
                className="bg-blue-500 hover:bg-blue-500"
                onClick={() => {
                  setLaoding(true);
                  CreateReviewHandler();
                }}
              >
                Save
              </Button>
            )}
            <Button
              variant={"outline"}
              onClick={() => {
                document.getElementById("close-rating")?.click();
              }}
            >
              Back
            </Button>
            <AlertDialogCancel
              id="close-rating"
              className="hidden"
            ></AlertDialogCancel>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CreateReviewModule;
