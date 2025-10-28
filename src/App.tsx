import { useState, useEffect } from "react";
import { Book, BookOpen, Heart, ShoppingCart, Package, Users, Languages, Settings, LogOut } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Button } from "./components/ui/button";
import { BooksView } from "./components/BooksView";
import { FavoritesView } from "./components/FavoritesView";
import { OrdersView } from "./components/OrdersView";
import { SuppliesView } from "./components/SuppliesView";
import { ReadersView } from "./components/ReadersView";
import { AdminView } from "./components/AdminView";
import { AdminLogin } from "./components/AdminLogin";
import { BookDetail } from "./components/BookDetail";
import { Book as BookType } from "./components/BookCard";
import { Language, getTranslation } from "./utils/translations";

const mockBooks: BookType[] = [
  {
    id: 1,
    title: "The Histories",
    author: "Herodotus",
    genre: "History",
    rating: 4.5,
    price: 20,
    cover:
      "/TheHistories.jpg",
    description:
    "A foundational work of Western historiography, Herodotus recounts the Greco-Persian Wars, cultures, and customs of various peoples, blending history with storytelling.",
    pages: 747,
    publishedYear: 425,
  },
  {
    id: 2,
    title: "Records of the Grand Historian",
    author: "Sima Qian",
    genre: "History",
    rating: 4.6,
    price: 30,
    cover:
      "/Records-of-the-Grand-Historian.jpg",
    description:
      "A monumental history of ancient China, this work covers over two thousand years of history, from the legendary Yellow Emperor to the Han dynasty, blending historical fact with myth and legend.",
    pages: 454 ,
    publishedYear: 2024,
  },
  {
    id: 3,
    title: "Ab Urbe Condita (History of Rome)",
    author: "Livy",
    genre: "History",
    rating: 4.3,
    price: 35,
    cover:
      "/The-history-of-rome.jpg",
    description:
    "A comprehensive history of Rome from its legendary founding to the early days of the empire, Livy's work provides insights into Roman values, politics, and military conquests.",
    pages: 586,
    publishedYear: 1885,
  },
  {
    id: 4,
    title: "The Muqaddimah",
    author: "Ibn Khaldun",
    genre: "History",
    rating: 5.0,
    price: 15,
    cover:
      "/The-Muqaddimah.jpg",
    description:
      "The Muqaddimah is a pioneering work of historiography and sociology, exploring the rise and fall of civilizations. Ibn Khaldun emphasizes the role of social cohesion and economic factors in shaping history.",
    pages: 512 ,
    publishedYear: 1377,
  },
  {
    id: 5,
    title: "History of the Prophets and Kings",
    author: "Al-Tabari",
    genre: "History",
    rating: 4.9,
    price: 20,
    cover:
      "/History-of-the-Prophets-and-Kings.jpg",
    description:
      "A comprehensive history of the prophets and kings of the ancient world, this work blends historical fact with legend, providing insights into the lives and times of these influential figures.",
    pages: 6000,
    publishedYear: 922,
  },
  {
    id: 6,
    title: "A History of England",
    author: "David Hume",
    genre: "History",
    rating: 4.4,
    price: 20,
    cover:
      "/A-History-of-England.jpg",
    description:
    "Hume's multi-volume work offers a detailed account of English history from the Roman invasion to the Glorious Revolution, emphasizing political and social developments.",
    pages: 328,
    publishedYear: 1949,
  },
  {
    id: 7,
    title: "The Decline and Fall of the Roman Empire",
    author: "Edward Gibbon",
    genre: "History",
    rating: 4.8,
    price: 25,
    cover:
      "/The-Decline-and-Fall-of-the-Roman-Empire.jpg",
    description:
      "Gibbon's monumental work traces the history of the Roman Empire from its height to its fall, analyzing the causes of its decline and the impact of various factors on its eventual collapse.",
    pages: 3980,
    publishedYear: 1788,
  },
  {
    id: 8,
    title: "The Making of Modern Japan",
    author: "Marius B. Jansen",
    genre: "History",
    rating: 4.6,
    price: 15.49,
    cover:
      "/The-Making-of-Modern-Japan.jpg",
    description:
    "Jansen's comprehensive history explores Japan's transformation from a feudal society to a modern nation-state, examining political, social, and economic changes from the Tokugawa period to the post-World War II era.",
    pages: 936 ,
    publishedYear: 2000,
  },
  {
    id: 9,
    title: "The Ancient Maya",
    author: "Sylvanus G. Morley",
    genre: "History",
    rating: 4.3,
    price: 20,
    cover:
      "/The-Ancient-Maya.jpg",
    description:
      "Morley's work provides a detailed examination of the ancient Maya civilization, exploring its history, culture, and achievements. The book delves into the political, social, and economic aspects of Maya life, as well as their contributions to art, science, and architecture.",
    pages: 708 ,
    publishedYear: 1983,
  },
  {
    id: 10,
    title: "A Concise History of Mexico",
    author: "Brian R. Hamnett",
    genre: "History",
    rating: 4.4,
    price: 20,
    cover:
      "/A-Concise-History-of-mexico.jpg",
    description:
    "Hamnett's book offers a succinct overview of Mexico's history from pre-Columbian times to the present day. It covers key events, figures, and social changes that have shaped the nation, providing insights into Mexico's complex cultural and political landscape.",
    pages: 570 ,
    publishedYear: 1999,
  },
  {
    id: 11,
    title: "Guns, Germs, and Steel",
    author: "Jared Diamond",
    genre: "History",
    rating: 4.7,
    price: 15,
    cover:
      "/Guns-Germs-and-Steel.jpg",
    description:
    "Diamond's Pulitzer Prize-winning book explores the factors that have influenced the development of human societies throughout history. He argues that geography, environment, and the availability of resources have played crucial roles in shaping the fates of civilizations.",
    pages: 480 ,
    publishedYear: 1998,
  },
  {
    id: 12,
    title: "The Ottoman Empire: The Classical Age, 1300–1600",
    author: "Halil İnalcık",
    genre: "History",
    rating: 4.7,
    price: 22,
    cover:
      "/The-Ottoman-Empire.jpg",
    description:
      "İnalcık's work is a comprehensive study of the Ottoman Empire during its classical age, examining its political, social, and economic structures. The book highlights the empire's cultural achievements and its role in shaping the modern world.",
    pages: 272 ,
    publishedYear: 2001,
  },
];

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [books, setBooks] = useState<BookType[]>(mockBooks);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [orders, setOrders] = useState<number[]>([]);
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    // Check if admin was previously logged in
    const saved = localStorage.getItem('adminLoggedIn');
    return saved === 'true';
  });
  const [activeTab, setActiveTab] = useState('books');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    // Persist admin login state
    localStorage.setItem('adminLoggedIn', isAdminLoggedIn.toString());
  }, [isAdminLoggedIn]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(language, key);

  const handleFavorite = (bookId: number) => {
    setFavorites((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );
  };

  const handleOrder = (bookId: number) => {
    if (!orders.includes(bookId)) {
      setOrders((prev) => [...prev, bookId]);
    }
  };

  const handleRemoveOrder = (bookId: number) => {
    setOrders((prev) => prev.filter((id) => id !== bookId));
  };

  const handleViewDetail = (book: BookType) => {
    setSelectedBook(book);
    setIsDetailOpen(true);
  };

  const handleAddBook = (bookData: Omit<BookType, "id">) => {
    const newBook: BookType = {
      ...bookData,
      id: Math.max(...books.map(b => b.id)) + 1,
    };
    setBooks([...books, newBook]);
  };

  const handleEditBook = (id: number, bookData: Partial<BookType>) => {
    setBooks(books.map(book => 
      book.id === id ? { ...book, ...bookData } : book
    ));
  };

  const handleDeleteBook = (id: number) => {
    setBooks(books.filter(book => book.id !== id));
    setFavorites(favorites.filter(fav => fav !== id));
    setOrders(orders.filter(order => order !== id));
  };

  const handleAdminLogin = (username: string, password: string): boolean => {
    // Simple authentication - in production, this should use a real backend
    if (username === 'admin' && password === 'admin123') {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setActiveTab('books');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-primary" />
              <div>
                <h1>{t('libraryPortal')}</h1>
                <p className="text-sm text-muted-foreground">
                  {t('tagline')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isAdminLoggedIn && (
                <Button 
                  onClick={handleAdminLogout} 
                  variant="outline" 
                  size="sm"
                  className="gap-2 shrink-0"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('logout')}</span>
                </Button>
              )}
              <Button 
                onClick={toggleLanguage} 
                variant="outline" 
                size="sm"
                className="gap-2 shrink-0"
              >
                <Languages className="w-4 h-4" />
                <span>{language === 'en' ? 'العربية' : 'English'}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-grid">
            <TabsTrigger value="books" className="gap-2">
              <Book className="w-4 h-4" />
              <span className="hidden sm:inline">{t('books')}</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="gap-2">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">{t('favorites')}</span>
              {favorites.length > 0 && (
                <span className={`px-1.5 py-0.5 bg-primary text-primary-foreground rounded-full text-xs ${language === 'ar' ? 'mr-1' : 'ml-1'}`}>
                  {favorites.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2">
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">{t('orders')}</span>
              {orders.length > 0 && (
                <span className={`px-1.5 py-0.5 bg-primary text-primary-foreground rounded-full text-xs ${language === 'ar' ? 'mr-1' : 'ml-1'}`}>
                  {orders.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="supplies" className="gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">{t('supplies')}</span>
            </TabsTrigger>
            <TabsTrigger value="readers" className="gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">{t('readers')}</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">{t('admin')}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="books">
            <BooksView
              books={books}
              favorites={favorites}
              orders={orders}
              onFavorite={handleFavorite}
              onOrder={handleOrder}
              onViewDetail={handleViewDetail}
              language={language}
            />
          </TabsContent>

          <TabsContent value="favorites">
            <FavoritesView
              books={books}
              favorites={favorites}
              orders={orders}
              onFavorite={handleFavorite}
              onOrder={handleOrder}
              onViewDetail={handleViewDetail}
              language={language}
            />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersView
              books={books}
              orders={orders}
              onRemoveOrder={handleRemoveOrder}
              onViewDetail={handleViewDetail}
              language={language}
            />
          </TabsContent>

          <TabsContent value="supplies">
            <SuppliesView language={language} />
          </TabsContent>

          <TabsContent value="readers">
            <ReadersView language={language} />
          </TabsContent>

          <TabsContent value="admin">
            {isAdminLoggedIn ? (
              <AdminView
                books={books}
                orders={orders}
                language={language}
                onAddBook={handleAddBook}
                onEditBook={handleEditBook}
                onDeleteBook={handleDeleteBook}
              />
            ) : (
              <AdminLogin language={language} onLogin={handleAdminLogin} />
            )}
          </TabsContent>
        </Tabs>
      </main>

      <BookDetail
        book={selectedBook}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onFavorite={handleFavorite}
        onOrder={handleOrder}
        isFavorited={selectedBook ? favorites.includes(selectedBook.id) : false}
        isOrdered={selectedBook ? orders.includes(selectedBook.id) : false}
        language={language}
      />
    </div>
  );
}
