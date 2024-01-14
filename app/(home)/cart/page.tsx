import CartHandler from "@/components/CartHandler";



async function page() {
  return (
    <div className="w-full lg:w-9/12 min-h-[100vh] h-full mx-auto mt-20">
       <CartHandler/>
    </div>
  );
}

export default page;
