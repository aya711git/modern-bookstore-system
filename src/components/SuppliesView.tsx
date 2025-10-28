import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ShoppingCart, Package } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Language, getTranslation } from "../utils/translations";

interface Supply {
  id: number;
  name: string;
  nameKey: string;
  descKey: string;
  category: string;
  price: number;
  image: string;
  inStock: boolean;
}

const getSupplies = (): Supply[] => [
  {
    id: 1,
    name: "Premium Leather Bookmark Set",
    nameKey: "bookmarksTitle",
    descKey: "bookmarksDesc",
    category: "Bookmarks",
    price: 12.99,
    image: "/supplies.jpg",
    inStock: true,
  },
  {
    id: 2,
    name: "Book Light LED Rechargeable",
    nameKey: "bookLightTitle",
    descKey: "bookLightDesc",
    category: "Accessories",
    price: 24.99,
    image: "/supplies.jpg",
    inStock: true,
  },
  {
    id: 3,
    name: "Reading Journal Hardcover",
    nameKey: "journalTitle",
    descKey: "journalDesc",
    category: "Journals",
    price: 18.99,
    image: "/supplies.jpg",
    inStock: true,
  },
  {
    id: 4,
    name: "Book Stand Adjustable",
    nameKey: "standTitle",
    descKey: "standDesc",
    category: "Accessories",
    price: 29.99,
    image: "/supplies.jpg",
    inStock: false,
  },
  {
    id: 5,
    name: "Dust Jacket Covers (Pack of 10)",
    nameKey: "coverTitle",
    descKey: "coverDesc",
    category: "Protection",
    price: 15.99,
    image: "/supplies.jpg",
    inStock: true,
  },
  {
    id: 6,
    name: "Vintage Book Ends Set",
    nameKey: "bagsTitle",
    descKey: "bagsDesc",
    category: "Organization",
    price: 34.99,
    image: "/supplies.jpg",
    inStock: true,
  },
];

interface SuppliesViewProps {
  language: Language;
}

export function SuppliesView({ language }: SuppliesViewProps) {
  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(language, key);
  const supplies = getSupplies();

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Package className="w-5 h-5" />
          <h2>{t('bookSupplies')}</h2>
        </div>
        <p className="text-muted-foreground">{t('enhanceReading')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {supplies.map((supply) => (
          <Card key={supply.id} className="overflow-hidden">
            <div className="aspect-square overflow-hidden bg-muted">
              <ImageWithFallback
                src={supply.image}
                alt={t(supply.nameKey as any)}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h4 className="line-clamp-2 mb-2">{t(supply.nameKey as any)}</h4>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{t(supply.descKey as any)}</p>
              <div className="flex items-center justify-between">
                <p>${supply.price.toFixed(2)}</p>
                {supply.inStock ? (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {t('inStock')}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-red-600 border-red-600">
                    {t('limitedStock')}
                  </Badge>
                )}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full" disabled={!supply.inStock}>
                <ShoppingCart className={`w-4 h-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                {supply.inStock ? t('addToCart') : t('limitedStock')}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
