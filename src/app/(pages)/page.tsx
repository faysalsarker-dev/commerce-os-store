import { HeroCarousel } from "@/components/modules/home/hero-carousel";
import { CategoriesSection } from "@/components/sections/home/categories-section";
import { NewArrivals } from "@/components/sections/home/new-arrivals";
import { AnnouncementBar } from "@/components/modules/home/marquee-bar";
import { PromotionalBanner } from "@/components/modules/home/PromotionalBanner";
import FeaturedEdit from "@/components/sections/home/featured-edit";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <HeroCarousel />
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-12 space-y-16 md:space-y-24">
        <CategoriesSection />
        <PromotionalBanner />
        <FeaturedEdit />
        <NewArrivals />
     

      </div>
    </>
  );
}

