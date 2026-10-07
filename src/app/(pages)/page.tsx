import { CategoriesSection } from "@/components/modules/home/categories-section";
import FeaturedEdit from "@/components/modules/home/featured-edit";
import { HeroCarousel } from "@/components/modules/home/hero-carousel";
import { AnnouncementBar } from "@/components/modules/home/marquee-bar";
import { PromotionalBanner } from "@/components/modules/home/PromotionalBanner";
import { NewArrivals } from "@/components/sections/home/new-arrivals";

export default function Home() {
    return (
    <>
  <AnnouncementBar/>
<HeroCarousel />
<div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-12">

 <CategoriesSection />
 <FeaturedEdit/>
 <NewArrivals />
 <PromotionalBanner/>
</div>
     
    </>
  );
}
