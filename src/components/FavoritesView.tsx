import { BookCard, Book } from "./BookCard";
import { Heart } from "lucide-react";
import { Language, getTranslation } from "../utils/translations";

interface FavoritesViewProps {
  books: Book[];
  favorites: number[];
  orders: number[];
  onFavorite: (bookId: number) => void;
  onOrder: (bookId: number) => void;
  onViewDetail: (book: Book) => void;
  language: Language;
}

export function FavoritesView({
  books,
  favorites,
  orders,
  onFavorite,
  onOrder,
  onViewDetail,
  language,
}: FavoritesViewProps) {
  const favoriteBooks = books.filter((book) => favorites.includes(book.id));
  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(language, key);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Heart className="w-5 h-5 fill-current text-red-500" />
        <h2>{t('myFavorites')}</h2>
        <span className="text-muted-foreground">({favoriteBooks.length})</span>
      </div>

      {favoriteBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onFavorite={onFavorite}
              onOrder={onOrder}
              onViewDetail={onViewDetail}
              isFavorited={true}
              isOrdered={orders.includes(book.id)}
              language={language}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="mb-2">{t('noFavoritesYet')}</h3>
          <p className="text-muted-foreground">
            {t('noFavoritesDescription')}
          </p>
        </div>
      )}
    </div>
  );
}
