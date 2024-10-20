"use client";
import Header from "@/app/Component/Header/Header";
import Footer from "@/app/Component/Footer/Footer";
import { Suspense } from "react";
import ProductContent from "./ProductContent";

export default function Product() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <ProductContent />
      </Suspense>
      <Footer />
    </>
  );
}