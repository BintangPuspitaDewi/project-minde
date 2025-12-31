import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { cn } from "../../lib/utils";

export default function ProductCard({ product }) {
  const { name, slug, category, price, tags, image, description } = product;

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative aspect-square bg-muted flex items-center justify-center overflow-hidden group">
        {image ? (
            <img src={image} alt={name} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" />
        ) : (
            <div className={cn("flex flex-col items-center justify-center w-full h-full p-6 text-center transition-colors", 
                category === "Boneka" ? "bg-pink-100 dark:bg-pink-900/20 text-pink-600" :
                category === "Aksesoris" ? "bg-blue-100 dark:bg-blue-900/20 text-blue-600" :
                "bg-secondary/50 text-muted-foreground"
            )}>
                <div className="bg-background/50 p-3 rounded-full mb-3 backdrop-blur-sm">
                   <ShoppingBag className="w-8 h-8 opacity-70" />
                </div>
                <span className="text-xs font-medium opacity-70 uppercase tracking-widest">{category}</span>
            </div>
        )}
        <Badge className="absolute top-2 right-2" variant="secondary">{category}</Badge>
      </div>
      <CardHeader className="p-4 pb-0">
        <CardTitle className="line-clamp-1 text-lg">{name}</CardTitle>
        <CardDescription className="line-clamp-2 mt-2 text-xs">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
         <div className="flex flex-wrap gap-1 mt-2">
            {tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-[10px] bg-accent/50 px-2 py-0.5 rounded-full text-accent-foreground">{tag}</span>
            ))}
         </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between mt-auto">
        <span className="font-bold text-primary">
          {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(price)}
        </span>
        <Link to={`/catalog/${slug}`}>
           <Button size="sm">View Detail</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
