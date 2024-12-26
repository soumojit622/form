"use client"
import { Button } from "@/components/ui/button";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ChevronRight, ExternalLink, Video } from "lucide-react";
import Image from "next/image";
import NavBar from "./_components/Navbar";
import FAQ from "@/components/FAQ";
import Testimonial from "@/components/Testimonial";
import Footer from "@/components/Footer";
import { PulsatingButtonDemo } from "@/components/PulsatingButtonDemo";

export default function Home() {
  return (
    <div className="w-full">
      <NavBar />
      <div className="hero-section w-full min-h-screen">
        <div className="w-full flex flex-col items-center justify-center py-10 max-w-4xl mx-auto">
          <div className="rounded-full flex items-center bg-white border font-medium gap-1 text-sm h-auto p-2 bg-muted max-w-80">
            <div className="p-2 h-5 shrink-0 flex items-center text-xs justify-center text-white bg-primary rounded-full">
              New
            </div>
            Join Formy.ai Today!
            <ChevronRight className="w-4 h-4" />
          </div>

          <div className="flex flex-col mt-5 items-center text-center">
            <h1 className="text-6xl font-black">
              <p className="mt-1">
                <span className="bg-gradient-to-r from-primary via-purple-300 to-primary bg-clip-text text-transparent animate-sparkle">
                  AI-Driven
                </span>
                {"  "}
                Form Builder
              </p>
            </h1>
            <p className="block text-lg mt-3 max-w-2xl mx-auto w-full font-medium text-black/70">
              Effortlessly create stunning forms in just a few seconds, powered
              by our advanced AI technology. Share and manage them wherever you
              like.
            </p>
            <br />
            <div className="flex items-center gap-2">
              <Button className="h-12 text-base font-medium min-w-32" asChild>
                <RegisterLink>
                  Get Started
                  <ExternalLink />
                </RegisterLink>
              </Button>
              <Button
                variant="outline"
                className="h-12 border-primary text-primary text-base font-medium min-w-32"
                asChild
              >
                <a className="flex items-center gap-1">
                  <Video size="17px" />
                  Watch a Demo
                </a>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Pulsating Button Demo Component */}
        <div className="w-full flex justify-center">
          <PulsatingButtonDemo />
        </div>

        <div className="w-full relative max-w-5xl mx-auto px-4 md:px-6 lg:px-8 mt-10">
          {/* Background Gradient Effect */}
          <div className="absolute top-15 left-1/2 transform -translate-x-1/2 w-full h-[200px] bg-gradient-to-r from-primary to-purple-500 rounded-full blur-3xl opacity-40 z-0" />

          {/* Image Container with Enhanced Effects */}
          <div className="w-full h-[400px] md:h-[500px] lg:h-[580px] rounded-xl shadow-2xl bg-transparent transition-transform transform ease-in-out duration-300">
            <div className="relative w-full h-full rounded-md overflow-hidden">
              {/* Image with Hover Zoom Effect */}
              <Image
                src="/images/board-img.jpg"
                alt="Formy AI dashboard"
                fill
                className="object-cover w-full h-full rounded-md transition-transform transform hover:scale-110 ease-in-out duration-500"
              />
              {/* Gradient Overlay on Image */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent opacity-40 rounded-md"></div>
            </div>
          </div>
        </div>

        <FAQ />
        <Testimonial />
        <Footer />
      </div>
    </div>
  );
}
