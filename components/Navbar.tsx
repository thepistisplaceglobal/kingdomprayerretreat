"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  X, 
  ShoppingCart, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  MessageSquare, 
  LogIn, 
  User, 
  Lock, 
  Mail, 
  Check,
  Flame,
  Radio,
  Compass,
  ChevronRight,
  HeartHandshake,
  Phone,
  Users,
  Sparkles,
  BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  image: string;
}

export default function Navbar({ logoHref = "/" }: { logoHref?: string }) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLive, setIsLive] = useState(false);
  const [liveTitle, setLiveTitle] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);

  // Cart State initialized to empty for safe server render
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Mobile Bottom Sheet State
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);

  // Login State initialized to null for safe server render
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  // Hydrate cart and user from localStorage on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const savedCart = localStorage.getItem("pp-cart");
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (e) {
          console.error("Failed to parse cart from localStorage", e);
        }
      }

      const savedUser = localStorage.getItem("pp-user");
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          console.error("Failed to parse user from localStorage", e);
        }
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);
  const [loginForm, setLoginForm] = useState({ email: "", password: "", name: "" });
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const navItems = [
    { label: "About", href: "/about" },
    { label: "Sermons", href: "/sermons" },
    { label: "KPR 2026", href: "/" },
    { label: "Shop", href: "/#shop" },
  ];

  // Fetch YouTube live status
  useEffect(() => {
    let isMounted = true;
    const checkLiveStatus = async () => {
      try {
        if (typeof window === "undefined") return;
        const urlParams = new URLSearchParams(window.location.search);
        const forceLive = urlParams.get("forceLive") === "true";
        const response = await fetch(`/api/youtube/live${forceLive ? "?forceLive=true" : ""}`);
        if (response.ok && isMounted) {
          const data = await response.json();
          setIsLive(data.isLive);
          setLiveTitle(data.title);
          setVideoId(data.videoId);
        }
      } catch (err) {
        console.warn("Quietly handled background live check failure:", err);
      }
    };

    checkLiveStatus();
    const interval = setInterval(checkLiveStatus, 45000); // Check every 45 seconds
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Scrolling behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY && currentY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Save cart to localStorage
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("pp-cart", JSON.stringify(newCart));
  };

  // Listen to custom "add-to-cart" event
  useEffect(() => {
    const handleAdd = (e: Event) => {
      const customEvent = e as CustomEvent<{
        product: { id: string; name: string; price: number; image: string };
        size: string;
        color: string;
      }>;
      const { product, size, color } = customEvent.detail;
      const cartId = `${product.id}-${size}-${color}`;

      setCart((prev) => {
        const existing = prev.find((item) => item.id === cartId);
        let updated: CartItem[];
        if (existing) {
          updated = prev.map((item) =>
            item.id === cartId ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          updated = [
            ...prev,
            {
              id: cartId,
              productId: product.id,
              name: product.name,
              price: product.price,
              size,
              color,
              quantity: 1,
              image: product.image,
            },
          ];
        }
        localStorage.setItem("pp-cart", JSON.stringify(updated));
        return updated;
      });
      setIsCartOpen(true);
    };

    window.addEventListener("add-to-cart", handleAdd);
    return () => window.removeEventListener("add-to-cart", handleAdd);
  }, []);

  const updateQuantity = (cartId: string, delta: number) => {
    const updated = cart
      .map((item) => {
        if (item.id === cartId) {
          return { ...item, quantity: item.quantity + delta };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    saveCart(updated);
  };

  const removeFromCart = (cartId: string) => {
    const updated = cart.filter((item) => item.id !== cartId);
    saveCart(updated);
  };

  const handleWhatsAppCheckout = () => {
    const orderDetails = cart
      .map(
        (item) =>
          `• *${item.name}* [Size: ${item.size}, Color: ${item.color}] x${item.quantity} - ₦${(
            item.price * item.quantity
          ).toLocaleString()}`
      )
      .join("\n");
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const text = `Hello, I'd like to place an order for KPR 2026 merchandise:\n\n${orderDetails}\n\n*Total Amount:* ₦${total.toLocaleString()}\n\nPlease verify and provide me with payment details and pick-up arrangements. Thank you!`;
    window.open(`https://wa.me/2348163559545?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.email) return;

    setLoginSuccess(true);
    setTimeout(() => {
      const loggedUser = {
        email: loginForm.email,
        name: loginForm.name || loginForm.email.split("@")[0]
      };
      setUser(loggedUser);
      localStorage.setItem("pp-user", JSON.stringify(loggedUser));
      setIsLoginOpen(false);
      setLoginSuccess(false);
    }, 1200);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("pp-user");
  };

  const liveUrl = videoId && videoId !== "live"
    ? `https://www.youtube.com/watch?v=${videoId}`
    : "https://www.youtube.com/channel/UCLOXg0upYF2qp87cgOyyu6g/live";

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`fixed left-1/2 top-2 z-50 flex w-[95%] max-w-5xl -translate-x-1/2 items-center justify-between rounded-lg border border-white/15 bg-[#06040B]/60 px-4 md:px-6 py-3 text-sm shadow-lg backdrop-blur-xl transition-transform duration-300 md:text-base ${
          isVisible ? "translate-y-0" : "-translate-y-24"
        }`}
      >
        <Link href={logoHref}>
          <div className="flex items-center pl-2 gap-[5px] font-semibold tracking-tight">
            <Image
              src="/KPR_logo.png"
              alt="The Pistis Place Logo"
              width={85}
              height={60}
            />
          </div>
        </Link>

        <nav className="hidden md:flex text-xs md:text-sm items-center gap-8 lg:gap-12 text-white/80 tracking-wider">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`transition-colors uppercase font-bold text-[11px] md:text-xs ${
                  isActive ? "text-[#F21449] font-black" : "hover:text-[#F21449]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 md:gap-3">
          {/* Dynamic Service Status Badge */}
          {isLive ? (
            <Link
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 md:gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 md:px-3 py-1 text-[10px] md:text-xs font-extrabold text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all duration-300 hover:scale-105 hover:bg-emerald-500/25 animate-pulse"
              title={liveTitle || "We are live now! Click to watch stream"}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="uppercase tracking-wider">Live Now</span>
            </Link>
          ) : (
            <Link
              href="/sermons"
              className="hidden md:flex items-center gap-1 md:gap-1.5 rounded-full bg-white/5 border border-white/10 px-2 md:px-2.5 py-1 text-[10px] md:text-xs font-semibold text-white/50 hover:text-white/85 hover:bg-white/10 transition-all duration-300"
              title="Stream offline. Browse latest sermons"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white/30"></span>
              <span>Sermons</span>
            </Link>
          )}

          {/* Cart Icon with badge - Desktop Header (Mobile uses Bottom Nav Cart) */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="hidden md:flex p-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-all cursor-pointer relative"
            aria-label="Open Cart"
          >
            <ShoppingCart size={16} />
            {totalCartItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#F21449] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-black shadow-sm animate-bounce">
                {totalCartItems}
              </span>
            )}
          </button>

          {/* Login / Profile Button */}
          {user ? (
            <div className="relative group">
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-full bg-white/10 border border-[#F21449]/35 px-2.5 py-1 text-[10px] md:text-xs font-bold text-white hover:bg-red-500/10 hover:border-red-500/40 transition-all duration-300 cursor-pointer"
                title="Click to logout"
              >
                <User size={12} className="text-[#F21449]" />
                <span className="text-xs">Hi, {user.name}</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsLoginOpen(true)}
              className="flex items-center gap-1 rounded-full bg-[#F21449] hover:bg-[#F21449]/90 border border-[#F21449]/20 px-2.5 py-1 text-[10px] md:text-xs font-bold text-white transition-all duration-300 cursor-pointer"
            >
              <LogIn size={12} />
              <span className="text-xs">Sign In</span>
            </button>
          )}
        </div>
      </motion.header>

      {/* ────────────────────────────────────────────────────────── */}
      {/* LUXURY APPLE-STYLE MOBILE BOTTOM NAVIGATION BAR           */}
      {/* ────────────────────────────────────────────────────────── */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-sm md:hidden pointer-events-auto">
        <div className="relative flex items-center justify-around rounded-full bg-[#0a0713]/85 backdrop-blur-2xl border border-white/15 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(242,20,73,0.15)] ring-1 ring-white/5">
          {/* Subtle glossy top highlight */}
          <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent rounded-full" />

          {/* 1. KPR '26 Tab */}
          <Link
            href="/"
            className="relative flex flex-1 flex-col items-center justify-center py-1.5 text-center transition-all cursor-pointer"
          >
            {(pathname === "/" || pathname === "/KPR") && !isCartOpen && !isMobileSheetOpen && (
              <motion.div
                layoutId="mobileTabPill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F21449]/30 to-[#300460]/40 border border-[#F21449]/40 shadow-[0_0_12px_rgba(242,20,73,0.25)]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <motion.div whileTap={{ scale: 0.85 }} className="relative z-10 flex flex-col items-center">
              <Flame
                size={18}
                className={`transition-colors ${
                  (pathname === "/" || pathname === "/KPR") && !isCartOpen && !isMobileSheetOpen
                    ? "text-[#F21449] drop-shadow-[0_0_8px_rgba(242,20,73,0.8)]"
                    : "text-white/50"
                }`}
              />
              <span
                className={`text-[10px] font-bold tracking-tight mt-0.5 transition-colors ${
                  (pathname === "/" || pathname === "/KPR") && !isCartOpen && !isMobileSheetOpen
                    ? "text-white font-extrabold"
                    : "text-white/50"
                }`}
              >
                KPR &apos;26
              </span>
            </motion.div>
          </Link>

          {/* 2. Sermons Tab */}
          <Link
            href="/sermons"
            className="relative flex flex-1 flex-col items-center justify-center py-1.5 text-center transition-all cursor-pointer"
          >
            {pathname === "/sermons" && !isCartOpen && !isMobileSheetOpen && (
              <motion.div
                layoutId="mobileTabPill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F21449]/30 to-[#300460]/40 border border-[#F21449]/40 shadow-[0_0_12px_rgba(242,20,73,0.25)]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <motion.div whileTap={{ scale: 0.85 }} className="relative z-10 flex flex-col items-center">
              <div className="relative">
                <Radio
                  size={18}
                  className={`transition-colors ${
                    pathname === "/sermons" && !isCartOpen && !isMobileSheetOpen
                      ? "text-[#F21449] drop-shadow-[0_0_8px_rgba(242,20,73,0.8)]"
                      : "text-white/50"
                  }`}
                />
                {isLive && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-bold tracking-tight mt-0.5 transition-colors ${
                  pathname === "/sermons" && !isCartOpen && !isMobileSheetOpen
                    ? "text-white font-extrabold"
                    : "text-white/50"
                }`}
              >
                Sermons
              </span>
            </motion.div>
          </Link>

          {/* 3. Store / Merchandise Tab */}
          <button
            onClick={() => {
              setIsMobileSheetOpen(false);
              setIsCartOpen(false);
              if (pathname === "/" || pathname === "/KPR") {
                const el = document.getElementById("shop");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                } else {
                  window.location.hash = "shop";
                }
              } else {
                window.location.href = "/#shop";
              }
            }}
            className="relative flex flex-1 flex-col items-center justify-center py-1.5 text-center transition-all cursor-pointer"
          >
            <motion.div whileTap={{ scale: 0.85 }} className="relative z-10 flex flex-col items-center">
              <ShoppingBag
                size={18}
                className="text-white/50 hover:text-white transition-colors"
              />
              <span className="text-[10px] font-bold tracking-tight mt-0.5 text-white/50">
                Store
              </span>
            </motion.div>
          </button>

          {/* 4. Cart Tab */}
          <button
            onClick={() => {
              setIsMobileSheetOpen(false);
              setIsCartOpen(true);
            }}
            className="relative flex flex-1 flex-col items-center justify-center py-1.5 text-center transition-all cursor-pointer"
          >
            {isCartOpen && !isMobileSheetOpen && (
              <motion.div
                layoutId="mobileTabPill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F21449]/30 to-[#300460]/40 border border-[#F21449]/40 shadow-[0_0_12px_rgba(242,20,73,0.25)]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <motion.div whileTap={{ scale: 0.85 }} className="relative z-10 flex flex-col items-center">
              <div className="relative">
                <ShoppingCart
                  size={18}
                  className={`transition-colors ${
                    isCartOpen && !isMobileSheetOpen ? "text-[#F21449]" : "text-white/50"
                  }`}
                />
                {totalCartItems > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#F21449] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-black shadow-md animate-bounce">
                    {totalCartItems}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-bold tracking-tight mt-0.5 transition-colors ${
                  isCartOpen && !isMobileSheetOpen ? "text-white font-extrabold" : "text-white/50"
                }`}
              >
                Cart
              </span>
            </motion.div>
          </button>

          {/* 5. Menu / Action Sheet Tab */}
          <button
            onClick={() => {
              setIsCartOpen(false);
              setIsMobileSheetOpen(true);
            }}
            className="relative flex flex-1 flex-col items-center justify-center py-1.5 text-center transition-all cursor-pointer"
          >
            {isMobileSheetOpen && (
              <motion.div
                layoutId="mobileTabPill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F21449]/30 to-[#300460]/40 border border-[#F21449]/40 shadow-[0_0_12px_rgba(242,20,73,0.25)]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <motion.div whileTap={{ scale: 0.85 }} className="relative z-10 flex flex-col items-center">
              <Compass
                size={18}
                className={`transition-colors ${
                  isMobileSheetOpen ? "text-[#F21449]" : "text-white/50"
                }`}
              />
              <span
                className={`text-[10px] font-bold tracking-tight mt-0.5 transition-colors ${
                  isMobileSheetOpen ? "text-white font-extrabold" : "text-white/50"
                }`}
              >
                Menu
              </span>
            </motion.div>
          </button>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* APPLE-STYLE MOBILE ACTION SHEET (MENU)                     */}
      {/* ────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isMobileSheetOpen && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSheetOpen(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Bottom Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="relative z-10 w-full bg-[#0c0818]/95 backdrop-blur-3xl border-t border-white/15 rounded-t-[32px] p-6 text-white shadow-[0_-20px_60px_rgba(0,0,0,0.9)] max-h-[85vh] overflow-y-auto"
            >
              {/* Apple Drag Bar */}
              <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-5" />

              {/* Sheet Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#F21449] to-[#300460] p-0.5 shadow-lg flex items-center justify-center">
                    <Image
                      src="/KPR_logo.png"
                      alt="The Pistis Place Logo"
                      width={36}
                      height={36}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base bricolage text-white leading-tight">
                      The Pistis Place
                    </h3>
                    <p className="text-[11px] text-white/50 font-medium">
                      Birthing convictions in the hearts of men
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsMobileSheetOpen(false)}
                  className="p-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Grouped iOS Menu Sections */}
              <div className="space-y-4">
                {/* Main Navigation Group */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-2 space-y-1">
                  <Link
                    href="/"
                    onClick={() => setIsMobileSheetOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#F21449]/20 flex items-center justify-center text-[#F21449]">
                        <Flame size={18} />
                      </div>
                      <span className="font-bold text-sm text-white">KPR 2026 Retreat</span>
                    </div>
                    <ChevronRight size={16} className="text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </Link>

                  <Link
                    href="/sermons"
                    onClick={() => setIsMobileSheetOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
                        <Radio size={18} />
                      </div>
                      <span className="font-bold text-sm text-white">Sermons & Media</span>
                    </div>
                    <ChevronRight size={16} className="text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </Link>

                  <Link
                    href="/#shop"
                    onClick={() => setIsMobileSheetOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                        <ShoppingBag size={18} />
                      </div>
                      <span className="font-bold text-sm text-white">Commemorative Store</span>
                    </div>
                    <ChevronRight size={16} className="text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </div>

                {/* Ministry & Sanctuary Group */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-2 space-y-1">
                  <Link
                    href="/about"
                    onClick={() => setIsMobileSheetOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                        <Sparkles size={18} />
                      </div>
                      <span className="font-bold text-sm text-white">About Ministry</span>
                    </div>
                    <ChevronRight size={16} className="text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </Link>

                  <Link
                    href="/partner"
                    onClick={() => setIsMobileSheetOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <HeartHandshake size={18} />
                      </div>
                      <span className="font-bold text-sm text-white">Partner & Giving</span>
                    </div>
                    <ChevronRight size={16} className="text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </Link>

                  <Link
                    href="/contact"
                    onClick={() => setIsMobileSheetOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                        <Phone size={18} />
                      </div>
                      <span className="font-bold text-sm text-white">Contact & Sanctuary</span>
                    </div>
                    <ChevronRight size={16} className="text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </Link>

                  <Link
                    href="/counselling"
                    onClick={() => setIsMobileSheetOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400">
                        <BookOpen size={18} />
                      </div>
                      <span className="font-bold text-sm text-white">Spiritual Counselling</span>
                    </div>
                    <ChevronRight size={16} className="text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </Link>

                  <Link
                    href="/marriage-counselling"
                    onClick={() => setIsMobileSheetOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-400">
                        <Users size={18} />
                      </div>
                      <span className="font-bold text-sm text-white">Marriage Counselling</span>
                    </div>
                    <ChevronRight size={16} className="text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </div>

                {/* Account & Profile Footer */}
                <div className="pt-2">
                  {user ? (
                    <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#F21449]/20 border border-[#F21449]/40 flex items-center justify-center text-[#F21449]">
                          <User size={20} />
                        </div>
                        <div>
                          <p className="font-extrabold text-sm text-white">{user.name}</p>
                          <p className="text-xs text-white/40">{user.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMobileSheetOpen(false);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-bold hover:bg-red-500/25 transition-colors cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setIsMobileSheetOpen(false);
                        setIsLoginOpen(true);
                      }}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#F21449] to-[#300460] py-3.5 text-sm font-extrabold text-white shadow-lg cursor-pointer"
                    >
                      <LogIn size={16} />
                      Sign In / Worshipper Portal
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* GLOBAL SHOPPING CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Panel */}
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="w-screen max-w-md bg-[#06040B] text-white border-l border-white/10 shadow-2xl flex flex-col h-full relative"
              >
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-[#F21449]" />
                    <h2 className="text-lg font-bold uppercase tracking-wider">Your Cart</h2>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    aria-label="Close cart"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Items List */}
                <div className="flex-grow overflow-y-auto p-6 space-y-6">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                      <ShoppingBag className="w-16 h-16 text-white/20 mb-4 animate-pulse" />
                      <p className="text-white/60 font-medium">Your cart is empty</p>
                      <button
                        onClick={() => {
                          setIsCartOpen(false);
                          window.location.hash = "shop";
                        }}
                        className="text-[#F21449] hover:underline text-sm font-semibold mt-2 cursor-pointer"
                      >
                        Browse Merchandise
                      </button>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="flex gap-4 items-start bg-white/5 p-4 rounded-2xl border border-white/5">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-black/40">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-bold text-sm text-white line-clamp-1">{item.name}</h3>
                          <p className="text-[10px] text-white/40 mt-0.5">
                            Size: {item.size} &nbsp;·&nbsp; Color: {item.color}
                          </p>
                          <p className="font-black text-sm text-white mt-1.5">
                            ₦{item.price.toLocaleString()}
                          </p>
                          
                          {/* Quantity Selector */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2.5 bg-black/50 px-2 py-1 rounded-lg border border-white/10">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="text-white/60 hover:text-white transition-colors cursor-pointer"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="text-white/60 hover:text-white transition-colors cursor-pointer"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-white/35 hover:text-red-500 transition-colors p-1 cursor-pointer"
                              title="Remove item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer/Checkout */}
                {cart.length > 0 && (
                  <div className="p-6 border-t border-white/10 bg-black/50 backdrop-blur-md">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-white/60">Subtotal</span>
                      <span className="text-2xl font-black text-white">
                        ₦{cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()}
                      </span>
                    </div>
                    
                    <p className="text-[10px] text-white/40 mb-5 leading-relaxed">
                      * Pre-order pickup is available at the KPR 2026 venue registration desk. Show your WhatsApp confirmation pass upon arrival.
                    </p>

                    <button
                      onClick={handleWhatsAppCheckout}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white py-4 text-base font-extrabold shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                    >
                      <MessageSquare size={18} />
                      Pre-order via WhatsApp
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* LOGIN MODAL */}
      <AnimatePresence>
        {isLoginOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLoginOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-[#0d0917] border border-white/10 p-8 rounded-[2rem] shadow-2xl text-white overflow-hidden"
            >
              {/* Decorative light */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#F21449] to-transparent" />
              
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-extrabold bricolage bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                  {isSignUp ? "Create Account" : "Access Sanctuary"}
                </h3>
                <button
                  onClick={() => setIsLoginOpen(false)}
                  className="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {isSignUp && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/40 mb-1.5">Full Name</label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={loginForm.name}
                        onChange={(e) => setLoginForm({ ...loginForm, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:border-[#F21449] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/40 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      type="email"
                      required
                      placeholder="believer@pistisplace.org"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:border-[#F21449] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/40 mb-1.5">Secure Key / Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:border-[#F21449] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loginSuccess}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F21449] to-[#300460] py-4 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:opacity-90 disabled:opacity-50 cursor-pointer mt-2"
                >
                  {loginSuccess ? (
                    <>
                      <Check size={16} className="animate-bounce" />
                      Sanctifying Session...
                    </>
                  ) : (
                    isSignUp ? "Establish Covenant" : "Enter Altar"
                  )}
                </button>
              </form>

              <div className="mt-6 text-center text-xs text-white/40 font-medium">
                {isSignUp ? (
                  <p>
                    Already have a covenant?{" "}
                    <span onClick={() => setIsSignUp(false)} className="text-[#F21449] hover:underline cursor-pointer font-bold">
                      Sign In here
                    </span>
                  </p>
                ) : (
                  <p>
                    New worshipper?{" "}
                    <span onClick={() => setIsSignUp(true)} className="text-[#F21449] hover:underline cursor-pointer font-bold">
                      Register your Altar
                    </span>
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
