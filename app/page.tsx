"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import React, { useState, useEffect, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventMap from "@/components/EventMap";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  FadeIn,
  SlideIn,
  ScaleIn,
  StaggerContainer,
  StaggerItem,
  HoverLift,
  TextReveal,
} from "@/components/Animations";
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/ui/Marquee";
import {
  Flame,
  Calendar,
  MapPin,
  Wifi,
  Users,
  ArrowUpRight,
  CheckCircle,
  AlertCircle,
  Radio,
  Maximize2,
  X,
  ShoppingBag,
  Instagram,
  Facebook,
  Clock,
  Download,
  Sparkles,
  Send,
  Share2,
  Lock,
  Twitter,
  Copy,
  Check,
  Bell,
  BellRing,
} from "lucide-react";

const FACEBOOK_URL = "https://www.facebook.com/kingdomprayerretreat";


const BattleAxe3D = dynamic(
  () => import("@/components/BattleAxe3D"),
  { ssr: false }
);

const marqueeImages = [
  "/kpr1.jpg", "/kpr2.jpg", "/kpr3.jpg", "/kpr4.jpg", "/kpr5.jpg", "/kpr6.jpg",
  "/kpr7.jpg", "/kpr8.jpg", "/kpr9.jpg", "/kpr10.jpg", "/kpr11.jpg", "/kpr12.jpg", "/kpr13.jpg",
];

const pastEditions = [
  {
    year: "KPR 2025",
    theme: "Kainos: Newness Through Prayer",
    description:
      "A powerful gathering where participants encountered the depths of God's presence through days of unceasing prayer, worship, and prophetic declaration across Uyo.",
    img: "/kpr255.jpg",
    attendees: "1000+",
  },
  {
    year: "KPR 2024",
    theme: "The Emergence",
    description:
      "An extraordinary season of intercession and spiritual empowerment, marking a turning point for many lives as the Spirit of God moved powerfully among His people.",
    img: "/kpr23.jpg",
    attendees: "1000+",
  },
  {
    year: "KPR 2023",
    theme: "Awaken The Army",
    description:
      "The Kingdom Prayer Retreat brought together believers from across Nigeria for a historic moment of corporate prayer and divine encounter unlike any before.",
    img: "/kpr24.jpg",
    attendees: "1000+",
  },
];

const PAST_KPR_MESSAGES = [
  {
    id: "msg-1",
    title: "The Battle Axe Generation",
    speaker: "Pastor Abraham Thompson",
    year: "KPR 2025",
    theme: "Kainos",
    duration: "1h 45m",
    category: "Apostolic Charge",
    youtubeId: "vB-f7YyS-7A",
    thumbnail: "/kpr1.jpg",
    description: "An intensive apostolic charge on alignment and the spiritual training required to become God's instrument in the last days."
  },
  {
    id: "msg-2",
    title: "Deep Intercession & Territorial Gates",
    speaker: "Pastor Abraham Thompson",
    year: "KPR 2024",
    theme: "The Emergence",
    duration: "2h 10m",
    category: "Intercession",
    youtubeId: "u_m9zX5pC_s",
    thumbnail: "/kpr2.jpg",
    description: "Understanding the spiritual keys required to open cities, territories, and generations to the move of God's spirit."
  },
  {
    id: "msg-3",
    title: "The Spirit of Supplication",
    speaker: "Pastor Abraham Thompson",
    year: "KPR 2023",
    theme: "Awaken The Army",
    duration: "1h 30m",
    category: "Prayer & Devotion",
    youtubeId: "FidS6R1k-0g",
    thumbnail: "/kpr3.jpg",
    description: "How the Spirit of prayer initiates deep inner work, purifying the soul and empowering the believer for effective kingdom service."
  }
];

const HERO_FLYERS = [
  {
    title: "Main Theme Flyer",
    src: "/for_hero/KPR 2026 - Main Flyer.jpg",
    alt: "KPR 2026 - Thou Art My Battle Axe Main Flyer",
    badge: "Official Theme Flyer",
    type: "image"
  },
  {
    title: "Volunteer Drive",
    src: "/for_hero/KPR 2026_Volunteers.jpg",
    alt: "KPR 2026 Volunteers - Join the force to serve",
    badge: "Volunteer Force",
    type: "image"
  },
  {
    title: "Bus & Logistics",
    src: "/for_hero/KPR Bus Shuttle Design.png",
    alt: "KPR Bus Shuttle Route details",
    badge: "Free Bus Shuttle",
    type: "image"
  },
  {
    title: "3D Battle Axe",
    src: "",
    alt: "Interactive 3D Battle Axe element",
    badge: "3D EXPERIENCE",
    type: "3d"
  }
];

const PRODUCTS = [
  {
    id: "prod-1",
    name: "Thou Art My Battle Axe Hoodie",
    category: "Apparel",
    description: "An elegant, heavyweight commemorative hoodie designed for the 2026 Kingdom Prayer Retreat, featuring premium embroidery of this year's theme.",
    image: "/tees/hoodie.jpeg",
    price: 20000,
    badge: "Best Seller",
    colors: ["Midnight Black", "Royal Purple", "Navy Blue", "Olive Green", "Heather Grey", "White"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "prod-2",
    name: "KPR 2026 Commemorative T-Shirt",
    category: "Apparel",
    description: "High-quality, lightweight cotton tee styled with the official 'Thou Art My Battle Axe' artwork and ministerial theme.",
    image: "/tees/folded_tees.jpeg",
    price: 7000,
    badge: "Popular",
    colors: ["Midnight Black", "Royal Purple", "Navy Blue", "Olive Green", "Burgundy", "White"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "prod-3",
    name: "KPR 2026 Study & Growth Journal",
    category: "Keep-Sakes",
    description: "Official Bible Study Journals and Spiritual Growth Journals designed to capture divine study notes, prayer revelations, and ministerial insights.",
    image: "/tees/books.jpeg",
    price: 10000,
    priceDisplay: "From ₦10,000 - ₦20,000",
    badge: "Essential",
    colors: ["Bible Study Journal", "Spiritual Growth Journal"],
    sizes: ["Standard Edition (₦10,000)", "Deluxe Edition (₦20,000)"]
  }
];

export default function KPRPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isHoveredStack, setIsHoveredStack] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  interface KPRSpeaker {
    name: string;
    role: string;
    img: string;
    bio: string;
    socials?: { twitter?: string; instagram?: string; facebook?: string };
  }
  const [selectedSpeaker, setSelectedSpeaker] = useState<KPRSpeaker | null>(null);

  // ── KPR REGISTRATION STATES ──
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  interface KPRRegistration {
    id: string;
    email: string;
    fullName: string;
    gender: string;
    residence: string;
    phone: string;
    joiningMode: string;
    referral: string;
    expectations: string;
    accommodation: string;
    tshirt: string;
    registeredAt: string;
  }
  const [registeredTicket, setRegisteredTicket] = useState<KPRRegistration | null>(null);
  const [copiedState, setCopiedState] = useState<string | null>(null);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  // Push Notifications States
  const [pushSupported, setPushSupported] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [notificationPermission, setNotificationPermission] = useState<string>("default");
  const [isPushLoading, setIsPushLoading] = useState<boolean>(false);
  const [pushStatusMessage, setPushStatusMessage] = useState<string | null>(null);

  // Admin Push States
  const [adminPushTitle, setAdminPushTitle] = useState("KPR 2026 Announcement");
  const [adminPushBody, setAdminPushBody] = useState("");
  const [adminPushUrl, setAdminPushUrl] = useState("/KPR");
  const [adminPushStatus, setAdminPushStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [adminPushMessage, setAdminPushMessage] = useState("");
  const [pushSubscriberCount, setPushSubscriberCount] = useState(0);
  const [registerForm, setRegisterForm] = useState({
    email: "",
    fullName: "",
    gender: "",
    residence: "",
    phone: "",
    joiningMode: "",
    referral: "",
    expectations: "",
    accommodation: "",
    tshirt: "",
  });
  const [registerErrors, setRegisterErrors] = useState<Record<string, string>>({});
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerStatus, setRegisterStatus] = useState<"idle" | "success" | "error">("idle");

  // ── ADMIN / ORGANIZER PORTAL STATES ──
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState("");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [registrations, setRegistrations] = useState<KPRRegistration[]>([]);
  const [isLoadingAdminData, setIsLoadingAdminData] = useState(false);
  const [adminError, setAdminError] = useState("");
  const [socialView, setSocialView] = useState<"live" | "curated">("live");
  const [copiedTag, setCopiedTag] = useState<string | null>(null);

  const fetchRegistrations = async () => {
    setIsLoadingAdminData(true);
    try {
      const { supabase: supabaseClient } = await import("@/lib/supabase");
      if (
        supabaseClient &&
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co"
      ) {
        const { data, error } = await supabaseClient
          .from("kpr_registrations")
          .select("*")
          .order("registeredAt", { ascending: false });
        if (error) throw error;
        setRegistrations((data as KPRRegistration[]) || []);
      } else {
        // Fallback demo data plus active local registration
        const stored = localStorage.getItem("kpr-2026-registration");
        const localList = stored ? [JSON.parse(stored)] : [];
        
        const demoRegistrations: KPRRegistration[] = [
          {
            id: "KPR26-4832",
            fullName: "Pastor David Okon",
            email: "david.okon@pistisplace.org",
            gender: "Male",
            residence: "Uyo, Akwa Ibom",
            phone: "+234 803 111 2222",
            joiningMode: "In-Person (The Pistis Place)",
            referral: "Church Announcement",
            expectations: "Expecting divine encounters, continuous prayers, and physical/spiritual renewal for the church.",
            accommodation: "No, I have other plans or reside in Uyo",
            tshirt: "Yes, pre-order KPR T-Shirt (N7,000)",
            registeredAt: "2026-07-09T14:22:15.000Z"
          },
          {
            id: "KPR26-8941",
            fullName: "Sis. Deborah Aniefiok",
            email: "deborah.aniefiok@gmail.com",
            gender: "Female",
            residence: "Port Harcourt, Rivers State",
            phone: "+234 812 345 6789",
            joiningMode: "In-Person (The Pistis Place)",
            referral: "Social Media (Facebook/Instagram/X)",
            expectations: "To be filled with the Holy Ghost, deep intercession skills, and connection with other believers.",
            accommodation: "Yes, I need free hostel accommodation",
            tshirt: "Yes, pre-order KPR T-Shirt (N7,000)",
            registeredAt: "2026-07-09T18:45:30.000Z"
          },
          {
            id: "KPR26-2104",
            fullName: "Bro. Emmanuel Udoh",
            email: "emmanuel.udoh@yahoo.com",
            gender: "Male",
            residence: "Lagos State",
            phone: "+234 901 222 3333",
            joiningMode: "Online (Virtual Broadcast)",
            referral: "WhatsApp announcement",
            expectations: "Spiritual revival and breakthroughs.",
            accommodation: "No, I have other plans or reside in Uyo",
            tshirt: "No, thanks",
            registeredAt: "2026-07-10T02:10:00.000Z"
          }
        ];

        const merged = [...localList, ...demoRegistrations.filter(d => !localList.some(l => l.email === d.email))];
        setRegistrations(merged);
      }
    } catch (err) {
      console.error("Error fetching registrations", err);
      const stored = localStorage.getItem("kpr-2026-registration");
      const localList = stored ? [JSON.parse(stored)] : [];
      setRegistrations(localList);
    } finally {
      setIsLoadingAdminData(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const adminAuth = localStorage.getItem("kpr-admin-authenticated") === "true";
      if (adminAuth) {
        setTimeout(() => {
          setIsAdminAuthenticated(true);
          
          const stored = localStorage.getItem("kpr-2026-registration");
          if (stored) {
            try {
              setRegisteredTicket(JSON.parse(stored));
            } catch (e) {
              console.error("Error parsing stored registration", e);
            }
          }
        }, 0);
      } else {
        // Clear the "Registration Confirmed" state on page refresh/load if not logged in,
        // so that another registration can occur for someone else if need be.
        localStorage.removeItem("kpr-2026-registration");
        setTimeout(() => {
          setRegisteredTicket(null);
        }, 0);
      }
    }
  }, []);

  // Initialize Push Notifications
  useEffect(() => {
    async function initPush() {
      const { isPushSupported, getNotificationPermissionState, getActiveSubscription, registerServiceWorker } = await import("@/lib/push-notifications");
      const supported = await isPushSupported();
      setPushSupported(supported);
      if (supported) {
        const permission = await getNotificationPermissionState();
        setNotificationPermission(permission);
        const sub = await getActiveSubscription();
        setIsSubscribed(!!sub);
        
        // Register service worker in background
        await registerServiceWorker();
      }
    }
    initPush();
  }, [registeredTicket]);

  // Fetch Push Subscriber Count for Organizer Portal
  const fetchPushSubscribersCount = async () => {
    try {
      const res = await fetch("/api/push/subscriptions");
      if (res.ok) {
        const data = await res.json();
        setPushSubscriberCount(data.count);
      }
    } catch (err) {
      console.warn("Failed to fetch push subscribers count:", err);
    }
  };

  useEffect(() => {
    if (isAdminModalOpen && isAdminAuthenticated) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchPushSubscribersCount();
      fetchRegistrations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdminModalOpen, isAdminAuthenticated]);

  const handleTogglePush = async () => {
    if (isPushLoading) return;
    setIsPushLoading(true);
    setPushStatusMessage(null);
    try {
      const { subscribeToPush, unsubscribeFromPush, getNotificationPermissionState } = await import("@/lib/push-notifications");
      if (isSubscribed) {
        const unsubbed = await unsubscribeFromPush();
        if (unsubbed) {
          setIsSubscribed(false);
          setPushStatusMessage("Successfully unsubscribed from updates.");
        } else {
          setPushStatusMessage("Failed to unsubscribe.");
        }
      } else {
        const sub = await subscribeToPush();
        if (sub) {
          setIsSubscribed(true);
          setPushStatusMessage("Awesome! You've enabled real-time updates.");
        }
      }
      const permission = await getNotificationPermissionState();
      setNotificationPermission(permission);
    } catch (err: unknown) {
      console.info("Push notification notice:", err);
      const errorObj = err as Error;
      setPushStatusMessage(errorObj.message || "Could not enable push updates.");
    } finally {
      setIsPushLoading(false);
    }
  };

  const handleSendAdminPush = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminPushBody.trim() || !adminPushTitle.trim()) {
      setAdminPushStatus("error");
      setAdminPushMessage("Title and message body are required.");
      return;
    }

    setAdminPushStatus("loading");
    setAdminPushMessage("");

    try {
      const response = await fetch("/api/push/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: adminPushTitle,
          body: adminPushBody,
          url: adminPushUrl,
          adminCode: "kpr2026"
        })
      });

      const data = await response.json();
      if (response.ok) {
        setAdminPushStatus("success");
        setAdminPushMessage(data.message || `Successfully broadcasted to ${data.sentCount} attendees.`);
        setAdminPushBody(""); // Clear message box
        fetchPushSubscribersCount();
      } else {
        setAdminPushStatus("error");
        setAdminPushMessage(data.error || "Failed to send notification.");
      }
    } catch (err: unknown) {
      setAdminPushStatus("error");
      const errorObj = err as Error;
      setAdminPushMessage(errorObj.message || "An unexpected error occurred.");
    }
  };

  // Lock body scroll when any modal or video overlay is open to prevent double scrollbars
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAnyModalOpen = isRegisterModalOpen || isAdminModalOpen || isLightboxOpen || activeVideoId !== null || selectedSpeaker !== null;
      if (isAnyModalOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }
    return () => {
      if (typeof window !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [isRegisterModalOpen, isAdminModalOpen, isLightboxOpen, activeVideoId, selectedSpeaker]);

  // ── SHOPPING CART STATE & CONFIG ──
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    "prod-1": "M",
    "prod-2": "L",
    "prod-3": "Standard Edition (₦10,000)",
  });
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({
    "prod-1": "Midnight Black",
    "prod-2": "Royal Purple",
    "prod-3": "Bible Study Journal",
  });

  const addToCart = (product: typeof PRODUCTS[0]) => {
    const size = selectedSizes[product.id] || product.sizes[0];
    const color = selectedColors[product.id] || product.colors[0];
    
    // Calculate price for journal options dynamically
    let unitPrice = product.price;
    if (product.id === "prod-3") {
      if (size.includes("20,000")) {
        unitPrice = 20000;
      } else if (size.includes("10,000")) {
        unitPrice = 10000;
      }
    }

    const event = new CustomEvent("add-to-cart", {
      detail: { 
        product: {
          ...product,
          price: unitPrice
        }, 
        size, 
        color 
      }
    });
    window.dispatchEvent(event);
  };

  // ── SOCIAL HUB POSTS ──
  const SOCIAL_POSTS = [
    {
      id: "post-1",
      platform: "instagram",
      image: "/kpr4.jpg",
      caption: "A sound is rising from the city of Uyo! Kingdom Prayer Retreat 2026 is here to birth deep conviction. 🔥 #KPR2026 #BattleAxe #UyoPrayers",
      likes: "2,410",
      comments: "384",
      link: "https://www.instagram.com/thepistisplaceglobal",
      date: "2 hours ago",
    },
    {
      id: "post-2",
      platform: "instagram",
      image: "/kpr3.jpg",
      caption: "We are the generation that seeks Him! Anticipate profound intercession, heavy worship, and apostolic alignments. 🙌 #KPR2026",
      likes: "1,850",
      comments: "250",
      link: "https://www.instagram.com/thepistisplaceglobal",
      date: "1 day ago",
    },
    {
      id: "post-3",
      platform: "facebook",
      image: "/kpr1.jpg",
      caption: "🔥 FREE Transportation Shuttle Routes for all KPR attendees have been released! Click on the routes details above to find the closest shuttle hub to you. See you there!",
      likes: "956",
      comments: "128",
      link: "https://www.facebook.com/thepistisplaceglobal",
      date: "2 days ago",
    }
  ];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    const targetDate = new Date("2026-08-07T09:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          subject: `KPR Inquiry: ${form.subject || "General"}`,
        }),
      });
      if (!res.ok) throw new Error();
      setSubmitStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return "Please enter a valid email address";
        }
        return "";
      case "fullName":
        if (!value.trim()) return "Full Name is required";
        return "";
      case "phone":
        if (!value.trim()) return "Phone Number is required";
        return "";
      case "gender":
        if (!value) return "Gender is required";
        return "";
      case "residence":
        if (!value.trim()) return "City/State of Residence is required";
        return "";
      case "joiningMode":
        if (!value) return "Please select if joining online or in-person";
        return "";
      case "referral":
        if (!value) return "Please select how you heard about KPR 2026";
        return "";
      case "expectations":
        if (!value.trim()) return "Please write down your expectations";
        return "";
      case "accommodation":
        if (!value) return "Accommodation preference is required";
        return "";
      case "tshirt":
        if (!value) return "T-shirt preference is required";
        return "";
      default:
        return "";
    }
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setRegisterErrors((prev) => ({ ...prev, [name]: error }));
  };

  const exportToCSV = () => {
    if (registrations.length === 0) return;
    
    const headers = [
      "Ticket ID",
      "Full Name",
      "Email",
      "Gender",
      "Residence",
      "Phone Number",
      "Joining Mode",
      "Referral Source",
      "Expectations",
      "Accommodation Preference",
      "T-shirt Pre-order",
      "Registration Date"
    ];

    const rows = registrations.map(reg => [
      reg.id,
      `"${reg.fullName.replace(/"/g, '""')}"`,
      `"${reg.email.replace(/"/g, '""')}"`,
      reg.gender,
      `"${reg.residence.replace(/"/g, '""')}"`,
      `"${reg.phone.replace(/"/g, '""')}"`,
      `"${reg.joiningMode.replace(/"/g, '""')}"`,
      `"${reg.referral.replace(/"/g, '""')}"`,
      `"${reg.expectations.replace(/"/g, '""')}"`,
      `"${reg.accommodation.replace(/"/g, '""')}"`,
      `"${reg.tshirt.replace(/"/g, '""')}"`,
      reg.registeredAt
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(e => e.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `KPR_2026_Registrations_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAdminLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasscode.trim() === "KPR2026-ADMIN") {
      setIsAdminAuthenticated(true);
      if (typeof window !== "undefined") {
        localStorage.setItem("kpr-admin-authenticated", "true");
      }
      setAdminError("");
      await fetchRegistrations();
    } else {
      setAdminError("Invalid Admin Passcode. Access Denied.");
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate KPR fields
    const newErrors: Record<string, string> = {};
    Object.keys(registerForm).forEach((key) => {
      const err = validateField(key, registerForm[key as keyof typeof registerForm]);
      if (err) newErrors[key] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      setRegisterErrors(newErrors);
      return;
    }

    setRegisterErrors({});
    setIsRegistering(true);
    setRegisterStatus("idle");

    try {
      const ticketNum = Math.floor(1000 + Math.random() * 9000);
      const ticketId = `KPR26-${ticketNum}`;
      const registrationData: KPRRegistration = {
        id: ticketId,
        email: registerForm.email.trim(),
        fullName: registerForm.fullName.trim(),
        gender: registerForm.gender,
        residence: registerForm.residence.trim(),
        phone: registerForm.phone.trim(),
        joiningMode: registerForm.joiningMode,
        referral: registerForm.referral,
        expectations: registerForm.expectations.trim(),
        accommodation: registerForm.accommodation,
        tshirt: registerForm.tshirt,
        registeredAt: new Date().toISOString(),
      };

      // Attempt to save to Supabase
      const { supabase: supabaseClient } = await import("@/lib/supabase");
      if (
        supabaseClient &&
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co"
      ) {
        const { error } = await supabaseClient
          .from("kpr_registrations")
          .insert([registrationData]);
        if (error) {
          console.warn("Supabase database insert warning (falling back to local storage):", error);
        }
      }

      // Store in LocalStorage
      localStorage.setItem("kpr-2026-registration", JSON.stringify(registrationData));
      setRegisteredTicket(registrationData);
      setRegisterStatus("success");
      setRegisterForm({
        email: "",
        fullName: "",
        gender: "",
        residence: "",
        phone: "",
        joiningMode: "",
        referral: "",
        expectations: "",
        accommodation: "",
        tshirt: "",
      });

      // Send pass email
      try {
        await fetch("/api/KPR/ticket-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ticket: registrationData }),
        });
      } catch (emailErr) {
        console.warn("Failed to send ticket email:", emailErr);
      }
    } catch (err) {
      console.error("Failed to complete database submission (using local storage fallback):", err);
      // Ensure the registration works locally either way so the user is never stuck
      const ticketNum = Math.floor(1000 + Math.random() * 9000);
      const ticketId = `KPR26-${ticketNum}`;
      const registrationData: KPRRegistration = {
        id: ticketId,
        email: registerForm.email.trim(),
        fullName: registerForm.fullName.trim(),
        gender: registerForm.gender,
        residence: registerForm.residence.trim(),
        phone: registerForm.phone.trim(),
        joiningMode: registerForm.joiningMode,
        referral: registerForm.referral,
        expectations: registerForm.expectations.trim(),
        accommodation: registerForm.accommodation,
        tshirt: registerForm.tshirt,
        registeredAt: new Date().toISOString(),
      };
      localStorage.setItem("kpr-2026-registration", JSON.stringify(registrationData));
      setRegisteredTicket(registrationData);
      setRegisterStatus("success");

      // Send pass email for fallback case
      try {
        await fetch("/api/KPR/ticket-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ticket: registrationData }),
        });
      } catch (emailErr) {
        console.warn("Failed to send ticket email (fallback):", emailErr);
      }
    } finally {
      setIsRegistering(false);
    }
  };

  const handleClearRegistration = () => {
    if (confirm("Are you sure you want to register a new person? Your current pass is saved on this browser.")) {
      localStorage.removeItem("kpr-2026-registration");
      setRegisteredTicket(null);
      setRegisterStatus("idle");
    }
  };

  const generateGoogleCalendarUrl = (ticket: KPRRegistration) => {
    const title = encodeURIComponent("Kingdom Prayer Retreat (KPR 2026)");
    const description = encodeURIComponent(
      `Kingdom Prayer Retreat (KPR 2026) - Advancing God's kingdom by birthing convictions in the heart of men through the word and soul transforming encounters.\n\nYour Official Entry Pass ID: ${ticket.id}\nJoining Mode: ${ticket.joiningMode}\n\nRegister for free: https://thepistisplace.org/KPR`
    );
    const location = encodeURIComponent(
      ticket.joiningMode.toLowerCase().includes("in-person")
        ? "The Pistis Place, Lagos, Nigeria"
        : "Online via YouTube & Facebook Live"
    );
    const dates = "20260807T080000Z/20260809T210000Z";
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${description}&location=${location}`;
  };

  const handleDownloadICS = (ticket: KPRRegistration) => {
    const title = "Kingdom Prayer Retreat (KPR 2026)";
    const description = `Kingdom Prayer Retreat (KPR 2026) - Advancing God's kingdom by birthing convictions in the heart of men through the word and soul transforming encounters.\\n\\nYour Official Entry Pass ID: ${ticket.id}\\nJoining Mode: ${ticket.joiningMode}\\n\\nRegister for free: https://thepistisplace.org/KPR`;
    const location = ticket.joiningMode.toLowerCase().includes("in-person")
      ? "The Pistis Place, Lagos, Nigeria"
      : "Online via YouTube & Facebook Live";

    const icsLines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//The Pistis Place//KPR 2026//EN",
      "BEGIN:VEVENT",
      `UID:kpr-2026-${ticket.id}`,
      `DTSTAMP:20260710T000000Z`,
      "DTSTART:20260807T080000Z",
      "DTEND:20260809T210000Z",
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ];

    const blob = new Blob([icsLines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `KPR_2026_Event_${ticket.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = async (ticket: KPRRegistration) => {
    if (isDownloadingPdf) return;
    setIsDownloadingPdf(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const element = document.getElementById("kpr-official-pass-print-target");
      if (!element) {
        console.error("Print target element not found!");
        setIsDownloadingPdf(false);
        return;
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#0B0813",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const xOffset = (210 - imgWidth) / 2;
      const yOffset = (297 - imgHeight) / 2;

      pdf.addImage(imgData, "PNG", xOffset, yOffset > 10 ? yOffset : 10, imgWidth, imgHeight);
      pdf.save(`KPR_2026_Pass_${ticket.fullName.trim().replace(/\s+/g, "_")}.pdf`);
    } catch (err) {
      console.error("Error creating PDF:", err);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar logoHref="/" />

      {/* ── HERO ── */}
      <section className="relative min-h-[50vh] md:min-h-[80vh] flex flex-col justify-end overflow-hidden pt-[10vh] md:pt-[30vh]">
        {/* Full-bleed background */}
        <div className="absolute inset-0">
          <Image
            src="/KPR_Landscape.jpg"
            alt="Kingdom Prayer Retreat 2026"
            fill
            className="object-cover object-center"
            priority
            quality={90}
            sizes="100vw"
          />
          {/* layered gradients for depth and text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        </div>

        {/* Hero content — pinned to bottom */}
        <div className="relative z-10 px-5 sm:px-8 md:px-14 pt-28 pb-12 sm:pb-16 md:pb-10 max-w-6xl w-full mx-auto md:grid md:grid-cols-12 md:gap-12 md:items-center">
          {/* Left Column: Core Info & Call-To-Action */}
          <div className="md:col-span-7 flex flex-col justify-center">
            <FadeIn delay={0.15}>
              <div className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full border border-white/20 mb-3 w-fit">
                <Flame className="w-4 h-4 text-[#F21449]" />
                <span className="text-white/90 font-medium text-xs">
                  August 7 – 9, 2026 &nbsp;·&nbsp; Emerald Event Center, Uyo
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-white/50 text-xs font-bold tracking-[0.15em] uppercase my-1">
                Kingdom Prayer Retreat 2026
              </p>
            </FadeIn>

            <TextReveal delay={0.3}>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight bricolage text-white mb-5">
                Thou Art My Battle Axe
              </h1>
            </TextReveal>

            <FadeIn delay={0.45}>
              <p className="text-white/70 text-sm sm:text-base font-medium mb-1">
                With Pastors Japheth &amp; Grace Japheth
              </p>
              <p className="text-white/40 text-xs sm:text-sm italic mb-3">
                And other of God&apos;s chosen servants
              </p>
            </FadeIn>

            {isMounted && (
              <FadeIn delay={0.5}>
                <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-sm mb-6 mt-1">
                  {[
                    { label: "Days", value: timeLeft.days },
                    { label: "Hours", value: timeLeft.hours },
                    { label: "Mins", value: timeLeft.minutes },
                    { label: "Secs", value: timeLeft.seconds },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 shadow-lg shadow-black/15 text-center"
                    >
                      <span className="text-xl sm:text-2xl font-black text-white font-mono leading-none tracking-tight">
                        {String(item.value).padStart(2, "0")}
                      </span>
                      <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-white/60 font-bold mt-1">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            )}

            <FadeIn delay={0.55}>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setIsRegisterModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#F21449]/80 to-[#300460]/80 backdrop-blur-md px-7 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg shadow-[#F21449]/25 border border-white/25 transition-all duration-300 hover:-translate-y-1 hover:from-[#d01040]/90 hover:to-[#220245]/90 hover:shadow-xl hover:shadow-[#F21449]/40 active:translate-y-0 cursor-pointer"
                >
                  Register Now <ArrowUpRight size={18} />
                </button>
                <Link href="https://forms.gle/zHG366ypbJVUPMnz9" target="_blank" rel="noopener noreferrer">
                  <button className="inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-md px-7 py-3.5 text-sm sm:text-base font-semibold border border-white/20 text-white/90 transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 hover:border-white/30 active:translate-y-0">
                    Volunteer to Serve
                  </button>
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Beautifully Stacked Multi-Dimension Showcase */}
          <div className="col-span-12 md:col-span-5 mt-12 md:mt-0 relative">
            <FadeIn delay={0.6}>
              <div 
                className="relative w-full h-[400px] sm:h-[460px] lg:h-[530px] group/stack flex flex-col justify-between"
                onMouseEnter={() => setIsHoveredStack(true)}
                onMouseLeave={() => setIsHoveredStack(false)}
              >
                
                {/* Premium gold/crimson top border light leak */}
                <div className="absolute top-0 left-1/10 right-1/10 h-px bg-gradient-to-r from-transparent via-[#F21449]/70 to-transparent pointer-events-none z-20" />
                <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent blur-sm pointer-events-none z-20" />

                {/* Background ambient glowing aura */}
                <div className="absolute inset-0 select-none pointer-events-none overflow-hidden rounded-3xl z-0 bg-gradient-to-b from-[#120826]/30 to-[#05020c]/40">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeHeroIndex}
                      initial={{ opacity: 0, scale: 1.15 }}
                      animate={{ opacity: 0.25, scale: 1.25 }}
                      exit={{ opacity: 0, scale: 1.15 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <Image
                        src={HERO_FLYERS[activeHeroIndex].src || "/for_hero/KPR 2026 - Main Flyer.jpg"}
                        alt="Ambient blur"
                        fill
                        className="object-cover blur-3xl"
                        unoptimized
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* The Stacked Cards Area */}
                <div className="relative w-[85%] sm:w-[82%] h-[80%] mt-8 mx-auto z-10">
                  {HERO_FLYERS.map((flyer, idx) => {
                    const total = HERO_FLYERS.length;
                    const offset = (idx - activeHeroIndex + total) % total;
                    const isTop = offset === 0;

                    // Compute dynamic stacking translations, scales, rotations, and opacities
                    // Fan out to top-right on hover
                    const xOffset = offset === 0 ? 0 : offset === 1 ? (isHoveredStack ? 24 : 12) : offset === 2 ? (isHoveredStack ? 48 : 24) : (isHoveredStack ? 72 : 36);
                    const yOffset = offset === 0 ? 0 : offset === 1 ? (isHoveredStack ? -18 : -9) : offset === 2 ? (isHoveredStack ? -36 : -18) : (isHoveredStack ? -54 : -27);
                    const rotateVal = offset === 0 ? 0 : offset === 1 ? (isHoveredStack ? 5 : 2.5) : offset === 2 ? (isHoveredStack ? -5 : -2.5) : (isHoveredStack ? 8 : 4);
                    const scaleVal = 1 - offset * 0.055;
                    const zIndexVal = 40 - offset * 10;
                    const opacityVal = 1 - offset * 0.16;

                    return (
                      <motion.div
                        key={idx}
                        style={{ zIndex: zIndexVal }}
                        animate={{
                          x: xOffset,
                          y: yOffset,
                          rotate: rotateVal,
                          scale: scaleVal,
                          opacity: opacityVal,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 280,
                          damping: 24,
                        }}
                        className={`absolute inset-0 w-full h-full rounded-2xl border ${
                          isTop 
                            ? "border-white/15 bg-gradient-to-b from-[#140b29] to-[#080312]" 
                            : "border-white/5 bg-gradient-to-b from-[#110921] to-[#05020a] hover:border-white/12"
                        } shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col justify-between transition-colors duration-300 ${
                          isTop ? "pointer-events-auto" : "pointer-events-auto cursor-pointer"
                        }`}
                        onClick={() => {
                          if (!isTop) {
                            setActiveHeroIndex(idx);
                          }
                        }}
                      >
                        {/* Elegant Top Bar inside each card */}
                        <div className="relative z-20 flex items-center justify-between p-3 bg-black/50 border-b border-white/5 backdrop-blur-sm select-none">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-[9px] font-bold uppercase tracking-wider text-white">
                            <span className="relative flex h-1.5 w-1.5">
                              {isTop && (
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F21449] opacity-75"></span>
                              )}
                              <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${isTop ? "bg-[#F21449]" : "bg-white/30"}`}></span>
                            </span>
                            <span className={isTop ? "text-[#F21449]" : "text-white/60"}>{flyer.badge}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-white/35 font-mono text-[9px] font-bold tracking-widest bg-black/40 px-1.5 py-0.5 rounded border border-white/5">
                              0{idx + 1}
                            </span>
                            {/* Maximize button only for active static images */}
                            {isTop && flyer.type !== "3d" && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setIsLightboxOpen(true);
                                }}
                                className="p-1 rounded-lg bg-white/5 hover:bg-[#F21449]/20 border border-white/10 hover:border-[#F21449]/30 transition-all duration-300 text-white/70 hover:text-white hover:scale-105 active:scale-95 cursor-pointer z-30"
                                title="View Fullscreen"
                              >
                                <Maximize2 size={12} />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Card Content Area */}
                        <div className="relative flex-1 w-full bg-black/30 overflow-hidden flex items-center justify-center">
                          {/* Inner shadow overlay */}
                          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50 pointer-events-none z-10" />
                          
                          {/* Semi-transparent interactive dimming mask for non-active background cards */}
                          {!isTop && (
                            <div className="absolute inset-0 bg-black/60 hover:bg-black/45 backdrop-blur-[1px] transition-all duration-300 z-15 flex flex-col items-center justify-center p-4 text-center">
                              <span className="text-[9px] text-[#F21449] uppercase tracking-widest font-black mb-1">Bring to Front</span>
                              <span className="text-white/70 font-extrabold text-[11px] uppercase tracking-wider line-clamp-2 max-w-[85%]">{flyer.title}</span>
                            </div>
                          )}

                          {flyer.type === "3d" ? (
                            isTop ? (
                              <div className="w-full h-full relative z-10">
                                <BattleAxe3D />
                              </div>
                            ) : (
                              <div className="w-full h-full relative flex flex-col items-center justify-center p-6 text-center select-none">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(242,20,73,0.12)_0%,transparent_70%)] pointer-events-none" />
                                <div className="relative w-14 h-14 bg-gradient-to-r from-[#F21449]/15 to-[#300460]/15 rounded-full border border-white/10 flex items-center justify-center mb-2.5 shadow-lg shadow-black/40">
                                  <span className="text-2xl filter drop-shadow-[0_0_8px_rgba(242,20,73,0.5)]">🪓</span>
                                </div>
                                <h4 className="text-white/80 font-bold text-xs tracking-wider uppercase">Interactive 3D Axe</h4>
                                <p className="text-white/40 text-[8px] uppercase tracking-widest mt-1 font-semibold">3D WebGL Experience</p>
                              </div>
                            )
                          ) : (
                            <div className="relative w-[92%] h-[92%]">
                              <Image
                                src={flyer.src}
                                alt={flyer.alt}
                                fill
                                className="object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.75)]"
                                sizes="(max-width: 768px) 100vw, 30vw"
                                priority={idx === 0}
                                unoptimized
                              />
                            </div>
                          )}
                        </div>

                        {/* Card Footer */}
                        <div className="relative z-20 px-4 py-3 bg-black/60 border-t border-white/5 flex items-center justify-between select-none">
                          <p className="text-white/85 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest truncate max-w-[70%]">
                            {flyer.title}
                          </p>
                          <span className="text-[9px] text-[#F21449] font-black tracking-widest uppercase">
                            {flyer.type === "3d" ? "3D Axe" : "Flyer View"}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Subtle stacked indicators (Pill tabs) below the stack */}
                <div className="relative z-10 flex justify-center gap-2.5 mt-2 mb-2 select-none">
                  {HERO_FLYERS.map((_, idx) => {
                    const isSelected = activeHeroIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveHeroIndex(idx)}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          isSelected 
                            ? "w-8 bg-gradient-to-r from-[#F21449] to-[#300460] shadow-md shadow-[#F21449]/20" 
                            : "w-2.5 bg-white/20 hover:bg-white/40"
                        }`}
                        aria-label={`Go to card ${idx + 1}`}
                      />
                    );
                  })}
                </div>

              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── STREAMING BANNER ── */}
      <div className="bg-[#06040B] border-y border-white/5 py-4 overflow-hidden relative">
        {/* Subtle red glow in the middle */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div className="w-[30%] h-full bg-gradient-to-r from-[#F21449]/10 to-[#300460]/10 blur-2xl" />
        </div>
        <div className="flex items-center justify-center gap-3 relative z-10 px-4">
          <Radio className="w-4 h-4 text-[#F21449] animate-pulse flex-shrink-0" />
          <p className="text-white/80 text-xs sm:text-sm font-medium tracking-[0.15em] text-center uppercase">
            Streaming live on all platforms &nbsp;<span className="text-[#F21449]">·</span>&nbsp; @thepistisplaceglobal &nbsp;<span className="text-[#F21449]">·</span>&nbsp; @kingdomprayerretreat
          </p>
          <Radio className="w-4 h-4 text-[#F21449] animate-pulse flex-shrink-0" />
        </div>
      </div>

      {/* ── IMAGE MARQUEE ── */}
      <div className="bg-[#06040B] py-12 overflow-hidden relative">
        <Marquee>
          <MarqueeFade side="left" className="from-[#06040B] w-24" />
          <MarqueeContent speed={40}>
            {marqueeImages.map((src, i) => (
              <MarqueeItem key={i} className="mx-3">
                <div className="relative w-72 h-48 rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-xl group">
                  <Image
                    src={src}
                    alt={`KPR moment ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="288px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </MarqueeItem>
            ))}
          </MarqueeContent>
          <MarqueeFade side="right" className="from-[#06040B] w-24" />
        </Marquee>
      </div>

      {/* ── ABOUT KPR ── */}
      <section id="about" className="py-20 px-5 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <FadeIn delay={0.1}>
                <span className="inline-block py-1 px-3 rounded-full bg-gradient-to-r from-[#F21449]/5 to-[#300460]/5 text-[#300460] text-sm font-semibold mb-4 border border-[#300460]/10">
                  What is KPR?
                </span>
              </FadeIn>
              <TextReveal delay={0.2}>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                  A time for <span className="bg-gradient-to-r from-[#F21449] to-[#300460] bg-clip-text text-transparent">Prayer</span>
                </h2>
              </TextReveal>
              <FadeIn delay={0.4}>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-6">
                  The Kingdom Prayer Retreat (KPR) is an annual gathering hosted
                  by The Pistis Place Global in Uyo, Akwa Ibom State, Nigeria.
                  It is a dedicated season of deep intercession, prophetic
                  worship, and divine encounter.
                </p>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  For three transformative days, participants engage in prayer
                  sessions, teaching from the Word, times of worship, and
                  personal encounters with the Holy Spirit. KPR is not a
                  conference, it is a convergence of hungry hearts pressing
                  into the Kingdom of God.
                </p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {[
                { icon: <Calendar className="w-6 h-6 text-[#300460]" />, value: "3 Days", label: "of Consecration" },
                { icon: <Users className="w-6 h-6 text-[#300460]" />, value: "1000+", label: "Attendees Expected" },
                { icon: <Wifi className="w-6 h-6 text-[#300460]" />, value: "Hybrid", label: "Online & In-Person" },
                { icon: <MapPin className="w-6 h-6 text-[#300460]" />, value: "Emerald Event Center", label: "119 Edet Akpan Avenue, Uyo, Nigeria" },
              ].map((stat, i) => (
                <ScaleIn key={i} delay={0.2 + i * 0.1}>
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl shadow-gray-100/50 hover:-translate-y-1 transition-all h-full group">
                    <div className="w-10 h-10 rounded-lg p-2 bg-gradient-to-br from-[#F21449]/10 to-[#300460]/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      {stat.icon}
                    </div>
                    <p className="text-lg md:text-xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-gray-500 text-xs md:text-sm font-medium">{stat.label}</p>
                  </div>
                </ScaleIn>
              ))}
            </div>
          </div>

          {/* Interactive Google Map for Emerald Event Center Location */}
          <div className="mt-14">
            <FadeIn delay={0.3}>
              <div className="text-center mb-6">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#F21449]">
                  Venue & Navigation
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 tracking-tight">
                  Finding Your Way to Emerald Event Center
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm max-w-xl mx-auto mt-1">
                  Located along 4 Lanes (Edet Akpan Avenue), Uyo. Use the interactive map below to view the precise venue location and get step-by-step directions.
                </p>
              </div>
              <EventMap />
            </FadeIn>
          </div>
        </div>
      </section>


      {/* ── SPEAKERS ── */}
      <section className="py-20 px-5 bg-[#06040B] relative overflow-hidden" id="speakers-section">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-950/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <FadeIn delay={0.1}>
            <div className="mb-14 text-center md:text-left">
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-extrabold text-xs uppercase tracking-[0.25em]">
                Kingdom Ministers
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white bricolage mt-1">Our Speakers</h2>
              <p className="text-white/40 mt-3 text-base max-w-xl">
                Anointed voices commissioned for deep alignments, heavy prophetic instructions, and spiritual encounters. Click on any minister to view their profile.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 max-w-6xl mx-auto">
            {[
              {
                name: "Pastor Japheth Joseph",
                role: "Lead Pastor, The Pistis Place Global",
                img: "/kpr_ministers/Pst Japheth.png",
                bio: "Pastor Japheth Joseph is the Lead Pastor of The Pistis Place Global. Guided by an apostolic mandate to raise a generation of conviction and power, his teaching and prayer ministry has transformed countless lives across the nation. He is the Convener of the annual Kingdom Prayer Retreat (KPR) and is deeply passionate about raising spiritual watchmen in this dispensation.",
                socials: { instagram: "https://instagram.com/thepistisplaceglobal", facebook: "https://facebook.com/thepistisplaceglobal" }
              },
              {
                name: "Pastor Grace Japheth",
                role: "Pastor, The Pistis Place Global",
                img: "/kpr_ministers/Pst Grace.png",
                bio: "Pastor Grace Japheth is a passionate teacher of the Word and co-pastor at The Pistis Place Global. Her ministry is marked by a deep commitment to family life, spiritual devotion, and raising women who stand strong in faith and prayer. She serves alongside her husband to shepherd the flock with grace, wisdom, and love.",
                socials: { instagram: "https://instagram.com/thepistisplaceglobal", facebook: "https://facebook.com/thepistisplaceglobal" }
              },
              {
                name: "Minister Caleb David",
                role: "Anointed Psalmist & Music Minister",
                img: "/kpr_ministers/Caleb David.png",
                bio: "Caleb David is a highly anointed psalmist, singer-songwriter, and music minister. With a distinct sound of revival, his deep, spirit-led worship has blessed millions globally. His ministry focuses on creating atmospheres of intense corporate prayer, inner healing, and deep intimacy with Jesus.",
                socials: { instagram: "https://instagram.com/thepistisplaceglobal" }
              },
              {
                name: "Minister Mr Wealth",
                role: "Anointed Music Minister & Worship Leader",
                img: "/kpr_ministers/Mr Wealth.png",
                bio: "Mr Wealth is a prolific songwriter and worship leader devoted to spreading the sound of revival. His energetic and deeply sincere ministration of spiritual songs awakens a hunger for God and leads congregations into powerful encounters with the Holy Spirit.",
                socials: { instagram: "https://instagram.com/thepistisplaceglobal" }
              },
              {
                name: "Pastor Godswill",
                role: "Guest Speaker & Apostolic Minister",
                img: "/kpr_ministers/Pst Godswill.png",
                bio: "Pastor Godswill is an apostolic voice with a strong burden for kingdom restoration and global awakening. His ministry is backed by structural teaching, a heavy demonstration of spiritual gifts, and a commitment to aligning believers with their ultimate destiny in Christ.",
                socials: { instagram: "https://instagram.com/thepistisplaceglobal" }
              },
              {
                name: "Pastor Philip",
                role: "Guest Speaker & Prophetic Voice",
                img: "/kpr_ministers/Pst Philip.png",
                bio: "Pastor Philip is a prophetic voice raised for this generation, carrying a heavy mantle for prayer, deliverance, and spiritual warfare. His teaching and ministration empower believers to stand in spiritual authority, enter deep intercessory realms, and walk in total victory.",
                socials: { instagram: "https://instagram.com/thepistisplaceglobal" }
              }
            ].map((speaker, i) => (
              <ScaleIn key={i} delay={0.1 + i * 0.08}>
                <div
                  onClick={() => setSelectedSpeaker(speaker)}
                  className="bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-[18px] p-2.5 sm:p-3 transition-all duration-500 hover:bg-white/[0.07] hover:border-white/20 hover:shadow-[0_12px_40px_rgba(242,20,73,0.12)] group cursor-pointer flex flex-col h-full"
                  id={`speaker-card-${i}`}
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[12px] bg-white/[0.02] border border-white/5 mb-3">
                    <Image
                      src={speaker.img}
                      alt={speaker.name}
                      fill
                      className="object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06040B]/80 via-[#06040B]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Subtle action cue icon on hover */}
                    <div className="absolute bottom-2 right-2 bg-white/10 backdrop-blur-md rounded-full p-1.5 border border-white/20 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow text-left">
                    <h3 className="text-white font-bold text-sm leading-snug bricolage group-hover:text-pink-400 transition-colors duration-300">
                      {speaker.name}
                    </h3>
                    <p className="text-white/40 text-[11px] leading-tight mt-1 mb-3 font-medium line-clamp-2">
                      {speaker.role}
                    </p>
                    
                    {/* Click trigger action label */}
                    <div className="mt-auto pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40 group-hover:text-white transition-colors duration-300">
                      <span className="font-bold tracking-wider uppercase text-[8px]">View Bio</span>
                      <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPEAKER DETAIL MODAL ── */}
      <AnimatePresence>
        {selectedSpeaker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSpeaker(null)}
            className="fixed inset-0 z-50 bg-[#06040b]/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-10"
            id="speaker-modal-backdrop"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-[#0e0a1a]/85 border border-white/10 rounded-[28px] overflow-hidden shadow-2xl backdrop-blur-2xl flex flex-col md:flex-row min-h-[480px]"
              id="speaker-modal-container"
            >
              {/* Background Glows */}
              <div className="absolute -top-40 -left-40 w-80 h-80 bg-pink-500/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedSpeaker(null)}
                className="absolute top-4 right-4 z-10 bg-white/5 hover:bg-white/15 backdrop-blur-md text-white/75 hover:text-white border border-white/10 hover:border-white/20 p-2.5 rounded-full transition-all duration-300 shadow-lg"
                aria-label="Close details"
                id="speaker-modal-close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image side */}
              <div className="w-full md:w-5/12 relative aspect-[4/5] md:aspect-auto md:min-h-[480px] bg-white/[0.01] border-b md:border-b-0 md:border-r border-white/10">
                <Image
                  src={selectedSpeaker.img}
                  alt={selectedSpeaker.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  referrerPolicy="no-referrer"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 via-transparent to-transparent" />
              </div>

              {/* Content side */}
              <div className="w-full md:w-7/12 p-6 sm:p-8 md:p-10 flex flex-col justify-between relative z-10">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-white/10 border border-white/10 text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full">
                      KPR 2026 Minister
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white bricolage tracking-tight mb-2">
                    {selectedSpeaker.name}
                  </h3>
                  <p className="text-pink-400 font-medium text-sm sm:text-base mb-6 tracking-wide">
                    {selectedSpeaker.role}
                  </p>
                  
                  {/* Subtle separator */}
                  <div className="h-px w-16 bg-gradient-to-r from-pink-500 to-transparent mb-6" />

                  <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                    {selectedSpeaker.bio}
                  </p>
                </div>

                {/* Socials / Action */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-white/40 tracking-wider uppercase font-semibold">Connect:</span>
                    {selectedSpeaker.socials?.instagram && (
                      <a
                        href={selectedSpeaker.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full border border-white/10 hover:border-white/20 transition-all duration-300"
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                    )}
                    {selectedSpeaker.socials?.facebook && (
                      <a
                        href={selectedSpeaker.socials.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full border border-white/10 hover:border-white/20 transition-all duration-300"
                      >
                        <Facebook className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  
                  <button
                    onClick={() => setSelectedSpeaker(null)}
                    className="text-xs text-white/50 hover:text-white border border-white/10 hover:border-white/35 px-4 py-2 rounded-full transition-all duration-300 bg-white/[0.01]"
                  >
                    Close Profile
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>



      {/* ── PAST EDITIONS ── */}
      <section className="py-16 md:py-20 px-5 bg-[#06040B]">
        <div className="max-w-6xl mx-auto">
          <FadeIn delay={0.1}>
            <div className="mb-10">
              <p className="bg-gradient-to-r from-[#F21449] to-[#300460] bg-clip-text text-transparent font-bold text-lg">
                Our History
              </p>
              <TextReveal delay={0.2}>
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-1">
                  Past Editions
                </h2>
              </TextReveal>
              <FadeIn delay={0.3} direction="left" distance={50}>
                <div className="flex items-center gap-2 mt-3">
                  <div className="h-1 w-16 bg-gradient-to-r from-[#F21449] to-[#300460] rounded-full" />
                  <div className="h-1 w-8 bg-[#F21449]/40 rounded-full" />
                </div>
              </FadeIn>
              <p className="text-white/50 text-sm mt-4 max-w-xl">
                Every year, KPR leaves an indelible mark on the lives of all
                who attend. Here&apos;s a glimpse into what God has done in
                past editions.
              </p>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {pastEditions.map((ed, i) => (
              <SlideIn key={i} direction="up" delay={0.1 + i * 0.15}>
                <div className="group transition-transform duration-300 hover:-translate-y-1">
                  <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 group-hover:border-white/25 transition-colors duration-300">
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={ed.img}
                        alt={ed.year}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
                      <div className="absolute bottom-4 left-4 z-10">
                        <span className="bg-gradient-to-r from-[#F21449] to-[#300460] bg-clip-text text-transparent font-extrabold text-xs tracking-wide uppercase">
                          {ed.year}
                        </span>
                        <p className="text-white font-semibold text-lg leading-tight">
                          {ed.theme}
                        </p>
                      </div>
                    </div>
                    <div className="p-5 relative z-10 bg-[#06040B]">
                      <p className="text-white/65 text-sm leading-relaxed">
                        {ed.description}
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#F21449]" />
                        <span className="text-white/40 text-xs">
                          {ed.attendees} attendees
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </SlideIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAST KPR MESSAGES ── */}
      <section id="messages" className="py-20 md:py-24 px-5 bg-[#0d0917] relative overflow-hidden text-white border-t border-white/5">
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F21449] rounded-full blur-[180px]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <FadeIn delay={0.1}>
            <div className="text-center mb-16">
              <span className="bg-[#F21449]/10 text-[#F21449] text-xs font-bold px-3.5 py-1.5 rounded-full tracking-widest uppercase border border-[#F21449]/25 flex items-center gap-1.5 w-fit mx-auto">
                <Lock size={12} className="text-[#F21449]" />
                Temporarily Locked
              </span>
              <TextReveal delay={0.2}>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-4 bricolage flex items-center justify-center gap-3">
                  Past KPR Messages
                </h2>
              </TextReveal>
              <p className="text-white/50 text-sm md:text-base mt-4 max-w-xl mx-auto font-medium">
                Previous retreat messages are temporarily locked and will be accessible soon. Prepare your heart for KPR 2026.
              </p>
            </div>
          </FadeIn>

          {/* Messages Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {PAST_KPR_MESSAGES.map((msg, i) => (
              <SlideIn key={msg.id} direction="up" delay={0.15 + i * 0.1}>
                <div className="bg-[#130f21] border border-white/5 rounded-3xl p-5 hover:border-[#F21449]/10 transition-all duration-300 flex flex-col h-full group relative overflow-hidden">
                  {/* Thumbnail/Image with locked overlay */}
                  <div className="relative h-48 rounded-2xl overflow-hidden mb-5 bg-black/60 select-none">
                    <Image
                      src={msg.thumbnail}
                      alt={msg.title}
                      fill
                      className="object-cover opacity-30 grayscale transition-all duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white/40 flex items-center justify-center shadow-2xl">
                        <Lock size={18} className="text-[#F21449]/80" />
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-white/50 font-black">Temporarily Locked</span>
                    </div>
                    <div className="absolute top-3 left-3 bg-[#06040B]/80 backdrop-blur-md text-white/60 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/5">
                      {msg.year}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-[#06040B]/80 backdrop-blur-md text-white/40 text-[10px] font-mono px-2.5 py-0.5 rounded-md border border-white/5 flex items-center gap-1">
                      <Clock size={10} /> {msg.duration}
                    </div>
                  </div>

                  {/* Title and Details */}
                  <div className="flex-grow flex flex-col opacity-50 select-none">
                    <span className="text-[#F21449]/80 text-[10px] font-extrabold tracking-widest uppercase mb-1">
                      {msg.category}
                    </span>
                    <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                      {msg.title}
                    </h3>
                    <p className="text-white/60 text-xs leading-relaxed mb-6 flex-grow">
                      {msg.description}
                    </p>

                    <div className="flex items-center gap-2 pt-4 border-t border-white/5 mt-auto">
                      <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">
                        <Lock className="w-3.5 h-3.5 text-white/40" />
                      </div>
                      <div className="text-left">
                        <p className="text-white/60 text-xs font-bold leading-none">Access Restricted</p>
                        <p className="text-white/40 text-[9px] mt-0.5 font-medium">{msg.theme} Edition</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SlideIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── REGISTER ── */}
      <section id="register" className="py-24 px-5 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#300460] rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F21449] rounded-full blur-[100px]" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-8 md:mb-12">
             <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
               {registeredTicket ? "Registration Confirmed!" : "Secure Your Seat"}
             </h2>
             <p className="text-gray-500 text-sm md:text-base mt-2 md:mt-4 max-w-xl mx-auto">
               {registeredTicket 
                 ? "Hallelujah! Your registration has been received and your official entry pass has been directed to your email."
                 : "Registration is free and open to all. Reserve your spot now to secure physical seating and lodging accommodations."}
             </p>
          </div>

          {registeredTicket ? (
            <ScaleIn delay={0.1}>
              <div className="max-w-xl mx-auto bg-[#0B0813] border border-[#F21449]/40 rounded-[2.5rem] overflow-hidden shadow-2xl relative p-8 md:p-10 text-white backdrop-blur-md text-center space-y-6">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F21449]/10 via-[#300460]/10 to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#F21449]/10 rounded-full blur-[60px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#300460]/20 rounded-full blur-[60px] pointer-events-none" />

                <div className="relative z-10 space-y-4 py-4">
                  <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                    <Check size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight">Seat Reserved Successfully</h3>
                  <p className="text-white/60 text-sm leading-relaxed max-w-sm mx-auto font-medium">
                    Your digital entry pass has been generated and directed to <span className="text-[#F21449] font-bold">{registeredTicket.email}</span>. Please check your inbox (including your spam or promotions folder) to retrieve your ticket.
                  </p>
                  
                  <div className="border-t border-white/10 pt-6 mt-6 max-w-xs mx-auto space-y-2 text-left text-xs bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                    <div className="flex justify-between border-b border-white/5 pb-1.5 mb-1.5">
                      <span className="text-white/40 uppercase tracking-wider text-[9px] font-bold">Pass ID:</span>
                      <span className="font-mono font-bold text-white">{registeredTicket.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">Delegate:</span>
                      <span className="font-semibold text-white">{registeredTicket.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">Mode:</span>
                      <span className="font-semibold text-white">{registeredTicket.joiningMode}</span>
                    </div>
                  </div>

                  {/* Add action buttons */}
                  <div className="pt-4 flex flex-col gap-2 max-w-xs mx-auto">
                    <button
                      onClick={() => handleDownloadPDF(registeredTicket)}
                      disabled={isDownloadingPdf}
                      className="w-full py-2.5 bg-[#F21449] hover:bg-[#D10F3E] disabled:bg-white/10 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Download size={13} className={isDownloadingPdf ? "animate-bounce" : ""} />
                      {isDownloadingPdf ? "Generating PDF..." : "Download PDF Ticket"}
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={generateGoogleCalendarUrl(registeredTicket)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-[10px] font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Calendar size={12} className="text-[#F21449]" />
                        Google Cal
                      </a>
                      <button
                        onClick={() => handleDownloadICS(registeredTicket)}
                        className="py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-[10px] font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Calendar size={12} className="text-[#F21449]" />
                        ICS File
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center items-center">
                    <button
                      onClick={handleClearRegistration}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Register Another Person
                    </button>
                  </div>
                </div>
              </div>
            </ScaleIn>
          ) : (
            <ScaleIn delay={0.2}>
              {/* VIP Ticket Card */}
              <div className="flex flex-col md:flex-row bg-[#06040B] rounded-[2.5rem] overflow-hidden shadow-2xl relative group border border-gray-800">
                {/* Left Side: QR Code & Fast Scan */}
                <div className="md:w-2/5 p-10 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-white/10 border-dashed">
                  <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full hidden md:block shadow-inner" />
                  <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full hidden md:block z-20 shadow-inner" />
                  
                  <div className="bg-white p-4 rounded-3xl shadow-[0_0_40px_rgba(242,20,73,0.15)] mb-6 group-hover:scale-105 transition-transform duration-500">
                    <div className="relative w-60 h-60 md:w-50 md:h-50">
                      <Image src="/qrcode.png" alt="Scan to register" fill className="object-contain" />
                    </div>
                  </div>
                  
                  <p className="text-white/40 text-sm text-center font-medium">Scan with camera to register</p>
                </div>

                {/* Right Side: Details & Button */}
                <div className="md:w-3/5 p-10 md:p-14 relative overflow-hidden flex flex-col justify-center">
                   <div className="absolute inset-0 bg-gradient-to-br from-[#F21449]/10 via-[#300460]/10 to-transparent opacity-50 pointer-events-none" />
                   
                   <div className="flex items-center gap-3 mb-4 md:mb-6 relative z-10">
                      <span className="bg-gradient-to-r from-[#F21449]/20 to-[#300460]/20 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide backdrop-blur-sm border border-white/10">
                        KPR 2026
                      </span>
                      <span className="bg-white text-black text-xs font-bold px-3 py-1 rounded-full tracking-wide border border-white/10">
                        Free Entry
                      </span>
                   </div>

                   <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-10 tracking-tight relative z-10">
                      Kingdom Prayer Retreat
                    </h3>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-8 gap-x-6 mb-10 relative z-10">
                      <div>
                         <p className="text-white/40 text-[10px] uppercase tracking-[0.15em] mb-1.5 font-bold">Date</p>
                         <p className="text-white font-medium text-sm">Aug 7 &ndash; 9, 2026</p>
                      </div>
                      <div>
                         <p className="text-white/40 text-[10px] uppercase tracking-[0.15em] mb-1.5 font-bold">Location</p>
                         <p className="text-white font-medium text-sm">The Pistis Place</p>
                      </div>
                      <div>
                         <p className="text-white/40 text-[10px] uppercase tracking-[0.15em] mb-1.5 font-bold">Access</p>
                         <p className="text-white font-medium text-sm">In-Person & Online</p>
                      </div>
                      <div>
                         <p className="text-white/40 text-[10px] uppercase tracking-[0.15em] mb-1.5 font-bold">Duration</p>
                         <p className="text-white font-medium text-sm">3 Power-packed Days</p>
                      </div>
                   </div>

                   <div className="relative z-10">
                     <button
                       onClick={() => setIsRegisterModalOpen(true)}
                       className="w-full flex items-center justify-center gap-2 rounded-2xl bg-white text-[#06040B] px-4 md:px-8 py-2.5 md:py-5 text-sm md:text-lg font-bold shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-gray-100 cursor-pointer"
                     >
                       Register Now <ArrowUpRight size={20} />
                     </button>
                   </div>
                </div>
              </div>
            </ScaleIn>
          )}

          {/* Push Notifications Client Widget */}
          {pushSupported && (
            <div className="max-w-md mx-auto mt-10 p-5 rounded-2xl bg-gray-50 border border-gray-100 relative z-10 flex flex-col sm:flex-row items-center gap-4 text-left">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${isSubscribed ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "bg-[#F21449]/10 text-[#F21449] border border-[#F21449]/20"}`}>
                {isSubscribed ? <BellRing size={20} className="animate-pulse" /> : <Bell size={20} />}
              </div>
              <div className="flex-grow text-center sm:text-left">
                <h4 className="text-sm font-extrabold text-gray-900 leading-tight">Enable Live KPR Updates</h4>
                <p className="text-gray-500 text-[11px] mt-0.5 leading-tight">Subscribe to receive instant live alerts, charge announcements, and updates on your device.</p>
                {notificationPermission === "denied" ? (
                  <p className="text-[10px] font-semibold mt-1 text-rose-500">
                    Notifications are blocked. Please enable them in browser settings.
                  </p>
                ) : pushStatusMessage ? (
                  <p className={`text-[10px] font-semibold mt-1 ${pushStatusMessage.includes("enable") || pushStatusMessage.includes("Failed") ? "text-rose-500" : "text-emerald-600"}`}>
                    {pushStatusMessage}
                  </p>
                ) : null}
              </div>
              <button
                onClick={handleTogglePush}
                disabled={isPushLoading}
                className={`w-full sm:w-auto h-9 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-colors shrink-0 cursor-pointer ${isSubscribed ? "bg-white hover:bg-gray-100 border border-gray-200 text-gray-700" : "bg-[#F21449] hover:bg-[#D10F3E] text-white shadow-md shadow-[#F21449]/15"}`}
              >
                {isPushLoading ? "Working..." : isSubscribed ? "Disable" : "Enable"}
              </button>
            </div>
          )}

          {/* Organizer Portal Entry Link */}
          <div className="mt-12 text-center relative z-10">
            <button
              onClick={() => {
                setIsAdminModalOpen(true);
                setAdminError("");
                setAdminPasscode("");
              }}
              className="text-xs text-gray-500 hover:text-[#F21449] font-medium transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <Lock size={12} />
              Organizer Portal Access
            </button>
          </div>
        </div>
      </section>


      {/* ── KPR 2026 COMMEMORATIVE MERCHANDISE ── */}
      <section id="shop" className="py-20 md:py-24 px-5 bg-[#06040B] relative overflow-hidden text-white">
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
          <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#F21449] rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#300460] rounded-full blur-[120px]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <FadeIn delay={0.1}>
            <div className="text-center mb-16">
              <span className="bg-[#F21449]/10 text-[#F21449] text-xs font-bold px-3.5 py-1.5 rounded-full tracking-widest uppercase border border-[#F21449]/25">
                KPR Keepsakes & Apparel
              </span>
              <TextReveal delay={0.2}>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-4 bricolage">
                  Commemorative Shop
                </h2>
              </TextReveal>
              <p className="text-white/50 text-sm md:text-base mt-4 max-w-xl mx-auto">
                Take a piece of the altar home. Pre-order your conference collectibles today. Orders are secured and packaged for pickup at the venue.
              </p>
            </div>
          </FadeIn>

          {/* Products Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {PRODUCTS.map((product, i) => (
              <SlideIn key={product.id} direction="up" delay={0.15 + i * 0.1}>
                <div className="bg-white/5 border border-white/10 rounded-3xl p-5 hover:border-white/20 transition-all duration-300 flex flex-col h-full group">
                  {/* Image container */}
                  <div className="relative h-64 rounded-2xl overflow-hidden mb-5 bg-black/40">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-[#F21449] to-[#300460] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                      {product.badge}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-grow flex flex-col">
                    <span className="text-[#F21449] text-xs font-bold tracking-widest uppercase mb-1">
                      {product.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-[#F21449] transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-white/60 text-xs leading-relaxed mb-6 flex-grow">
                      {product.description}
                    </p>

                    {/* Color selector */}
                    <div className="mb-4">
                      <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider mb-2">
                        {product.id === "prod-3" ? "Journal Type" : "Color"}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {product.colors.map((c) => (
                          <button
                            key={c}
                            onClick={() => setSelectedColors(prev => ({ ...prev, [product.id]: c }))}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                              selectedColors[product.id] === c
                                ? "bg-white text-black border-white"
                                : "bg-transparent text-white/70 border-white/10 hover:border-white/30"
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Size Selector */}
                    <div className="mb-6">
                      <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider mb-2">
                        {product.id === "prod-3" ? "Edition / Option" : "Size"}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {product.sizes.map((s) => (
                          <button
                            key={s}
                            onClick={() => setSelectedSizes(prev => ({ ...prev, [product.id]: s }))}
                            className={`min-w-[32px] h-8 px-3 rounded-lg text-xs font-extrabold border flex items-center justify-center transition-all ${
                              selectedSizes[product.id] === s
                                ? "bg-[#F21449] text-white border-[#F21449] shadow-lg shadow-[#F21449]/20"
                                : "bg-transparent text-white/70 border-white/10 hover:border-white/30"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price and Add to Cart */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                      <div>
                        <p className="text-white/40 text-[9px] uppercase tracking-wider">Price</p>
                        <p className="text-xl md:text-2xl font-black text-white">
                          {product.priceDisplay ? product.priceDisplay : `₦${product.price.toLocaleString()}`}
                        </p>
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="flex items-center gap-2 bg-[#F21449] hover:bg-[#F21449]/90 text-white px-5 py-3 rounded-xl font-bold text-sm shadow-lg shadow-[#F21449]/20 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                      >
                        <ShoppingBag size={16} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </SlideIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE SOCIAL FEEDS ── */}
      <section id="social" className="py-20 md:py-24 px-5 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.015]">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#300460] rounded-full blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <FadeIn delay={0.1}>
            <div className="text-center mb-10">
              <span className="bg-gray-100 text-[#300460] text-xs font-bold px-3.5 py-1.5 rounded-full tracking-widest uppercase border border-gray-200">
                STAY CONFLICTED & PLUGGED IN
              </span>
              <TextReveal delay={0.2}>
                <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-4 bricolage">
                  The Pistis Place Social Hub
                </h2>
              </TextReveal>
              <p className="text-gray-500 text-sm md:text-base mt-4 max-w-xl mx-auto">
                Explore real-time media, worship snippets, prayer announcements, and prophetic bulletins straight from our digital alters.
              </p>
            </div>
          </FadeIn>

          {/* Tab Switcher */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 p-1.5 rounded-2xl inline-flex gap-2 border border-gray-200">
              <button
                onClick={() => setSocialView("live")}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 ${
                  socialView === "live"
                    ? "bg-[#300460] text-white shadow-lg shadow-purple-900/20"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-200"
                }`}
              >
                <Facebook size={14} />
                Live Facebook Feed
              </button>
              <button
                onClick={() => setSocialView("curated")}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 ${
                  socialView === "curated"
                    ? "bg-[#300460] text-white shadow-lg shadow-purple-900/20"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-200"
                }`}
              >
                <Sparkles size={14} />
                Curated Highlights
              </button>
            </div>
          </div>

          {socialView === "live" ? (
            <div className="grid md:grid-cols-3 gap-8">
              {/* Live Embed IFrame Container (Col span 2) */}
              <div className="md:col-span-2">
                <SlideIn direction="up" delay={0.1}>
                  <div className="bg-gray-50 border border-gray-100 rounded-3xl p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-300">
                    {/* Browser Control Bar Mockup */}
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-green-400 inline-block" />
                      </div>
                      <div className="flex-1 max-w-md mx-4 bg-gray-200/60 rounded-lg px-3 py-1.5 flex items-center gap-2 text-[11px] text-gray-500 font-mono select-none overflow-hidden text-ellipsis whitespace-nowrap border border-gray-200/50">
                        <Lock size={10} className="text-emerald-500 shrink-0" />
                        facebook.com/kingdomprayerretreat
                      </div>
                      <Link
                        href={FACEBOOK_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <ArrowUpRight size={16} />
                      </Link>
                    </div>

                    {/* Responsive Facebook IFrame Wrap */}
                    <div className="relative w-full h-[620px] rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-inner">
                      <iframe
                        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fkingdomprayerretreat&tabs=timeline&width=500&height=620&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                        width="100%"
                        height="100%"
                        style={{ border: "none", overflow: "hidden" }}
                        scrolling="no"
                        frameBorder="0"
                        allowFullScreen={true}
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        title="Kingdom Prayer Retreat Live Updates"
                      />
                    </div>

                    {/* Footer / Helper Disclaimer */}
                    <p className="text-center text-[11px] text-gray-400 font-medium mt-4">
                      Browser extensions, tracking protectors or private modes may occasionally block social network plug-ins.{" "}
                      <Link
                        href={FACEBOOK_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#F21449] hover:underline font-bold inline-flex items-center gap-0.5 ml-1"
                      >
                        Open Official Page Directly <ArrowUpRight size={11} />
                      </Link>
                    </p>
                  </div>
                </SlideIn>
              </div>

              {/* Sidebar Info & Hashtag copier (Col span 1) */}
              <div className="md:col-span-1 space-y-6">
                <SlideIn direction="up" delay={0.2}>
                  {/* Connect & Stats Card */}
                  <div className="bg-gradient-to-br from-[#300460] to-[#1F0240] text-white rounded-3xl p-6 shadow-md border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl translate-x-4 -translate-y-4 group-hover:scale-150 transition-transform duration-500" />
                    
                    <h3 className="text-lg font-extrabold mb-3 text-white bricolage">Stay Connected</h3>
                    <p className="text-xs text-white/80 leading-relaxed mb-6">
                      Join thousands of believers in receiving real-time spiritual nourishment, prayer alerts, venue guidelines, and prophetic declarations directly from our leadership.
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-[#F21449] text-xs">
                          1
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Daily Streams</p>
                          <p className="text-[10px] text-white/60">Live broadcast sessions available online</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-[#F21449] text-xs">
                          2
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Prayer Bulletins</p>
                          <p className="text-[10px] text-white/60">Important event reminders and guidelines</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SlideIn>

                <SlideIn direction="up" delay={0.3}>
                  {/* Handle List Card */}
                  <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 space-y-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Our Coordinates</h4>
                    <div className="space-y-3">
                      <Link
                        href={FACEBOOK_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-2xl hover:border-blue-200 hover:shadow-sm transition-all group"
                      >
                        <div className="flex items-center gap-2.5">
                          <Facebook className="w-4 h-4 text-blue-600" />
                          <span className="text-xs font-bold text-gray-800">Facebook Page</span>
                        </div>
                        <ArrowUpRight size={14} className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </Link>

                      <Link
                        href="https://www.instagram.com/thepistisplaceglobal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-2xl hover:border-pink-200 hover:shadow-sm transition-all group"
                      >
                        <div className="flex items-center gap-2.5">
                          <Instagram className="w-4 h-4 text-pink-600" />
                          <span className="text-xs font-bold text-gray-800">Instagram Handle</span>
                        </div>
                        <ArrowUpRight size={14} className="text-gray-400 group-hover:text-pink-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </Link>
                    </div>
                  </div>
                </SlideIn>

                <SlideIn direction="up" delay={0.4}>
                  {/* Hashtags Card */}
                  <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Official Hashtags</h4>
                    <p className="text-[11px] text-gray-500 leading-relaxed mb-4">
                      Share your testimony, watch-party photos, and breakthroughs using our official campaign tags. Tap to copy!
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["#KPR2026", "#ThePistisPlace", "#BattleAxe", "#UyoRevival"].map((tag) => {
                        const isCopied = copiedTag === tag;
                        return (
                          <button
                            key={tag}
                            onClick={() => {
                              navigator.clipboard.writeText(tag);
                              setCopiedTag(tag);
                              setTimeout(() => setCopiedTag(null), 2000);
                            }}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
                              isCopied
                                ? "bg-emerald-50 text-emerald-600 border-emerald-200 scale-98"
                                : "bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-100 border-gray-200/60"
                            }`}
                          >
                            <span>{tag}</span>
                            {isCopied ? (
                              <Check size={11} className="text-emerald-600" />
                            ) : (
                              <Copy size={10} className="text-gray-400" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </SlideIn>
              </div>
            </div>
          ) : (
            /* Curated Highlights */
            <div className="grid md:grid-cols-3 gap-6">
              {SOCIAL_POSTS.map((post, i) => (
                <SlideIn key={post.id} direction="up" delay={0.1 + i * 0.15}>
                  <div className="bg-gray-50 border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300 group">
                    {/* Post Header */}
                    <div className="p-4 flex items-center justify-between border-b border-gray-100">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#F21449] to-[#300460] p-[2px]">
                          <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-bold text-[#F21449] text-xs">
                            PP
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-900">@thepistisplaceglobal</p>
                          <p className="text-[10px] text-gray-400 font-medium">{post.date}</p>
                        </div>
                      </div>
                      {post.platform === "instagram" ? (
                        <Instagram className="w-4 h-4 text-pink-600" />
                      ) : (
                        <Facebook className="w-4 h-4 text-blue-600" />
                      )}
                    </div>

                    {/* Post Image */}
                    <div className="relative h-72 overflow-hidden bg-gray-200">
                      <Image
                        src={post.image}
                        alt="Social Post Media"
                        fill
                        className="object-cover group-hover:scale-102 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
                        <Link
                          href={post.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white text-gray-900 rounded-full px-4 py-2 font-bold text-xs shadow-md opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 flex items-center gap-1.5"
                        >
                          View Post <ArrowUpRight size={14} />
                        </Link>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="p-5">
                      <p className="text-gray-700 text-xs leading-relaxed line-clamp-3 mb-4">
                        {post.caption}
                      </p>

                      {/* Post Footer/Stats */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-[11px] text-gray-400 font-bold">
                        <div className="flex gap-4">
                          <span>❤️ {post.likes}</span>
                          <span>💬 {post.comments}</span>
                        </div>
                        <Link
                          href={post.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#F21449] hover:underline"
                        >
                          Follow Us
                        </Link>
                      </div>
                    </div>
                  </div>
                </SlideIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── INQUIRY FORM ── */}
      <section id="inquiries" className="py-16 md:py-20 px-5 bg-white">
        <div className="max-w-3xl mx-auto">
          <FadeIn delay={0.1}>
            <div className="text-center mb-10">
              <p className="bg-gradient-to-r from-[#300460] to-[#F21449] bg-clip-text text-transparent font-bold text-lg">Have Questions?</p>
              <TextReveal delay={0.2}>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-1">
                  Send an Inquiry
                </h2>
              </TextReveal>
              <FadeIn delay={0.3} direction="left" distance={50}>
                <div className="flex items-center gap-2 mt-3 justify-center">
                  <div className="h-1 w-16 bg-gradient-to-r from-[#300460] to-[#F21449] rounded-full" />
                  <div className="h-1 w-8 bg-[#300460]/40 rounded-full" />
                </div>
              </FadeIn>
              <FadeIn delay={0.4}>
                <p className="text-gray-500 mt-4 text-sm max-w-xl mx-auto">
                  Got questions about KPR 2026? schedules, transport, speakers,
                  or anything else? Send us a message and we&apos;ll get back to
                  you.
                </p>
              </FadeIn>
            </div>
          </FadeIn>

          <ScaleIn delay={0.3}>
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
              <form onSubmit={handleSubmit}>
                <StaggerContainer delay={0.1}>
                  <StaggerItem>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <Input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={`bg-white border-none shadow-sm ${errors.name ? "ring-1 ring-red-500" : ""}`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.name}
                        </p>
                      )}
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="Your email address"
                          className={`bg-white border-none shadow-sm ${errors.email ? "ring-1 ring-red-500" : ""}`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone *
                        </label>
                        <Input
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="Your phone number"
                          className={`bg-white border-none shadow-sm ${errors.phone ? "ring-1 ring-red-500" : ""}`}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <Input
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="What is your inquiry about?"
                        className="bg-white border-none shadow-sm"
                      />
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message *
                      </label>
                      <Textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Type your question or message here..."
                        className={`bg-white border-none shadow-sm min-h-[130px] resize-none ${errors.message ? "ring-1 ring-red-500" : ""}`}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.message}
                        </p>
                      )}
                    </div>
                  </StaggerItem>
                </StaggerContainer>

                {submitStatus === "success" && (
                  <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-green-800 font-medium text-sm">
                      Inquiry sent! We&apos;ll get back to you shortly.
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <p className="text-red-800 font-medium text-sm">
                      Failed to send. Please try WhatsApp or Facebook instead.
                    </p>
                  </div>
                )}

                <HoverLift>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#300460] to-[#F21449] hover:opacity-90 text-white py-3 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed border-0"
                  >
                    {isSubmitting ? "Sending..." : "Send Inquiry"}
                  </Button>
                </HoverLift>
                <p className="text-gray-400 text-xs text-center mt-3 animate-pulse">
                  We&apos;ll be with you shortly
                </p>
              </form>
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* ── HIGH clarity LIGHTBOX PORTAL ── */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-6 transition-all duration-300 animate-fadeIn">
          {/* Close trigger backdrop */}
          <div className="absolute inset-0" onClick={() => setIsLightboxOpen(false)} />
          
          <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col items-center justify-center z-10">
            {/* Top Close bar */}
            <div className="absolute top-[-45px] left-0 right-0 flex items-center justify-between px-1">
              <span className="text-white/85 text-sm uppercase tracking-wider font-extrabold bg-white/10 px-3 py-1 rounded-full border border-white/15 backdrop-blur-md">
                {HERO_FLYERS[activeHeroIndex].title}
              </span>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 transition-colors text-white shadow-xl backdrop-blur-md"
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>
            </div>

            {/* Lightbox Contain Area */}
            <div className="relative w-full h-[60vh] sm:h-[75vh] flex items-center justify-center bg-black/50 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              <Image
                src={HERO_FLYERS[activeHeroIndex].src}
                alt={HERO_FLYERS[activeHeroIndex].alt}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 80vw"
                priority
                unoptimized
              />
            </div>

            {/* Quick switcher in lightbox */}
            <div className="flex gap-3 mt-5">
              {HERO_FLYERS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveHeroIndex(idx)}
                  className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                    activeHeroIndex === idx ? "bg-[#F21449] scale-125 shadow-lg shadow-[#F21449]/45" : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── HIGH CLARITY YOUTUBE LIGHTBOX PORTAL ── */}
      {activeVideoId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-6 transition-all duration-300 animate-fadeIn">
          {/* Close trigger backdrop */}
          <div className="absolute inset-0" onClick={() => setActiveVideoId(null)} />
          
          <div className="relative w-full max-w-4xl aspect-video flex flex-col items-center justify-center z-10 bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            {/* Top Close bar */}
            <div className="absolute top-[-45px] right-0 flex items-center justify-end px-1">
              <button
                onClick={() => setActiveVideoId(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 transition-colors text-white shadow-xl backdrop-blur-md cursor-pointer"
                aria-label="Close Player"
              >
                <X size={20} />
              </button>
            </div>

            {/* Video Iframe */}
            <iframe
              className="w-full h-full rounded-2xl"
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}





      {/* ── KPR REGISTRATION MODAL DIALOG (MULTI-STEP) ── */}
      <AnimatePresence>
        {isRegisterModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
            {/* Backdrop click close */}
            <div 
              className="absolute inset-0" 
              onClick={() => {
                if (registerStatus !== "success") {
                  setIsRegisterModalOpen(false);
                }
              }} 
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-xl bg-[#0B0813] border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 text-white flex flex-col my-8"
            >
              {/* Background Glows */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#F21449]/10 rounded-full blur-[50px] pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#300460]/20 rounded-full blur-[50px] pointer-events-none" />

              {/* Modal Header */}
              <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-center relative z-10">
                <div>
                  <span className="text-[10px] text-[#F21449] font-black tracking-widest block uppercase mb-1">REGISTRATION DESK</span>
                  <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">KPR 2026 Delegate Setup</h3>
                </div>
                <button
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Progress Indicator (only if not success) */}
              {registerStatus !== "success" && (
                <div className="px-6 md:px-8 pt-6 pb-2 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2 w-full">
                    {[1, 2, 3].map((step) => (
                      <Fragment key={step}>
                        <div className="flex items-center gap-2">
                          <div 
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${
                              currentStep === step 
                                ? "bg-[#F21449] text-white shadow-lg shadow-[#F21449]/35 scale-110" 
                                : currentStep > step 
                                ? "bg-[#300460] text-white/90" 
                                : "bg-white/5 text-white/40 border border-white/10"
                            }`}
                          >
                            {step}
                          </div>
                          <span className={`text-[10px] md:text-xs font-extrabold uppercase tracking-wider hidden sm:inline ${
                            currentStep === step ? "text-white" : "text-white/40"
                          }`}>
                            {step === 1 ? "Personal" : step === 2 ? "Retreat" : "lodging"}
                          </span>
                        </div>
                        {step < 3 && <div className={`flex-1 h-0.5 mx-2 rounded-full ${currentStep > step ? "bg-[#300460]" : "bg-white/5"}`} />}
                      </Fragment>
                    ))}
                  </div>
                </div>
              )}

              {/* Scrollable form container */}
              <div className="p-6 md:p-8 overflow-y-auto max-h-[60vh] relative z-10">
                {registerStatus === "success" ? (
                  <div className="text-center py-6 flex flex-col items-center">
                    {/* Celebratory success animation */}
                    <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                      {/* Pulsing glow circles */}
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: [1, 1.4, 1.2], opacity: [0, 0.5, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                        className="absolute inset-0 bg-emerald-500 rounded-full"
                      />
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100, damping: 10 }}
                        className="absolute inset-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full"
                      />
                      
                      {/* Main green circle */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.15 }}
                        className="relative z-10 w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20"
                      >
                        <motion.svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={3}
                          stroke="currentColor"
                          className="w-8 h-8"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}
                        >
                          <motion.path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </motion.svg>
                      </motion.div>

                      {/* Confetti / Sparkle explosions */}
                      {[...Array(12)].map((_, i) => {
                        const angle = (i * 360) / 12;
                        // Use deterministic radius based on index i to maintain purity
                        const radius = 60 + ((i * 17 + 5) % 25);
                        const x = Math.cos((angle * Math.PI) / 180) * radius;
                        const y = Math.sin((angle * Math.PI) / 180) * radius;
                        const colors = ["#10B981", "#F59E0B", "#3B82F6", "#EC4899", "#8B5CF6", "#F21449"];
                        const randomColor = colors[i % colors.length];
                        
                        return (
                          <motion.div
                            key={i}
                            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                            animate={{
                              x: x,
                              y: y,
                              scale: [0, 1.2, 0.8, 0],
                              opacity: [1, 1, 0.8, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              ease: "easeOut",
                              delay: 0.3,
                            }}
                            className="absolute w-2 h-2 rounded-full"
                            style={{ backgroundColor: randomColor }}
                          />
                        );
                      })}
                    </div>
                    <h4 className="text-2xl font-black mb-3 text-white tracking-tight">Registration Complete!</h4>
                    <p className="text-white/60 text-sm max-w-sm mb-6 leading-relaxed">
                      Hallelujah! Your registration has been received successfully. Your digital delegate entry pass has been sent to <span className="text-[#F21449] font-bold">{registeredTicket?.email}</span>.
                    </p>

                    {registeredTicket && (
                      <div className="w-full max-w-sm mx-auto bg-white/5 border border-[#F21449]/30 rounded-2xl p-5 mb-5 text-left text-xs space-y-3">
                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-white/40 uppercase tracking-widest text-[9px] font-bold">PASS ID</span>
                          <span className="font-mono font-bold text-white">{registeredTicket.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/40">Full Name:</span>
                          <span className="font-semibold text-white">{registeredTicket.fullName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/40">Mode:</span>
                          <span className="font-semibold text-white">{registeredTicket.joiningMode}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/40">Residence:</span>
                          <span className="font-semibold text-white">{registeredTicket.residence}</span>
                        </div>
                      </div>
                    )}

                    {/* PDF and Calendar Download Actions */}
                    {registeredTicket && (
                      <div className="w-full max-w-sm mx-auto mb-5 space-y-2">
                        <button
                          onClick={() => handleDownloadPDF(registeredTicket)}
                          disabled={isDownloadingPdf}
                          className="w-full h-11 bg-[#F21449] hover:bg-[#D10F3E] disabled:bg-white/10 text-white rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#F21449]/20 cursor-pointer"
                        >
                          <Download size={14} className={isDownloadingPdf ? "animate-bounce" : ""} />
                          {isDownloadingPdf ? "Generating PDF Pass..." : "Download Official PDF Pass"}
                        </button>

                        <div className="grid grid-cols-2 gap-2">
                          <a
                            href={generateGoogleCalendarUrl(registeredTicket)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-10 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-[11px] font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Calendar size={13} className="text-[#F21449]" />
                            Add to Google Cal
                          </a>
                          <button
                            onClick={() => handleDownloadICS(registeredTicket)}
                            className="h-10 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-[11px] font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Calendar size={13} className="text-[#F21449]" />
                            Download .iCS File
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Integrated dynamic social sharing widget */}
                    {registeredTicket && (
                      <div className="w-full max-w-sm mx-auto mb-6 bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-center">
                        <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider block mb-2.5">
                          Instantly Share Your Registration
                        </span>
                        
                        <div className="grid grid-cols-3 gap-2">
                          {/* WhatsApp */}
                          <a
                            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                              `I just registered for the Kingdom Prayer Retreat (KPR 2026)! 🌟 My Pass ID is ${registeredTicket.id}. Join me from Aug 7-9, 2026, for a life-transforming encounter. Register for free here: ${typeof window !== "undefined" ? `${window.location.origin}/KPR` : "https://thepistisplace.org/KPR"}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 hover:border-[#25D366]/40 text-[#25D366] text-[11px] font-bold transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                          >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.714-1.465L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.858.002-2.634-1.013-5.11-2.861-6.961C16.628 1.936 14.152.921 11.517.921c-5.44 0-9.866 4.42-9.871 9.858-.001 1.83.483 3.616 1.4 5.176l-1.018 3.718 3.824-1.003zm12.39-7.054c-.266-.134-1.58-.78-1.821-.866-.242-.086-.418-.13-.59.134-.173.265-.67.865-.822 1.037-.152.172-.303.194-.569.06-.266-.134-1.123-.414-2.138-1.324-.79-.705-1.323-1.576-1.478-1.841-.155-.264-.017-.407.116-.54.12-.12.266-.31.4-.464.133-.152.178-.26.266-.433.088-.172.044-.323-.022-.457-.066-.133-.59-1.42-.808-1.944-.213-.512-.447-.442-.61-.45-.16-.008-.344-.01-.528-.01-.183 0-.484.07-.738.344-.254.275-.97.948-.97 2.311s.997 2.68 1.138 2.868c.141.188 1.96 3.003 4.753 4.21 2.33 1.008 2.812.808 3.313.762.503-.047 1.62-.663 1.85-1.302.23-.64.23-1.186.16-1.302-.07-.116-.266-.202-.533-.336z"/>
                            </svg>
                            <span>WhatsApp</span>
                          </a>

                          {/* Twitter */}
                          <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                              `I just registered for the Kingdom Prayer Retreat (KPR 2026)! 🌟 My Pass ID is ${registeredTicket.id}. Join me from Aug 7-9, 2026, for a life-transforming encounter. Register for free here: ${typeof window !== "undefined" ? `${window.location.origin}/KPR` : "https://thepistisplace.org/KPR"}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/25 text-white text-[11px] font-bold transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                          >
                            <Twitter size={16} />
                            <span>Twitter / X</span>
                          </a>

                          {/* Instagram (Copy Caption & Helper) */}
                          <button
                            onClick={() => {
                              const text = `I just registered for the Kingdom Prayer Retreat (KPR 2026)! 🌟 My Pass ID is ${registeredTicket.id}. Join me from Aug 7-9, 2026, for a life-transforming encounter with God. #KPR2026 #ThePistisPlace #KingdomPrayerRetreat`;
                              navigator.clipboard.writeText(text);
                              setCopiedState("modal-instagram");
                              setTimeout(() => {
                                setCopiedState(null);
                                window.open("https://instagram.com", "_blank");
                              }, 1500);
                            }}
                            className="flex flex-col items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#E1306C]/10 hover:bg-[#E1306C]/20 border border-[#E1306C]/20 hover:border-[#E1306C]/40 text-[#E1306C] text-[11px] font-bold transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                          >
                            {copiedState === "modal-instagram" ? (
                              <>
                                <Check size={16} className="text-green-400 animate-bounce" />
                                <span className="text-green-400 font-bold">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Instagram size={16} />
                                <span>Instagram</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Native share or general link copy */}
                        <div className="mt-3">
                          {typeof navigator !== "undefined" && "share" in navigator ? (
                            <button
                              onClick={() => {
                                const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/KPR` : "https://thepistisplace.org/KPR";
                                const shareText = `I just registered for the Kingdom Prayer Retreat (KPR 2026)! 🌟 My Pass ID is ${registeredTicket.id}. Join me from Aug 7-9, 2026.`;
                                navigator.share({
                                  title: "KPR 2026 Entry Pass",
                                  text: shareText,
                                  url: shareUrl,
                                }).catch((err) => console.log("Error sharing:", err));
                              }}
                              className="w-full py-2 bg-[#F21449]/10 hover:bg-[#F21449]/20 border border-[#F21449]/25 hover:border-[#F21449]/40 text-[#F21449] rounded-xl text-[11px] font-bold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <Share2 size={13} />
                              More Share Options
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/KPR` : "https://thepistisplace.org/KPR";
                                const text = `I just registered for the Kingdom Prayer Retreat (KPR 2026)! 🌟 My Pass ID is ${registeredTicket.id}. Register for free here: ${shareUrl}`;
                                navigator.clipboard.writeText(text);
                                setCopiedState("modal-link");
                                setTimeout(() => setCopiedState(null), 1500);
                              }}
                              className="w-full py-2 bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 text-white/80 hover:text-white rounded-xl text-[11px] font-bold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              {copiedState === "modal-link" ? (
                                <>
                                  <Check size={13} className="text-green-400" />
                                  <span className="text-green-400">Link Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy size={13} />
                                  <span>Copy Share Link</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-4 w-full justify-center">
                      <button
                        onClick={() => setIsRegisterModalOpen(false)}
                        className="flex-1 max-w-[160px] py-2.5 rounded-xl bg-white text-[#0B0813] font-bold text-sm shadow-md hover:bg-gray-100 transition-colors cursor-pointer text-center"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleRegisterSubmit} className="space-y-6">
                    {/* STEP 1: Personal Info */}
                    {currentStep === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-5"
                      >
                        <h4 className="text-sm font-black uppercase text-[#F21449] tracking-widest mb-4">Step 1: Contact & Profile</h4>
                        
                        <div>
                          <label className="block text-xs font-extrabold uppercase tracking-wider text-white/60 mb-2">
                            FULL NAME *
                          </label>
                          <Input
                            type="text"
                            name="fullName"
                            value={registerForm.fullName}
                            onChange={handleRegisterChange}
                            placeholder="e.g. Samuel Adebayo"
                            className={`bg-white/5 border-white/10 text-white placeholder:text-white/20 h-11 rounded-xl focus:border-[#F21449] focus:ring-1 focus:ring-[#F21449] ${
                              registerErrors.fullName ? "border-red-500/50" : ""
                            }`}
                          />
                          {registerErrors.fullName && (
                            <p className="text-red-400 text-[10px] font-semibold mt-1 flex items-center gap-1">
                              <AlertCircle size={10} /> {registerErrors.fullName}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-extrabold uppercase tracking-wider text-white/60 mb-2">
                            Email *
                          </label>
                          <Input
                            type="email"
                            name="email"
                            value={registerForm.email}
                            onChange={handleRegisterChange}
                            placeholder="e.g. samuel@example.com"
                            className={`bg-white/5 border-white/10 text-white placeholder:text-white/20 h-11 rounded-xl focus:border-[#F21449] focus:ring-1 focus:ring-[#F21449] ${
                              registerErrors.email ? "border-red-500/50" : ""
                            }`}
                          />
                          {registerErrors.email && (
                            <p className="text-red-400 text-[10px] font-semibold mt-1 flex items-center gap-1">
                              <AlertCircle size={10} /> {registerErrors.email}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-extrabold uppercase tracking-wider text-white/60 mb-2">
                            PHONE NUMBER *
                          </label>
                          <Input
                            type="tel"
                            name="phone"
                            value={registerForm.phone}
                            onChange={handleRegisterChange}
                            placeholder="e.g. +234 812 345 6789"
                            className={`bg-white/5 border-white/10 text-white placeholder:text-white/20 h-11 rounded-xl focus:border-[#F21449] focus:ring-1 focus:ring-[#F21449] ${
                              registerErrors.phone ? "border-red-500/50" : ""
                            }`}
                          />
                          {registerErrors.phone && (
                            <p className="text-red-400 text-[10px] font-semibold mt-1 flex items-center gap-1">
                              <AlertCircle size={10} /> {registerErrors.phone}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-extrabold uppercase tracking-wider text-white/60 mb-2">
                              GENDER *
                            </label>
                            <select
                              name="gender"
                              value={registerForm.gender}
                              onChange={handleRegisterChange}
                              className={`w-full bg-[#181424] border border-white/10 text-white h-11 px-3 rounded-xl focus:border-[#F21449] outline-none text-sm ${
                                registerErrors.gender ? "border-red-500/50" : ""
                              }`}
                            >
                              <option value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                            {registerErrors.gender && (
                              <p className="text-red-400 text-[10px] font-semibold mt-1 flex items-center gap-1">
                                <AlertCircle size={10} /> {registerErrors.gender}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-xs font-extrabold uppercase tracking-wider text-white/60 mb-2">
                              CITY/STATE OF RESIDENCE *
                            </label>
                            <Input
                              type="text"
                              name="residence"
                              value={registerForm.residence}
                              onChange={handleRegisterChange}
                              placeholder="e.g. Uyo, Akwa Ibom"
                              className={`bg-white/5 border-white/10 text-white placeholder:text-white/20 h-11 rounded-xl focus:border-[#F21449] focus:ring-1 focus:ring-[#F21449] ${
                                registerErrors.residence ? "border-red-500/50" : ""
                              }`}
                            />
                            {registerErrors.residence && (
                              <p className="text-red-400 text-[10px] font-semibold mt-1 flex items-center gap-1">
                                <AlertCircle size={10} /> {registerErrors.residence}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: Retreat details */}
                    {currentStep === 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-5"
                      >
                        <h4 className="text-sm font-black uppercase text-[#F21449] tracking-widest mb-4">Step 2: Experience & Attendance</h4>
                        
                        <div>
                          <label className="block text-xs font-extrabold uppercase tracking-wider text-white/60 mb-3">
                            WILL YOU BE JOINING US ONLINE OR IN-PERSON? *
                          </label>
                          <div className="grid grid-cols-2 gap-4">
                            <button
                              type="button"
                              onClick={() => {
                                setRegisterForm(prev => ({ ...prev, joiningMode: "In-Person (The Pistis Place)" }));
                                if (registerErrors.joiningMode) setRegisterErrors(prev => ({ ...prev, joiningMode: "" }));
                              }}
                              className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                                registerForm.joiningMode.includes("In-Person")
                                  ? "bg-[#F21449]/20 border-[#F21449] text-white font-extrabold"
                                  : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                              }`}
                            >
                              <div className="font-bold text-sm mb-1">In-Person</div>
                              <div className="text-[10px] opacity-70">Uyo, Akwa Ibom</div>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setRegisterForm(prev => ({ ...prev, joiningMode: "Online (Virtual Broadcast)" }));
                                if (registerErrors.joiningMode) setRegisterErrors(prev => ({ ...prev, joiningMode: "" }));
                              }}
                              className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                                registerForm.joiningMode.includes("Online")
                                  ? "bg-blue-500/20 border-blue-500 text-white font-extrabold"
                                  : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                              }`}
                            >
                              <div className="font-bold text-sm mb-1">Online</div>
                              <div className="text-[10px] opacity-70">Facebook / YouTube</div>
                            </button>
                          </div>
                          {registerErrors.joiningMode && (
                            <p className="text-red-400 text-[10px] font-semibold mt-1 flex items-center gap-1">
                              <AlertCircle size={10} /> {registerErrors.joiningMode}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-extrabold uppercase tracking-wider text-white/60 mb-2">
                            HOW DID YOU HEAR ABOUT KINGDOM PRAYER RETREAT 2026 *
                          </label>
                          <select
                            name="referral"
                            value={registerForm.referral}
                            onChange={handleRegisterChange}
                            className={`w-full bg-[#181424] border border-white/10 text-white h-11 px-3 rounded-xl focus:border-[#F21449] outline-none text-sm ${
                              registerErrors.referral ? "border-red-500/50" : ""
                            }`}
                          >
                            <option value="">Choose Option</option>
                            <option value="Social Media (Facebook/Instagram/X)">Social Media</option>
                            <option value="Friend or Family member">Friend / Family</option>
                            <option value="WhatsApp announcement">WhatsApp Group</option>
                            <option value="Church Announcement">Church Service</option>
                            <option value="Billboard or flyer">Billboard / Flyer</option>
                            <option value="Other channels">Other</option>
                          </select>
                          {registerErrors.referral && (
                            <p className="text-red-400 text-[10px] font-semibold mt-1 flex items-center gap-1">
                              <AlertCircle size={10} /> {registerErrors.referral}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-extrabold uppercase tracking-wider text-white/60 mb-2">
                            WRITE DOWN YOUR EXPECTATIONS HERE *
                          </label>
                          <Textarea
                            name="expectations"
                            value={registerForm.expectations}
                            onChange={handleRegisterChange}
                            rows={3}
                            placeholder="I believe God for spiritual growth, deliverance, clarity, and empowerment..."
                            className={`bg-white/5 border-white/10 text-white placeholder:text-white/20 rounded-xl focus:border-[#F21449] focus:ring-1 focus:ring-[#F21449] resize-none ${
                              registerErrors.expectations ? "border-red-500/50" : ""
                            }`}
                          />
                          {registerErrors.expectations && (
                            <p className="text-red-400 text-[10px] font-semibold mt-1 flex items-center gap-1">
                              <AlertCircle size={10} /> {registerErrors.expectations}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: Hospitality & lodging */}
                    {currentStep === 3 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-5"
                      >
                        <h4 className="text-sm font-black uppercase text-[#F21449] tracking-widest mb-4">Step 3: Hospitality & Logistics</h4>
                        
                        <div>
                          <label className="block text-xs font-extrabold uppercase tracking-wider text-white/60 mb-2">
                            Do you need a free HOSTEL ACCOMMODATION or other Hotel Options? *
                          </label>
                          <select
                            name="accommodation"
                            value={registerForm.accommodation}
                            onChange={handleRegisterChange}
                            className={`w-full bg-[#181424] border border-white/10 text-white h-11 px-3 rounded-xl focus:border-[#F21449] outline-none text-sm ${
                              registerErrors.accommodation ? "border-red-500/50" : ""
                            }`}
                          >
                            <option value="">Choose Accommodation option</option>
                            <option value="Yes, I need free hostel accommodation">Yes, I need free HOSTEL accommodation</option>
                            <option value="No, I have other plans or reside in Uyo">No, I have my own setup / live in Uyo</option>
                            <option value="Send me standard hotel options and rates">Please email nearby premium hotel options & rates</option>
                          </select>
                          {registerErrors.accommodation && (
                            <p className="text-red-400 text-[10px] font-semibold mt-1 flex items-center gap-1">
                              <AlertCircle size={10} /> {registerErrors.accommodation}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-extrabold uppercase tracking-wider text-white/60 mb-2">
                            We have limited slots for T-shirts @ N7,000 pre-order. Do you need? *
                          </label>
                          <div className="bg-white/5 border border-white/5 p-4 rounded-2xl mb-3">
                            <p className="text-white/50 text-[10px] leading-relaxed">
                              * Payment validates reservation. Standard premium KPR 2026 embroidered brand shirts. Pickup during check-in.
                            </p>
                          </div>
                          <select
                            name="tshirt"
                            value={registerForm.tshirt}
                            onChange={handleRegisterChange}
                            className={`w-full bg-[#181424] border border-white/10 text-white h-11 px-3 rounded-xl focus:border-[#F21449] outline-none text-sm ${
                              registerErrors.tshirt ? "border-red-500/50" : ""
                            }`}
                          >
                            <option value="">Pre-order T-Shirt?</option>
                            <option value="Yes, pre-order KPR T-Shirt (N7,000)">Yes, pre-order my KPR T-Shirt (N7,000)</option>
                            <option value="No, thanks">No, I do not need a T-Shirt</option>
                          </select>
                          {registerErrors.tshirt && (
                            <p className="text-red-400 text-[10px] font-semibold mt-1 flex items-center gap-1">
                              <AlertCircle size={10} /> {registerErrors.tshirt}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* Step Controls bar */}
                    <div className="flex gap-4 pt-4 border-t border-white/5 mt-8 justify-between">
                      {currentStep > 1 ? (
                        <button
                          type="button"
                          onClick={() => setCurrentStep(prev => prev - 1)}
                          className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors text-xs font-extrabold uppercase tracking-wider cursor-pointer"
                        >
                          Back
                        </button>
                      ) : (
                        <div />
                      )}

                      {currentStep < 3 ? (
                        <button
                          type="button"
                          onClick={() => {
                            // Validate current step fields before going next
                            const errors: Record<string, string> = {};
                            if (currentStep === 1) {
                              if (!registerForm.fullName.trim()) errors.fullName = "Full Name is required";
                              if (!registerForm.email.trim()) errors.email = "Email is required";
                              else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerForm.email)) {
                                errors.email = "Please enter a valid email address";
                              }
                              if (!registerForm.phone.trim()) errors.phone = "Phone Number is required";
                              if (!registerForm.gender) errors.gender = "Gender is required";
                              if (!registerForm.residence.trim()) errors.residence = "Residence is required";
                            } else if (currentStep === 2) {
                              if (!registerForm.joiningMode) errors.joiningMode = "Joining mode is required";
                              if (!registerForm.referral) errors.referral = "Referral is required";
                              if (!registerForm.expectations.trim()) errors.expectations = "Expectations are required";
                            }
                            
                            if (Object.keys(errors).length > 0) {
                              setRegisterErrors(errors);
                            } else {
                              setRegisterErrors({});
                              setCurrentStep(prev => prev + 1);
                            }
                          }}
                          className="px-6 py-2.5 rounded-xl bg-white text-[#0B0813] hover:bg-gray-100 transition-colors text-xs font-extrabold uppercase tracking-wider cursor-pointer"
                        >
                          Next Step
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={isRegistering}
                          className="px-6 py-2.5 rounded-xl bg-[#F21449] hover:bg-[#d60e3f] text-white transition-colors text-xs font-black uppercase tracking-widest cursor-pointer flex items-center gap-1.5 shadow-lg shadow-[#F21449]/30"
                        >
                          {isRegistering ? "Verifying..." : "Confirm Pass"}
                          <Sparkles size={14} />
                        </button>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── KPR ORGANIZER / ADMIN PORTAL MODAL ── */}
      <AnimatePresence>
        {isAdminModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto">
            <div 
              className="absolute inset-0" 
              onClick={() => setIsAdminModalOpen(false)} 
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl bg-[#0B0813] border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 text-white flex flex-col my-8"
            >
              {/* Background Glows */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#F21449]/5 rounded-full blur-[60px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#300460]/10 rounded-full blur-[60px] pointer-events-none" />

              {/* Modal Header */}
              <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-center relative z-10">
                <div>
                  <span className="text-[10px] text-[#F21449] font-black tracking-widest block uppercase mb-1">SECURED AREA</span>
                  <h3 className="text-xl md:text-2xl font-black tracking-tight">KPR 2026 Organizer Desk</h3>
                </div>
                <button
                  onClick={() => setIsAdminModalOpen(false)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8 overflow-y-auto max-h-[75vh] relative z-10">
                {!isAdminAuthenticated ? (
                  // Authentication Form
                  <form onSubmit={handleAdminLoginSubmit} className="max-w-md mx-auto py-12 space-y-6">
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-[#F21449]/10 border border-[#F21449]/20 text-[#F21449] rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Lock size={20} />
                      </div>
                      <h4 className="text-lg font-extrabold tracking-tight">Enter Authorized Passcode</h4>
                      <p className="text-white/50 text-xs">
                        This section is restricted to authorized KPR 2026 coordinators and registrars.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <input
                          type="password"
                          placeholder="Passcode (use KPR2026-ADMIN to test)"
                          value={adminPasscode}
                          onChange={(e) => setAdminPasscode(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 text-white h-12 px-4 rounded-xl focus:border-[#F21449] outline-none text-center tracking-widest text-sm placeholder:tracking-normal placeholder:text-white/20"
                          autoFocus
                        />
                        {adminError && (
                          <p className="text-red-400 text-xs font-semibold mt-2.5 text-center flex items-center justify-center gap-1.5">
                            <AlertCircle size={12} /> {adminError}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="w-full h-12 rounded-xl bg-white text-[#06040B] font-extrabold text-sm uppercase tracking-wider hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        Unlock Organizer Desk
                      </button>
                    </div>
                  </form>
                ) : (
                  // Authenticated Dashboard
                  <div className="space-y-8">
                    {/* Metrics grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div className="bg-white/5 border border-white/5 rounded-2xl p-5 space-y-1">
                        <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Total Delegates</p>
                        <h5 className="text-3xl font-black text-white">{registrations.length}</h5>
                        <div className="text-[10px] text-white/60 flex gap-3 pt-1">
                          <span>In-Person: {registrations.filter(r => r.joiningMode.includes("In-Person")).length}</span>
                          <span>Online: {registrations.filter(r => r.joiningMode.includes("Online")).length}</span>
                        </div>
                      </div>

                      <div className="bg-white/5 border border-white/5 rounded-2xl p-5 space-y-1">
                        <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Hostel Beds</p>
                        <h5 className="text-3xl font-black text-emerald-400">
                          {registrations.filter(r => r.accommodation.toLowerCase().includes("hostel")).length}
                        </h5>
                        <p className="text-[10px] text-white/50">Requested beds</p>
                      </div>

                      <div className="bg-white/5 border border-white/5 rounded-2xl p-5 space-y-1">
                        <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">T-Shirt Orders</p>
                        <h5 className="text-3xl font-black text-[#F21449]">
                          {registrations.filter(r => r.tshirt.toLowerCase().includes("yes")).length}
                        </h5>
                        <p className="text-[10px] text-white/50">Validated orders</p>
                      </div>

                      <div className="bg-white/5 border border-white/5 rounded-2xl p-5 space-y-1">
                        <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Push Subscribers</p>
                        <h5 className="text-3xl font-black text-purple-400">{pushSubscriberCount}</h5>
                        <p className="text-[10px] text-white/50">Devices registered</p>
                      </div>
                    </div>

                    {/* Push Notifications Broadcaster Panel */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#F21449]/10 border border-[#F21449]/20 text-[#F21449] flex items-center justify-center shrink-0">
                          <BellRing size={18} />
                        </div>
                        <div>
                          <h4 className="text-base font-extrabold tracking-tight">Broadcast Organizer Announcement</h4>
                          <p className="text-white/50 text-[11px] leading-tight">Send instant notifications to all registered devices ({pushSubscriberCount} active subscribers).</p>
                        </div>
                      </div>

                      <form onSubmit={handleSendAdminPush} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[9px] uppercase font-black tracking-widest text-white/50 block">Notification Title</label>
                            <input
                              type="text"
                              required
                              value={adminPushTitle}
                              onChange={(e) => setAdminPushTitle(e.target.value)}
                              placeholder="e.g. Morning Charge starting soon!"
                              className="w-full bg-white/5 border border-white/10 rounded-xl h-11 px-4 text-xs font-semibold focus:border-[#F21449] outline-none"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[9px] uppercase font-black tracking-widest text-white/50 block">Action Target URL</label>
                            <input
                              type="text"
                              value={adminPushUrl}
                              onChange={(e) => setAdminPushUrl(e.target.value)}
                              placeholder="e.g. /KPR"
                              className="w-full bg-white/5 border border-white/10 rounded-xl h-11 px-4 text-xs font-semibold focus:border-[#F21449] outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[9px] uppercase font-black tracking-widest text-white/50 block">Notification Message Body</label>
                          <textarea
                            required
                            rows={3}
                            value={adminPushBody}
                            onChange={(e) => setAdminPushBody(e.target.value)}
                            placeholder="Type the message that will pop up on attendees' mobile phones and desktops..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs font-medium focus:border-[#F21449] outline-none resize-none"
                          />
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 pt-2">
                          <div className="text-[10px] font-semibold">
                            {adminPushStatus === "success" && (
                              <span className="text-emerald-400">{adminPushMessage}</span>
                            )}
                            {adminPushStatus === "error" && (
                              <span className="text-red-400">{adminPushMessage}</span>
                            )}
                            {adminPushStatus === "loading" && (
                              <span className="text-white/60 animate-pulse">Broadcasting notification, please wait...</span>
                            )}
                          </div>

                          <button
                            type="submit"
                            disabled={adminPushStatus === "loading" || pushSubscriberCount === 0}
                            className="bg-[#F21449] hover:bg-[#d0103d] disabled:bg-white/5 disabled:text-white/30 text-white h-11 px-6 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300 shadow-lg shadow-[#F21449]/25 disabled:shadow-none cursor-pointer"
                          >
                            {adminPushStatus === "loading" ? "Broadcasting..." : "Send Broadcast"}
                            <Send size={12} />
                          </button>
                        </div>
                      </form>
                    </div>

                    {/* Toolbar / Actions */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
                      <div>
                        <h4 className="text-lg font-extrabold tracking-tight">Delegate Database</h4>
                        <p className="text-white/40 text-xs">Real-time coordinator logs of all registered delegates.</p>
                      </div>

                      <div className="flex gap-3 w-full sm:w-auto">
                        <button
                          onClick={exportToCSV}
                          className="flex-grow sm:flex-initial bg-[#10B981] hover:bg-[#059669] text-white px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-lg shadow-emerald-500/25"
                        >
                          <Download size={14} />
                          Export to CSV
                        </button>
                        <button
                          onClick={() => {
                            setIsAdminAuthenticated(false);
                            setAdminPasscode("");
                            if (typeof window !== "undefined") {
                              localStorage.removeItem("kpr-admin-authenticated");
                            }
                          }}
                          className="bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>

                    {/* Data Table */}
                    <div className="border border-white/5 rounded-2xl overflow-hidden bg-black/40">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="border-b border-white/10 bg-white/5 text-white/40 font-bold uppercase tracking-wider">
                              <th className="p-4 font-extrabold">Pass ID</th>
                              <th className="p-4 font-extrabold">Full Name</th>
                              <th className="p-4 font-extrabold">Email</th>
                              <th className="p-4 font-extrabold">Phone</th>
                              <th className="p-4 font-extrabold">Mode</th>
                              <th className="p-4 font-extrabold">Hostel</th>
                              <th className="p-4 font-extrabold">T-Shirt</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {isLoadingAdminData ? (
                              <tr>
                                <td colSpan={7} className="p-8 text-center text-white/40 font-medium">
                                  <span className="inline-block animate-pulse text-[#F21449]">Loading delegates database...</span>
                                </td>
                              </tr>
                            ) : registrations.length === 0 ? (
                              <tr>
                                <td colSpan={7} className="p-8 text-center text-white/30 font-medium">
                                  No registrations found in the database.
                                </td>
                              </tr>
                            ) : (
                              registrations.map((reg) => (
                                <tr key={reg.id} className="hover:bg-white/5 transition-colors text-white/80">
                                  <td className="p-4 font-mono font-bold text-[#F21449]">{reg.id}</td>
                                  <td className="p-4 font-semibold text-white">{reg.fullName}</td>
                                  <td className="p-4 text-white/70">{reg.email}</td>
                                  <td className="p-4 text-white/70">{reg.phone}</td>
                                  <td className="p-4 font-medium text-white/70">{reg.joiningMode}</td>
                                  <td className="p-4 text-white/60">
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                      reg.accommodation.toLowerCase().includes("hostel") 
                                        ? "bg-emerald-500/10 text-emerald-400" 
                                        : "bg-white/5 text-white/40"
                                    }`}>
                                      {reg.accommodation.toLowerCase().includes("hostel") ? "Yes" : "No"}
                                    </span>
                                  </td>
                                  <td className="p-4 text-[#F21449] font-bold">
                                    {reg.tshirt.toLowerCase().includes("yes") ? "Pre-order" : "None"}
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hidden high-quality ticket pass container specifically for PDF generation */}
      {registeredTicket && (
        <div 
          id="kpr-official-pass-print-target" 
          style={{ 
            position: "fixed", 
            left: "-9999px", 
            top: "-9999px", 
            width: "550px", 
            backgroundColor: "#0B0813",
            color: "white",
            fontFamily: "var(--font-sans), sans-serif",
            padding: "40px",
            borderRadius: "32px",
            border: "1px solid rgba(242, 20, 73, 0.4)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            zIndex: -5000,
            boxSizing: "border-box"
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", paddingBottom: "24px", marginBottom: "24px" }}>
            <div>
              <span style={{ fontSize: "10px", color: "#F21449", textTransform: "uppercase", fontWeight: "900", letterSpacing: "0.15em", display: "block", marginBottom: "4px" }}>OFFICIAL PASS</span>
              <h3 style={{ fontSize: "20px", fontWeight: "900", color: "white", margin: 0, letterSpacing: "-0.02em" }}>KINGDOM PRAYER RETREAT</h3>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "rgba(242, 20, 73, 0.1)", border: "1px solid rgba(242, 20, 73, 0.3)", padding: "6px 12px", borderRadius: "9999px", color: "#F21449", fontSize: "12px", fontWeight: "900" }}>
              KPR 2026
            </div>
          </div>

          {/* User Details */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
              <p style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "4px", fontWeight: "bold" }}>Attendee Name</p>
              <p style={{ fontSize: "24px", fontWeight: "800", color: "white", margin: 0, letterSpacing: "-0.01em" }}>{registeredTicket.fullName}</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <p style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "4px", fontWeight: "bold" }}>Email</p>
                <p style={{ color: "white", fontWeight: "600", fontSize: "12px", margin: 0, wordBreak: "break-all" }}>{registeredTicket.email}</p>
              </div>
              <div>
                <p style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "4px", fontWeight: "bold" }}>Phone Number</p>
                <p style={{ color: "white", fontWeight: "600", fontSize: "12px", margin: 0 }}>{registeredTicket.phone}</p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <p style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "4px", fontWeight: "bold" }}>Joining Mode</p>
                <p style={{ color: "white", fontSize: "12px", fontWeight: "600", margin: 0 }}>
                  {registeredTicket.joiningMode}
                </p>
              </div>
              <div>
                <p style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "4px", fontWeight: "bold" }}>Residence</p>
                <p style={{ color: "white", fontWeight: "600", fontSize: "12px", margin: 0 }}>{registeredTicket.residence}</p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", borderTop: "1px solid rgba(255, 255, 255, 0.05)", paddingTop: "16px" }}>
              <div>
                <p style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "4px", fontWeight: "bold" }}>Accommodation</p>
                <p style={{ color: "white", fontSize: "12px", fontWeight: "500", margin: 0 }}>{registeredTicket.accommodation}</p>
              </div>
              <div>
                <p style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "4px", fontWeight: "bold" }}>T-Shirt Preference</p>
                <p style={{ color: "#F21449", fontSize: "12px", fontWeight: "bold", margin: 0 }}>{registeredTicket.tshirt}</p>
              </div>
            </div>

            {/* Ticket ID & Barcode */}
            <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)", paddingTop: "24px", marginTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "4px", fontWeight: "bold" }}>Pass Reference ID</p>
                <p style={{ fontSize: "18px", fontFamily: "monospace", fontWeight: "bold", letterSpacing: "0.1em", color: "white", margin: 0 }}>{registeredTicket.id}</p>
              </div>
              <div style={{ backgroundColor: "rgba(255, 255, 255, 0.05)", padding: "10px 16px", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.05)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                <div style={{ display: "flex", gap: "2px", height: "24px", alignItems: "flex-end" }}>
                  {[1.5, 3, 1, 2, 4, 1.5, 3, 1.5, 2.5, 1, 3.5, 1, 2, 3, 1.5, 4, 1, 2.5].map((w, idx) => (
                    <div key={idx} style={{ backgroundColor: "rgba(255, 255, 255, 0.4)", width: `${w}px`, height: "100%", borderRadius: "1px" }} />
                  ))}
                </div>
                <span style={{ fontSize: "8px", fontFamily: "monospace", color: "rgba(255, 255, 255, 0.3)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Validated Delegate</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
