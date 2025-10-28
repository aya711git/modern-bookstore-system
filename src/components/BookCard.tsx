import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Language, getTranslation } from "../utils/translations";

export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  rating: number;
  price: number;
  cover: string;
  description: string;
  pages: number;
  publishedYear: number;
}

interface BookCardProps {
  book: Book;
  onFavorite: (bookId: number) => void;
  onOrder: (bookId: number) => void;
  onViewDetail: (book: Book) => void;
  isFavorited: boolean;
  isOrdered: boolean;
  language: Language;
}

export function BookCard({
  book,
  onFavorite,
  onOrder,
  onViewDetail,
  isFavorited,
  isOrdered,
  language,
}: BookCardProps) {
  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(language, key);

  const getGenreTranslation = (genre: string) => {
    const genreMap: Record<string, string> = {
      'Fiction': t('fiction'),
      'Sci-Fi': t('sciFi'),
      'Mystery': t('mystery'),
      'Fantasy': t('fantasy'),
      'Romance': t('romance'),
      'History': t('history'),
    };
    return genreMap[genre] || genre;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
      <div onClick={() => onViewDetail(book)}>
        <div className="aspect-[2/3] overflow-hidden bg-muted">
          <ImageWithFallback
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="line-clamp-2 flex-1">{book.title}</h3>
            <Badge variant="secondary" className="shrink-0">
              {getGenreTranslation(book.genre)}
            </Badge>
          </div>
          <p className="text-muted-foreground mb-2">{book.author}</p>
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(book.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className={`text-sm text-muted-foreground ${language === 'ar' ? 'mr-1' : 'ml-1'}`}>
              {book.rating.toFixed(1)}
            </span>
          </div>
          <p className="text-primary">${book.price.toFixed(2)}</p>
        </CardContent>
      </div>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          variant={isFavorited ? "default" : "outline"}
          size="sm"
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation();
            onFavorite(book.id);
          }}
        >
          <Heart className={`w-4 h-4 ${language === 'ar' ? 'ml-2' : 'mr-2'} ${isFavorited ? "fill-current" : ""}`} />
          {isFavorited ? t('removeFromFavorites') : t('addToFavorites')}
        </Button>
        <Button
          variant={isOrdered ? "secondary" : "default"}
          size="sm"
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation();
            onOrder(book.id);
          }}
          disabled={isOrdered}
        >
          <ShoppingCart className={`w-4 h-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
          {isOrdered ? t('alreadyOrdered') : t('orderNow')}
        </Button>
      </CardFooter>
    </Card>
  );
}
