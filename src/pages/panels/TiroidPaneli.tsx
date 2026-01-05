import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Heart } from "lucide-react";
import { getImagePath } from "@/utils/assets";
import { useLikes } from "@/hooks/useLikes";

export default function TiroidPaneli() {
  const { likes, hasLiked, toggleLike } = useLikes("tiroid-paneli");

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 -z-20">
          <img
            src={getImagePath("panell/tp.png")}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80" />
        </div>

        <div className="container-wide relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              Tiroid Paneli
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Tiroid bezinin fonksiyonlarını ve otoimmün durumlarını
              değerlendiren kapsamlı test paneli
            </p>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-white">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 mb-12 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>18 Aralık 2024</span>
              </div>
              <div className="flex items-center gap-4 ml-auto">
                <button
                  onClick={toggleLike}
                  className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors ${
                    hasLiked
                      ? "text-red-500 bg-red-50"
                      : "text-muted-foreground hover:text-red-500"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${hasLiked ? "fill-current" : ""}`}
                  />
                  <span>{likes}</span>
                </button>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <h2>Tiroid Paneli Nedir?</h2>
              <p>
                Tiroid paneli, tiroid bezinin fonksiyonlarını değerlendirmek
                için kullanılan bir dizi kan testidir. Bu testler, tiroid
                hormonlarının düzeylerini ölçer ve tiroid bezinin çalışma
                durumunu belirler.
              </p>

              <h3>Panelde Yer Alan Testler</h3>
              <ul>
                <li>
                  <strong>TSH (Tiroid Stimülan Hormon):</strong> Hipofiz
                  bezinden salgılanan ve tiroid bezini uyaran hormondur.
                </li>
                <li>
                  <strong>Serbest T4 (Tiroksin):</strong> Tiroid bezinin ana
                  hormonu olup, metabolizmayı düzenler.
                </li>
                <li>
                  <strong>Serbest T3 (Triiyodotironin):</strong> T4'ten dönüşen
                  aktif tiroid hormonu.
                </li>
                <li>
                  <strong>Anti-TPO (Anti-Tiroid Peroksidaz):</strong> Tiroid
                  otoimmün hastalıklarının tanısında kullanılan antikordur.
                </li>
              </ul>

              <h3>Hangi Durumlarda İstenir?</h3>
              <p>
                Tiroid paneli aşağıdaki durumlarla karşılaşıldığında istenir:
              </p>
              <ul>
                <li>Yorgunluk, halsizlik</li>
                <li>Kilo alma veya kilo kaybı</li>
                <li>Kalp ritmi değişiklikleri</li>
                <li>Saç dökülmesi</li>
                <li>Uyku bozuklukları</li>
                <li>Depresyon veya anksiyete</li>
                <li>Aile öyküsünde tiroid hastalığı</li>
              </ul>

              <h3>Test Öncesi Hazırlık</h3>
              <p>
                Tiroid testleri için özel bir hazırlık gerekmez. Ancak bazı
                ilaçlar test sonuçlarını etkileyebilir. Tiroid ilaçları, biotin
                supplements ve bazı kalp ilaçları kullanıyorsanız doktorunuzu
                bilgilendirin.
              </p>

              <h3>Sonuçların Değerlendirilmesi</h3>
              <p>
                Test sonuçları birlikte değerlendirilir. Yüksek TSH ve düşük T4
                hipotiroidi, düşük TSH ve yüksek T4/T3 hipertiroidi işareti
                olabilir. Anti-TPO pozitifliği otoimmün tiroid hastalığına
                işaret eder.
              </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-16 pt-8 border-t border-gray-200">
              <Link
                to="/test-panelleri/cinsel-hastaliklar"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <div className="text-sm text-gray-500">Önceki Panel</div>
                  <div className="font-semibold">Cinsel Hastalıklar</div>
                </div>
              </Link>

              <Link
                to="/test-panelleri"
                className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Tüm Paneller
              </Link>

              <Link
                to="/test-panelleri/torch"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-right group"
              >
                <div>
                  <div className="text-sm text-gray-500">Sonraki Panel</div>
                  <div className="font-semibold">TORCH Paneli</div>
                </div>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
