import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, MapPin, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

export default function Appointment() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbz7vMT1qM6Q9Dkifsao-fXBrD_w77e_pK9IyZEbAE2QPhT0a5zIcwlTNwsMWWjFBEgdYQ/exec";

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formData = new FormData(e.target);

    // IMPORTANT: route to the correct sheet
    formData.append("sheet", "randevu-formu");

    const params = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      params.append(key, value as string);
    }

    fetch(`${SCRIPT_URL}?${params.toString()}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result === "success") {
          setSubmitStatus("success");
          e.target.reset();
          // Reset status after 7 seconds for appointment (longer than contact)
          setTimeout(() => setSubmitStatus("idle"), 7000);
        } else {
          setSubmitStatus("error");
          setTimeout(() => setSubmitStatus("idle"), 5000);
        }
      })
      .catch(() => {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus("idle"), 5000);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <Layout>
      <PageHeader
        title="Randevu Al"
        description="Online randevu oluşturun veya evde numune alma hizmeti talep edin."
        breadcrumbs={[{ label: "Randevu" }]}
        badge="Kolay Randevu"
      />

      <section className="section-padding">
        <div className="container-narrow">
          <div className="bg-card rounded-2xl p-8 border border-border">
            <div className="grid md:grid-cols-3 gap-6 mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Tarih Seçin</div>
                  <div className="text-muted-foreground text-sm">
                    Uygun günü belirleyin
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Saat Seçin</div>
                  <div className="text-muted-foreground text-sm">
                    07:00 - 23:00 arası
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Konum Seçin</div>
                  <div className="text-muted-foreground text-sm">
                    Şube veya evde hizmet
                  </div>
                </div>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <h3 className="heading-4 text-foreground mb-4">Randevu Formu</h3>

              {/* Success Message */}
              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-green-800 mb-1">
                        Randevunuz Oluşturuldu!
                      </h4>
                      <p className="text-green-700 text-sm">
                        Teşekkürler! Randevu talebiniz başarıyla alındı. En kısa
                        sürede sizinle iletişime geçeceğiz.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-red-800 mb-1">
                        Bir Hata Oluştu
                      </h4>
                      <p className="text-red-700 text-sm">
                        Randevu talebiniz gönderilemedi. Lütfen tekrar deneyiniz
                        veya telefon numaramızdan bize ulaşınız.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Ad *
                  </label>
                  <Input name="ad" placeholder="Ad" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Soyad *
                  </label>
                  <Input name="soyad" placeholder="Soyad" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Telefon *
                </label>
                <Input
                  name="telefon"
                  type="tel"
                  placeholder="0501 234 56 78"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  E-posta *
                </label>
                <Input
                  name="e_posta"
                  type="email"
                  placeholder="ornek@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Yorum veya Mesaj
                </label>
                <Textarea
                  name="mesaj"
                  placeholder="Randevunuz hakkında eklemek istediğiniz notlar..."
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Gönderiliyor..." : "Randevu Oluştur"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
