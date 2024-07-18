const mongoose = require('mongoose'); // Memanggil modul Mongoose untuk berinteraksi dengan database MongoDB.
const dotenv = require('dotenv'); // Memanggil modul dotenv untuk mengelola variabel lingkungan.

dotenv.config(); // Memuat variabel lingkungan dari file .env ke dalam process.env.

try {
  mongoose.connect(process.env.MONGO_URI);

  const db = mongoose.connection; // Menyimpan objek koneksi database MongoDB dalam variabel db.

  // Mendengarkan event error pada koneksi database dan menampilkan pesan kesalahan ke konsol.
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => { // Mendengarkan event open pada koneksi database dan menampilkan pesan sukses ke konsol.
    console.log('Connected to MongoDB');
  });
} catch (error) { // Menangkap kesalahan yang mungkin terjadi saat membuat koneksi ke database MongoDB.
  console.error('Error connecting to MongoDB:', error.message); // Menampilkan pesan kesalahan jika koneksi gagal ke konsol.
}
