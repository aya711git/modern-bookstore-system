import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Badge } from "./ui/badge";
import {
  BarChart3,
  TrendingUp,
  BookOpen,
  ShoppingCart,
  DollarSign,
  Users,
  Plus,
  Edit,
  Trash2,
  Activity,
} from "lucide-react";
import { Book } from "./BookCard";
import { Language, getTranslation } from "../utils/translations";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface AdminViewProps {
  books: Book[];
  orders: number[];
  language: Language;
  onAddBook: (book: Omit<Book, "id">) => void;
  onEditBook: (id: number, book: Partial<Book>) => void;
  onDeleteBook: (id: number) => void;
}

const COLORS = ["#8d6e63", "#a1887f", "#bcaaa4", "#6d4c41", "#5d4037"];

export function AdminView({ books, orders, language, onAddBook, onEditBook, onDeleteBook }: AdminViewProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "Fiction",
    rating: 4.0,
    price: 0,
    cover: "",
    description: "",
    pages: 0,
    publishedYear: new Date().getFullYear(),
  });

  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(language, key);

  // Calculate statistics
  const totalBooks = books.length;
  const totalOrders = orders.length;
  const orderedBooks = books.filter((book) => orders.includes(book.id));
  const totalRevenue = orderedBooks.reduce((sum, book) => sum + book.price, 0);
  const activeReaders = 16; // Mock data

  // Genre distribution
  const genreData = books.reduce((acc, book) => {
    acc[book.genre] = (acc[book.genre] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const genreChartData = Object.entries(genreData).map(([name, value]) => ({
    name,
    value,
  }));

  // Monthly orders (mock data)
  const monthlyOrdersData = [
    { month: "Jan", orders: 45 },
    { month: "Feb", orders: 52 },
    { month: "Mar", orders: 61 },
    { month: "Apr", orders: 58 },
    { month: "May", orders: 70 },
    { month: "Jun", orders: 65 },
  ];

  const handleAddBook = () => {
    onAddBook(formData);
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditBook = () => {
    if (editingBook) {
      onEditBook(editingBook.id, formData);
      setIsEditDialogOpen(false);
      setEditingBook(null);
      resetForm();
    }
  };

  const handleDeleteBook = (id: number) => {
    if (confirm(language === 'en' ? 'Are you sure you want to delete this book?' : 'هل أنت متأكد من حذف هذا الكتاب؟')) {
      onDeleteBook(id);
    }
  };

  const openEditDialog = (book: Book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      genre: book.genre,
      rating: book.rating,
      price: book.price,
      cover: book.cover,
      description: book.description,
      pages: book.pages,
      publishedYear: book.publishedYear,
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      author: "",
      genre: "Fiction",
      rating: 4.0,
      price: 0,
      cover: "",
      description: "",
      pages: 0,
      publishedYear: new Date().getFullYear(),
    });
  };

  const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            <h3 className="text-3xl">{value}</h3>
            {trend && (
              <div className="flex items-center gap-1 text-sm text-success">
                <TrendingUp className="w-4 h-4" />
                <span>{trend}</span>
              </div>
            )}
          </div>
          <div className="p-3 rounded-xl bg-muted">
            <Icon className="w-6 h-6" style={{ color }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>{t('dashboard')}</h2>
          <p className="text-muted-foreground">{t('overview')}</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          {t('addNewBook')}
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t('totalBooks')}
          value={totalBooks}
          icon={BookOpen}
          color="#8d6e63"
          trend="+12%"
        />
        <StatCard
          title={t('totalOrders')}
          value={totalOrders}
          icon={ShoppingCart}
          color="#a1887f"
          trend="+8%"
        />
        <StatCard
          title={t('totalRevenue')}
          value={`${totalRevenue.toFixed(2)}`}
          icon={DollarSign}
          color="#6d4c41"
          trend="+15%"
        />
        <StatCard
          title={t('activeReaders')}
          value={activeReaders}
          icon={Users}
          color="#5d4037"
          trend="+5%"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              {t('orderTrend')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyOrdersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Bar dataKey="orders" fill="#8d6e63" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              {t('topGenres')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genreChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genreChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Books Management Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t('manageBooks')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">{t('bookTitle')}</th>
                  <th className="text-left p-3">{t('bookAuthor')}</th>
                  <th className="text-left p-3">{t('bookGenre')}</th>
                  <th className="text-left p-3">{t('bookPrice')}</th>
                  <th className="text-left p-3">{t('bookRating')}</th>
                  <th className="text-left p-3">{t('actions')}</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-3">{book.title}</td>
                    <td className="p-3 text-muted-foreground">{book.author}</td>
                    <td className="p-3">
                      <Badge variant="secondary">{book.genre}</Badge>
                    </td>
                    <td className="p-3">${book.price.toFixed(2)}</td>
                    <td className="p-3">{book.rating.toFixed(1)}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(book)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteBook(book.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Book Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t('addNewBook')}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">{t('bookTitle')}</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">{t('bookAuthor')}</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="genre">{t('bookGenre')}</Label>
              <Select value={formData.genre} onValueChange={(value: string) => setFormData({ ...formData, genre: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fiction">{t('fiction')}</SelectItem>
                  <SelectItem value="Sci-Fi">{t('sciFi')}</SelectItem>
                  <SelectItem value="Mystery">{t('mystery')}</SelectItem>
                  <SelectItem value="Fantasy">{t('fantasy')}</SelectItem>
                  <SelectItem value="Romance">{t('romance')}</SelectItem>
                  <SelectItem value="History">{t('history')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">{t('bookPrice')}</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rating">{t('bookRating')}</Label>
              <Input
                id="rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pages">{t('bookPages')}</Label>
              <Input
                id="pages"
                type="number"
                value={formData.pages}
                onChange={(e) => setFormData({ ...formData, pages: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">{t('bookYear')}</Label>
              <Input
                id="year"
                type="number"
                value={formData.publishedYear}
                onChange={(e) => setFormData({ ...formData, publishedYear: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cover">{t('bookCover')}</Label>

              <Input
                id="cover"
                value={formData.cover}
                onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
                placeholder="https://example.com/cover.jpg"
                className="mb-2"
              />

              <div className="flex items-center gap-2">
                <input
                  type="file"
                  id="coverFile"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setFormData({ ...formData, cover: imageUrl });
                    }
                  }}
                />
              </div>

              {formData.cover && (
                <img
                  src={formData.cover}
                  alt="Book cover preview"
                  className="w-32 h-44 object-cover rounded border"
                />
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">{t('bookDescription')}</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              {t('cancel')}
            </Button>
            <Button onClick={handleAddBook}>{t('add')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Book Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t('editBook')}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">{t('bookTitle')}</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-author">{t('bookAuthor')}</Label>
              <Input
                id="edit-author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-genre">{t('bookGenre')}</Label>
              <Select value={formData.genre} onValueChange={(value: string) => setFormData({ ...formData, genre: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fiction">{t('fiction')}</SelectItem>
                  <SelectItem value="Sci-Fi">{t('sciFi')}</SelectItem>
                  <SelectItem value="Mystery">{t('mystery')}</SelectItem>
                  <SelectItem value="Fantasy">{t('fantasy')}</SelectItem>
                  <SelectItem value="Romance">{t('romance')}</SelectItem>
                  <SelectItem value="History">{t('history')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-price">{t('bookPrice')}</Label>
              <Input
                id="edit-price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-rating">{t('bookRating')}</Label>
              <Input
                id="edit-rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-pages">{t('bookPages')}</Label>
              <Input
                id="edit-pages"
                type="number"
                value={formData.pages}
                onChange={(e) => setFormData({ ...formData, pages: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-year">{t('bookYear')}</Label>
              <Input
                id="edit-year"
                type="number"
                value={formData.publishedYear}
                onChange={(e) => setFormData({ ...formData, publishedYear: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-cover">{t('bookCover')}</Label>
              <Input
                id="edit-cover"
                value={formData.cover}
                onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="edit-description">{t('bookDescription')}</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              {t('cancel')}
            </Button>
            <Button onClick={handleEditBook}>{t('save')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
