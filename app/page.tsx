import Link from "next/link";
import { Calendar, Bell, ClipboardList, User, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Penjadwalan",
    desc: "Atur jadwal kegiatan harian, mingguan, dan bulanan dalam satu tempat.",
  },
  {
    icon: Bell,
    title: "Pengingat",
    desc: "Tidak ada yang terlewatkan lagi dengan sistem pengingat otomatis.",
  },
  {
    icon: ClipboardList,
    title: "Manajemen Tugas",
    desc: "Kelola tugas berdasarkan prioritas dan pantau progresnya.",
  },
  {
    icon: User,
    title: "Profil Pribadi",
    desc: "Kelola akun dan pengaturan pribadi Anda dengan mudah.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            S
          </div>
          <span className="text-lg font-bold">ScheduleApp</span>
        </div>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Masuk
          <ArrowRight className="h-4 w-4" />
        </Link>
      </nav>

      <section className="flex flex-col items-center justify-center px-6 py-24 text-center md:py-32">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground mb-6">
          <Calendar className="h-4 w-4 text-primary" />
          Sistem Penjadwalan & Pengingat
        </div>
        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
          Atur Waktu Anda{" "}
          <span className="text-primary">Lebih Efisien</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Kelola jadwal, pengingat, dan tugas dalam satu platform.
          Tingkatkan produktivitas harian Anda dengan ScheduleApp.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Mulai Sekarang
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#fitur"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-7 py-3 text-sm font-medium hover:bg-muted transition-colors"
          >
            Pelajari Lebih Lanjut
          </a>
        </div>
      </section>

      <section id="fitur" className="border-t border-border bg-muted/40 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Fitur Unggulan</h2>
            <p className="mt-3 text-muted-foreground">
              Semua yang Anda butuhkan untuk mengelola waktu dengan baik.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-border bg-card p-6 hover:shadow-md transition-shadow"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-8 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} ScheduleApp. All rights reserved.
      </footer>
    </div>
  );
}
