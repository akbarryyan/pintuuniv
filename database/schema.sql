-- PintuUniv Database Schema
-- Created for MySQL

-- Create database (run this first)
-- CREATE DATABASE pintuuniv;
-- USE pintuuniv;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  school VARCHAR(255),
  grade ENUM('10', '11', '12') DEFAULT '12',
  phone VARCHAR(20),
  avatar VARCHAR(255) DEFAULT '👤',
  subscription_type ENUM('free', 'basic', 'pro', 'premium') DEFAULT 'free',
  subscription_expires_at DATETIME NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  email_verification_token VARCHAR(255) NULL,
  password_reset_token VARCHAR(255) NULL,
  password_reset_expires DATETIME NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tryouts table
CREATE TABLE IF NOT EXISTS tryouts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type ENUM('free', 'premium') DEFAULT 'free',
  subject ENUM('saintek', 'soshum', 'campuran') NOT NULL,
  duration_minutes INT DEFAULT 180,
  total_questions INT DEFAULT 100,
  start_time DATETIME NULL,
  end_time DATETIME NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tryout questions table
CREATE TABLE IF NOT EXISTS tryout_questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tryout_id INT NOT NULL,
  question_text TEXT NOT NULL,
  question_type ENUM('multiple_choice', 'essay') DEFAULT 'multiple_choice',
  option_a VARCHAR(500),
  option_b VARCHAR(500),
  option_c VARCHAR(500),
  option_d VARCHAR(500),
  option_e VARCHAR(500),
  correct_answer ENUM('A', 'B', 'C', 'D', 'E') NOT NULL,
  explanation TEXT,
  difficulty ENUM('easy', 'medium', 'hard') DEFAULT 'medium',
  subject_category VARCHAR(100),
  points INT DEFAULT 1,
  order_number INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tryout_id) REFERENCES tryouts(id) ON DELETE CASCADE,
  INDEX idx_tryout_order (tryout_id, order_number)
);

-- User tryout attempts table
CREATE TABLE IF NOT EXISTS user_tryout_attempts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  tryout_id INT NOT NULL,
  start_time DATETIME NOT NULL,
  end_time DATETIME NULL,
  status ENUM('in_progress', 'completed', 'abandoned') DEFAULT 'in_progress',
  total_score DECIMAL(5,2) DEFAULT 0,
  correct_answers INT DEFAULT 0,
  wrong_answers INT DEFAULT 0,
  unanswered INT DEFAULT 0,
  completion_percentage DECIMAL(5,2) DEFAULT 0,
  time_spent_minutes INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (tryout_id) REFERENCES tryouts(id) ON DELETE CASCADE,
  INDEX idx_user_attempts (user_id, created_at DESC),
  INDEX idx_tryout_attempts (tryout_id, created_at DESC)
);

-- User answers table
CREATE TABLE IF NOT EXISTS user_answers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  attempt_id INT NOT NULL,
  question_id INT NOT NULL,
  user_answer ENUM('A', 'B', 'C', 'D', 'E') NULL,
  is_correct BOOLEAN DEFAULT FALSE,
  time_spent_seconds INT DEFAULT 0,
  answered_at DATETIME NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (attempt_id) REFERENCES user_tryout_attempts(id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES tryout_questions(id) ON DELETE CASCADE,
  UNIQUE KEY unique_attempt_question (attempt_id, question_id)
);

-- Leaderboard table (for ranking users)
CREATE TABLE IF NOT EXISTS leaderboard (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  tryout_id INT NOT NULL,
  score DECIMAL(5,2) NOT NULL,
  rank_position INT,
  completion_time_minutes INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (tryout_id) REFERENCES tryouts(id) ON DELETE CASCADE,
  INDEX idx_tryout_rank (tryout_id, score DESC, completion_time_minutes ASC),
  INDEX idx_user_leaderboard (user_id, created_at DESC)
);

-- User sessions table (for JWT management)
CREATE TABLE IF NOT EXISTS user_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  session_token VARCHAR(255) UNIQUE NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_session_token (session_token),
  INDEX idx_session_expires (expires_at)
);

-- Insert some sample data

-- Sample tryouts
INSERT IGNORE INTO tryouts (id, title, description, type, subject, duration_minutes, total_questions) VALUES
(1, 'Simulasi UTBK Saintek 2025', 'Tryout simulasi lengkap untuk jurusan Saintek dengan soal terbaru', 'free', 'saintek', 180, 100),
(2, 'Tryout Premium Soshum', 'Paket tryout premium untuk jurusan Soshum dengan analisis mendalam', 'premium', 'soshum', 180, 100),
(3, 'Simulasi Campuran UTBK', 'Tryout campuran untuk semua jurusan', 'free', 'campuran', 200, 120);

-- Sample questions for tryout 1 (Saintek)
INSERT IGNORE INTO tryout_questions (tryout_id, question_text, option_a, option_b, option_c, option_d, option_e, correct_answer, explanation, subject_category, order_number) VALUES
(1, 'Manakah dari berikut ini yang merupakan rumus luas lingkaran?', 'π × r', 'π × r²', '2 × π × r', 'π × d', '4 × π × r', 'B', 'Luas lingkaran = π × r², dimana r adalah jari-jari lingkaran.', 'Matematika', 1),
(1, 'Proses fotosintesis terjadi pada bagian tumbuhan yang disebut:', 'Stomata', 'Klorofil', 'Xilem', 'Floem', 'Epidermis', 'B', 'Fotosintesis terjadi pada klorofil yang terdapat dalam kloroplast.', 'Biologi', 2),
(1, 'Hasil dari integral ∫2x dx adalah:', 'x² + C', '2x² + C', 'x²/2 + C', '2x + C', 'x + C', 'A', 'Integral dari 2x adalah x² + C, karena turunan dari x² adalah 2x.', 'Matematika', 3),
(1, 'Unsur dengan nomor atom 6 memiliki konfigurasi elektron:', '1s² 2s² 2p²', '1s² 2s² 2p⁴', '1s² 2s² 2p⁶', '1s² 2s⁴', '1s² 2s² 2p¹', 'A', 'Karbon (Z=6) memiliki konfigurasi elektron 1s² 2s² 2p².', 'Kimia', 4),
(1, 'Kecepatan adalah besaran:', 'Skalar', 'Vektor', 'Dimensi', 'Pokok', 'Turunan', 'B', 'Kecepatan adalah besaran vektor karena memiliki arah dan besar.', 'Fisika', 5);
