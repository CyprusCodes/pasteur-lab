import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getImagePath } from "@/utils/assets";

const navigationItems = [
  { label: "Anasayfa", href: "/" },
  {
    label: "Hakkımızda",
    href: "/hakkimizda",
    children: [
      { label: "Kurumsal", href: "/hakkimizda/kurumsal" },
      { label: "Zaman Tüneli", href: "/hakkimizda/zaman-tuneli" },
      { label: "Kariyer", href: "/kariyer" },
    ],
  },
  {
    label: "Hizmetler",
    href: "/hizmetlerimiz",
    children: [
      {
        label: "Ayaktan Hasta Hizmetleri",
        href: "/hizmetlerimiz/ayaktan-hasta",
      },
      { label: "Evden Kan Alma", href: "/hizmetlerimiz/evde-kan-alma" },
      { label: "Genetik Testler", href: "/hizmetlerimiz/genetik-testler" },
      { label: "SMA Testi", href: "/hizmetlerimiz/sma-testi" },
      { label: "COVID Testleri", href: "/hizmetlerimiz/covid-testleri" },
      { label: "Kurumsal Hizmetler", href: "/hizmetlerimiz/kurumsal" },
    ],
  },
  {
    label: "Test Panelleri",
    href: "/test-panelleri",
    children: [
      { label: "Tiroid Paneli", href: "/test-panelleri/tiroid" },
      { label: "TORCH Paneli", href: "/test-panelleri/torch" },
      { label: "Kolon Kanseri Paneli", href: "/test-panelleri/kolon-kanseri" },
      { label: "Anemi Paneli", href: "/test-panelleri/anemi" },
      { label: "Çölyak Paneli", href: "/test-panelleri/colyak" },
      { label: "Diyabet Paneli", href: "/test-panelleri/diyabet" },
      { label: "Romatoloji Paneli", href: "/test-panelleri/romatoloji" },
      {
        label: "Cinsel Hastalıklar",
        href: "/test-panelleri/cinsel-hastaliklar",
      },
    ],
  },
  { label: "Paketler", href: "/paketler" },
  {
    label: "İletişim",
    href: "#",
    children: [
      { label: "İletişim Formu", href: "/iletisim" },
      { label: "Randevu Formu", href: "/randevu" },
      { label: "Test İstem Formu", href: "/test-istem-formu" },
      { label: "Test Takibi", href: "http://93.182.78.97:8080/Bireysel.html" },
    ],
  },
  { label: "Blog", href: "/blog" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(
    null
  );
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/80 backdrop-blur-xl shadow-xl border-b border-gray-100/50 py-3"
          : "bg-gradient-to-b from-black/20 to-transparent backdrop-blur-sm py-5"
      )}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <img
              src={getImagePath(
                isScrolled ? "pasteur-logo-no-bg.png" : "pasteur-logo-white.png"
              )}
              alt="Pasteur Lab Laboratuvarı"
              className={cn(
                "transition-all duration-300",
                isScrolled
                  ? "h-12 sm:h-14 lg:h-16 w-auto"
                  : "h-14 sm:h-16 lg:h-20 w-auto"
              )}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8 flex-1 justify-center max-w-4xl">
            {navigationItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() =>
                  item.children && setOpenDropdown(item.label)
                }
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors relative py-2 px-2 flex items-center whitespace-nowrap",
                    isScrolled
                      ? "text-foreground hover:text-primary"
                      : "text-white/90 hover:text-white"
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute bottom-0 left-2 right-2 h-0.5 transition-all duration-300 scale-x-0 group-hover:scale-x-100",
                      isScrolled ? "bg-primary" : "bg-white"
                    )}
                  />
                  {item.children && (
                    <ChevronDown className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180" />
                  )}
                </Link>

                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 pt-4 animate-fade-in-down z-50">
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-2 min-w-[280px] max-w-[320px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          className="block px-4 py-3 text-sm text-foreground hover:bg-primary/10 hover:text-primary rounded-lg transition-all duration-200 whitespace-nowrap"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <Button
              size="sm"
              variant="outline"
              className={cn(
                "font-bold rounded-full h-10 px-5 xl:px-6 text-sm transition-all duration-300 whitespace-nowrap",
                isScrolled
                  ? "border-primary text-primary bg-white hover:bg-primary hover:text-white shadow-md"
                  : "border-white text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm shadow-lg"
              )}
              asChild
            >
              <a
                href="http://93.182.78.97:8080/Bireysel.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Test Sonuçları
              </a>
            </Button>
            <Button
              size="sm"
              className={cn(
                "font-bold rounded-full h-10 px-5 xl:px-6 text-sm transition-all duration-300 whitespace-nowrap",
                isScrolled
                  ? "bg-primary hover:bg-primary-dark text-white shadow-md"
                  : "bg-white text-primary hover:bg-gray-100 shadow-lg"
              )}
              asChild
            >
              <Link to="/randevu">Randevu Al</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              isScrolled ? "hover:bg-gray-100" : "hover:bg-white/10"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X
                className={cn(
                  "w-6 h-6",
                  isScrolled ? "text-foreground" : "text-white"
                )}
              />
            ) : (
              <Menu
                className={cn(
                  "w-6 h-6",
                  isScrolled ? "text-foreground" : "text-white"
                )}
              />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {/* Mobile Menu */}
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 animate-fade-in-down">
            <div
              className={cn(
                "rounded-2xl shadow-2xl p-4 space-y-2 overflow-hidden transition-all duration-500",
                isScrolled
                  ? "bg-white/80 backdrop-blur-xl border border-gray-100/50"
                  : "bg-gradient-to-b from-black/20 to-transparent backdrop-blur-sm border border-white/10"
              )}
            >
              <div
                className="space-y-2 overflow-y-auto scrollbar-hide"
                style={{ maxHeight: "calc(100vh - 200px)" }}
              >
                {navigationItems.map((item) => (
                  <div key={item.label}>
                    {item.children ? (
                      <div>
                        <button
                          onClick={() =>
                            setMobileOpenDropdown(
                              mobileOpenDropdown === item.label
                                ? null
                                : item.label
                            )
                          }
                          className={cn(
                            "w-full flex items-center justify-between px-4 py-3 font-medium rounded-xl transition-all",
                            isScrolled
                              ? "text-foreground hover:bg-primary/10 hover:text-primary"
                              : "text-white hover:bg-white/10"
                          )}
                        >
                          {item.label}
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 transition-transform duration-200",
                              mobileOpenDropdown === item.label && "rotate-180"
                            )}
                          />
                        </button>
                        {mobileOpenDropdown === item.label && (
                          <div className="ml-4 mt-1 space-y-1 border-l-2 border-primary/20 pl-4 animate-fade-in-down">
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                to={child.href}
                                className={cn(
                                  "block px-2 py-2 text-sm transition-colors rounded-lg",
                                  isScrolled
                                    ? "text-muted-foreground hover:text-primary hover:bg-primary/5"
                                    : "text-white/70 hover:text-white hover:bg-white/5"
                                )}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.href}
                        className={cn(
                          "block px-4 py-3 font-medium rounded-xl transition-all",
                          isScrolled
                            ? "text-foreground hover:bg-primary/10 hover:text-primary"
                            : "text-white hover:bg-white/10"
                        )}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
              <div
                className={cn(
                  "pt-4 border-t space-y-3",
                  isScrolled ? "border-gray-200/50" : "border-white/10"
                )}
              >
                <Button
                  variant="outline"
                  className={cn(
                    "w-full font-bold rounded-full h-11 shadow-lg transition-all duration-300",
                    isScrolled
                      ? "border-primary text-primary bg-white hover:bg-primary hover:text-white"
                      : "border-white text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                  )}
                  asChild
                >
                  <a
                    href="http://93.182.78.97:8080/Bireysel.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Test Sonuçları
                  </a>
                </Button>
                <Button
                  className={cn(
                    "w-full font-bold rounded-full h-11 shadow-lg transition-all duration-300",
                    isScrolled
                      ? "bg-primary hover:bg-primary-dark text-white"
                      : "bg-white text-primary hover:bg-gray-100"
                  )}
                  asChild
                >
                  <Link to="/randevu">Randevu Al</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
