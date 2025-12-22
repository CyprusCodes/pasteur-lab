import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Clock,
  MapPin,
  Upload,
  FileText,
  X,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useState } from "react";

function FileUploadArea({
  onFilesChange,
}: {
  onFilesChange: (urls: string[]) => void;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      if (files.length + newFiles.length <= 5) {
        setFiles([...files, ...newFiles]);

        // TODO: Upload to S3 and get URLs
        // For now, create placeholder URLs
        const placeholderUrls = newFiles.map(
          (file) =>
            `https://s3-bucket-placeholder.com/${Date.now()}-${file.name}`
        );
        const newUploadedUrls = [...uploadedUrls, ...placeholderUrls];
        setUploadedUrls(newUploadedUrls);
        onFilesChange(newUploadedUrls);
      } else {
        alert("En fazla 5 dosya yükleyebilirsiniz.");
      }
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newUrls = uploadedUrls.filter((_, i) => i !== index);
    setFiles(newFiles);
    setUploadedUrls(newUrls);
    onFilesChange(newUrls);
  };

  return (
    <div>
      <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
        <input
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground text-sm">
            Yüklemek için tıklayın veya dosyaları bu alana sürükleyin.
          </p>
          <p className="text-muted-foreground text-xs mt-1">
            En fazla 5 dosya yükleyebilirsiniz.
          </p>
        </label>
      </div>
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-secondary rounded-lg"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{file.name}</span>
                <span className="text-xs text-muted-foreground">
                  ({Math.round(file.size / 1024)} KB)
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Appointment() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [fileUrls, setFileUrls] = useState<string[]>([]);

  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbz7vMT1qM6Q9Dkifsao-fXBrD_w77e_pK9IyZEbAE2QPhT0a5zIcwlTNwsMWWjFBEgdYQ/exec";

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formData = new FormData(e.target);

    // IMPORTANT: route to the correct sheet
    formData.append("sheet", "randevu-formu");

    // Add file URLs to form data
    if (fileUrls.length > 0) {
      formData.append("dosya_url", fileUrls.join(", "));
    }

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
          setFileUrls([]);
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

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Dosya Yükleme
                </label>
                <FileUploadArea onFilesChange={setFileUrls} />
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
