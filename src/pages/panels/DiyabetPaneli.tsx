import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Heart } from "lucide-react";
import { getImagePath } from "@/utils/assets";
import { useLikes } from "@/hooks/useLikes";

export default function DiyabetPaneli() {
  const { likes, hasLiked, toggleLike } = useLikes("diyabet-paneli");

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 -z-20">
          <img
            src={getImagePath("panell/dp.png")}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80" />
        </div>

        <div className="container-wide relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              Diyabet Paneli
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Kan şekeri metabolizmasını değerlendiren kapsamlı diyabet tarama
              testleri
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
              <h2>Diyabet Paneli Nedir?</h2>
              <p>
                Diyabet paneli, kan şekeri metabolizmasını kapsamlı olarak
                değerlendiren test grubudur. Bu testler, diyabet tanısı,
                prediabet durumu ve kan şekeri kontrolünü değerlendirmek için
                kullanılır.
              </p>

              <h3>Panelde Yer Alan Testler</h3>
              <ul>
                <li>
                  <strong>Açlık Kan Şekeri (Glukoz):</strong> 8-12 saat açlık
                  sonrası ölçülen kan şekeri
                </li>
                <li>
                  <strong>HbA1c (Glikozillenmiş Hemoglobin):</strong> Son 2-3
                  aylık ortalama kan şekeri
                </li>
                <li>
                  <strong>İnsülin:</strong> Pankreas tarafından üretilen hormon
                  düzeyi
                </li>
                <li>
                  <strong>HOMA-IR:</strong> İnsülin direncini değerlendiren
                  indeks
                </li>
                <li>
                  <strong>C-Peptit:</strong> İnsülin üretim kapasitesini
                  gösterir
                </li>
              </ul>

              <h3>Diyabet Türleri</h3>
              <ul>
                <li>
                  <strong>Tip 1 Diyabet:</strong> Otoimmün, insülin üretimi
                  durur
                </li>
                <li>
                  <strong>Tip 2 Diyabet:</strong> İnsülin direnci ve
                  yetersizliği
                </li>
                <li>
                  <strong>Gestasyonel Diyabet:</strong> Hamilelik diyabeti
                </li>
                <li>
                  <strong>MODY:</strong> Genetik kaynaklı diyabet
                </li>
              </ul>

              <h3>Risk Faktörleri</h3>
              <p>Diyabet riski aşağıdaki durumlarda artar:</p>
              <ul>
                <li>45 yaş üzeri olmak</li>
                <li>Aile öyküsü</li>
                <li>Obezite (BKİ &gt 30)</li>
                <li>Sedanter yaşam</li>
                <li>Yüksek tansiyon</li>
                <li>Gestasyonel diyabet öyküsü</li>
                <li>Polikistik over sendromu</li>
                <li>Metabolik sendrom</li>
              </ul>

              <h3>Erken Belirtiler</h3>
              <p>Diyabetin erken belirtileri:</p>
              <ul>
                <li>Aşırı susama</li>
                <li>Sık idrara çıkma</li>
                <li>Yorgunluk</li>
                <li>Bulanık görme</li>
                <li>Yavaş iyileşen yaralar</li>
                <li>Sık enfeksiyonlar</li>
                <li>Açıklanamayan kilo kaybı (Tip 1)</li>
                <li>Karıncalanma hissi</li>
              </ul>

              <h3>Tanı Kriterleri</h3>
              <p>Diyabet tanısı için kullanılan değerler:</p>
              <ul>
                <li>
                  <strong>Açlık Glukoz:</strong> ≥126 mg/dL (diyabet), 100-125
                  mg/dL (prediabet)
                </li>
                <li>
                  <strong>HbA1c:</strong> ≥6.5% (diyabet), 5.7-6.4% (prediabet)
                </li>
                <li>
                  <strong>OGTT (2. saat):</strong> ≥200 mg/dL (diyabet), 140-199
                  mg/dL (prediabet)
                </li>
              </ul>

              <h3>Komplikasyonlar</h3>
              <p>Kontrol edilmeyen diyabetin komplikasyonları:</p>
              <ul>
                <li>Kardiyovasküler hastalıklar</li>
                <li>Nefropati (böbrek hasarı)</li>
                <li>Retinopati (göz hasarı)</li>
                <li>Nöropati (sinir hasarı)</li>
                <li>Diyabetik ayak</li>
                <li>Enfeksiyon riski artışı</li>
              </ul>

              <h3>Yaşam Tarzı Önerileri</h3>
              <p>Diyabeti önlemek ve kontrol etmek için:</p>
              <ul>
                <li>Düzenli egzersiz (haftada 150 dakika)</li>
                <li>Sağlıklı beslenme</li>
                <li>Kilo kontrolü</li>
                <li>Stres yönetimi</li>
                <li>Düzenli uyku</li>
                <li>Sigara ve alkol bırakma</li>
                <li>Düzenli kontroller</li>
              </ul>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-16 pt-8 border-t border-gray-200">
              <Link
                to="/test-panelleri/colyak"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <div className="text-sm text-gray-500">Önceki Panel</div>
                  <div className="font-semibold">Çölyak Paneli</div>
                </div>
              </Link>

              <Link
                to="/test-panelleri"
                className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Tüm Paneller
              </Link>

              <Link
                to="/test-panelleri/romatoloji"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-right group"
              >
                <div>
                  <div className="text-sm text-gray-500">Sonraki Panel</div>
                  <div className="font-semibold">Romatoloji Paneli</div>
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
