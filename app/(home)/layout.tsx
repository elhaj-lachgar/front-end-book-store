import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import CartContextProvider from "@/context/CartContextProvider";
import BookProvder from "@/context/BookProvder";
import AddressProvider from "@/context/AddressProvider";
import PrivateRoute from "@/components/PrivateRoute";
import LoadingProvider from "@/context/LoadingProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <BookProvder>
        <CartContextProvider>
          <AddressProvider>
            <LoadingProvider>
              <Navbar />
              {children}
            </LoadingProvider>
          </AddressProvider>
        </CartContextProvider>
      </BookProvder>
    </main>
  );
}
