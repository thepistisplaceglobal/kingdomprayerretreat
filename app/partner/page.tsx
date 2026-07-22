"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { 
  Heart, 
  Building, 
  Copy, 
  Check, 
  ArrowRight, 
  Calendar, 
  BellRing, 
  CheckCircle2, 
  Download, 
  Sparkles, 
  CreditCard
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FadeIn, TextReveal } from "@/components/Animations";

interface BankAccount {
  bankName: string;
  accountName: string;
  accountNumber: string;
  accountType: string;
  currency: string;
}

const bankAccountsNGN: BankAccount[] = [
  {
    bankName: "Access Bank PLC",
    accountName: "Passion for Souls Outreach",
    accountNumber: "0088631083",
    accountType: "Church Partnership",
    currency: "NGN (Naira)",
  },
  {
    bankName: "Zenith Bank PLC",
    accountName: "The Pistis Family Ministries",
    accountNumber: "1310697179",
    accountType: "Offerings / Building",
    currency: "NGN (Naira)",
  },
  {
    bankName: "United Bank for Africa",
    accountName: "The Pistis Family Ministries",
    accountNumber: "1027820077",
    accountType: "Tithes & Seeds",
    currency: "NGN (Naira)",
  },
];

const bankAccountsUSD: BankAccount[] = [
  {
    bankName: "United Bank for Africa",
    accountName: "The Pistis Family Ministries",
    accountNumber: "0755420479",
    accountType: "Domiciliary",
    currency: "USD (Dollars)",
  },
];

const bankAccountsEUR: BankAccount[] = [
  {
    bankName: "United Bank for Africa",
    accountName: "The Pistis Family Ministries",
    accountNumber: "3004963913",
    accountType: "Domiciliary",
    currency: "EUR (Euros)",
  },
];

const tiers = {
  NGN: [
    {
      id: "bronze",
      name: "Seed Partner",
      range: "₦5,000 - ₦49,999",
      description: "Supports local church evangelism materials, Bibles, and community care items.",
      impact: "Feeds 1 outreach attendee or provides 2 study Bibles",
    },
    {
      id: "silver",
      name: "Grace Partner",
      range: "₦50,000 - ₦249,999",
      description: "Supports venue hosting, regional media equipment, and printing of discipleship devotionals.",
      impact: "Sponsors regional crusades and digital broadcasting feeds",
    },
    {
      id: "gold",
      name: "Kingdom Pillar",
      range: "₦250,000 - ₦999,999",
      description: "Enables building infrastructure expansion, church plants, and medical outreaches.",
      impact: "Funds community medical camps and permanent sanctuary setup",
    },
    {
      id: "platinum",
      name: "Global Champion",
      range: "₦1,000,000+",
      description: "Directly sponsors international missions, nationwide satellite broadcasting, and crusades.",
      impact: "Sponsors global satellite TV streams and international massive crusades",
    },
  ],
  USD: [
    {
      id: "bronze",
      name: "Seed Partner",
      range: "$20 - $99",
      description: "Supports local church evangelism materials, Bibles, and community care items.",
      impact: "Sponsors 5 outreach Bibles or community packs",
    },
    {
      id: "silver",
      name: "Grace Partner",
      range: "$100 - $499",
      description: "Supports venue hosting, regional media equipment, and printing of discipleship devotionals.",
      impact: "Enables dynamic high-definition live camera feeds and setup",
    },
    {
      id: "gold",
      name: "Kingdom Pillar",
      range: "$500 - $1,999",
      description: "Enables building infrastructure expansion, church plants, and medical outreaches.",
      impact: "Sponsors regional training seminars and missionary deployments",
    },
    {
      id: "platinum",
      name: "Global Champion",
      range: "$2,000+",
      description: "Directly sponsors international missions, nationwide satellite broadcasting, and crusades.",
      impact: "Supports cross-border missions and global satellite broadcasting airtime",
    },
  ],
  EUR: [
    {
      id: "bronze",
      name: "Seed Partner",
      range: "€20 - €99",
      description: "Supports local church evangelism materials, Bibles, and community care items.",
      impact: "Supports essential church materials and local welfare care items",
    },
    {
      id: "silver",
      name: "Grace Partner",
      range: "€100 - €499",
      description: "Supports venue hosting, regional media equipment, and printing of discipleship devotionals.",
      impact: "Funds high-quality sound amplification systems for new church plants",
    },
    {
      id: "gold",
      name: "Kingdom Pillar",
      range: "€500 - €1,999",
      description: "Enables building infrastructure expansion, church plants, and medical outreaches.",
      impact: "Sponsors church planting start-up logistics and media setups",
    },
    {
      id: "platinum",
      name: "Global Champion",
      range: "€2,000+",
      description: "Directly sponsors international missions, nationwide satellite broadcasting, and crusades.",
      impact: "Directly sponsors satellite television networks in French and English",
    },
  ],
};

export default function PartnerPage() {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [currency, setCurrency] = useState<"NGN" | "USD" | "EUR">("NGN");
  const [selectedTier, setSelectedTier] = useState<string>("silver");
  const [customAmount, setCustomAmount] = useState<string>("");

  // Commitment Form State
  const [partnerName, setPartnerName] = useState("");
  const [partnerEmail, setPartnerEmail] = useState("");
  const [partnerPhone, setPartnerPhone] = useState("");
  const [reminderFrequency, setReminderFrequency] = useState<"weekly" | "monthly" | "one-time">("monthly");
  const [reminderChannel, setReminderChannel] = useState<"email" | "sms" | "whatsapp">("email");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showIcsNotice, setShowIcsNotice] = useState(false);

  const copyToClipboard = async (text: string, accountId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAccount(accountId);
      setTimeout(() => setCopiedAccount(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const getActiveBankAccounts = () => {
    if (currency === "USD") return bankAccountsUSD;
    if (currency === "EUR") return bankAccountsEUR;
    return bankAccountsNGN;
  };

  const activeTiers = tiers[currency];
  const activeTierObj = activeTiers.find(t => t.id === selectedTier);

  const handleSubmitCommitment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const tierName = selectedTier === "custom" ? "Custom Partner" : (activeTierObj?.name || "Partner");
    const finalAmountRange = selectedTier === "custom" ? `${currency} ${customAmount}` : (activeTierObj?.range || "");

    try {
      const response = await fetch("/api/partner/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: partnerName,
          email: partnerEmail,
          phone: partnerPhone,
          currency,
          tier: tierName,
          amountRange: finalAmountRange,
          reminderFrequency,
          reminderChannel
        })
      });

      const data = await response.json();
      if (response.ok) {
        setSubmitSuccess(true);
        setShowIcsNotice(true);
      } else {
        setSubmitError(data.error || "Failed to submit commitment.");
      }
    } catch (err: unknown) {
      const errorObj = err as Error;
      setSubmitError(errorObj.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadICS = () => {
    const tierName = selectedTier === "custom" ? "Custom Partner" : (activeTierObj?.name || "Partner");
    const finalAmountRange = selectedTier === "custom" ? `${currency} ${customAmount}` : (activeTierObj?.range || "");
    const title = `KPR Partnership Commitment - ${tierName}`;
    const description = `This is a friendly automated reminder for your committed KPR partnership seed of ${finalAmountRange} (${reminderFrequency}). Thank you for your faithful support!`;
    
    // RRule based on frequency
    let rrule = "FREQ=MONTHLY;BYMONTHDAY=1"; // Default monthly on 1st
    if (reminderFrequency === "weekly") {
      rrule = "FREQ=WEEKLY;BYDAY=MO"; // Weekly on Mondays
    } else if (reminderFrequency === "one-time") {
      rrule = ""; // No repetition
    }

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//KPR 2026//Partnership Calendar//EN",
      "BEGIN:VEVENT",
      `UID:${Date.now()}@kpr2026.org`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
      `DTSTART:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      rrule ? `RRULE:${rrule}` : "",
      "BEGIN:VALARM",
      "TRIGGER:-PT9H", // 9 hours before
      "ACTION:DISPLAY",
      "DESCRIPTION:KPR Partnership Seed Reminder",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR"
    ].filter(line => line !== "").join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `kpr-partnership-reminder.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowIcsNotice(false);
  };

  const handleResetForm = () => {
    setPartnerName("");
    setPartnerEmail("");
    setPartnerPhone("");
    setSubmitSuccess(false);
    setCustomAmount("");
    setSelectedTier("silver");
  };

  return (
    <div
      className="min-h-screen relative bg-[#090514] text-white overflow-x-hidden"
      style={{
        backgroundImage: "radial-gradient(circle at 50% 50%, rgba(48, 4, 96, 0.15) 0%, transparent 80%)",
      }}
    >
      <Navbar />

      {/* Hero Section */}
      <FadeIn delay={0.1}>
        <div className="rounded-lg mx-1 sm:rounded-[32px] md:rounded-[40px] overflow-hidden relative mt-1 h-[400px] md:h-[480px]">
          <div className="absolute inset-0">
            <Image
              src="/partner.png"
              alt="Partnership background"
              fill
              className="object-cover"
              priority
              sizes="100vw"
              quality={85}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#090514] via-[#090514]/60 to-black/80" />

          <div className="absolute inset-x-4 sm:inset-x-8 md:inset-x-16 bottom-12 flex flex-col gap-4 z-10">
            <FadeIn delay={0.2}>
              <div className="inline-flex items-center gap-2 bg-[#F21449]/15 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-[#F21449]/35 w-fit">
                <Heart className="w-4 h-4 text-[#F21449] animate-pulse" />
                <span className="text-[#F21449] font-black text-xs uppercase tracking-widest">
                  Kingdom Covenant
                </span>
              </div>
            </FadeIn>
            <TextReveal delay={0.3}>
              <h1 className="text-3xl md:text-5xl font-black leading-tight max-w-3xl tracking-tight uppercase bricolage text-white">
                Partner with Us
              </h1>
            </TextReveal>
            <TextReveal delay={0.4}>
              <p className="text-white/75 text-xs sm:text-sm max-w-xl leading-relaxed font-semibold">
                Join us in advancing God&apos;s kingdom through your faithful
                partnership. Together, we can reach more souls, transform
                communities, and demonstrate God&apos;s love to the world.
              </p>
            </TextReveal>
          </div>
        </div>
      </FadeIn>

      {/* Core Impact Cards */}
      <section className="py-16 px-4 sm:px-[5%] max-w-7xl mx-auto">
        <FadeIn delay={0.2} className="space-y-2 mb-12 text-center">
          <p className="text-[#F21449] font-bold text-xs uppercase tracking-widest">
            Why Partner with Us?
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
            Make an Eternal Difference
          </h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="h-1 w-16 bg-[#F21449] rounded-full" />
            <div className="h-1 w-8 bg-[#F21449]/40 rounded-full" />
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 hover:border-[#F21449]/30 hover:bg-white/[0.04] transition-all duration-300 group">
            <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
              <Image
                src="/soulreach.jpg"
                alt="Soul Reach"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 font-bold text-xs text-white uppercase tracking-wider bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                Evangelism
              </div>
            </div>
            <h3 className="text-lg font-extrabold uppercase tracking-tight text-white mb-2">
              Soul Reach
            </h3>
            <p className="text-white/60 text-xs leading-relaxed font-medium">
              Your partnership helps us reach thousands of souls through evangelism, church planting, and digital outreach programs across Nigeria and beyond.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 hover:border-[#F21449]/30 hover:bg-white/[0.04] transition-all duration-300 group">
            <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
              <Image
                src="/infrastructure.jpg"
                alt="Kingdom Infrastructure"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 font-bold text-xs text-white uppercase tracking-wider bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                Infrastructure
              </div>
            </div>
            <h3 className="text-lg font-extrabold uppercase tracking-tight text-white mb-2">
              Kingdom Infrastructure
            </h3>
            <p className="text-white/60 text-xs leading-relaxed font-medium">
              Support the building of churches, training centers, and facilities that will serve as centers of transformation for generations to come.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 hover:border-[#F21449]/30 hover:bg-white/[0.04] transition-all duration-300 group">
            <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
              <Image
                src="/global.jpg"
                alt="Global Impact"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 font-bold text-xs text-white uppercase tracking-wider bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                Impact
              </div>
            </div>
            <h3 className="text-lg font-extrabold uppercase tracking-tight text-white mb-2">
              Global Impact
            </h3>
            <p className="text-white/60 text-xs leading-relaxed font-medium">
              Be part of a global movement that transcends borders, cultures, and languages to demonstrate God&apos;s love and power to the world.
            </p>
          </div>
        </div>
      </section>

      {/* MID-BANNER SANCTUARY */}
      <section className="relative h-[25vh] md:h-[35vh] overflow-hidden my-6">
        <Image
          src="/givebanner.jpg"
          alt="The Pistis Place Sanctuary filled with worshippers"
          fill
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/40" />
      </section>

      {/* NEW INTERACTIVE PARTNERSHIP & COMMITTED-REMINDERS WORKSPACE */}
      <section className="py-16 px-4 sm:px-[5%] max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: STEP-BY-STEP CALCULATOR AND CHANNELS (7 COLS) */}
          <div className="lg:col-span-7 space-y-8 bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F21449]/5 rounded-full blur-[80px] -z-10" />

            <div className="space-y-2">
              <span className="text-[#F21449] text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles size={12} className="text-[#F21449]" /> STEP 1: DEFINE COVENANT RANGE
              </span>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                Choose Currency & Range
              </h3>
              <p className="text-white/50 text-xs leading-tight font-medium">
                Select your preferred giving currency, then click a range to view its Kingdom impact details.
              </p>
            </div>

            {/* Currency Switcher */}
            <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 max-w-md">
              <button
                type="button"
                onClick={() => { setCurrency("NGN"); setSelectedTier("silver"); }}
                className={`flex-1 py-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 ${
                  currency === "NGN"
                    ? "bg-[#F21449] text-white shadow-[0_4px_15px_rgba(242,20,73,0.3)]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                🇳🇬 Naira (NGN)
              </button>
              <button
                type="button"
                onClick={() => { setCurrency("USD"); setSelectedTier("silver"); }}
                className={`flex-1 py-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 ${
                  currency === "USD"
                    ? "bg-[#F21449] text-white shadow-[0_4px_15px_rgba(242,20,73,0.3)]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                🇺🇸 Dollar (USD)
              </button>
              <button
                type="button"
                onClick={() => { setCurrency("EUR"); setSelectedTier("silver"); }}
                className={`flex-1 py-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 ${
                  currency === "EUR"
                    ? "bg-[#F21449] text-white shadow-[0_4px_15px_rgba(242,20,73,0.3)]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                🇪🇺 Euro (EUR)
              </button>
            </div>

            {/* Tiers List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeTiers.map((tier) => {
                const isSelected = selectedTier === tier.id;
                return (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id)}
                    className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-[#F21449]/10 border-[#F21449] shadow-[0_0_20px_rgba(242,20,73,0.15)]"
                        : "bg-white/[0.02] border-white/5 hover:border-white/20"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          isSelected ? "bg-[#F21449] text-white" : "bg-white/10 text-white/60"
                        }`}>
                          {tier.name}
                        </span>
                        {isSelected && <CheckCircle2 size={16} className="text-[#F21449]" />}
                      </div>
                      <h4 className="text-lg font-black text-white mb-1">
                        {tier.range}
                      </h4>
                      <p className="text-[11px] text-white/50 leading-relaxed font-medium mb-3">
                        {tier.description}
                      </p>
                    </div>
                    <div className={`mt-2 border-t pt-2 text-[10px] font-bold ${
                      isSelected ? "border-[#F21449]/30 text-[#F21449]" : "border-white/5 text-white/40"
                    }`}>
                      👑 Projected Impact: {tier.impact}
                    </div>
                  </div>
                );
              })}

              {/* Custom Range Card */}
              <div
                onClick={() => setSelectedTier("custom")}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  selectedTier === "custom"
                    ? "bg-[#F21449]/10 border-[#F21449] shadow-[0_0_20px_rgba(242,20,73,0.15)]"
                    : "bg-white/[0.02] border-white/5 hover:border-white/20"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      selectedTier === "custom" ? "bg-[#F21449] text-white" : "bg-white/10 text-white/60"
                    }`}>
                      Custom Seed
                    </span>
                    {selectedTier === "custom" && <CheckCircle2 size={16} className="text-[#F21449]" />}
                  </div>
                  <h4 className="text-sm font-extrabold text-white mb-2 uppercase">
                    Enter Custom Seed Amount
                  </h4>
                  {selectedTier === "custom" ? (
                    <div className="flex items-center bg-white/5 rounded-xl border border-white/10 px-3 py-2">
                      <span className="text-xs font-bold mr-1.5 text-white/50">
                        {currency === "NGN" ? "₦" : currency === "USD" ? "$" : "€"}
                      </span>
                      <input
                        type="number"
                        placeholder="e.g. 50000"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="bg-transparent border-none outline-none text-xs text-white font-extrabold w-full"
                      />
                    </div>
                  ) : (
                    <p className="text-[11px] text-white/50 leading-relaxed font-medium">
                      Contribute any amount as led by the Holy Spirit.
                    </p>
                  )}
                </div>
                <div className="mt-3 border-t border-white/5 pt-2 text-[10px] text-white/40 font-bold">
                  🎁 Any offering supports kingdom growth
                </div>
              </div>
            </div>

            {/* DYNAMIC BANK ACCOUNT DISPLAY IN ACCORDANCE TO CURRENCY */}
            <div className="border-t border-white/10 pt-6 mt-6 space-y-4">
              <span className="text-[#F21449] text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                <CreditCard size={12} /> STEP 2: VERIFY BANK CHANNELS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {getActiveBankAccounts().map((account, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3 relative overflow-hidden">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest font-black text-[#F21449] block">
                          {account.accountType}
                        </span>
                        <h4 className="text-sm font-black text-white">{account.bankName}</h4>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-[#F21449]/10 text-[#F21449] flex items-center justify-center">
                        <Building size={16} />
                      </div>
                    </div>

                    <div>
                      <span className="text-[9px] text-white/40 font-bold uppercase block mb-0.5">Account Name</span>
                      <span className="text-xs text-white/90 font-bold">{account.accountName}</span>
                    </div>

                    <div className="bg-white/[0.03] border border-white/5 p-2 rounded-xl flex items-center justify-between">
                      <span className="font-mono font-black text-sm tracking-widest text-white">
                        {account.accountNumber}
                      </span>
                      <button
                        onClick={() => copyToClipboard(account.accountNumber, `${idx}-acc`)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-all duration-200"
                      >
                        {copiedAccount === `${idx}-acc` ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: REGISTRATION, COMMITMENT AND REMINDERS (5 COLS) */}
          <div className="lg:col-span-5 bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 sm:p-8 relative">
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#F21449]/5 rounded-full blur-[80px] -z-10" />

            {!submitSuccess ? (
              <form onSubmit={handleSubmitCommitment} className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[#F21449] text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                    <BellRing size={12} /> STEP 3: ACTIVATE REPEATED REMINDERS
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                    Partner Activation
                  </h3>
                  <p className="text-white/50 text-xs leading-tight font-medium">
                    Register your covenant seed details to opt into recurring reminder alerts.
                  </p>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40 block">Full Name</label>
                    <input
                      type="text"
                      required
                      value={partnerName}
                      onChange={(e) => setPartnerName(e.target.value)}
                      placeholder="e.g. Bro. David"
                      className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-xs font-semibold focus:border-[#F21449] outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40 block">Email Address</label>
                    <input
                      type="email"
                      required
                      value={partnerEmail}
                      onChange={(e) => setPartnerEmail(e.target.value)}
                      placeholder="e.g. partner@gmail.com"
                      className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-xs font-semibold focus:border-[#F21449] outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40 block">Phone Number (WhatsApp preferred)</label>
                    <input
                      type="tel"
                      value={partnerPhone}
                      onChange={(e) => setPartnerPhone(e.target.value)}
                      placeholder="e.g. +234 800 000 0000"
                      className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-xs font-semibold focus:border-[#F21449] outline-none transition-all"
                    />
                  </div>

                  {/* Summary of Selection */}
                  <div className="bg-white/[0.04] p-4 rounded-xl border border-white/5 space-y-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#F21449] block">Covenant Commitment</span>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white uppercase tracking-tight">
                        {selectedTier === "custom" ? "Custom Seed Amount" : `${activeTierObj?.name || "Seed Partner"}`}
                      </span>
                      <span className="text-xs font-black text-[#F21449] bg-[#F21449]/10 px-3 py-1 rounded-full border border-[#F21449]/20">
                        {selectedTier === "custom" ? `${currency} ${customAmount || "0"}` : `${activeTierObj?.range || ""}`}
                      </span>
                    </div>
                  </div>

                  {/* Reminder Frequency */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40 block">Reminder Frequency</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "weekly", label: "Weekly" },
                        { id: "monthly", label: "Monthly" },
                        { id: "one-time", label: "No Reminder" }
                      ].map((freq) => (
                        <button
                          key={freq.id}
                          type="button"
                          onClick={() => setReminderFrequency(freq.id as "weekly" | "monthly" | "one-time")}
                          className={`py-2 px-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border ${
                            reminderFrequency === freq.id
                              ? "bg-[#F21449] text-white border-transparent shadow-lg shadow-[#F21449]/20"
                              : "bg-white/5 border-white/5 text-white/60 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          {freq.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reminder Channel */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40 block">Preferred Channel</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "email", label: "Email" },
                        { id: "whatsapp", label: "WhatsApp" },
                        { id: "sms", label: "SMS" }
                      ].map((channel) => (
                        <button
                          key={channel.id}
                          type="button"
                          onClick={() => setReminderChannel(channel.id as "email" | "sms" | "whatsapp")}
                          className={`py-2 px-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border ${
                            reminderChannel === channel.id
                              ? "bg-[#F21449] text-white border-transparent shadow-lg shadow-[#F21449]/20"
                              : "bg-white/5 border-white/5 text-white/60 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          {channel.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {submitError && (
                  <div className="text-[10px] font-bold text-red-400 bg-red-400/5 border border-red-400/10 p-3 rounded-lg text-center">
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || (selectedTier === "custom" && !customAmount)}
                  className="w-full h-11 bg-[#F21449] hover:bg-[#d0103d] disabled:opacity-40 disabled:hover:bg-[#F21449] text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-lg shadow-[#F21449]/25 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  {isSubmitting ? "Activating..." : "Confirm Commitment & Remind Me"}
                  <ArrowRight size={14} />
                </button>

                <p className="text-[10px] text-white/40 leading-relaxed font-semibold text-center max-w-[280px] mx-auto">
                  By clicking this, you covenant to seed into this outreach. Friendly reminders are delivered directly to your selected channel.
                </p>
              </form>
            ) : (
              <div className="space-y-6 text-center py-8">
                <div className="w-16 h-16 rounded-full bg-[#F21449]/10 text-[#F21449] border border-[#F21449]/20 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 size={32} />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-black uppercase tracking-tight text-white">
                    Blessing Activated!
                  </h3>
                  <p className="text-white/70 text-xs font-semibold max-w-sm mx-auto leading-relaxed">
                    Thank you, <span className="text-[#F21449]">{partnerName}</span>, for your partnership covenant! A confirmation has been stored, and we will send repeated reminders via <span className="text-white uppercase font-black">{reminderChannel}</span>.
                  </p>
                </div>

                {/* Summary Box */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-left space-y-2 max-w-xs mx-auto">
                  <div className="flex justify-between items-center text-[10px] text-white/40 font-bold uppercase">
                    <span>Selected Currency</span>
                    <span className="text-white font-extrabold">{currency}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-white/40 font-bold uppercase">
                    <span>Partnership Level</span>
                    <span className="text-white font-extrabold">
                      {selectedTier === "custom" ? "Custom Seed" : (activeTierObj?.name || "Partner")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-white/40 font-bold uppercase">
                    <span>Seed Range</span>
                    <span className="text-[#F21449] font-black">
                      {selectedTier === "custom" ? `${currency} ${customAmount}` : (activeTierObj?.range || "")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-white/40 font-bold uppercase">
                    <span>Reminders Set</span>
                    <span className="text-white font-extrabold">{reminderFrequency}</span>
                  </div>
                </div>

                {showIcsNotice && (
                  <div className="bg-[#F21449]/5 border border-[#F21449]/10 p-4 rounded-xl text-xs space-y-3 max-w-xs mx-auto">
                    <p className="text-[10px] text-white/70 leading-relaxed font-bold flex items-center justify-center gap-1.5">
                      <Calendar size={14} className="text-[#F21449]" /> Auto-Add to Your Calendar
                    </p>
                    <p className="text-[9px] text-white/50 leading-tight font-medium">
                      Would you like to download a custom recurring event file for Apple Calendar, Google Calendar, or Outlook?
                    </p>
                    <button
                      onClick={downloadICS}
                      className="w-full py-2.5 bg-[#F21449] hover:bg-[#d0103d] text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Download size={12} /> Download Calendar Invite (.ics)
                    </button>
                  </div>
                )}

                <div className="pt-4 flex flex-col gap-3">
                  <button
                    onClick={handleResetForm}
                    className="text-xs font-black uppercase tracking-widest text-[#F21449] hover:text-white transition-all underline decoration-dotted"
                  >
                    Set Up Another Commitment
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ADDITIONAL ACCORDION DETAILS TO SUPPORT OLD BANNER GRAPHIC */}
      <section className="py-12 bg-[#090514]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h3 className="text-lg font-black uppercase tracking-widest text-white/40">Visual Reference Grid</h3>
          <div className="relative rounded-2xl overflow-hidden border border-white/5 shadow-2xl max-w-2xl mx-auto">
            <Image
              src="/newmoney.jpg"
              alt="Complete account details banner info"
              width={800}
              height={500}
              className="w-full h-auto object-contain opacity-75"
              sizes="(max-width: 640px) 100vw, 640px"
            />
          </div>
        </div>
      </section>

      {/* BUILDING PROJECT BANNER AT BOTTOM */}
      <section className="relative bg-[#090514] rounded-t-4xl w-full h-[320px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/down.jpg"
            alt="Community giving and fellowship"
            fill
            className="object-cover object-center opacity-40"
            sizes="100vw"
            quality={90}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#090514] via-[#090514]/70 to-transparent" />

        <div className="relative z-10 flex items-end h-full px-6 sm:px-12 md:px-16 pb-8 md:pb-12 max-w-5xl mx-auto">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white bricolage">
              Building Project
            </h2>
            <div className="flex items-center gap-2">
              <div className="h-1 w-16 bg-[#F21449] rounded-full" />
              <div className="h-1 w-8 bg-[#F21449]/40 rounded-full" />
            </div>
            <p className="text-white/70 text-xs sm:text-sm max-w-2xl leading-relaxed font-semibold">
              God is leading us into a new season. Our building project is more than bricks and mortar, it&apos;s about creating a space where lives are transformed and our community encounters the love of Christ. Partner with us as we build for His glory.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
