# PintuUniv - Platform Tryout UTBK

Platform pembelajaran online untuk persiapan UTBK dengan fitur tryout, analisis AI, dan bimbingan personal.

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: MySQL
- **Authentication**: JWT + bcrypt
- **Styling**: Neobrutalism Design

## 📋 Prerequisites

- Node.js 18+
- MySQL 8.0+
- npm atau yarn

## 🛠️ Setup Development

### 1. Clone Repository

```bash
git clone <repository-url>
cd pintuuniv
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment

Copy `.env.local` file dan sesuaikan konfigurasi database:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=pintuuniv
DB_PORT=3306

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### 4. Setup Database

Pastikan MySQL sudah running, kemudian jalankan:

```bash
npm run init-db
```

Script ini akan:

- Membuat database `pintuuniv`
- Membuat semua tabel yang diperlukan
- Insert data sample (tryouts dan questions)

### 5. Start Development Server

```bash
npm run dev
```

Website akan tersedia di `http://localhost:3000`

## 📊 Database Schema

### Users Table

- User registration dan profile data
- Subscription management
- Authentication tokens

### Tryouts & Questions

- Tryout management (free/premium)
- Questions dengan multiple choice
- Kategorisasi berdasarkan subject

### User Attempts & Answers

- Tracking user progress
- Storing jawaban dan hasil
- Analytics data

### Leaderboard & Sessions

- Ranking system
- Session management untuk security

## 🔐 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Protected Routes

Routes yang memerlukan authentication:

- `/dashboard` - User dashboard
- `/tryouts` - Tryout list dan simulasi
- `/leaderboard` - Ranking dan statistik
- `/profile` - User profile management

## 🧪 Testing Registration

1. Buka `http://localhost:3000/register`
2. Isi form dengan data valid:
   - Email format valid
   - Password minimal 8 karakter (huruf besar, kecil, angka)
   - Setujui terms & conditions
3. Submit form
4. Check console browser dan server logs

## 🔒 Security Features

- **Password Hashing**: bcrypt dengan salt rounds 12
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Server-side validation
- **SQL Injection Protection**: Prepared statements
- **Session Management**: Database-stored sessions

## 📱 Features Implemented

### ✅ Completed

- User Registration dengan validasi lengkap
- Database schema dan connection
- JWT authentication system
- Password hashing
- Input validation (email, password, phone)
- Error handling dan user feedback
- Responsive design
- Header Navigation dengan mobile menu

### 🚧 Next Features

- User Login functionality
- Dashboard dengan user data
- Tryout system
- Leaderboard
- Profile management
- Email verification
- Password reset

## 🐛 Troubleshooting

### Database Connection Error

```bash
# Check MySQL service
sudo systemctl status mysql  # Linux
brew services list | grep mysql  # macOS

# Check credentials
mysql -u root -p
```

### Permission Errors

```sql
-- Grant privileges to user
GRANT ALL PRIVILEGES ON pintuuniv.* TO 'your_user'@'localhost';
FLUSH PRIVILEGES;
```

### JWT Errors

- Pastikan `JWT_SECRET` sudah diset di `.env.local`
- Check token expiration
- Verify token format

## 📚 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/auth/          # Authentication APIs
│   ├── dashboard/         # Dashboard pages
│   ├── register/          # Registration page
│   └── ...
├── components/            # Reusable components
│   └── HeaderNavigation.tsx
├── lib/                   # Utilities
│   ├── auth.ts           # JWT & validation
│   └── db.ts             # Database connection
└── middleware.ts         # Route protection

database/
└── schema.sql            # Database schema

scripts/
└── init-db.js           # Database initialization
```

## 🚀 Deployment Notes

### Environment Variables

Update production environment variables:

- Secure JWT_SECRET (32+ chars random)
- Production database credentials
- HTTPS URLs

### Database

- Use connection pooling in production
- Enable SSL for database connections
- Regular backups

### Security

- Enable CORS restrictions
- Rate limiting for APIs
- Input sanitization
- SQL injection prevention

## 👥 Contributing

1. Fork repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 License

Private project - All rights reserved
