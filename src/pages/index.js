import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "@/components/Navbar";
import UserCreate from "@/components/UserCreate";
import CreateProduct from "@/components/CreateProduct";
import ProdectDetails from "@/components/ProdectDetails";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Navbar />
      <UserCreate />
      <CreateProduct />
      <ProdectDetails />
      <Footer />
    </>
  );
}
