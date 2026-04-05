import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
// import { Link } from '@/i18n/routing';
import { Send, CheckCircle2, AlertCircle, Loader2, User, Mail, Phone, Briefcase, MessageSquare, ShieldCheck } from 'lucide-react';
import PrivacyPolicyModal from '@/components/modals/PrivacyPolicyModal';

declare global {
    interface Window {
        onloadTurnstileCallback: () => void;
    }
}

/**
 * [Senior Next.js Developer Note]
 * ---------------------------------------------------------
 * DEBUGGED VERSION: Google Apps Script Backend
 * 1. Added Verbose Logging to Console (Press F12 to see)
 * 2. Changed fetch mode to handle success/failure better
 * 3. Files not entering Drive is usually a FolderID or Permission issue in GAS
 * ---------------------------------------------------------
 */

import { GAS_WEB_APP_URL } from '@/lib/constants';

export function CareersForm() {
    const t = useTranslations('careers.form');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [retryCount, setRetryCount] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [pdpaConsent, setPdpaConsent] = useState(false);
    const [showPdpaModal, setShowPdpaModal] = useState(false);

    const localeText = {
        agree: t('pdpa_agree'),
        policy: t('pdpa_policy'),
        company: t('pdpa_company')
    };

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        position: '',
        message: ''
    });

    const [honeypot, setHoneypot] = useState('');

    useEffect(() => {
        const handleApply = (e: Event) => {
            const customEvent = e as CustomEvent;
            setFormData(prev => ({ ...prev, position: customEvent.detail }));
        };
        window.addEventListener('apply-position', handleApply);
        return () => window.removeEventListener('apply-position', handleApply);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Spam Check
        if (honeypot) {
            console.warn("Spam detected: Honeypot field filled.");
            return; // Silent reject
        }

        if (!pdpaConsent) {
            alert(t('pdpa_alert'));
            return;
        }

        // IP-less Client-Side Rate Limiter (Anti-Spam)
        const now = Date.now();
        const lastSubTime = localStorage.getItem('last_sub_time');
        const subCount = parseInt(localStorage.getItem('sub_count') || '0', 10);

        if (lastSubTime && now - parseInt(lastSubTime) > 3600000) {
            localStorage.setItem('sub_count', '0');
        } else if (subCount >= 3) {
            setErrorMessage("Rate Limit Exceeded: คุณส่งแบบฟอร์มบ่อยเกินไป กรุณารอ 1 ชั่วโมงแล้วลองใหม่");
            setStatus('error');
            return;
        }

        setStatus('loading');
        setRetryCount(0);
        console.group("🚀 Submitting Application to Google");

        try {
            console.log("1. Preparing payload...");

            const payload = {
                type: 'careers', // Explicitly specify form type
                firstName: formData.firstName,
                lastName: formData.lastName,
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                phone: formData.phone,
                position: formData.position,
                message: formData.message,
                pdpaAccepted: true,
                _honeypot: honeypot,
                _origin: window.location.origin
            };

            const MAX_RETRIES = 3;
            for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
                try {
                    console.info("Submitting application...");

                    await fetch(GAS_WEB_APP_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        cache: 'no-cache',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ...payload,
                            key: process.env.NEXT_PUBLIC_GAS_API_KEY
                        }),
                    });

                    // Since mode is 'no-cors', we cannot read the response body or status.
                    // If the request doesn't throw a network error, we assume it reached GAS successfully.
                    setStatus('success');
                    console.info("🎉 Application sent successfully!");
                    setFormData({ firstName: '', lastName: '', email: '', phone: '', position: '', message: '' });
                    setPdpaConsent(false);
                    
                    // Update Rate Limiter Storage
                    localStorage.setItem('last_sub_time', Date.now().toString());
                    const currentCount = parseInt(localStorage.getItem('sub_count') || '0', 10);
                    localStorage.setItem('sub_count', (currentCount + 1).toString());
                    
                    break; // Exit retry loop

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (err: any) {
                    if (attempt === MAX_RETRIES || (err && err.message && err.message.includes('401 Unauthorized'))) {
                        throw err; // Throw to outer catch if it's the last attempt or an unrecoverable error
                    }
                    console.warn(`Attempt ${attempt} failed. Retrying in 4 seconds...`, err);
                    setRetryCount(attempt);
                    await new Promise(resolve => setTimeout(resolve, 4000));
                }
            }

        } catch (error: unknown) {
            console.error("❌ Submission Failed:", error);
            setStatus('error');
            let msg = 'Unknown error';

            if (error instanceof Error) {
                msg = error.message;
                // ตรวจสอบว่าเป็นเรื่อง CORS หรือเปล่า
                if (msg.toLowerCase().includes("failed to fetch")) {
                    msg = t('error_network');
                }
            }
            setErrorMessage('เกิดข้อผิดพลาด: ' + msg);
        } finally {
            console.groupEnd();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (status === 'success') {
        return (
            <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-12 text-center space-y-4 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="text-white" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900">
                    {t('success_title')}
                </h3>
                <p className="text-zinc-700 max-w-sm mx-auto font-medium whitespace-pre-line">
                    {t('success_desc')}
                </p>
                <div className="pt-4 border-t border-emerald-100 mt-6">
                    <button
                        onClick={() => setStatus('idle')}
                        className="text-emerald-600 font-black hover:underline"
                    >
                        {t('send_more')}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3xl relative overflow-hidden">
            {status === 'loading' && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] z-50 flex flex-col items-center justify-center space-y-4">
                    <Loader2 className="text-emerald-600 animate-spin" size={48} />
                    <p className="font-bold text-zinc-900 animate-pulse text-center px-4 whitespace-pre-line">
                        {retryCount > 0 ? t('retrying', { count: retryCount }) : t('processing')}
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 p-1">
                {/* Honeypot Field (Hidden) for Spam Protection */}
                <input
                    type="text"
                    name="_honey"
                    style={{ display: 'none' }}
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                />

                {/* Name Group */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2 px-1">
                            <User size={12} className="text-emerald-600" />
                            {t('firstName')} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            required
                            placeholder="John"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full bg-white border border-zinc-300/60 rounded-xl px-4 py-3 text-zinc-900 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-400 text-sm font-medium shadow-sm"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2 px-1">
                            <User size={12} className="text-emerald-600" />
                            {t('lastName')} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            required
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full bg-white border border-zinc-300/60 rounded-xl px-4 py-3 text-zinc-900 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-400 text-sm font-medium shadow-sm"
                        />
                    </div>
                </div>

                {/* Contact Group */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2 px-1">
                            <Mail size={12} className="text-emerald-600" />
                            {t('email')} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="email@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-white border border-zinc-300/60 rounded-xl px-4 py-3 text-zinc-900 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-400 text-sm font-medium shadow-sm"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2 px-1">
                            <Phone size={12} className="text-emerald-600" />
                            {t('phone')} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            minLength={9}
                            maxLength={15}
                            placeholder="0XX-XXX-XXXX"
                            pattern="[0-9+\s\-]{9,15}"
                            title="Please enter a valid phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-white border border-zinc-300/60 rounded-xl px-4 py-3 text-zinc-900 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-400 text-sm font-medium shadow-sm"
                        />
                    </div>
                </div>

                {/* Position */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2 px-1">
                        <Briefcase size={12} className="text-emerald-600" />
                        {t('position')} <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="position"
                        required
                        id="position-input"
                        placeholder="Desired Position"
                        value={formData.position}
                        onChange={handleChange}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-400 text-sm font-medium"
                    />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2 px-1">
                        <MessageSquare size={12} className="text-emerald-600" />
                        {t('message')}
                    </label>
                    <textarea
                        name="message"
                        rows={3}
                        placeholder="Tell us about yourself..."
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-white border border-zinc-300/60 rounded-xl px-4 py-3 text-zinc-900 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all resize-none placeholder:text-zinc-400 text-sm font-medium shadow-sm"
                    />
                </div>


                {/* PDPA Section */}
                <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl">
                    <div className="flex items-start gap-3">
                        <div className="pt-1">
                            <input
                                type="checkbox"
                                id="pdpa"
                                required
                                checked={pdpaConsent}
                                onChange={(e) => setPdpaConsent(e.target.checked)}
                                className="w-4 h-4 rounded border-emerald-200 text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-emerald-600"
                            />
                        </div>
                        <label htmlFor="pdpa" className="text-xs text-zinc-600 leading-relaxed cursor-pointer select-none font-medium flex items-center gap-2">
                            <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                            <span>
                                {localeText.agree} <button type="button" onClick={() => setShowPdpaModal(true)} className="text-emerald-700 font-bold underline hover:text-emerald-800 transition-colors">{localeText.policy}</button> {localeText.company}
                            </span>
                        </label>
                    </div>
                </div>

                {status === 'error' && (
                    <div className="p-3 bg-red-50 border border-red-100 text-red-700 rounded-xl flex items-center gap-3 text-xs font-bold animate-shake">
                        <AlertCircle size={16} />
                        <span>{errorMessage}</span>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={status === 'loading' || !pdpaConsent}
                    className="w-full py-4 bg-green-primary hover:bg-green-dark text-white rounded-2xl font-bold transition-all shadow-xl shadow-green-primary/10 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {status === 'loading' ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            {t('sending')}
                        </>
                    ) : (
                        <>
                            <Send size={20} />
                            {t('submit')}
                        </>
                    )}
                </button>
            </form>

            <PrivacyPolicyModal
                isOpen={showPdpaModal}
                onClose={() => setShowPdpaModal(false)}
                onAccept={() => setPdpaConsent(true)}
            />
        </div>
    );
}
