import { HeroCarousel } from "@/components/modules/home/hero-carousel";
import { CategoriesSection } from "@/components/sections/home/categories-section";
import { NewArrivals } from "@/components/sections/home/new-arrivals";
import { AnnouncementBar } from "@/components/modules/home/marquee-bar";
import { PromotionalBanner } from "@/components/modules/home/PromotionalBanner";
import FeaturedEdit from "@/components/sections/home/featured-edit";
import { CollectionBannerSection } from "@/components/sections/home/collection-banner-section";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <HeroCarousel />
      <div className="mx-auto w-full max-w-7xl px-4 6 sm:px-6  lg:px-12 space-y-14 md:space-y-24">
        <CategoriesSection />
        <FeaturedEdit />
        <PromotionalBanner />
        <NewArrivals />
        <CollectionBannerSection />

      </div>
    </>
  );
}
