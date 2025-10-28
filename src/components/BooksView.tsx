import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { BookCard, Book } from "./BookCard";
import { Language, getTranslation } from "../utils/translations";

interface BooksViewProps {
  books: Book[];
  favorites: number[];
  orders: number[];
  onFavorite: (bookId: number) => void;
  onOrder: (bookId: number) => void;
  onViewDetail: (book: Book) => void;
  language: Language;
}

export function BooksView({
  books,
  favorites,
  orders,
  onFavorite,
  onOrder,
  onViewDetail,
  language,
}: BooksViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortBy, setSortBy] = useState("title");

  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(language, key);

  const genres = ["all", ...Array.from(new Set(books.map((book) => book.genre)))];

  const filteredBooks = books
    .filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === "all" || book.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "author") return a.author.localeCompare(b.author);
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price") return a.price - b.price;
      return 0;
    });

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
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground`} />
          <Input
            placeholder={t('searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={language === 'ar' ? 'pr-10' : 'pl-10'}
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedGenre} onValueChange={setSelectedGenre}>
            <SelectTrigger className="w-[150px]">
              <SlidersHorizontal className={`w-4 h-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
              <SelectValue placeholder={t('filterByGenre')} />
            </SelectTrigger>
            <SelectContent>
              {genres.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre === "all" ? t('allGenres') : getGenreTranslation(genre)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder={t('sortBy')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">{t('sortByTitle')}</SelectItem>
              <SelectItem value="author">{t('sortByAuthor')}</SelectItem>
              <SelectItem value="rating">{t('sortByRating')}</SelectItem>
              <SelectItem value="price">{t('sortByPrice')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onFavorite={onFavorite}
            onOrder={onOrder}
            onViewDetail={onViewDetail}
            isFavorited={favorites.includes(book.id)}
            isOrdered={orders.includes(book.id)}
            language={language}
          />
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          {language === 'en' ? 'No books found matching your criteria.' : 'لم يتم العثور على كتب تطابق معاييرك.'}
        </div>
      )}
    </div>
  );
}
