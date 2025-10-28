# 📚 Modern Library System | نظام المكتبة الحديثة

مشروع متكامل يجمع بين **إدارة الكتب وبيعها والتفاعل الاجتماعي بين القرّاء**،  
مصمم بواجهة عصرية مبنية باستخدام **React + TypeScript + Vite** لتقديم تجربة استخدام مرنة وسريعة.



## ✨ نظرة عامة

يهدف النظام إلى توفير منصة تفاعلية تجمع بين القرّاء ومحبي الكتب في مكان واحد،  
بحيث يمكن للمستخدم تصفح الكتب وشرائها، إضافة المفضلات، شراء ملحقات القراءة،  
وأيضًا التواصل مع القرّاء الآخرين وتبادل الآراء حول الكتب.



## 🚀 المميزات (Features)

### 👥 للمستخدمين:
- 📖 تصفح الكتب مع تفاصيل كاملة (المؤلف، السعر، التقييم، الوصف)  
- 🛒 شراء الكتب مباشرة من المنصة  
- 💼 شراء **ملحقات القراءة** (مثل الفواصل والإضاءة والملاحظات)  
- 💬 التواصل مع قرّاء آخرين ومشاركة الآراء  
- 💖 إضافة الكتب إلى المفضلة (Favorites)  
- 🧾 عرض سجل المشتريات والطلبات السابقة  
- 🔍 بحث متقدم عن الكتب حسب العنوان أو المؤلف أو التصنيف  

### 🧑‍💼 للمسؤولين (Admins):
- 🏷️ إدارة الكتب (إضافة / تعديل / حذف)  
- 🧍‍♂️ إدارة المستخدمين والقرّاء  
- 🛍️ متابعة الطلبات وتنظيم عمليات البيع  
- 📦 إدارة التوريد والمخزون  
- 📈 عرض تقارير وإحصائيات الأداء  



## 🧰 المتطلبات (Requirements)

قبل تشغيل المشروع، تأكد من تثبيت الأدوات التالية:

- [Node.js](https://nodejs.org/) (الإصدار 16 أو أعلى)
- npm أو yarn


## ⚙️ خطوات التشغيل (Installation & Run)

```
# 1️⃣ استنساخ المستودع
git clone https://github.com/your-username/modern-bookstore-system.git

# 2️⃣ الانتقال إلى مجلد المشروع
cd modern-bookstore-system

# 3️⃣ تثبيت التبعيات
npm install

# 4️⃣ تشغيل المشروع محليًا
npm run dev
سيفتح النظام تلقائيًا في المتصفح على:

http://localhost:3000
```

## 🗂️ هيكل المشروع (Project Structure)
```
src/
├── components/
│   ├── BookCard.tsx
│   ├── BookDetail.tsx
│   ├── BooksView.tsx
│   ├── FavoritesView.tsx
│   ├── OrdersView.tsx
│   ├── SuppliesView.tsx
│   ├── ReadersView.tsx
│   ├── AdminView.tsx
│   └── AdminLogin.tsx
├── utils/
├── styles/
├── App.tsx
├── main.tsx
└── index.css
```
## 🖼️ لقطات من النظام (Screenshots)

### الرئيسية:
<img width="2104" height="1288" alt="image" src="https://github.com/user-attachments/assets/f6f45c47-cb4b-4b08-b913-e518642c6849" />

### الملحقات:
<img width="2052" height="1144" alt="image" src="https://github.com/user-attachments/assets/7294485f-3cb3-4f1e-af13-d018a031327c" />


### مجتمع القراء:
<img width="2073" height="1067" alt="image" src="https://github.com/user-attachments/assets/359a5efe-849f-4577-827d-bd6a94b9657d" />

### لوحة تحكم مسؤول النظام:
<img width="2073" height="1116" alt="image" src="https://github.com/user-attachments/assets/77e9d231-ea02-4661-95c6-a75f0f6e9be9" />


## 💬 تجربة المستخدم (User Experience)

يوفر النظام تجربة تفاعلية متكاملة تجمع بين التصفح والشراء والمشاركة الاجتماعية.
الواجهة مصممة لتكون بسيطة وسهلة الاستخدام، مع اعتماد تصميم متجاوب (Responsive) يناسب مختلف الأجهزة.


## 💡 ملاحظات ونصائح (Notes & Tips)

🧠 استخدم TypeScript Interfaces لتفادي الأخطاء وتحسين القابلية للتوسع.

💬 يمكن تطوير نظام المحادثات بين القراء ليدعم الرسائل الفورية باستخدام Socket.io.

🧾 ربط النظام بقاعدة بيانات حقيقية (مثل Firebase أو MongoDB) سيجعله أقرب إلى منصة فعلية.

🛒 أضف بوابة دفع (Payment Gateway) مثل Stripe أو PayPal لتجربة أكثر واقعية.

🧩 استخدم إدارة حالة قوية مثل Redux Toolkit أو React Query للمشاريع الأكبر.

🌈 ركّز على تجربة المستخدم — البساطة والوضوح تصنع الفرق.

🧘‍♂️ لا تتسرع، طوّر المشروع خطوة بخطوة واستمتع بالتجربة.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 📚 Modern Library System

A complete and interactive library platform combining book management, e-commerce, and social interaction —
built with React + TypeScript + Vite for a fast and modern experience.

## 🚀 Features
### 👥 For Users:

📖 Browse books with full details (author, price, rating, description)

🛒 Purchase books directly from the platform

💼 Buy reading accessories (bookmarks, lamps, notebooks, etc.)

💬 Connect and chat with other readers

💖 Add books to favorites

🧾 View purchase and order history

🔍 Advanced search by title, author, or category

### 🧑‍💼 For Admins:
🏷️ Manage books (Add / Edit / Delete)

🧍‍♂️ Manage users and readers

🛍️ Track and manage orders

📦 Handle supplies and inventory

📈 View performance reports and analytics


## 🧰 Requirements

Node.js
 v16+

npm or yarn

## ⚙️ Installation & Run
```
# Clone the repository
git clone https://github.com/your-username/modern-bookstore-system.git
cd modern-bookstore-system

# Install dependencies
npm install

# Run locally
npm run dev

Then open in your browser:

http://localhost:3000
```
## 🖼️ Screenshots
### Home:
<img width="2104" height="1288" alt="image" src="https://github.com/user-attachments/assets/f6f45c47-cb4b-4b08-b913-e518642c6849" />

### Supplies:
<img width="2052" height="1144" alt="image" src="https://github.com/user-attachments/assets/7294485f-3cb3-4f1e-af13-d018a031327c" />

### Readers Community:
<img width="2073" height="1067" alt="image" src="https://github.com/user-attachments/assets/359a5efe-849f-4577-827d-bd6a94b9657d" />

### Admin dashboard 
<img width="2073" height="1116" alt="image" src="https://github.com/user-attachments/assets/77e9d231-ea02-4661-95c6-a75f0f6e9be9" />

## 💬 User Experience

The platform blends reading, shopping, and community interaction in one place.
It’s designed to be simple, responsive, and pleasant for all types of readers.

## 💡 Notes & Tips

🧠 Use TypeScript interfaces to ensure consistency and safety.

💬 Add a real-time chat system (e.g. with Socket.io).

🧾 Connect to a backend or database like Firebase or MongoDB.

🛒 Integrate payment gateways (Stripe / PayPal) for real transactions.

🧩 Consider using Redux Toolkit or React Query for scalable state management.

🌈 Keep it user-focused — simplicity is key.

🧘‍♂️ Build, test, refine — enjoy the process!

