const express = require('express'); 
const cors = require('cors');        
const db = require('./db');     
require('dotenv').config();         

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server Backend Berhasil Jalan!');
});

app.get('/api/gerakan', (req, res) => {
    const sql = "SELECT * FROM gerakan";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
})

app.get('/api/programs', (req, res) => {
    const sql = "SELECT * FROM program_workout";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.post('/api/jadwal', (req, res) => {
    const { program_id, tanggal } = req.body;

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

app.post('/api/gerakan', (req, res) => {
    const { nama_gerakan, target_otot, video_url, thumbnail, kesalahan, tips } = req.body;
    const sql = "INSERT INTO gerakan (nama_gerakan, target_otot, video_url, thumbnail, kesalahan, tips) VALUES (?, ?, ?, ?, ?, ?)";
    
    db.query(sql, [nama_gerakan, target_otot, video_url, thumbnail, kesalahan, tips], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Gerakan berhasil ditambahkan!", id: result.insertId });
    });
});

app.get('/api/gerakan/:id', (req, res) => {
  const idGerakan = req.params.id;
  const sql = "SELECT * FROM gerakan WHERE id = ?";
  
  db.query(sql, [idGerakan], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ message: "Gerakan tidak ditemukan!" });
    
    res.json(result[0]);
  });
});

app.post('/api/programs', (req, res) => {
    const { nama_program, durasi_total, jumlah_gerakan, deskripsi } = req.body;
    const sql = "INSERT INTO program_workout (nama_program, durasi_total, jumlah_gerakan, deskripsi) VALUES (?, ?, ?, ?)";
    
    db.query(sql, [nama_program, durasi_total, jumlah_gerakan, deskripsi], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Program berhasil dibuat!", id: result.insertId });
    });
});

app.post('/api/detail-program', (req, res) => {
  const { program_id, gerakan_id } = req.body;
  const sql = "INSERT INTO detail_program (program_id, gerakan_id) VALUES (?, ?)";
  
  db.query(sql, [program_id, gerakan_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Gerakan berhasil didaftarkan ke dalam program!" });
  });
});

app.get('/api/programs/:id/gerakan', (req, res) => {
  const programId = req.params.id;

  const sql = `
    SELECT p.nama_program, p.durasi_total, p.jumlah_gerakan,
           g.id AS gerakan_id, g.nama_gerakan, g.thumbnail
    FROM program_workout p
    JOIN detail_program dp ON p.id = dp.program_id
    JOIN gerakan g ON dp.gerakan_id = g.id
    WHERE p.id = ?
  `;

  db.query(sql, [programId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    
    if (results.length === 0) {
      return res.json({
        nama_program: "Program Latihan",
        durasi_total: 0,
        jumlah_gerakan: 0,
        daftar_latihan: [] 
      });
    }

    const programInfo = {
      nama_program: results[0].nama_program,
      durasi_total: results[0].durasi_total,
      jumlah_gerakan: results[0].jumlah_gerakan,
      daftar_latihan: results.map(row => ({
        id: row.gerakan_id,
        nama_gerakan: row.nama_gerakan,
        thumbnail: row.thumbnail
      }))
    };

    res.json(programInfo);
  });
});

app.get('/api/jadwal/:tanggal', (req, res) => {
  const { tanggal } = req.params;
  
  const sql = `
    SELECT j.id, j.tanggal, j.is_done, p.nama_program, p.durasi_total, p.id AS program_id
    FROM jadwal_user j
    JOIN program_workout p ON j.program_id = p.id
    WHERE j.tanggal = ?
  `;

  db.query(sql, [tanggal], (err, results) => {
    if (err) {
      console.error("SQL Error saat GET Jadwal:", err.message);
      return res.status(200).json([]); // Biar frontend gak blank kalau error
    }
    res.json(results);
  });
});

app.post('/api/jadwal', (req, res) => {
  const { tanggal, program_id } = req.body;
  
  console.log("Menerima request tambah jadwal:", { tanggal, program_id });

  if (!tanggal || !program_id) {
    return res.status(400).json({ error: "Data tanggal atau program_id tidak boleh kosong!" });
  }

  const sql = "INSERT INTO jadwal_user (tanggal, program_id, is_completed) VALUES (?, ?, 0)";
  
  db.query(sql, [tanggal, program_id], (err, result) => {
    if (err) {
      console.error("Gagal INSERT ke database:", err.message);
      return res.status(500).json({ error: err.message });
    }
    
    console.log("Sukses memasukkan jadwal baru dengan ID:", result.insertId);
    res.status(201).json({ message: "Jadwal berhasil ditambahkan!", id: result.insertId });
  });
});

app.put('/api/jadwal/:id', (req, res) => {
  const { id } = req.params;
  
  const { is_completed } = req.body; 
  
  const sql = "UPDATE jadwal_user SET is_done = ? WHERE id = ?";
  
  db.query(sql, [is_completed, id], (err, result) => {
    if (err) {
      console.error("Gagal update status is_done:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Status is_done berhasil diperbarui di MySQL!" });
  });
});

app.delete('/api/jadwal/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM jadwal_user WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Jadwal berhasil dihapus!" });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server nyala di port ${PORT}`);
});