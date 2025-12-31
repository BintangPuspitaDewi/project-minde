import { siteData } from "../data/siteData";
import MainLayout from "../layouts/MainLayout";
import Container from "../components/common/Container";
import SectionTitle from "../components/common/SectionTitle";
import { MotionFadeScale, MotionReveal } from "../components/common/MotionReveal";
import { Separator } from "../components/ui/separator";
import { CheckCircle2, Heart, ShieldCheck } from "lucide-react";
import FloatingIcons from "../components/common/FloatingIcons";

export default function About() {
  const { about } = siteData;

  const features = [
      { icon: Heart, title: "Handmade with Love", desc: "Setiap tusukan jarum dibuat dengan penuh perhatian." },
      { icon: ShieldCheck, title: "Premium Quality", desc: "Menggunakan bahan benang terbaik yang awet dan lembut." },
      { icon: CheckCircle2, title: "Unique Design", desc: "Desain orisinil yang berkarakter dan tidak pasaran." }
  ];

  return (
    <MainLayout>
      {/* HEADER */}
      {/* HEADER */}
      <section className="bg-primary/5 py-16 relative overflow-hidden">
         <FloatingIcons variant="title" />
         <Container>
             <SectionTitle title={about.title} subtitle="Cerita di balik setiap rajutan Mindé" />
         </Container>
      </section>

      {/* CONTENT */}
      <section className="py-20">
         <Container>
             <div className="grid lg:grid-cols-2 gap-12 items-start">
                  <MotionFadeScale>
                      <div className="relative rounded-3xl overflow-hidden  aspect-square flex flex-col items-center justify-center  text-center p-8">
                           {/* TODO: Replace asset */}
                           <img 
                                src="/tigerrajut.png" 
                                alt="About Illustration" 
                                className="w-full max-w-[320px] h-auto object-contain mb-6 drop-shadow-xl hover:scale-105 transition-transform duration-500"
                           />
                    
                      </div>
                  </MotionFadeScale>
                  <MotionReveal delay={0.2}>
                      <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                          <h3 className="text-3xl font-bold text-foreground">Why We Started</h3>
                          <p>{about.longText}</p>
                          
                          
                          <Separator className="my-8" />
                          
                          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                               {features.map((feature, i) => (
                                   <div key={i} className="flex flex-col items-center text-center space-y-2">
                                       <div className="p-3 bg-secondary rounded-full text-primary mb-2">
                                           <feature.icon className="w-6 h-6" />
                                       </div>
                                       <h4 className="font-bold text-foreground text-sm">{feature.title}</h4>
                                   </div>
                               ))}
                          </div>
                      </div>
                  </MotionReveal>
             </div>
         </Container>
      </section>
    </MainLayout>
  );
}
