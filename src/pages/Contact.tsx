import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, CheckCircle, XCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";

const contactInfo = [
  {
    icon: Clock,
    label: "Çalışma Saatleri",
    value: "7/24",
    href: "#",
  },
  {
    icon: Phone,
    label: "Telefon No:",
    value: "+90 533 871 20 42",
    href: "tel:+905338712042",
  },
  {
    icon: MapPin,
    label: "Konum",
    value: "Dr. Remzi Gönenç Sk, Lefkoşa 99010",
    href: "#",
  },
  {
    icon: Mail,
    label: "Mail Adresimiz",
    value: "info@kibrispasteurlab.com",
    href: "mailto:info@kibrispasteurlab.com",
  },
];

export default function Contact() {
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
    const params = new URLSearchParams();

    formData.forEach((value, key) => {
      params.append(key, value.toString());
    });

    fetch(`${SCRIPT_URL}?${params.toString()}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result === "success") {
          setSubmitStatus("success");
          e.target.reset();
        } else {
          setSubmitStatus("error");
        }
      })
      .catch(() => {
        setSubmitStatus("error");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <Layout>
      <PageHeader
        title="İletişim"
        description="Sorularınız için bize ulaşın. Size yardımcı olmaktan memnuniyet duyarız."
        breadcrumbs={[{ label: "İletişim" }]}
      />

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="heading-2 text-foreground mb-6">Bize Ulaşın</h2>
              <p className="body-large mb-8">
                Sorularınız, önerileriniz veya randevu talepleriniz için
                aşağıdaki formu doldurabilir veya iletişim bilgilerimizi
                kullanabilirsiniz.
              </p>

              {/* Contact Info - Flat Design */}
              <div className="space-y-6 mb-8">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-4">
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-lg">
                        {info.label}
                      </div>
                      <div className="text-foreground text-base">
                        {info.href !== "#" ? (
                          <a
                            href={info.href}
                            className="hover:text-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          info.value
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                variant="whatsapp"
                size="lg"
                className="w-full sm:w-auto"
                asChild
              >
                <a
                  href="https://wa.me/905338712042"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="w-5 h-5" /> WhatsApp ile İletişime
                  Geçin
                </a>
              </Button>
            </div>

            <div>
              <h3 className="heading-4 text-foreground mb-6">İletişim Formu</h3>

              {/* Success Message */}
              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-green-800 mb-1">
                        Mesajınız Gönderildi!
                      </h4>
                      <p className="text-green-700 text-sm">
                        Teşekkürler! Mesajınız başarıyla iletildi. En kısa
                        sürede size geri dönüş yapacağız.
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
                        Mesajınız gönderilemedi. Lütfen tekrar deneyiniz veya
                        telefon numaramızdan bize ulaşınız.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Ad Soyad *
                  </label>
                  <Input
                    name="ad_soyad"
                    placeholder="Adınız Soyadınız"
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
                    Konu *
                  </label>
                  <Input
                    name="konu"
                    placeholder="Mesajınızın konusu"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Mesajınız *
                  </label>
                  <Textarea
                    name="mesaj"
                    placeholder="Mesajınızı yazın..."
                    rows={6}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Gönderiliyor..." : "Gönder"}
                </Button>
              </form>
            </div>
          </div>

          {/* Map */}
          <div className="mt-16">
            <h3 className="heading-4 text-foreground mb-6 text-center">
              Konumumuz
            </h3>
            <div className="rounded-2xl overflow-hidden h-96 bg-secondary">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3186.892!2d33.363!3d35.175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDEwJzMwLjAiTiAzM8KwMjEnNDcuMCJF!5e0!3m2!1sen!2s!4v1702000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Pasteur Lab Konumu - Dr. Remzi Gönenç Sk, Lefkoşa"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
