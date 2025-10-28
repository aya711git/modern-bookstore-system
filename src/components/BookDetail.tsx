import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Heart, ShoppingCart, Star, BookOpen, Calendar } from "lucide-react";
import { Book } from "./BookCard";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Language, getTranslation } from "../utils/translations";

interface BookDetailProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onFavorite: (bookId: number) => void;
  onOrder: (bookId: number) => void;
  isFavorited: boolean;
  isOrdered: boolean;
  language: Language;
}

export function BookDetail({
  book,
  isOpen,
  onClose,
  onFavorite,
  onOrder,
  isFavorited,
  isOrdered,
  language,
}: BookDetailProps) {
  if (!book) return null;

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{book.title}</DialogTitle>
          <DialogDescription>
            {language === 'en' ? 'by' : 'بواسطة'} {book.author}
          </DialogDescription>
        </DialogHeader>
        <div className="grid md:grid-cols-[300px_1fr] gap-6">
          <div className="aspect-[2/3] overflow-hidden rounded-lg bg-muted">
            <ImageWithFallback
              src={book.cover}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <div>
              <Badge>{getGenreTranslation(book.genre)}</Badge>
            </div>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(book.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className={language === 'ar' ? 'mr-2' : 'ml-2'}>{book.rating.toFixed(1)} / 5.0</span>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {book.pages} {t('pages')}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {book.publishedYear}
              </div>
            </div>

            <div>
              <h4 className="mb-2">{t('about')}</h4>
              <p className="text-muted-foreground leading-relaxed">
                {book.description}
              </p>
            </div>

            <div className="pt-4">
              <p className="mb-4">${book.price.toFixed(2)}</p>
              <div className="flex gap-3">
                <Button
                  variant={isFavorited ? "default" : "outline"}
                  onClick={() => onFavorite(book.id)}
                  className="flex-1"
                >
                  <Heart className={`w-4 h-4 ${language === 'ar' ? 'ml-2' : 'mr-2'} ${isFavorited ? "fill-current" : ""}`} />
                  {isFavorited ? t('removeFromFavorites') : t('addToFavorites')}
                </Button>
                <Button
                  variant={isOrdered ? "secondary" : "default"}
                  onClick={() => onOrder(book.id)}
                  disabled={isOrdered}
                  className="flex-1"
                >
                  <ShoppingCart className={`w-4 h-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                  {isOrdered ? t('alreadyOrdered') : t('orderNow')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
