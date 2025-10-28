import { Book } from "./BookCard";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ShoppingCart, Package, Trash2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Language, getTranslation } from "../utils/translations";

interface OrdersViewProps {
  books: Book[];
  orders: number[];
  onRemoveOrder: (bookId: number) => void;
  onViewDetail: (book: Book) => void;
  language: Language;
}

export function OrdersView({
  books,
  orders,
  onRemoveOrder,
  onViewDetail,
  language,
}: OrdersViewProps) {
  const orderedBooks = books.filter((book) => orders.includes(book.id));
  const totalPrice = orderedBooks.reduce((sum, book) => sum + book.price, 0);
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          <h2>{t('myOrders')}</h2>
          <span className="text-muted-foreground">({orderedBooks.length})</span>
        </div>
        {orderedBooks.length > 0 && (
          <div className={language === 'ar' ? 'text-left' : 'text-right'}>
            <p className="text-sm text-muted-foreground">{t('totalAmount')}</p>
            <p>${totalPrice.toFixed(2)}</p>
          </div>
        )}
      </div>

      {orderedBooks.length > 0 ? (
        <div className="space-y-4">
          {orderedBooks.map((book) => (
            <Card key={book.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div
                    className="w-24 h-32 shrink-0 rounded overflow-hidden bg-muted cursor-pointer"
                    onClick={() => onViewDetail(book)}
                  >
                    <ImageWithFallback
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3
                          className="line-clamp-1 cursor-pointer hover:underline"
                          onClick={() => onViewDetail(book)}
                        >
                          {book.title}
                        </h3>
                        <p className="text-muted-foreground">{book.author}</p>
                      </div>
                      <Badge variant="secondary">{getGenreTranslation(book.genre)}</Badge>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <p>${book.price.toFixed(2)}</p>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="gap-1">
                          <Package className="w-3 h-3" />
                          {language === 'en' ? 'Processing' : 'قيد المعالجة'}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveOrder(book.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3>{language === 'en' ? 'Ready to checkout?' : 'هل أنت جاهز للدفع؟'}</h3>
                  <p className="text-sm opacity-90">
                    {orderedBooks.length} {t('itemsInCart')}
                  </p>
                </div>
                <Button variant="secondary" size="lg">
                  {language === 'en' ? 'Proceed to Checkout' : 'المتابعة للدفع'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="mb-2">{t('noOrdersYet')}</h3>
          <p className="text-muted-foreground">
            {t('noOrdersDescription')}
          </p>
        </div>
      )}
    </div>
  );
}
