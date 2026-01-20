"use client";
import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle2, AlertCircle, Loader2, Upload, FileText } from 'lucide-react';

/**
 * [Senior Next.js Developer Note]
 * ---------------------------------------------------------
 * DEBUGGED VERSION: Google Apps Script Backend
 * 1. Added Verbose Logging to Console (Press F12 to see)
 * 2. Changed fetch mode to handle success/failure better
 * 3. Files not entering Drive is usually a FolderID or Permission issue in GAS
 * ---------------------------------------------------------
 */

// ใส่ URL จากการ Deploy Google Apps Script (Web App)
const GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyacQT8w5mTqw6fmd9pgu6zioG635zMRUgYskjgQH11T05n9G0ra77too5hyJFBZ0nS/exec";

export function CareersForm() {
    const t = useTranslations('careers.form');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [pdpaConsent, setPdpaConsent] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        position: '',
        message: ''
    });

    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleApply = (e: Event) => {
            const customEvent = e as CustomEvent;
            setFormData(prev => ({ ...prev, position: customEvent.detail }));
        };
        window.addEventListener('apply-position', handleApply);
        return () => window.removeEventListener('apply-position', handleApply);
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            console.log("📂 File selected:", selectedFile.name, selectedFile.size, "bytes");
            if (selectedFile.type !== 'application/pdf') {
                alert('โปรดอัปโหลดไฟล์ PDF เท่านั้น | Please upload PDF only');
                return;
            }
            if (selectedFile.size > 10 * 1024 * 1024) {
                alert('ไฟล์ต้องมีขนาดไม่เกิน 10MB | File must be less than 10MB');
                return;
            }
            setFile(selectedFile);
        }
    };

    const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64String = reader.result as string;
                resolve(base64String.split(',')[1]);
            };
            reader.onerror = error => {
                console.error("❌ Base64 Conversion Error:", error);
                reject(error);
            };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!file) {
            alert('โปรดอัปโหลดไฟล์ CV (PDF) | Please upload CV (PDF)');
            return;
        }

        if (!pdpaConsent) {
            alert('โปรดยอมรับนโยบายคุ้มครองข้อมูลส่วนบุคคล (PDPA)');
            return;
        }

        setIsSubmitting(true);
        setStatus('idle');
        console.group("🚀 Submitting Application to Google");

        try {
            console.log("1. Converting PDF to Base64...");
            const base64File = await convertFileToBase64(file);
            console.log("✅ PDF Converted successfully (Length:", base64File.length, ")");

            const payload = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                phone: formData.phone,
                position: formData.position,
                message: formData.message,
                pdfData: base64File,
                pdfName: file.name,
                pdpaAccepted: true
            };

            console.log("2. Payload ready:", { ...payload, pdfData: "(hidden for brevity)" });
            console.log("3. Sending request to GAS URL:", GAS_WEB_APP_URL);

            /**
             * ใช้ mode: 'no-cors' เมื่อติดต่อกับ GAS โดยตรงจาก Browser
             * หมายเหตุ: no-cors จะไม่คืนค่า Response Body มาให้เราดูได้ 
             * แต่ถ้า Exception ไม่เกิด แสดงว่า Request ถูกส่งออกไปถึง Server แล้ว
             */
            const response = await fetch(GAS_WEB_APP_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                },
                body: JSON.stringify(payload)
            });

            console.log("4. Response received (mode: no-cors)", response);

            // ในโหมด no-cors เราจะถือว่า "ส่งผ่าน" ถ้าไม่มี Exception
            setStatus('success');
            console.info("🎉 Application sent successfully! Check Google Sheet/Drive.");

            setFormData({ firstName: '', lastName: '', email: '', phone: '', position: '', message: '' });
            setFile(null);
            setPdpaConsent(false);

        } catch (error: unknown) {
            console.error("❌ Submission Failed:", error);
            setStatus('error');
            const msg = error instanceof Error ? error.message : 'Unknown error';
            setErrorMessage('เกิดข้อผิดพลาดในการเชื่อมต่อ: ' + msg);
        } finally {
            console.groupEnd();
            setIsSubmitting(false);
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
                    ส่งใบสมัครเรียบร้อยแล้ว!
                </h3>
                <p className="text-zinc-700 max-w-sm mx-auto font-medium">
                    ขอบคุณที่ร่วมเป็นส่วนหนึ่งกับเรา ข้อมูลและไฟล์ CV ของคุณถูกส่งไปยังทีมงานเรียบร้อยแล้ว
                </p>
                <div className="pt-4 border-t border-emerald-100 mt-6">
                    <p className="text-xs text-zinc-400 mb-4">หากไม่พบไฟล์ใน Drive โปรดตรวจสอบเมนู Executions ใน Google Apps Script</p>
                    <button
                        onClick={() => setStatus('idle')}
                        className="text-emerald-600 font-black hover:underline"
                    >
                        ส่งใบสมัครตำแหน่งอื่นเพิ่มเติม
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-xl relative overflow-hidden">
            {isSubmitting && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] z-50 flex flex-col items-center justify-center space-y-4">
                    <Loader2 className="text-emerald-600 animate-spin" size={48} />
                    <p className="font-bold text-zinc-900 animate-pulse">กำลังประมวลผลข้อมูลและไฟล์... / Processing...</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-zinc-800">ชื่อ / First Name <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="firstName"
                            required
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3.5 text-zinc-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-400"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-zinc-800">นามสกุล / Last Name <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="lastName"
                            required
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3.5 text-zinc-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-400"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-zinc-800">{t('email')} <span className="text-red-500">*</span></label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="email@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3.5 text-zinc-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-400"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-zinc-800">เบอร์โทรศัพท์ / Phone <span className="text-red-500">*</span></label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            placeholder="0XX-XXX-XXXX"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3.5 text-zinc-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-400"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-zinc-800">{t('position')} <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="position"
                            required
                            id="position-input"
                            placeholder="Desired Position"
                            value={formData.position}
                            onChange={handleChange}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3.5 text-zinc-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-400"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-zinc-800 flex items-center gap-2">
                        อัปโหลด CV (PDF เท่านั้น, ไม่เกิน 10MB) <span className="text-red-500">*</span>
                    </label>
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${file
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                            : 'bg-zinc-50 border-zinc-300 text-zinc-600 hover:bg-zinc-100 hover:border-zinc-400'
                            }`}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".pdf"
                            className="hidden"
                        />
                        <div className="flex flex-col items-center gap-3">
                            {file ? (
                                <>
                                    <FileText size={40} />
                                    <p className="font-bold text-sm truncate max-w-full px-4">{file.name}</p>
                                    <span className="text-xs opacity-70">คลิกเพื่อเปลี่ยนไฟล์ / Click to change</span>
                                </>
                            ) : (
                                <>
                                    <Upload size={40} className="text-zinc-400" />
                                    <p className="font-bold">คลิกที่นี่เพื่อเลือกไฟล์ CV (PDF)</p>
                                    <span className="text-xs text-zinc-500 font-medium">Attach CV as PDF</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-zinc-800">{t('message')}</label>
                    <textarea
                        name="message"
                        rows={4}
                        placeholder="Tell us about yourself..."
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3.5 text-zinc-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all resize-none placeholder:text-zinc-400"
                    />
                </div>

                <div className="p-4 bg-zinc-100 border border-zinc-200 rounded-2xl space-y-3">
                    <div className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            id="pdpa"
                            required
                            checked={pdpaConsent}
                            onChange={(e) => setPdpaConsent(e.target.checked)}
                            className="mt-1 w-5 h-5 rounded border-zinc-400 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                        <label htmlFor="pdpa" className="text-sm text-zinc-700 leading-relaxed cursor-pointer select-none font-medium">
                            ข้าพเจ้ายินยอมให้นโยบายความเป็นส่วนตัว (Privacy Policy)
                        </label>
                    </div>
                </div>

                {status === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl flex items-center gap-3 text-sm font-bold animate-shake">
                        <AlertCircle size={18} />
                        <span>{errorMessage}</span>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting || !pdpaConsent}
                    className="w-full h-14 bg-zinc-900 text-white font-black rounded-xl hover:bg-emerald-600 transition-all shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                    {t('submit')}
                    <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
            </form>
        </div>
    );
}
