import { useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { products } from "../data/products";
import { siteData } from "../data/siteData";
import MainLayout from "../layouts/MainLayout";
import Container from "../components/Container";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { ArrowLeft, MessageCircle, ShoppingBag, ShieldCheck } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { MotionFadeScale, MotionReveal } from "../components/MotionReveal";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const { whatsapp } = siteData;

  if (!product) {
    return <Navigate to="/catalog" replace />;
  }

  const handleWhatsAppOrder = () => {
     const message = whatsapp.messageTemplate.replace("{productName}", product.name);
     const url = `${whatsapp.baseUrl}${whatsapp.phoneNumber}?text=${encodeURIComponent(message)}`;
     window.open(url, "_blank");
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <MainLayout>
       <div className="bg-muted/30 py-8">
          <Container>
             <Link to="/catalog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Catalog
             </Link>
          </Container>
       </div>

       <section className="py-12">
          <Container>
             <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
                 {/* Left: Image */}
                 <MotionFadeScale>
                    <div className="bg-muted rounded-3xl overflow-hidden aspect-square flex items-center justify-center border sticky top-24">
                        {product.image ? (
                           <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                           // TODO: Replace asset
                           <div className="flex flex-col items-center text-muted-foreground/40">
                              <ShoppingBag className="w-24 h-24 mb-4" />
                              <span className="text-xl font-medium">No Image Available</span>
                           </div>
                        )}
                    </div>
                 </MotionFadeScale>

                 {/* Right: Info */}
                 <MotionReveal delay={0.2}>
                    <div className="space-y-6">
                        <div>
                           <Badge variant="secondary" className="mb-4 text-sm px-3 py-1">{product.category}</Badge>
                           <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-2">{product.name}</h1>
                           <div className="flex flex-wrap gap-2 mt-2">
                               {product.tags.map(tag => (
                                   <span key={tag} className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded">#{tag}</span>
                               ))}
                           </div>
                        </div>
                        
                        <div className="text-3xl font-bold text-primary">
                             {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(product.price)}
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Description</h3>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                {product.description}
                            </p>
                        </div>

                        <div className="bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900 rounded-lg p-4 flex items-start gap-3">
                             <ShieldCheck className="w-5 h-5 text-green-600 mt-0.5" />
                             <div className="text-sm">
                                 <p className="font-semibold text-green-700 dark:text-green-400">Jaminan Kualitas Handmade</p>
                                 <p className="text-green-600/80 dark:text-green-500/80">Produk ini dibuat manual dengan ketelitian tinggi dan telah lolos quality check.</p>
                             </div>
                        </div>

                        <div className="pt-6">
                            <Button size="lg" className="w-full md:w-auto text-lg px-8 py-6 gap-2 bg-green-600 hover:bg-green-700 text-white" onClick={handleWhatsAppOrder}>
                                <MessageCircle className="w-5 h-5" />
                                Order via WhatsApp
                            </Button>
                            <p className="text-xs text-muted-foreground mt-3 text-center md:text-left">
                                *Admin akan konfirmasi stok dan ongkir setelah Anda mengirim pesan.
                            </p>
                        </div>
                    </div>
                 </MotionReveal>
             </div>
          </Container>
       </section>

       {/* RELATED PRODUCTS */}
       {relatedProducts.length > 0 && (
          <section className="py-20 bg-muted/20 mt-12">
              <Container>
                  <h2 className="text-2xl font-bold mb-8">Related Products</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {relatedProducts.map((p) => (
                          <ProductCard key={p.id} product={p} />
                      ))}
                  </div>
              </Container>
          </section>
       )}
    </MainLayout>
  );
}
