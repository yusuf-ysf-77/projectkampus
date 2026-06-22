export interface Jadwal {
  id: string;
  judul: string;
  deskripsi: string;
  tanggal: string;
  waktuMulai: string;
  waktuSelesai: string;
  kategori: string;
  status: "upcoming" | "ongoing" | "completed";
}

export interface Tugas {
  id: string;
  judul: string;
  deskripsi: string;
  deadline: string;
  prioritas: "tinggi" | "sedang" | "rendah";
  status: "belum" | "proses" | "selesai";
  kategori: string;
}

export interface Pengingat {
  id: string;
  judul: string;
  pesan: string;
  waktu: string;
  pengulangan: "sekali" | "harian" | "mingguan" | "bulanan";
  aktif: boolean;
}

export interface User {
  nama: string;
  email: string;
  avatar: string;
  role: string;
}

export const user: User = {
  nama: "Firza",
  email: "firza@example.com",
  avatar: "/avatars/default.png",
  role: "Administrator",
};

export const jadwal: Jadwal[] = [
  {
    id: "1",
    judul: "Rapat Tim Development",
    deskripsi: "Rapat sprint planning minggu ini",
    tanggal: "2026-06-15",
    waktuMulai: "09:00",
    waktuSelesai: "11:00",
    kategori: "Meeting",
    status: "upcoming",
  },
  {
    id: "2",
    judul: "Review Kode",
    deskripsi: "Review pull request fitur dashboard",
    tanggal: "2026-06-15",
    waktuMulai: "14:00",
    waktuSelesai: "15:30",
    kategori: "Development",
    status: "upcoming",
  },
  {
    id: "3",
    judul: "Workshop UI/UX",
    deskripsi: "Pelatihan desain antarmuka pengguna",
    tanggal: "2026-06-16",
    waktuMulai: "10:00",
    waktuSelesai: "12:00",
    kategori: "Training",
    status: "upcoming",
  },
  {
    id: "4",
    judul: "Presentasi Proyek",
    deskripsi: "Presentasi progress proyek kepada klien",
    tanggal: "2026-06-17",
    waktuMulai: "13:00",
    waktuSelesai: "15:00",
    kategori: "Meeting",
    status: "upcoming",
  },
  {
    id: "5",
    judul: "Standup Harian",
    deskripsi: "Daily standup dengan tim",
    tanggal: "2026-06-14",
    waktuMulai: "08:30",
    waktuSelesai: "08:45",
    kategori: "Meeting",
    status: "completed",
  },
];

export const tugas: Tugas[] = [
  {
    id: "1",
    judul: "Buat Desain Dashboard",
    deskripsi: "Mendesain tampilan utama dashboard dengan komponen card dan chart",
    deadline: "2026-06-18",
    prioritas: "tinggi",
    status: "proses",
    kategori: "Design",
  },
  {
    id: "2",
    judul: "Implementasi API Jadwal",
    deskripsi: "Membuat endpoint REST untuk CRUD jadwal",
    deadline: "2026-06-20",
    prioritas: "tinggi",
    status: "belum",
    kategori: "Backend",
  },
  {
    id: "3",
    judul: "Halaman Profil User",
    deskripsi: "Membuat halaman profil dan form ubah password",
    deadline: "2026-06-19",
    prioritas: "sedang",
    status: "belum",
    kategori: "Frontend",
  },
  {
    id: "4",
    judul: "Setup Database",
    deskripsi: "Konfigurasi database dan migration schema",
    deadline: "2026-06-16",
    prioritas: "tinggi",
    status: "selesai",
    kategori: "Backend",
  },
  {
    id: "5",
    judul: "Testing Halaman Login",
    deskripsi: "Menulis unit test untuk fitur login",
    deadline: "2026-06-15",
    prioritas: "sedang",
    status: "selesai",
    kategori: "Testing",
  },
  {
    id: "6",
    judul: " dokumentasi API",
    deskripsi: "Menulis dokumentasi endpoint API menggunakan Swagger",
    deadline: "2026-06-22",
    prioritas: "rendah",
    status: "belum",
    kategori: "Dokumentasi",
  },
];

export const pengingat: Pengingat[] = [
  {
    id: "1",
    judul: "Rapat Tim",
    pesan: "Jangan lupa rapat tim dalam 30 menit",
    waktu: "2026-06-15T08:30",
    pengulangan: "harian",
    aktif: true,
  },
  {
    id: "2",
    judul: "Deadline Tugas",
    pesan: "Tugas desain dashboard harus selesai hari ini",
    waktu: "2026-06-18T09:00",
    pengulangan: "sekali",
    aktif: true,
  },
  {
    id: "3",
    judul: "Backup Database",
    pesan: "Waktu backup database mingguan",
    waktu: "2026-06-16T23:00",
    pengulangan: "mingguan",
    aktif: true,
  },
  {
    id: "4",
    judul: "Update Laporan",
    pesan: "Kirim laporan progress bulanan",
    waktu: "2026-06-30T17:00",
    pengulangan: "bulanan",
    aktif: false,
  },
];

export const kategoriJadwal = ["Meeting", "Training", "Development", "Lainnya"];
export const kategoriTugas = ["Frontend", "Backend", "Design", "Testing", "Dokumentasi"];
export const pengulanganOptions = ["sekali", "harian", "mingguan", "bulanan"];
