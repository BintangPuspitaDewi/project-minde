import { siteData } from "../data/siteData";
import { products } from "../data/products";
import MainLayout from "../layouts/MainLayout";
import Container from "../components/Container";
import { Button } from "../components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import SectionTitle from "../components/SectionTitle";
import { MotionFadeScale, MotionReveal, MotionStaggerContainer, MotionStaggerItem } from "../components/MotionReveal";
import { Separator } from "../components/ui/separator";

export default function Home() {
  const { hero, about, productsSection } = siteData;
  const featuredProducts = products.slice(0, productsSection.homePreviewCount);

  return (
    <MainLayout>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-20 lg:py-32 bg-[#FDF8EE]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="flex flex-col justify-center text-center lg:text-left space-y-8">
               <MotionReveal delay={0.1}>
                  <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl text-foreground leading-tight">
                    <span className="block">
                       <span className="text-[#0B1221]">Selamat</span> <span className="text-[#F37021]">Datang</span>
                    </span>
                    <span className="block">
                       <span className="text-[#0B1221]">Choice For</span> <span className="text-[#F37021]">Future</span>
                    </span>
                  </h1>
               </MotionReveal>
               <MotionReveal delay={0.2}>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                    {hero.description}
                  </p>
               </MotionReveal>
            </div>

            {/* Right Illustration */}
            <MotionFadeScale delay={0.4}>
              <div className="relative mx-auto w-full max-w-[500px] flex items-center justify-center">
                 <img 
                    src="/herosectionright.png" 
                    alt="Knitting Illustration" 
                    className="w-full h-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
                 />
              </div>
            </MotionFadeScale>
          </div>
        </Container>
      </section>

      <Separator />

      {/* ABOUT PREVIEW SECTION */}
      <section className="py-20 lg:py-28">
        <Container>
           <div className="grid gap-12 lg:grid-cols-2 items-center">
              <MotionFadeScale>
                   <div className="relative bg-muted rounded-3xl overflow-hidden aspect-[4/3] shadow-inner flex items-center justify-center">
                       {/* TODO: Replace asset */}
                       <div className="text-center p-6">
                           <span className="text-6xl mb-4 block">🐅</span>
                           <p className="text-muted-foreground text-sm">Illustration Placeholder</p>
                       </div>
                   </div>
              </MotionFadeScale>
              <div>
                  <MotionReveal>
                      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                        <span className="text-primary">✨</span> {about.title}
                      </h2>
                      <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                          {about.shortText}
                      </p>
                      <Link to="/about">
                          <Button variant="secondary">Read More About Us</Button>
                      </Link>
                  </MotionReveal>
              </div>
           </div>
        </Container>
      </section>

      {/* PRODUCTS PREVIEW SECTION */}
      <section className="py-20 bg-secondary/10">
         <Container>
            <MotionReveal>
                <SectionTitle 
                    title={productsSection.title} 
                    subtitle={productsSection.subtitle}
                />
            </MotionReveal>

            <MotionStaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {featuredProducts.map((product) => (
                    <MotionStaggerItem key={product.id}>
                        <ProductCard product={product} />
                    </MotionStaggerItem>
                ))}
            </MotionStaggerContainer>
            
            <div className="text-center">
               <Link to="/catalog">
                  <Button size="lg" variant="outline" className="min-w-[245px] h-[60px] border-2 border-[#B88E2F] text-[#B88E2F] hover:bg-[#B88E2F] hover:text-white font-bold text-xl rounded-none">
                      Show More
                  </Button>
               </Link>
            </div>
         </Container>
      </section>
    </MainLayout>
  );
}
