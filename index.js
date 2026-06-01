const express = require('express'); // Import framework Express
const cors = require('cors');        // Agar FE bisa akses BE
const db = require('./db');     
require('dotenv').config();         // Untuk baca file .env

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Agar server bisa membaca data JSON yang dikirim FE

// Route Testing
app.get('/', (req, res) => {
  res.send('Server Backend Berhasil Jalan!');
});

// --- FITUR 1: TUTORIAL (Kamus Gerakan) ---
app.get('/api/gerakan', (req, res) => {
    const sql = "SELECT * FROM gerakan";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
})

// --- FITUR 2: DAFTAR PROGRAM (Pilihan Menu Workout) ---
app.get('/api/programs', (req, res) => {
    const sql = "SELECT * FROM program_workout";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// --- FITUR 3: JADWAL (Simpan pilihan user ke kalender) ---
app.post('/api/jadwal', (req, res) => {
    const { program_id, tanggal } = req.body;

    // Validasi sederhana
    if (!program_id || !tanggal) {
        return res.status(400).json({ message: "Program ID dan Tanggal wajib diisi!" });
    }

    const sql = "INSERT INTO jadwal_user (program_id, tanggal) VALUES (?, ?)";
    
    db.query(sql, [program_id, tanggal], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Gagal menyimpan jadwal" });
        }
        res.status(201).json({ 
            message: "Jadwal berhasil ditambahkan!", 
            id: result.insertId 
        });
    });
});

// --- FITUR 4: WORKOUT (Ambil detail gerakan berdasarkan jadwal hari ini) ---
app.get('/api/workout-hari-ini', (req, res) => {
    const { tanggal } = req.query; // Teman FE kirim tanggal, misal: 2026-05-08
    const sql = `
        SELECT g.nama_gerakan, g.video_url, g.tips 
        FROM jadwal_user j
        JOIN program_workout p ON j.program_id = p.id
        JOIN detail_program dp ON p.id = dp.program_id
        JOIN gerakan g ON dp.gerakan_id = g.id
        WHERE j.tanggal = ?
    `;
    db.query(sql, [tanggal], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// 1. Insert ke Tabel Gerakan (Tutorial)
app.post('/api/gerakan', (req, res) => {
    const { nama_gerakan, target_otot, video_url, thumbnail, kesalahan, tips } = req.body;
    const sql = "INSERT INTO gerakan (nama_gerakan, target_otot, video_url, thumbnail, kesalahan, tips) VALUES (?, ?, ?, ?, ?, ?)";
    
    db.query(sql, [nama_gerakan, target_otot, video_url, thumbnail, kesalahan, tips], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Gerakan berhasil ditambahkan!", id: result.insertId });
    });
});

// Ambil 1 data gerakan spesifik berdasarkan ID
app.get('/api/gerakan/:id', (req, res) => {
  const idGerakan = req.params.id;
  const sql = "SELECT * FROM gerakan WHERE id = ?";
  
  db.query(sql, [idGerakan], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ message: "Gerakan tidak ditemukan!" });
    
    // Kirimkan satu baris data saja (objek pertama dari array result)
    res.json(result[0]);
  });
});

// 2. Insert ke Tabel Program Workout (Paket Latihan)
app.post('/api/programs', (req, res) => {
    const { nama_program, durasi_total, jumlah_gerakan, deskripsi } = req.body;
    const sql = "INSERT INTO program_workout (nama_program, durasi_total, jumlah_gerakan, deskripsi) VALUES (?, ?, ?, ?)";
    
    db.query(sql, [nama_program, durasi_total, jumlah_gerakan, deskripsi], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Program berhasil dibuat!", id: result.insertId });
    });
});

// Jalankan Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server nyala di port ${PORT}`);
});