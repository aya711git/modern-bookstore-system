import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Users, BookOpen, MessageCircle, UserPlus } from "lucide-react";
import { Language, getTranslation } from "../utils/translations";

interface Reader {
  id: number;
  name: string;
  avatar: string;
  booksRead: number;
  favoriteGenre: string;
  currentlyReading: string;
  bio: string;
}

const readers: Reader[] = [
  {
    id: 1,
    name: "aya khaled",
    avatar: "/woman.png",
    booksRead: 127,
    favoriteGenre: "Mystery",
    currentlyReading: "The Silent Patient",
    bio: "Mystery enthusiast and book club organizer. Always looking for the next great thriller!",
  },
  {
    id: 2,
    name: "Taha khaled",
    avatar: "/man.png",
    booksRead: 89,
    favoriteGenre: "Sci-Fi",
    currentlyReading: "Dune",
    bio: "Science fiction lover exploring new worlds through literature.",
  },
  {
    id: 3,
    name: "Hanan khaled",
    avatar: "/woman.png",
    booksRead: 156,
    favoriteGenre: "Romance",
    currentlyReading: "Pride and Prejudice",
    bio: "Romantic at heart. Love classic literature and contemporary romance novels.",
  },
  {
    id: 4,
    name: "Ahmed khaled",
    avatar: "/man.png",
    booksRead: 203,
    favoriteGenre: "Fantasy",
    currentlyReading: "The Name of the Wind",
    bio: "Fantasy genre expert. Host of 'Epic Tales' podcast discussing fantasy literature.",
  },
];

interface ReadersViewProps {
  language: Language;
}

export function ReadersView({ language }: ReadersViewProps) {
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
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-5 h-5" />
          <h2>{t('readersCommunity')}</h2>
          <span className="text-muted-foreground">({readers.length})</span>
        </div>
        <p className="text-muted-foreground">{t('connectWithReaders')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {readers.map((reader) => (
          <Card key={reader.id}>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Avatar className="w-16 h-16 shrink-0">
                  <AvatarImage src={reader.avatar} alt={reader.name} />
                  <AvatarFallback>
                    {reader.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="line-clamp-1">{reader.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen className="w-3 h-3" />
                        {reader.booksRead} {t('booksRead')}
                      </div>
                    </div>
                    <Badge variant="secondary">{getGenreTranslation(reader.favoriteGenre)}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {reader.bio}
                  </p>
                  <div className="mb-4 p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">{t('currentlyReading')}</p>
                    <p className="text-sm">{reader.currentlyReading}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <UserPlus className={`w-4 h-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                      {language === 'en' ? 'Follow' : 'متابعة'}
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <MessageCircle className={`w-4 h-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                      {language === 'en' ? 'Message' : 'رسالة'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
