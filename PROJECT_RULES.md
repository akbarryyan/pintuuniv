# Always remember this MySQL database schema for this project:

Database Schema:

Database name: pintuuniv

users:

- id (INT, PK, AUTO_INCREMENT)
- name (VARCHAR)
- email (VARCHAR)
- phone (VARCHAR)
- school (VARCHAR)
- grade (ENUM: '10', '11', '12', 'Gap Year')
- password_hash (VARCHAR)
- avatar (VARCHAR)
- target_university (VARCHAR)
- target_major (VARCHAR)
- target_score (INT)
- total_attempts (INT)
- average_score (DECIMAL: 5,2)
- rank_position (INT)
- subscription_type (VARCHAR)
- subscription_expires (DATETIME)
- role (ENUM: 'user', 'admin')
- status (ENUM: 'active', 'suspended', 'inactive')
- last_activity (DATETIME)
- created_at (DATETIME)
- updated_at (DATETIME)

user_sessions:

- id (INT, PK, AUTO_INCREMENT)
- user_id (FK → users.id)
- session_token (VARCHAR)
- jwt_token (TEXT)
- expires_at (DATETIME)
- ip_address (VARCHAR)
- user_agent (TEXT)
- last_activity (DATETIME)
- is_active (BOOLEAN) # default: 1
- created_at (DATETIME)

tryouts:

- id (INT, PK, AUTO_INCREMENT)
- title (VARCHAR)
- description (TEXT)
- total_categories (INT)
- total_questions (INT)
- total_weight (INT)
- passing_score (INT)
- is_active (BOOLEAN)
- type_tryout (ENUM: 'free', 'paid')
- price (DECIMAL: 10,2)
- start_date (DATETIME)
- end_date (DATETIME)
- created_at (DATETIME)
- updated_at (DATETIME)

categories:

- id (INT, PK, AUTO_INCREMENT)
- name (VARCHAR)
- description (TEXT)
- tryout_id (FK → tryouts.id)
- duration_minutes (INT) # Durasi category ini dalam menit
- total_weight (INT) # Total bobot semua questions dalam category ini
- total_questions (INT) # Total questions dalam category ini
- is_active (BOOLEAN) # default: 1
- created_at (DATETIME)
- updated_at (DATETIME)

questions:

- id (INT, PK, AUTO_INCREMENT)
- title (VARCHAR)
- content (TEXT)
- category_id (FK → categories.id)
- type (ENUM: 'Pilihan Ganda', 'Essay', 'Benar/Salah')
- difficulty (ENUM: 'Mudah', 'Sedang', 'Sulit', 'Sangat Sulit')
- weight (INT) # Bobot question ini (1=mudah, 2=sedang, 3=sulit, 4=sangat sulit)
- is_active (BOOLEAN) # default: 1
- created_at (DATETIME)
- updated_at (DATETIME)

# Jawaban untuk question

answers:

- id (INT, PK, AUTO_INCREMENT)
- question_id (FK → questions.id)
- content (TEXT)
- is_correct (BOOLEAN) # default: 0
- order_number (INT) # untuk pilihan ganda (1=A, 2=B, 3=C, 4=D)
- created_at (DATETIME)
- updated_at (DATETIME)

payment_methods:

- id (INT, PK, AUTO_INCREMENT)
- name (VARCHAR)
- type (ENUM: 'qris', 'e_wallet', 'bank_transfer')
- icon (VARCHAR)
- color (VARCHAR)
- qr_code (TEXT) ## untuk QRIS
- logo (TEXT)
- is_active (BOOLEAN)
- is_popular (BOOLEAN)
- created_at (DATETIME)
- updated_at (DATETIME)

payment_accounts:

- id (INT, PK, AUTO_INCREMENT)
- payment_method_id (FK → payment_methods.id)
- name (VARCHAR)
- account (VARCHAR)
- account_name (VARCHAR)
- is_active (BOOLEAN)
- created_at (DATETIME)
- updated_at (DATETIME)

user_tryout_registrations:

- id (INT, PK, AUTO_INCREMENT)
- user_id (FK → users.id)
- tryout_id (FK → tryouts.id)
- registration_date (DATETIME)
- status (ENUM: 'registered', 'approved', 'rejected', 'cancelled')
- payment_status (ENUM: 'pending', 'paid', 'failed', 'refunded')
- payment_method (VARCHAR)
- payment_method_id (FK → payment_methods.id)
- payment_reference (VARCHAR)
- payment_date (DATETIME)
- approved_by (INT, FK → admin_users.id)
- approved_at (DATETIME)
- notes (TEXT)
- created_at (DATETIME)
- updated_at (DATETIME)

user_tryout_sessions:

- id (INT, PK, AUTO_INCREMENT)
- user_id (FK → users.id)
- tryout_id (FK → tryouts.id)
- started_at (DATETIME)
- completed_at (DATETIME)
- total_score (INT) # total akhir skor (penjumlahan skor semua kategori)
- status (ENUM: 'ongoing', 'completed', 'abandoned')

user_category_scores:

- id (INT, PK, AUTO_INCREMENT)
- user_id (FK → users.id)
- tryout_id (FK → tryouts.id)
- category_id (FK → categories.id)
- total_weight_earned (INT) # total bobot soal yang dijawab benar, default: 0
- total_weight_possible (INT) # total bobot soal yang ada dalam category ini, default: 0
- category_score (INT) # skor untuk category ini (0-1000)
- question_answered (INT) # total jumlah soal yang dijawab, default: 0
- question_correct (INT) # total jumlah soal yang dijawab benar, default: 0
- created_at (DATETIME)
- updated_at (DATETIME)

user_category_sessions:

- id (INT, PK, AUTO_INCREMENT)
- user_id (FK → users.id)
- tryout_id (FK → tryouts.id)
- category_id (FK → categories.id)
- started_at (DATETIME)
- completed_at (DATETIME)
- time_spent_minutes (INT) # waktu yang dihabiskan dalam menit, default: 0
- status (ENUM: 'ongoing', 'completed', 'timeout', 'abandoned')

user_answers:

- id (INT, PK, AUTO_INCREMENT)
- user_id (FK → users.id)
- tryout_id (FK → tryouts.id)
- category_id (FK → categories.id)
- question_id (FK → questions.id)
- answer_id (FK → answers.id) # untuk pilihan ganda dan benar/salah
- essay_answer (TEXT) # untuk essay
- is_correct (BOOLEAN) # default: 0
- weight_earned (INT) # bobot yang didapatkan, default: 0
- answered_at (DATETIME)

discussion:

- id (INT, PK, AUTO_INCREMENT)
- user_id (FK → users.id)
- title (VARCHAR)
- content (TEXT)
- view_count (INT)
- reply_count (INT)
- like_count (INT)
- is_pinned (BOOLEAN)
- is_deleted (BOOLEAN)
- created_at (DATETIME)
- updated_at (DATETIME)

discussion_tags:

- id (INT, PK, AUTO_INCREMENT)
- name (VARCHAR)
- description (TEXT)
- color (VARCHAR)
- is_active (BOOLEAN)
- created_at (DATETIME)
- updated_at (DATETIME)

discussion_tag_map:

- id (INT, PK, AUTO_INCREMENT)
- discussion_id (FK → discussions.id)
- tag_id (FK → discussion_tags.id)

discussion_replies:

- id (INT, PK, AUTO_INCREMENT)
- discussion_id (FK → discussions.id)
- user_id (FK → users.id)
- content (TEXT)
- is_deleted (BOOLEAN)
- created_at (DATETIME)
- updated_at (DATETIME)

discussion_likes:

- id (INT, PK, AUTO_INCREMENT)
- user_id (FK → users.id)
- discussion_id (FK → discussions.id)
- reply_id (FK → discussion_replies.id)
- created_at (DATETIME)

# VIEW

category_summary:

- id (INT, PK, AUTO_INCREMENT)
- name (VARCHAR) # nama kategori
- description (TEXT)
- duration_minutes (INT) # durasi pengerjaan kategori dalam menit
- total_weight (INT) # total bobot semua questions dalam kategori ini
- total_questions (INT) # total questions dalam kategori ini
- is_active (BOOLEAN) # default: 1
- tryout_title (VARCHAR)
- created_at (DATETIME)
- updated_at (DATETIME)

question_summary:

- id (INT, PK, AUTO_INCREMENT)
- title (VARCHAR) # judul question
- type (ENUM: 'Pilihan Ganda', 'Essay', 'Benar/Salah')
- difficulty (ENUM: 'Mudah', 'Sedang', 'Sulit', 'Sangat Sulit')
- weight (INT) # bobot question, (1=mudah, 2=sedang, 3=sulit, 4=sangat sulit)
- is_active (BOOLEAN) # default: 1
- category_name (VARCHAR) # nama kategori
- category_total_weight (INT) # total bobot semua questions dalam kategori ini
- category_total_questions (INT) # total questions dalam kategori ini
- tryout_title (VARCHAR) # nama tryout
- answer_count (INT) # default: 0
- created_at (DATETIME)
- updated_at (DATETIME)
