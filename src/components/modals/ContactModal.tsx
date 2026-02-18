"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Copy, Check, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { copyToClipboard } from "@/lib/utils";

interface Contact {
    type: string;
    value: string;
    label: string;
    href?: string;
}

interface ContactModalProps {
    selectedContact: Contact | null;
    onClose: () => void;
    onConfirm: () => void;
}

export default function ContactModal({
    selectedContact,
    onClose,
    onConfirm,
}: ContactModalProps) {
    const tHome = useTranslations("home");
    const [copied, setCopied] = useState(false);

    const handleCopy = async (text: string) => {
        const success = await copyToClipboard(text);
        if (success) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <AnimatePresence>
            {selectedContact && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center px-4"
                    style={{ pointerEvents: "auto" }}
                >
                    <motion.div
                        className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 shadow-2xl overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

                        <div className="flex flex-col items-center text-center space-y-6">
                            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500">
                                {selectedContact.type === "tel" && <Phone size={32} />}
                                {selectedContact.type === "mailto" && <Mail size={32} />}
                                {selectedContact.type === "map" && <MapPin size={32} />}
                                {selectedContact.type === "line" && <MessageSquare size={32} />}
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-white uppercase tracking-tight italic">
                                    {selectedContact.label}
                                </h3>
                                <p className="text-zinc-400 font-light leading-relaxed">
                                    {selectedContact.type === "tel" &&
                                        tHome("contact_modal.call_msg", {
                                            val: selectedContact.value,
                                        })}
                                    {selectedContact.type === "mailto" &&
                                        tHome("contact_modal.email_msg", {
                                            val: selectedContact.value,
                                        })}
                                    {selectedContact.type === "line" &&
                                        tHome("contact_modal.line_msg")}
                                    {selectedContact.type === "map" &&
                                        tHome("contact_modal.map_msg")}
                                </p>
                            </div>

                            <div className="flex flex-col items-center gap-2 w-full">
                                <p className="text-white font-mono bg-white/5 px-4 py-2 rounded-xl border border-white/10 w-full break-all">
                                    {selectedContact.type === 'line' ? selectedContact.label : selectedContact.value}
                                </p>
                                {selectedContact.type !== "map" && selectedContact.type !== "line" && (
                                    <button
                                        onClick={() => handleCopy(selectedContact.value)}
                                        className="flex items-center gap-2 text-xs font-bold text-emerald-500 hover:text-emerald-400 transition-colors uppercase tracking-widest"
                                    >
                                        {copied ? <Check size={14} /> : <Copy size={14} />}
                                        {copied
                                            ? tHome("contact_modal.copied")
                                            : tHome("contact_modal.copy")}
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4 w-full pt-4">
                                <button
                                    onClick={onClose}
                                    className="px-6 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-2xl font-bold transition-colors uppercase text-sm tracking-widest"
                                >
                                    {tHome("contact_modal.cancel")}
                                </button>

                                <button
                                    onClick={onConfirm}
                                    className="px-6 py-4 bg-green-primary hover:bg-green-dark text-white rounded-2xl font-bold transition-all shadow-xl shadow-green-primary/10 uppercase text-sm tracking-widest text-center"
                                >
                                    {selectedContact.type === "map" ? (
                                        tHome("contact_modal.confirm_map")
                                    ) : selectedContact.type === "line" ? (
                                        tHome("contact_modal.confirm_link")
                                    ) : (
                                        <>
                                            {selectedContact.type === "tel" &&
                                                tHome("contact_modal.confirm_call")}
                                            {selectedContact.type === "mailto" &&
                                                tHome("contact_modal.confirm_email")}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
