# Database Schema untuk Forum/Discussion

## 📋 Overview

Schema ini mencakup:
- ✅ **Discussions**: Thread/diskusi utama (forum umum)
- ✅ **Replies**: Balasan untuk setiap diskusi  
- ✅ **Likes**: Users bisa like discussions dan replies
- ✅ **Tags**: Sistem kategorisasi diskusi (dikelola admin)
- ✅ **Tag Mapping**: Relasi many-to-many antara discussions dan tags

### 🎯 **Sistem Tags Admin-Managed:**
- **Admin** membuat dan mengelola tags/kategori
- **Users** hanya bisa memilih dari tags yang tersedia
- **Tags** bisa diaktifkan/nonaktifkan oleh admin
- **Color coding** untuk visual yang lebih menarik

## 1. CREATE TABLE

```sql
-- Tags/Categories table (dikelola admin)
CREATE TABLE discussion_tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NULL,
    color VARCHAR(7) DEFAULT '#3B82F6', -- hex color untuk UI
    is_active TINYINT(1) DEFAULT 1, -- admin bisa enable/disable tags
    created_by INT NOT NULL, -- admin yang membuat tag
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (created_by) REFERENCES users(id),
    INDEX idx_tags_active (is_active)
);

-- Discussions table
CREATE TABLE discussions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    view_count INT DEFAULT 0,
    reply_count INT DEFAULT 0,
    like_count INT DEFAULT 0,
    is_pinned TINYINT(1) DEFAULT 0,
    is_deleted TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_discussions_user_id (user_id),
    INDEX idx_discussions_created_at (created_at)
);

-- Discussion replies table
CREATE TABLE discussion_replies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    discussion_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    is_deleted TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (discussion_id) REFERENCES discussions(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_replies_discussion_id (discussion_id),
    INDEX idx_replies_user_id (user_id)
);

-- Discussion likes table
-- Users bisa like discussions (discussion_id) ATAU replies (reply_id)
-- Constraint memastikan user tidak bisa like keduanya sekaligus
CREATE TABLE discussion_likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,           -- User yang melakukan like
    discussion_id INT NULL,         -- Like untuk discussion (thread utama)
    reply_id INT NULL,              -- Like untuk reply (balasan)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (discussion_id) REFERENCES discussions(id),
    FOREIGN KEY (reply_id) REFERENCES discussion_replies(id),

    -- Memastikan user tidak bisa like discussion dan reply sekaligus
    CONSTRAINT unique_like UNIQUE(user_id, discussion_id, reply_id),
    CONSTRAINT check_like_target CHECK (
        (discussion_id IS NOT NULL AND reply_id IS NULL) OR 
        (discussion_id IS NULL AND reply_id IS NOT NULL)
    ),
    INDEX idx_likes_discussion_id (discussion_id),
    INDEX idx_likes_reply_id (reply_id)
);

-- Discussion tag mapping table
CREATE TABLE discussion_tag_map (
    id INT AUTO_INCREMENT PRIMARY KEY,
    discussion_id INT NOT NULL,
    tag_id INT NOT NULL,

    FOREIGN KEY (discussion_id) REFERENCES discussions(id),
    FOREIGN KEY (tag_id) REFERENCES discussion_tags(id),
    UNIQUE KEY unique_discussion_tag (discussion_id, tag_id),
    INDEX idx_tagmap_discussion_id (discussion_id)
);
```

## 2. INSERT DATA

```sql
-- Insert sample tags (dibuat oleh admin)
INSERT INTO discussion_tags (name, description, color, is_active, created_by) VALUES
('UTBK', 'Diskusi tentang UTBK/SNBT', '#EF4444', 1, 1),
('Matematika', 'Pembahasan soal matematika', '#3B82F6', 1, 1),
('Fisika', 'Pembahasan soal fisika', '#10B981', 1, 1),
('Kimia', 'Pembahasan soal kimia', '#F59E0B', 1, 1),
('Biologi', 'Pembahasan soal biologi', '#8B5CF6', 1, 1),
('Bahasa Indonesia', 'Pembahasan soal bahasa Indonesia', '#EC4899', 1, 1),
('Bahasa Inggris', 'Pembahasan soal bahasa Inggris', '#06B6D4', 1, 1),
('Soshum', 'Materi soshum (Sosiologi, Ekonomi, Geografi)', '#84CC16', 1, 1),
('Saintek', 'Materi saintek (Matematika, Fisika, Kimia, Biologi)', '#F97316', 1, 1),
('Tips & Trik', 'Tips dan trik mengerjakan soal', '#6366F1', 1, 1),
('Motivasi', 'Motivasi belajar dan persiapan', '#EC4899', 1, 1),
('Pengumuman', 'Pengumuman penting', '#EF4444', 1, 1);

-- Insert sample discussions
INSERT INTO discussions (user_id, title, content, view_count, reply_count, like_count, is_pinned, created_at) VALUES
-- Diskusi umum forum (semua menggunakan user_id = 1 untuk memastikan tidak ada error foreign key)
(1, 'Tips Menghadapi UTBK 2024', 'Halo semua! Ada yang punya tips khusus untuk menghadapi UTBK tahun ini? Saya masih bingung dengan strategi belajar yang efektif. Mohon sharing pengalamannya ya!', 156, 8, 12, 1, '2024-01-15 10:30:00'),
(1, 'Rekomendasi Buku Latihan UTBK', 'Siapa yang punya rekomendasi buku latihan UTBK yang bagus? Saya sudah coba beberapa tapi masih belum cocok. Budget terbatas jadi harus pilih yang tepat.', 89, 5, 7, 0, '2024-01-16 14:20:00'),
(1, 'Jadwal Belajar yang Efektif', 'Bagaimana cara membuat jadwal belajar yang efektif untuk persiapan UTBK? Saya masih SMA kelas 12 dan bingung membagi waktu antara sekolah dan persiapan UTBK.', 234, 15, 18, 0, '2024-01-17 09:15:00'),
(1, 'Soal Matematika Sulit Banget!', 'Ada yang bisa jelasin cara mengerjakan soal limit yang sulit? Saya udah coba berkali-kali tapi masih salah. Mohon bantuannya!', 67, 4, 3, 0, '2024-01-18 16:45:00'),
(1, 'Pembahasan Soal Fisika', 'Halo! Saya mau share pembahasan soal fisika yang kemarin. Ada yang mau diskusi bareng? Kita bisa saling belajar dari pembahasan masing-masing.', 123, 9, 11, 0, '2024-01-19 11:30:00'),
(1, 'Tips Mengerjakan Soal Kimia Cepat', 'Ada tips untuk mengerjakan soal kimia dengan cepat? Saya sering kehabisan waktu di bagian ini. Mohon sharing pengalamannya!', 78, 6, 8, 0, '2024-01-20 13:20:00'),
(1, 'Motivasi untuk Teman-teman yang Sedang Galau', 'Jangan menyerah! UTBK bukan akhir segalanya. Yang penting kita sudah berusaha maksimal. Semangat terus untuk semua yang sedang berjuang! 💪', 345, 22, 45, 1, '2024-01-21 08:00:00'),
(1, 'Error di Platform?', 'Ada yang mengalami error saat submit jawaban? Saya udah coba refresh tapi masih sama. Ada solusinya?', 45, 2, 1, 0, '2024-01-22 15:30:00'),
(1, 'Rekomendasi Channel YouTube untuk Belajar UTBK', 'Ada yang punya rekomendasi channel YouTube yang bagus untuk belajar UTBK? Saya lebih suka belajar lewat video daripada baca buku.', 198, 12, 16, 0, '2024-01-23 12:45:00'),
(1, 'Strategi Menjawab Soal TPS', 'Bagaimana strategi terbaik untuk menjawab soal TPS? Saya sering kehabisan waktu di bagian ini. Ada yang punya tips khusus?', 167, 11, 14, 0, '2024-01-24 10:15:00'),
(1, 'Pembahasan Soal Biologi', 'Mau tanya nih, soal biologi tentang fotosintesis. Jawabannya A atau B ya? Saya bingung karena kedua pilihan terlihat benar.', 92, 7, 5, 0, '2024-01-25 14:30:00'),
(1, 'Pengalaman Pertama Ikut Tryout Online', 'Hari ini pertama kali ikut tryout online. Lumayan nervous tapi excited juga! Ada yang mau share pengalaman pertama ikut tryout?', 78, 6, 9, 0, '2024-01-26 16:20:00');

-- Insert sample replies
INSERT INTO discussion_replies (discussion_id, user_id, content, created_at) VALUES
-- Replies untuk "Tips Menghadapi UTBK 2024" (discussion_id = 1)
(1, 1, 'Menurut saya, yang penting adalah konsistensi belajar setiap hari. Jangan sampai belajar marathon seminggu sebelum UTBK. Lebih baik sedikit tapi rutin.', '2024-01-15 11:45:00'),
(1, 1, 'Setuju banget! Saya juga sarankan untuk banyak latihan soal. Semakin sering latihan, semakin familiar dengan tipe soal yang keluar.', '2024-01-15 12:30:00'),
(1, 1, 'Jangan lupa juga untuk istirahat yang cukup. Otak butuh recovery time supaya bisa optimal saat belajar.', '2024-01-15 13:15:00'),
(1, 1, 'Tips dari saya: buat mind map untuk setiap materi. Ini membantu untuk mengingat konsep-konsep penting dengan lebih mudah.', '2024-01-15 14:00:00'),
(1, 1, 'Kalau bisa, cari teman belajar atau study group. Belajar bareng lebih menyenangkan dan bisa saling mengingatkan.', '2024-01-15 15:20:00'),
(1, 1, 'Yang paling penting adalah jangan panik saat ujian. Percaya diri dengan persiapan yang sudah dilakukan.', '2024-01-15 16:10:00'),
(1, 1, 'Saya juga sarankan untuk simulasi ujian dengan timer. Ini membantu untuk mengatur waktu saat ujian yang sesungguhnya.', '2024-01-15 17:00:00'),
(1, 1, 'Terima kasih semua tipsnya! Sangat membantu banget. Semoga kita semua bisa lulus UTBK dengan hasil yang memuaskan. 💪', '2024-01-15 18:30:00'),

-- Replies untuk "Rekomendasi Buku Latihan UTBK" (discussion_id = 2)
(2, 1, 'Saya pakai buku "Sukses UTBK" dari Erlangga. Soalnya lengkap dan pembahasannya detail banget.', '2024-01-16 15:30:00'),
(2, 1, 'Kalau budget terbatas, coba cek aplikasi belajar online seperti Ruangguru atau Zenius. Ada trial gratis juga.', '2024-01-16 16:15:00'),
(2, 1, 'Buku "Bank Soal UTBK" dari Ganesha Operation juga bagus. Harganya terjangkau dan kualitasnya oke.', '2024-01-16 17:00:00'),
(2, 1, 'Saya lebih suka pakai buku yang ada pembahasan video. Jadi kalau bingung bisa langsung nonton penjelasannya.', '2024-01-16 18:20:00'),
(2, 1, 'Coba cek di perpustakaan sekolah atau kota. Biasanya ada buku-buku UTBK yang bisa dipinjam gratis.', '2024-01-16 19:10:00'),

-- Replies untuk "Jadwal Belajar yang Efektif" (discussion_id = 3)
(3, 1, 'Saya biasanya belajar 2-3 jam setelah pulang sekolah. Pagi hari untuk review materi yang sudah dipelajari.', '2024-01-17 10:30:00'),
(3, 1, 'Kalau saya, weekend digunakan untuk latihan soal intensif. Hari biasa untuk belajar teori dan konsep.', '2024-01-17 11:15:00'),
(3, 1, 'Jangan lupa untuk jadwalkan waktu istirahat juga. Otak butuh recovery time supaya tidak burnout.', '2024-01-17 12:00:00'),
(3, 1, 'Saya pakai teknik Pomodoro: 25 menit belajar, 5 menit istirahat. Ini membantu untuk fokus dan tidak lelah.', '2024-01-17 13:45:00'),
(3, 1, 'Kalau bisa, buat jadwal yang fleksibel. Jangan terlalu kaku karena bisa bikin stress.', '2024-01-17 14:30:00'),
(3, 1, 'Saya sarankan untuk evaluasi jadwal setiap minggu. Sesuaikan dengan progress dan kebutuhan belajar.', '2024-01-17 15:15:00'),
(3, 1, 'Jangan lupa untuk jadwalkan waktu untuk hobi atau refreshing. Balance itu penting banget.', '2024-01-17 16:00:00'),
(3, 1, 'Tips dari saya: buat checklist harian. Ini membantu untuk track progress dan tetap termotivasi.', '2024-01-17 17:20:00'),
(3, 1, 'Saya juga sarankan untuk belajar di tempat yang nyaman dan minim distraksi. Konsentrasi jadi lebih maksimal.', '2024-01-17 18:10:00'),
(3, 1, 'Kalau bisa, cari waktu belajar yang sesuai dengan kondisi tubuh. Ada yang lebih fokus pagi, ada yang malam.', '2024-01-17 19:00:00'),
(3, 1, 'Jangan lupa untuk reward diri sendiri setelah mencapai target belajar. Ini membantu untuk tetap semangat.', '2024-01-17 20:15:00'),
(3, 1, 'Terima kasih banyak tipsnya! Saya akan coba terapkan jadwal yang lebih terstruktur. Semoga berhasil! 🙏', '2024-01-17 21:00:00'),

-- Replies untuk "Soal Matematika Sulit Banget!" (discussion_id = 4)
(4, 1, 'Soal limit itu memang tricky. Coba pakai metode substitusi langsung dulu.', '2024-01-18 17:30:00'),
(4, 1, 'Kalau substitusi langsung tidak bisa, coba pakai metode L\'Hopital. Biasanya untuk bentuk tak tentu.', '2024-01-18 18:15:00'),
(4, 1, 'Saya juga bingung dengan soal itu. Tapi setelah lihat pembahasan, ternyata ada trik khusus untuk menyelesaikannya.', '2024-01-18 19:00:00'),
(4, 1, 'Coba cek di YouTube, ada banyak video pembahasan soal limit yang mirip dengan soal itu.', '2024-01-18 20:20:00'),

-- Replies untuk "Pembahasan Soal Fisika" (discussion_id = 5)
(5, 1, 'Mantap! Saya juga mau share pembahasan soal yang lain. Kita bisa saling belajar.', '2024-01-19 12:45:00'),
(5, 1, 'Soal fisika kemarin memang tricky ya. Tapi setelah dipahami konsepnya jadi lebih mudah.', '2024-01-19 13:30:00'),
(5, 1, 'Ada yang bisa jelasin soal tentang momentum? Saya masih bingung dengan konsepnya.', '2024-01-19 14:15:00'),
(5, 1, 'Momentum itu hasil kali massa dengan kecepatan. Yang penting ingat rumusnya: p = mv', '2024-01-19 15:00:00'),
(5, 1, 'Kalau ada tumbukan, momentum total sebelum dan sesudah tumbukan harus sama (kekekalan momentum).', '2024-01-19 16:30:00'),
(5, 1, 'Jangan lupa juga hukum Newton. F = ma, itu dasar dari semua konsep fisika.', '2024-01-19 17:15:00'),
(5, 1, 'Saya sarankan untuk banyak latihan soal fisika. Semakin sering latihan, semakin paham konsepnya.', '2024-01-19 18:00:00'),
(5, 1, 'Ada yang punya tips untuk mengingat rumus fisika? Saya sering lupa rumus-rumus penting.', '2024-01-19 19:20:00'),
(5, 1, 'Tips dari saya: buat cheat sheet berisi rumus-rumus penting. Bisa dibawa saat belajar.', '2024-01-19 20:10:00'),

-- Replies untuk "Tips Mengerjakan Soal Kimia Cepat" (discussion_id = 6)
(6, 1, 'Untuk soal kimia, yang penting adalah memahami konsep dasar dulu. Jangan langsung hafal rumus.', '2024-01-20 14:30:00'),
(6, 1, 'Setuju! Kalau sudah paham konsepnya, rumus jadi lebih mudah diingat dan diterapkan.', '2024-01-20 15:15:00'),
(6, 1, 'Saya biasanya baca soal dengan teliti dulu. Kadang ada clue penting di dalam soal.', '2024-01-20 16:00:00'),
(6, 1, 'Jangan lupa untuk cek satuan. Kadang jawaban salah karena salah satuan.', '2024-01-20 17:20:00'),
(6, 1, 'Tips dari saya: buat tabel periodik yang mudah dibaca. Ini membantu untuk soal struktur atom.', '2024-01-20 18:10:00'),
(6, 1, 'Kalau bisa, hafal beberapa konstanta penting seperti bilangan Avogadro, konstanta gas ideal, dll.', '2024-01-20 19:00:00');

-- Insert sample likes
INSERT INTO discussion_likes (user_id, discussion_id, reply_id, created_at) VALUES
-- Likes untuk discussions (semua menggunakan user_id = 1)
(1, 1, NULL, '2024-01-15 11:00:00'),
(1, 1, NULL, '2024-01-15 11:30:00'),
(1, 1, NULL, '2024-01-15 12:00:00'),
(1, 1, NULL, '2024-01-15 12:30:00'),
(1, 1, NULL, '2024-01-15 13:00:00'),
(1, 1, NULL, '2024-01-15 13:30:00'),
(1, 1, NULL, '2024-01-15 14:00:00'),
(1, 1, NULL, '2024-01-15 14:30:00'),
(1, 1, NULL, '2024-01-15 15:00:00'),
(1, 1, NULL, '2024-01-15 15:30:00'),
(1, 1, NULL, '2024-01-15 16:00:00'),
(1, 1, NULL, '2024-01-15 16:30:00'),

-- Likes untuk replies (semua menggunakan user_id = 1)
(1, NULL, 1, '2024-01-15 12:00:00'),
(1, NULL, 1, '2024-01-15 12:15:00'),
(1, NULL, 1, '2024-01-15 12:30:00'),
(1, NULL, 1, '2024-01-15 12:45:00'),
(1, NULL, 1, '2024-01-15 13:00:00'),
(1, NULL, 1, '2024-01-15 13:15:00'),
(1, NULL, 1, '2024-01-15 13:30:00'),
(1, NULL, 1, '2024-01-15 13:45:00'),
(1, NULL, 1, '2024-01-15 14:00:00'),
(1, NULL, 1, '2024-01-15 14:15:00'),
(1, NULL, 1, '2024-01-15 14:30:00'),
(1, NULL, 1, '2024-01-15 14:45:00');

-- Insert sample tag mappings
INSERT INTO discussion_tag_map (discussion_id, tag_id) VALUES
-- Tags untuk "Tips Menghadapi UTBK 2024"
(1, 1), -- UTBK
(1, 10), -- Tips & Trik
(1, 11), -- Motivasi

-- Tags untuk "Rekomendasi Buku Latihan UTBK"
(2, 1), -- UTBK
(2, 10), -- Tips & Trik

-- Tags untuk "Jadwal Belajar yang Efektif"
(3, 1), -- UTBK
(3, 10), -- Tips & Trik
(3, 11), -- Motivasi

-- Tags untuk "Soal Matematika Sulit Banget!"
(4, 1), -- UTBK
(4, 2), -- Matematika
(4, 9), -- Saintek

-- Tags untuk "Pembahasan Soal Fisika"
(5, 1), -- UTBK
(5, 3), -- Fisika
(5, 9), -- Saintek

-- Tags untuk "Tips Mengerjakan Soal Kimia Cepat"
(6, 1), -- UTBK
(6, 4), -- Kimia
(6, 9), -- Saintek
(6, 10), -- Tips & Trik

-- Tags untuk "Motivasi untuk Teman-teman yang Sedang Galau"
(7, 1), -- UTBK
(7, 11), -- Motivasi

-- Tags untuk "Error di Platform?"
(8, 1), -- UTBK
(8, 12), -- Pengumuman

-- Tags untuk "Rekomendasi Channel YouTube untuk Belajar UTBK"
(9, 1), -- UTBK
(9, 10), -- Tips & Trik

-- Tags untuk "Strategi Menjawab Soal TPS"
(10, 1), -- UTBK
(10, 10), -- Tips & Trik

-- Tags untuk "Pembahasan Soal Biologi"
(11, 1), -- UTBK
(11, 5), -- Biologi
(11, 9), -- Saintek

-- Tags untuk "Pengalaman Pertama Ikut Tryout Online"
(12, 1), -- UTBK
(12, 11); -- Motivasi
```

## 3. ADMIN QUERIES (Opsional)

```sql
-- Admin membuat tag baru
INSERT INTO discussion_tags (name, description, color, is_active, created_by) VALUES
('Teknologi', 'Diskusi tentang teknologi pendidikan', '#10B981', 1, 1);

-- Admin mengupdate tag
UPDATE discussion_tags 
SET description = 'Diskusi tentang UTBK dan SNBT', color = '#DC2626'
WHERE name = 'UTBK';

-- Admin menonaktifkan tag
UPDATE discussion_tags 
SET is_active = 0 
WHERE name = 'Pengumuman';

-- Admin mengaktifkan tag
UPDATE discussion_tags 
SET is_active = 1 
WHERE name = 'Pengumuman';

-- Admin melihat semua tags
SELECT id, name, description, color, is_active, created_at 
FROM discussion_tags 
WHERE is_active = 1 
ORDER BY name;

-- Admin menghapus tag (soft delete) - ganti angka 1 dengan ID tag yang ingin dihapus
UPDATE discussion_tags 
SET is_active = 0 
WHERE id = 1;

-- Contoh: Menghapus tag dengan ID 5
UPDATE discussion_tags 
SET is_active = 0 
WHERE id = 5;
```

