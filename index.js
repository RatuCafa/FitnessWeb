const express = require('express'); 
const cors = require('cors');        
const db = require('./db');     
require('dotenv').config();        

const app = express();

app.use(cors());
app.use(express.json());

// 1. Check Server Status
app.get('/', (req, res) => {
  res.send('Server Backend Berhasil Jalan!');
});

// ==========================================
//           MANAJEMEN GERAKAN (EXERCISE)
// ==========================================

// Ambil Semua Gerakan
app.get('/api/gerakan', (req, res) => {
  const sql = "SELECT * FROM gerakan";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Ambil Detail Gerakan Spesifik Berdasarkan ID
app.get('/api/gerakan/:id', (req, res) => {
  const idGerakan = req.params.id;
  const sql = "SELECT * FROM gerakan WHERE id = ?";
  
  db.query(sql, [idGerakan], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ message: "Gerakan tidak ditemukan!" });
    
    res.json(result[0]);
  });
});

// Tambah Gerakan Baru via Postman / Admin Form
app.post('/api/gerakan', (req, res) => {
  const { nama_gerakan, target_otot, video_url, thumbnail, kesalahan, tips } = req.body;
  const sql = "INSERT INTO gerakan (nama_gerakan, target_otot, video_url, thumbnail, kesalahan, tips) VALUES (?, ?, ?, ?, ?, ?)";
    
  db.query(sql, [nama_gerakan, target_otot, video_url, thumbnail, kesalahan, tips], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Gerakan berhasil ditambahkan!", id: result.insertId });
  });
});


// ==========================================
//           MANAJEMEN PROGRAM WORKOUT
// ==========================================

// Ambil Semua Program - DURASI TOTAL AUTOMATIC SUM & COUNT DARI DETAIL_PROGRAM
// Ambil Semua Program - DURASI TOTAL REAL-TIME DALAM SATUAN MENIT
app.get('/api/programs', (req, res) => {
  console.log("Memulai query hitung durasi otomatis...");

  const sql = `
    SELECT p.id, p.nama_program, p.deskripsi,
           (SELECT IFNULL(SUM(durasi), 0) FROM detail_program WHERE program_id = p.id) AS total_menit,
           (SELECT COUNT(gerakan_id) FROM detail_program WHERE program_id = p.id) AS total_gerakan
    FROM program_workout p
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Gagal SQL:", err.message);
      return res.status(500).json({ error: err.message });
    }

    const formatPrograms = results.map(row => {
      return {
        id: row.id,
        nama_program: row.nama_program,
        deskripsi: row.deskripsi,
        durasi_total: row.total_menit, // Langsung ambil nilai SUM murni tanpa dibagi 60
        jumlah_gerakan: row.total_gerakan
      };
    });

    res.json(formatPrograms);
  });
});

// Tambah Program Workout Baru (Cukup isi nama & deskripsi di Postman, durasi otomatis terisi 0 bawaan DB)
app.post('/api/programs', (req, res) => {
  const { nama_program, deskripsi } = req.body;

  const sql = "INSERT INTO program_workout (nama_program, deskripsi) VALUES (?, ?)";
  db.query(sql, [nama_program, deskripsi], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Program berhasil dibuat!", id: result.insertId });
  });
});


app.get('/api/programs/:id/gerakan', (req, res) => {
  const programId = req.params.id;

  const sql = `
    SELECT p.nama_program,
           (SELECT IFNULL(SUM(durasi), 0) FROM detail_program WHERE program_id = p.id) AS total_menit_semua_gerakan,
           (SELECT COUNT(gerakan_id) FROM detail_program WHERE program_id = p.id) AS total_jumlah_gerakan,
           g.id AS gerakan_id, g.nama_gerakan, g.thumbnail, dp.durasi AS durasi_gerakan
    FROM program_workout p
    JOIN detail_program dp ON p.id = dp.program_id
    JOIN gerakan g ON dp.gerakan_id = g.id
    WHERE p.id = ?
  `;

  db.query(sql, [programId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Program tidak ditemukan atau belum memiliki gerakan" });

    const programInfo = {
      nama_program: results[0].nama_program,
      durasi_total: results[0].total_menit_semua_gerakan, // Langsung murni tanpa pembulatan Math.ceil
      jumlah_gerakan: results[0].total_jumlah_gerakan, 
      daftar_latihan: results.map(row => ({
        id: row.gerakan_id,
        nama_gerakan: row.nama_gerakan,
        thumbnail: row.thumbnail,
        durasi: row.durasi_gerakan 
      }))
    };

    res.json(programInfo);
  });
});

// Daftarkan Gerakan & Detik Durasi ke Dalam Detail Program
app.post('/api/detail-program', (req, res) => {
  const { program_id, gerakan_id, urutan, durasi } = req.body;

  const sql = `
    INSERT INTO detail_program (program_id, gerakan_id, urutan, durasi) 
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [program_id, gerakan_id, urutan, durasi], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Gerakan dan durasi berhasil ditambahkan ke program!" });
  });
});


// ==========================================
//         MANAJEMEN JADWAL KALENDER USER
// ==========================================

// Ambil Jadwal Berdasarkan Parameter Tanggal YYYY-MM-DD (DURASI SINKRON REAL-TIME DARI DETAIL)
// Ambil Detail Gerakan yang Tergabung ke Dalam Suatu Program Workout
app.get('/api/programs/:id/gerakan', (req, res) => {
  const programId = req.params.id;

  const sql = `
    SELECT p.nama_program,
           (SELECT IFNULL(SUM(durasi), 0) FROM detail_program WHERE program_id = p.id) AS total_menit_semua_gerakan,
           (SELECT COUNT(gerakan_id) FROM detail_program WHERE program_id = p.id) AS total_jumlah_gerakan,
           g.id AS gerakan_id, g.nama_gerakan, g.thumbnail, dp.durasi AS durasi_gerakan
    FROM program_workout p
    JOIN detail_program dp ON p.id = dp.program_id
    JOIN gerakan g ON dp.gerakan_id = g.id
    WHERE p.id = ?
  `;

  db.query(sql, [programId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Program tidak ditemukan atau belum memiliki gerakan" });

    const programInfo = {
      nama_program: results[0].nama_program,
      durasi_total: results[0].total_menit_semua_gerakan, // Langsung murni tanpa pembulatan Math.ceil
      jumlah_gerakan: results[0].total_jumlah_gerakan, 
      daftar_latihan: results.map(row => ({
        id: row.gerakan_id,
        nama_gerakan: row.nama_gerakan,
        thumbnail: row.thumbnail,
        durasi: row.durasi_gerakan 
      }))
    };

    res.json(programInfo);
  });
});


// Ambil List Gerakan Workout yang Harus Dilakukan Hari Ini Berdasarkan Jadwal Kalender
// Ambil Jadwal Berdasarkan Parameter Tanggal YYYY-MM-DD (SOLUSI LEFT JOIN ANTI-KOSONG)
app.get('/api/jadwal/:tanggal', (req, res) => {
  const { tanggal } = req.params;
  
  console.log("Backend menerima ketukan pintu kalender untuk tanggal:", tanggal);
  
  // Menggunakan LEFT JOIN agar jadwal tetap keluar walaupun detail_program/program_workout belum lengkap
  const sql = `
    SELECT j.id, j.tanggal, j.is_done, 
           IFNULL(p.nama_program, 'Program Workout') AS nama_program, 
           j.program_id,
           (SELECT IFNULL(SUM(durasi), 0) FROM detail_program WHERE program_id = j.program_id) AS durasi_total
    FROM jadwal_user j
    LEFT JOIN program_workout p ON j.program_id = p.id
    WHERE j.tanggal = ?
  `;

  db.query(sql, [tanggal], (err, results) => {
    if (err) {
      console.error("SQL Error saat GET Jadwal:", err.message);
      return res.status(500).json({ error: err.message }); 
    }
    
    res.json(results);
  });
});

// Tambah Jadwal Latihan Baru (Aman & Sinkron dengan Kolom Database is_done)
app.post('/api/jadwal', (req, res) => {
  const { tanggal, program_id } = req.body;
  
  console.log("Menerima request tambah jadwal:", { tanggal, program_id });

  if (!tanggal || !program_id) {
    return res.status(400).json({ error: "Data tanggal atau program_id tidak boleh kosong!" });
  }

  // Set default nilai is_done = 0 (belum dikerjakan) saat pertama kali dijadwalkan
  const sql = "INSERT INTO jadwal_user (tanggal, program_id, is_done) VALUES (?, ?, 0)";
  
  db.query(sql, [tanggal, program_id], (err, result) => {
    if (err) {
      console.error("Gagal INSERT ke database:", err.message);
      return res.status(500).json({ error: err.message });
    }
    
    console.log("Sukses memasukkan jadwal baru dengan ID:", result.insertId);
    res.status(201).json({ message: "Jadwal berhasil ditambahkan!", id: result.insertId });
  });
});

// Update Status Checklist Selesai Latihan (Mengubah Nilai Kolom is_done)
app.put('/api/jadwal/:id', (req, res) => {
  const { id } = req.params;
  const { is_completed } = req.body; // Menerima payload kiriman status dari Jadwal.jsx

  const sql = "UPDATE jadwal_user SET is_done = ? WHERE id = ?";
  
  db.query(sql, [is_completed, id], (err, result) => {
    if (err) {
      console.error("Gagal update status is_done:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Status is_done berhasil diperbarui di MySQL!" });
  });
});

// Hapus Item Jadwal Latihan Kalender
app.delete('/api/jadwal/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM jadwal_user WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Jadwal berhasil dihapus!" });
  });
});


app.get('/api/dashboard/stats', (req, res) => {
  const today = new Date().toISOString().slice(0, 10); 

  // 1. Query menghitung total detik latihan hari ini (Untuk kebutuhan dashboard utama)
  const sqlTime = `
    SELECT SUM((SELECT IFNULL(SUM(durasi), 0) FROM detail_program WHERE program_id = j.program_id)) AS total_detik_hari_ini
    FROM jadwal_user j
    WHERE j.tanggal = ? AND j.is_done = 1
  `;

  // MODIFIKASI LOGIKA BARU JADWAL KALENDER:
  // 2. Query menghitung TOTAL WORKOUT SELESAI (is_done = 1) MINGGU INI
  const sqlSelesaiMingguIni = `
    SELECT COUNT(*) AS selesai_minggu_ini 
    FROM jadwal_user 
    WHERE YEARWEEK(tanggal, 1) = YEARWEEK(CURDATE(), 1) AND is_done = 1
  `;

  // 3. Query menghitung TOTAL WORKOUT TERJADWAL (Semua data masuk) MINGGU INI
  const sqlTerjadwalMingguIni = `
    SELECT COUNT(*) AS total_terjadwal_minggu_ini 
    FROM jadwal_user 
    WHERE YEARWEEK(tanggal, 1) = YEARWEEK(CURDATE(), 1)
  `;

  db.query(sqlTime, [today], (err, timeResult) => {
    if (err) return res.status(500).json({ error: err.message });

    db.query(sqlSelesaiMingguIni, (err, selesaiResult) => {
      if (err) return res.status(500).json({ error: err.message });

      db.query(sqlTerjadwalMingguIni, (err, terjadwalResult) => {
        if (err) return res.status(500).json({ error: err.message });

        const totalDetik = timeResult[0].total_detik_hari_ini || 0;
        const minutes = Math.floor(totalDetik / 60);
        const seconds = totalDetik % 60;
        const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        // Kirim semua hitungan riil MySQL ke Frontend
        res.json({
          totalTime: formattedTime,
          totalSeconds: totalDetik, 
          selesaiMingguIni: selesaiResult[0].selesai_minggu_ini || 0, // Statistik Atas
          terjadwalMingguIni: terjadwalResult[0].total_terjadwal_minggu_ini || 0 // Statistik Bawah
        });
      });
    });
  });
});


// ==========================================
//          STATISTIK DASHBOARD UTAMA
// ==========================================

app.get('/api/dashboard/stats', (req, res) => {
  const today = new Date().toISOString().slice(0, 10); 

  // 1. Menghitung hanya durasi yang SUDAH DICENTANG (is_done = 1) hari ini
  const sqlTime = `
    SELECT IFNULL(SUM(dp.durasi), 0) AS total_menit_selesai
    FROM jadwal_user j
    LEFT JOIN detail_program dp ON j.program_id = dp.program_id
    WHERE j.tanggal = ? AND j.is_done = 1
  `;

  // 2. Menghitung total durasi dari SELURUH JADWAL hari ini (Target)
  const sqlTargetTime = `
    SELECT IFNULL(SUM(dp.durasi), 0) AS total_menit_target
    FROM jadwal_user j
    LEFT JOIN detail_program dp ON j.program_id = dp.program_id
    WHERE j.tanggal = ?
  `;

  // 3. Hitung total task selesai vs total task minggu ini (Lingkaran Kanan)
  const sqlTasks = `
    SELECT 
      SUM(CASE WHEN is_done = 1 THEN 1 ELSE 0 END) AS selesai_minggu_ini,
      COUNT(*) AS total_minggu_ini
    FROM jadwal_user 
    WHERE YEARWEEK(tanggal, 1) = YEARWEEK(CURDATE(), 1)
  `;

  db.query(sqlTime, [today], (err, timeResult) => {
    if (err) return res.status(500).json({ error: err.message });

    db.query(sqlTargetTime, [today], (err, targetResult) => {
      if (err) return res.status(500).json({ error: err.message });

      db.query(sqlTasks, (err, taskResult) => {
        if (err) return res.status(500).json({ error: err.message });

        const menitSelesai = timeResult[0].total_menit_selesai || 0;
        const menitTarget = targetResult[0].total_menit_target || 0;

        res.json({
          menitSelesai: menitSelesai,
          menitTarget: menitTarget,
          selesaiMingguIni: taskResult[0].selesai_minggu_ini || 0,
          terjadwalMingguIni: taskResult[0].total_minggu_ini || 0 
        });
      });
    });
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server nyala aman di port ${PORT}`);
});