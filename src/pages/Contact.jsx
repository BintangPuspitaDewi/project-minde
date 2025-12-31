import { useRef, useState } from "react";
import { siteData } from "../data/siteData";
import MainLayout from "../layouts/MainLayout";
import Container from "../components/common/Container";
import SectionTitle from "../components/common/SectionTitle";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Mail, MapPin, Phone, Send, Loader2 } from "lucide-react";
import { MotionFadeScale, MotionReveal } from "../components/common/MotionReveal";

export default function Contact() {
  const { contactInfo } = siteData;
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API Call
    setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
        if(formRef.current) formRef.current.reset();
        
        // Reset success message after 3s
        setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <MainLayout>
       <section className="py-16 md:py-24">
          <Container>
             <SectionTitle title="Get in Touch" subtitle="Kami siap mendengar pertanyaan dan masukanmu." />

             <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {/* Contact Info Card */}
                <MotionReveal>
                   <Card className="h-full bg-primary text-primary-foreground border-none overflow-hidden relative">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
                      <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl"></div>
                      
                      <CardContent className="p-8 relative z-10 space-y-8 flex flex-col justify-center h-full">
                           <div className="space-y-6">
                                <h3 className="text-2xl font-bold">Contact Information</h3>
                                <p className="text-primary-foreground/80">
                                   Butuh bantuan pesanan custom atau punya pertanyaan lain? Hubungi kami melalui jalur berikut.
                                </p>
                           </div>

                           <div className="space-y-6">
                               <div className="flex items-start gap-4">
                                   <Phone className="w-6 h-6 mt-1 opacity-80" />
                                   <div>
                                       <span className="block text-xs uppercase tracking-wider opacity-70">Phone / WA</span>
                                       <p className="font-medium text-lg">{contactInfo.phone}</p>
                                   </div>
                               </div>
                               <div className="flex items-start gap-4">
                                   <Mail className="w-6 h-6 mt-1 opacity-80" />
                                   <div>
                                       <span className="block text-xs uppercase tracking-wider opacity-70">Email</span>
                                       <p className="font-medium text-lg">{contactInfo.email}</p>
                                   </div>
                               </div>
                               <div className="flex items-start gap-4">
                                   <MapPin className="w-6 h-6 mt-1 opacity-80" />
                                   <div>
                                       <span className="block text-xs uppercase tracking-wider opacity-70">Address</span>
                                       <p className="font-medium text-lg">{contactInfo.address}</p>
                                   </div>
                               </div>
                           </div>
                      </CardContent>
                   </Card>
                </MotionReveal>
                
                {/* Contact Form */}
                <MotionFadeScale delay={0.2}>
                    <Card>
                       <CardContent className="p-8">
                           <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
                           <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                               <div className="space-y-2">
                                   <label htmlFor="name" className="text-sm font-medium">Name</label>
                                   <Input id="name" placeholder="Nama lengkapmu" required />
                               </div>
                               <div className="space-y-2">
                                   <label htmlFor="email" className="text-sm font-medium">Email</label>
                                   <Input id="email" type="email" placeholder="contoh@email.com" required />
                               </div>
                               <div className="space-y-2">
                                   <label htmlFor="message" className="text-sm font-medium">Message</label>
                                   <Textarea id="message" placeholder="Tulis pesanmu di sini..." className="min-h-[120px]" required />
                               </div>
                               
                               <Button type="submit" className="w-full" disabled={loading}>
                                  {loading ? (
                                     <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...
                                     </>
                                  ) : submitted ? (
                                      "Message Sent! ✅"
                                  ) : (
                                     <>
                                        Send Message <Send className="w-4 h-4 ml-2" />
                                     </>
                                  )}
                               </Button>
                           </form>
                       </CardContent>
                    </Card>
                </MotionFadeScale>
             </div>
          </Container>
       </section>
    </MainLayout>
  );
}
