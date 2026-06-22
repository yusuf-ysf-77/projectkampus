import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Calendar, ClipboardList, Bell, Plus } from "lucide-react";
import { jadwal, tugas, pengingat } from "@/app/data/mock-data";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";

export default function DashboardPage() {
  const jadwalTerdekat = jadwal
    .filter((j) => j.status !== "completed")
    .slice(0, 3);
  const tugasBelumSelesai = tugas.filter((t) => t.status !== "selesai");
  const pengingatAktif = pengingat.filter((p) => p.aktif);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Selamat datang kembali, Firza!
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Jadwal Terdekat
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jadwalTerdekat.length}</div>
            <p className="text-xs text-muted-foreground">jadwal mendatang</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Tugas Belum Selesai
            </CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tugasBelumSelesai.length}</div>
            <p className="text-xs text-muted-foreground">tugas aktif</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Pengingat Aktif
            </CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pengingatAktif.length}</div>
            <p className="text-xs text-muted-foreground">pengingat aktif</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Jadwal Terdekat</CardTitle>
            <Button asChild size="sm" variant="outline">
              <Link href="/sketsa/jadwal">
                <Plus className="mr-1 h-3 w-3" />
                Lihat Semua
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {jadwalTerdekat.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.judul}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.tanggal} • {item.waktuMulai} - {item.waktuSelesai}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">{item.kategori}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Tugas Aktif</CardTitle>
            <Button asChild size="sm" variant="outline">
              <Link href="/sketsa/tugas">Lihat</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tugasBelumSelesai.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="text-sm font-medium">{item.judul}</p>
                    <p className="text-xs text-muted-foreground">
                      Deadline: {item.deadline}
                    </p>
                  </div>
                  <Badge
                    variant={
                      item.prioritas === "tinggi"
                        ? "destructive"
                        : item.prioritas === "sedang"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {item.prioritas}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
