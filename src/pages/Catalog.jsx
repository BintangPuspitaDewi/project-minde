import { useState, useMemo } from "react";
import { products } from "../data/products";
import MainLayout from "../layouts/MainLayout";
import Container from "../components/common/Container";
import SectionTitle from "../components/common/SectionTitle";
import ProductCard from "../components/common/ProductCard";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { Filter, Search, ChevronDown, X, ArrowUpDown } from "lucide-react";
import { MotionStaggerContainer, MotionStaggerItem, MotionFadeScale } from "../components/common/MotionReveal";

// Extract unique categories from products
const CATEGORIES = ["All", ...new Set(products.map((p) => p.category))];
const ITEMS_PER_PAGE = 8;

export default function Catalog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      // 1. Search Filter (Case insensitive)
      const searchContent = search.toLowerCase().trim();
      const matchSearch = searchContent === "" || p.name.toLowerCase().includes(searchContent);
      
      // 2. Category Filter (Exact match)
      const matchCategory = category === "All" || p.category === category;
      
      return matchSearch && matchCategory;
    });

    // 3. Sort Logic
    // Create a new array spread to avoid mutating the original filtered result during sort types
    result = [...result]; 
    if (sort === "low-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "high-low") {
      result.sort((a, b) => b.price - a.price);
    }
    
    return result;
  }, [search, category, sort]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };
  
  const resetFilters = () => {
      setSearch("");
      setCategory("All");
      setSort("default");
      setVisibleCount(ITEMS_PER_PAGE);
  };

  return (
    <MainLayout>
      <section className="py-12 bg-background min-h-screen">
        <Container>
          <SectionTitle title="Catalog" subtitle="Temukan koleksi rajutan favoritmu" className="mb-8" />

          {/* CONTROLS: Search, Filter, Sort */}
          <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between sticky top-[65px] z-30 bg-background/95 backdrop-blur py-4 border-b md:border-none">
            
            {/* Search Input */}
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Cari produk..." 
                className="pl-9 pr-8 bg-background" 
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setVisibleCount(ITEMS_PER_PAGE);
                }}
              />
              {search && (
                  <button 
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                      <X className="w-4 h-4" />
                  </button>
              )}
            </div>

            {/* Filter & Sort Dropdowns */}
            <div className="flex gap-3 w-full md:w-auto overflow-visible">
               {/* Filter Category */}
               <DropdownMenu>
                  <DropdownMenuTrigger className="bg-background border rounded-md px-4 py-2 hover:bg-accent transition-colors flex items-center justify-between gap-2 min-w-[150px] text-sm font-medium cursor-pointer">
                      <div className="flex items-center gap-2 truncate">
                          <Filter className="h-4 w-4 text-muted-foreground" />
                          <span>{category === "All" ? "Kategori" : category}</span>
                      </div>
                      <ChevronDown className="h-3 w-3 opacity-50" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[180px]">
                     <DropdownMenuItem onClick={() => {
                        setCategory("All");
                        setVisibleCount(ITEMS_PER_PAGE);
                     }}>
                        Semua Kategori
                     </DropdownMenuItem>
                     {CATEGORIES.filter(c => c !== "All").map((cat) => (
                        <DropdownMenuItem key={cat} onClick={() => {
                            setCategory(cat);
                            setVisibleCount(ITEMS_PER_PAGE);
                        }}>
                           {cat}
                        </DropdownMenuItem>
                     ))}
                  </DropdownMenuContent>
               </DropdownMenu>

               {/* Sort Price */}
               <DropdownMenu>
                  <DropdownMenuTrigger className="bg-background border rounded-md px-4 py-2 hover:bg-accent transition-colors flex items-center justify-between gap-2 min-w-[150px] text-sm font-medium cursor-pointer">
                      <div className="flex items-center gap-2 truncate">
                          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {sort === "default" && "Urutkan"}
                            {sort === "low-high" && "Termurah"}
                            {sort === "high-low" && "Termahal"}
                          </span>
                      </div>
                      <ChevronDown className="h-3 w-3 opacity-50" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[180px]">
                     <DropdownMenuItem onClick={() => setSort("default")}>Paling Sesuai</DropdownMenuItem>
                     <DropdownMenuItem onClick={() => setSort("low-high")}>Harga Terendah</DropdownMenuItem>
                     <DropdownMenuItem onClick={() => setSort("high-low")}>Harga Tertinggi</DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
          </div>

          {/* PRODUCT GRID */}
          {filteredProducts.length > 0 ? (
            <>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {visibleProducts.map((product) => (
                     <MotionFadeScale key={product.id} delay={0.1}>
                        <ProductCard product={product} />
                     </MotionFadeScale>
                  ))}
               </div>
               
               {/* Load More */}
               {hasMore && (
                  <div className="text-center mt-8">
                     <Button onClick={handleLoadMore} size="lg" variant="secondary">
                        Load More Products
                     </Button>
                  </div>
               )}
            </>
          ) : (
             <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-xl bg-secondary/10">
                 <div className="p-4 bg-background rounded-full mb-4">
                    <Search className="w-8 h-8 text-muted-foreground" />
                 </div>
                 <h3 className="text-xl font-bold mb-2">Produk tidak ditemukan</h3>
                 <p className="text-muted-foreground mb-6">Penelusuran untuk "{search}" tidak cocok dengan produk apapun.</p>
                 <Button onClick={resetFilters}>
                    Tampilkan Semua Produk
                 </Button>
             </div>
          )}
        </Container>
      </section>
    </MainLayout>
  );
}
