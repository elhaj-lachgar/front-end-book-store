"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";



import { Input } from "./ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { TApiCategorys, cn } from "@/lib/utils";
import GetCategorys from "@/integration/get-categorys";
import {
  resolvers,
  TCreateBookParameter,
} from "@/validator/create-book-validator";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import CreateBook from "@/integration/create-book";
import { toast } from "./ui/use-toast";
import LaoderButton from "./LaoderButton";
function AddProductModule() {
  let [category, setCategory] = useState<TApiCategorys>({
    data: [],
    pagination: { countPage: 0 },
  });

  let [currency, setCurrency] = useState<"USD" | "EUR" | "MAD">("EUR");
  let [choisenCategory, setChoisenCategory] = useState("");
  let [ loading , setlaoding ]  = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<TCreateBookParameter>({
    resolver: resolvers,
  });

  const Fetching = async () => {
    const responce = await GetCategorys();
    // @ts-ignore
    if (responce.data) {
      // @ts-ignore
      const categorys: TApiCategorys = responce;
      setCategory(categorys);
      return;
    }
    return;
  };

  useEffect(() => {
    Fetching();
  }, []);

  const Submit = async (data: TCreateBookParameter) => {
    setlaoding(true);
    const responce = await CreateBook(
      data.title,
      data.descripition,
      data.author,
      data.publishedAt,
      data.image[0],
      choisenCategory,
      data.price,
      currency
    );

    // @ts-ignore
    if (responce != null) {
      setlaoding(false);
      toast({
        className: "bg-green-500 text-white",
        description: "add product succefully",
      });
      // @ts-ignore
      document.getElementById("close-create")?.click();
      window.location.reload();
      return;
    } else {
      setlaoding(false);
      toast({
        variant: "destructive",
        description: "field to add book please try again",
      });
      return;
    }
  };
  return (
    <form className="felx flex-col gap-y-8 border px-2 lg:px-5 py-4 rounded-md shadow-md " onSubmit={handleSubmit(Submit)}>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex flex-col gap-y-1">
          <label>title</label>
          <Input
            type="text"
            placeholder="entre title..."
            {...register("title")}
            className={cn(
              errors.title ? "focus:border-red-400" : "focus:border-green-400"
            )}
          />
          {errors.title ? (
            <p className="text-xs italic text-red-500">
              {errors.title.message}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col gap-y-1">
          <label>author</label>
          <Input
            type="text"
            placeholder="entre author..."
            {...register("author")}
            className={cn(
              errors.author ? "focus:border-red-400" : "focus:border-green-400"
            )}
          />
          {errors.author ? (
            <p className="text-xs italic text-red-500">
              {errors.author.message}
            </p>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col gap-y-1">
        <label>description</label>
        <Textarea
          placeholder="enter description...."
          {...register("descripition")}
          className={cn(
            errors.descripition
              ? "focus:border-red-400"
              : "focus:border-green-400"
          )}
        />
        {errors.descripition ? (
          <p className="text-xs italic text-red-500">
            {errors.descripition.message}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="flex flex-col gap-y-1 md:w-[50%]">
          <label>image</label>
          <Input
            type="file"
            placeholder="image..."
            {...register("image")}
            className={cn(
              errors.image ? "focus:border-red-400" : "focus:border-green-400"
            )}
          />
          {errors.image ? (
            <p className="text-xs italic text-red-500">
              {errors.image.message?.toString()}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col gap-y-1 md:w-[45%]">
          <label>publishedAt</label>
          <Input
            type="date"
            {...register("publishedAt")}
            className={cn(
              errors.publishedAt
                ? "focus:border-red-400"
                : "focus:border-green-400"
            )}
          />
          {errors.publishedAt ? (
            <p className="text-xs italic text-red-500">
              {errors.publishedAt.message}
            </p>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-x-2">
        <div className="flex flex-col gap-y-1">
          <label>Price</label>
          <Input
            type="number"
            {...register("price")}
            className={cn(
              errors.price ? "focus:border-red-400" : "focus:border-green-400"
            )}
          />
          {errors.price ? (
            <p className="text-xs italic text-red-500">
              {errors.price.message}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col gap-y-1">
          <label>currency</label>

          <Select
            onValueChange={(e) => {
              //  @ts-ignore
              setCurrency(e);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="z-50">
              <SelectGroup>
                <SelectItem value="MAD" id="MAD">
                  MAD
                </SelectItem>
                <SelectItem value="USD" id="USD">
                  USD
                </SelectItem>
                <SelectItem value="EUR" id="EUR">
                  EUR
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-y-1">
          <label>category</label>
          <Select onValueChange={(e) => setChoisenCategory(e)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="z-50">
              <SelectGroup>
                {category.data.map((cat) => (
                  <SelectItem value={cat.name}>{cat.name}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="w-full flex items-center justify-between mt-2 ">
       {
        loading
        ?
        <LaoderButton/>
        :
        <Button className="text-white bg-blue-400 hover:text-white hover:bg-blue-400 w-full">Save</Button>
       }
      </div>
    </form>
  );
}

export default AddProductModule;
