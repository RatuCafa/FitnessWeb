const mysql = require('mysql2');

// Buat koneksi ke database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // Default XAMPP
  password: '',      // Default XAMPP biasanya kosong
  database: 'web_fitness'
});


module.exports = connection;