import React, { useState, useEffect, useRef } from 'react';
import { useConfig } from '../context/ConfigContext';
import { BookingFormData } from '../types';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Wrench,
  Flame,
  Droplets,
  Shield,
  Upload,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  FileText,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Trash2,
  Check,
  Edit3,
  Loader2,
  Home,
  Building,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingSystemProps {
  isModalMode?: boolean;
  onClose?: () => void;
}

export const BookingSystem: React.FC<BookingSystemProps> = ({ isModalMode = false, onClose }) => {
  const { config, selectedServiceForBooking, showToast } = useConfig();
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');

  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [formData, setFormData] = useState<BookingFormData>({
    serviceType: selectedServiceForBooking || 'plumbing',
    urgency: 'routine',
    propertyType: 'residential',
    fullName: '',
    phone: '',
    email: '',
    address: '',
    issueDescription: '',
    preferredDate: tomorrowStr,
    preferredTimeWindow: 'morning',
    contactPreference: 'phone',
    photoUrls: [],
    additionalNotes: '',
  });

  const [isFlexibleDate, setIsFlexibleDate] = useState<boolean>(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedServiceForBooking) {
      setFormData(prev => ({ ...prev, serviceType: selectedServiceForBooking }));
    }
  }, [selectedServiceForBooking]);

  const serviceOptions = [
    {
      id: 'plumbing',
      label: 'Plumbing Repair & Diagnostics',
      icon: <Wrench className="w-5 h-5 text-[#2A9FE4]" />,
      desc: 'Pipe leaks, taps, valve replacements, drains, and fixture issues',
      badge: 'Most Popular'
    },
    {
      id: 'heating',
      label: 'Heating System Maintenance',
      icon: <Flame className="w-5 h-5 text-[#2A9FE4]" />,
      desc: 'Hydronic heating, boilers, radiator checks, heating balancing',
      badge: 'Seasonal Care'
    },
    {
      id: 'water_heaters',
      label: 'Water Heater Service',
      icon: <Droplets className="w-5 h-5 text-[#2A9FE4]" />,
      desc: 'Tank flush, heating elements, relief valves, and replacements',
      badge: 'Hot Water Care'
    },
    {
      id: 'maintenance',
      label: 'Preventative Inspection',
      icon: <Shield className="w-5 h-5 text-[#2A9FE4]" />,
      desc: 'Comprehensive mechanical checkup, shut-off tests, plumbing audit',
      badge: 'Peace of Mind'
    },
    {
      id: 'urgent_repair',
      label: 'Urgent Issue / Active Leak',
      icon: <AlertCircle className="w-5 h-5 text-amber-500" />,
      desc: 'Active water leak, sudden loss of heating, or water heater failure',
      badge: 'High Priority'
    },
    {
      id: 'other',
      label: 'Custom Plumbing / Consultation',
      icon: <FileText className="w-5 h-5 text-[#2A9FE4]" />,
      desc: 'Remodels, piping upgrades, equipment sizing, or other projects',
      badge: 'Consultation'
    },
  ];

  const stepsList = [
    { number: 1, title: 'Service' },
    { number: 2, title: 'Details' },
    { number: 3, title: 'Schedule' },
    { number: 4, title: 'Contact' },
    { number: 5, title: 'Review' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        if (loadEvt.target?.result) {
          setUploadedPhotos(prev => [...prev, loadEvt.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
    showToast('Photo attached to request');
  };

  const removePhoto = (index: number) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.serviceType) {
        newErrors.serviceType = 'Please select a service to continue.';
      }
    } else if (currentStep === 2) {
      if (!formData.issueDescription.trim()) {
        newErrors.issueDescription = 'Please describe the problem or work needed.';
      } else if (formData.issueDescription.trim().length < 5) {
        newErrors.issueDescription = 'Please provide a little more detail (at least 5 characters).';
      }
    } else if (currentStep === 3) {
      if (!formData.preferredDate) {
        newErrors.preferredDate = 'Please select a preferred date.';
      }
    } else if (currentStep === 4) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Please enter your full name.';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Please enter your phone number so we can confirm.';
      } else if (formData.phone.replace(/[^0-9]/g, '').length < 7) {
        newErrors.phone = 'Please enter a valid phone number.';
      }
      if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address (e.g. name@example.com).';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const scrollToFormTop = () => {
    if (isModalMode) {
      const scrollParent = formTopRef.current?.closest('.overflow-y-auto') as HTMLElement | null;
      if (scrollParent) {
        scrollParent.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }
    if (formTopRef.current) {
      formTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
      scrollToFormTop();
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep(prev => Math.max(1, prev - 1));
    scrollToFormTop();
  };

  const jumpToStep = (targetStep: number) => {
    setErrors({});
    setStep(targetStep);
    scrollToFormTop();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) {
      setStep(4);
      return;
    }

    setIsSubmitting(true);

    // Simulate clean dispatch with unique Request ID
    setTimeout(() => {
      const generatedRef = `TM-${Math.floor(1000 + Math.random() * 9000)}`;
      setBookingRef(generatedRef);
      setIsSubmitting(false);
      setSubmitted(true);
      showToast(`Service request #${generatedRef} submitted!`);
    }, 900);
  };

  const getWhatsAppBookingText = () => {
    const selectedServiceObj = serviceOptions.find(s => s.id === formData.serviceType);
    const serviceName = selectedServiceObj ? selectedServiceObj.label : formData.serviceType;
    return encodeURIComponent(
      `*New Service Request — Tait Maintained*\n` +
      `Request ID: ${bookingRef || 'TM-Pending'}\n` +
      `Customer: ${formData.fullName}\n` +
      `Phone: ${formData.phone}\n` +
      `Email: ${formData.email || 'Not provided'}\n` +
      `Service: ${serviceName}\n` +
      `Property: ${formData.propertyType.toUpperCase()}\n` +
      `Urgency: ${formData.urgency.toUpperCase()}\n` +
      `Address: ${formData.address || 'Calgary Area'}\n` +
      `Preferred Date: ${formData.preferredDate} (${formData.preferredTimeWindow})\n` +
      `Flexible Date: ${isFlexibleDate ? 'Yes' : 'No'}\n` +
      `Details: ${formData.issueDescription}`
    );
  };

  const resetForm = () => {
    setSubmitted(false);
    setStep(1);
    setUploadedPhotos([]);
    setErrors({});
    setFormData({
      serviceType: 'plumbing',
      urgency: 'routine',
      propertyType: 'residential',
      fullName: '',
      phone: '',
      email: '',
      address: '',
      issueDescription: '',
      preferredDate: tomorrowStr,
      preferredTimeWindow: 'morning',
      contactPreference: 'phone',
      photoUrls: [],
      additionalNotes: '',
    });
    if (onClose) onClose();
  };

  const selectedServiceData = serviceOptions.find(s => s.id === formData.serviceType) || serviceOptions[0];

  return (
    <div ref={formTopRef} className={`w-full text-[#0d2030] bg-[#FDFDFE] ${isModalMode ? 'p-0' : 'py-16 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6'}`}>
      
      {/* Section Header (Only in page mode) */}
      {!isModalMode && (
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCE6ED] border border-[#6FC5ED]/40 text-[#0d2030] text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-[#2A9FE4]" />
            <span>Direct Service Booking</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#0d2030] tracking-tight">
            Book a Service with Tait
          </h2>
          <p className="text-sm sm:text-base text-[#0d2030]/75">
            Choose your service, provide job details, pick your schedule, and get upfront peace of mind.
          </p>
        </div>
      )}

      {/* Main Container Card */}
      <div className={`bg-[#FDFDFE] border border-[#DCE6ED] rounded-3xl shadow-xl overflow-hidden flex flex-col ${isModalMode ? 'border-0 shadow-none rounded-none bg-[#FDFDFE]' : ''}`}>
        
        {!submitted && (
          /* Progress Indicator Bar */
          <div className={`${isModalMode ? 'p-2.5 sm:p-4' : 'p-3.5 sm:p-6'} border-b border-[#DCE6ED] bg-[#DCE6ED]/20`}>
            <div className="flex items-center justify-between max-w-3xl mx-auto">
              {stepsList.map((item, idx) => {
                const isCompleted = step > item.number;
                const isCurrent = step === item.number;

                return (
                  <React.Fragment key={item.number}>
                    <button
                      type="button"
                      onClick={() => isCompleted && jumpToStep(item.number)}
                      disabled={!isCompleted && !isCurrent}
                      className={`flex flex-col items-center gap-1 transition-all cursor-pointer disabled:cursor-default ${
                        isCurrent
                          ? 'text-[#2A9FE4] font-bold'
                          : isCompleted
                          ? 'text-[#0d2030] font-semibold hover:text-[#2A9FE4]'
                          : 'text-[#0d2030]/35 font-medium'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-[11px] sm:text-xs font-heading font-bold transition-all ${
                          isCurrent
                            ? 'bg-[#2A9FE4] text-[#FDFDFE] ring-2 sm:ring-4 ring-[#6FC5ED]/30 scale-105'
                            : isCompleted
                            ? 'bg-[#DCE6ED] text-[#2A9FE4]'
                            : 'bg-[#DCE6ED]/50 text-[#0d2030]/40'
                        }`}
                      >
                        {isCompleted ? <Check className="w-3.5 h-3.5" /> : `0${item.number}`}
                      </div>
                      <span className="text-[10px] sm:text-xs tracking-wider uppercase hidden sm:block">
                        {item.title}
                      </span>
                    </button>

                    {idx < stepsList.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 mx-1 sm:mx-2 rounded transition-colors ${
                          step > item.number ? 'bg-[#2A9FE4]' : 'bg-[#DCE6ED]'
                        }`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}

        {/* Step Contents */}
        <div className={`${isModalMode ? 'p-3.5 sm:p-5 md:p-6' : 'p-4 sm:p-8 md:p-10'} flex-1 bg-[#FDFDFE]`}>
          {submitted ? (
            <motion.div
              key="step-success"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="py-6 text-center space-y-6 max-w-xl mx-auto"
            >
                <div className="w-16 h-16 rounded-full bg-[#DCE6ED] text-[#2A9FE4] flex items-center justify-center mx-auto ring-8 ring-[#6FC5ED]/20">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono-code font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#DCE6ED] text-[#2A9FE4] inline-block">
                    REQUEST ID: #{bookingRef}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-heading text-[#0d2030]">
                    Request Received, {formData.fullName.split(' ')[0]}!
                  </h3>
                  <p className="text-sm text-[#0d2030]/75 leading-relaxed">
                    Thank you for reaching out to Tait Maintained. We have recorded your service request and will contact you at <strong>{formData.phone}</strong> to confirm your scheduled slot.
                  </p>
                </div>

                {/* Summary Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#DCE6ED]/40 border border-[#DCE6ED] text-left text-xs sm:text-sm space-y-2.5">
                  <div className="flex justify-between border-b border-[#DCE6ED] pb-2">
                    <span className="text-[#0d2030]/65">Service:</span>
                    <span className="font-bold text-[#0d2030]">{selectedServiceData.label}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#DCE6ED] pb-2">
                    <span className="text-[#0d2030]/65">Scheduled Date:</span>
                    <span className="font-bold text-[#0d2030]">{formData.preferredDate} ({formData.preferredTimeWindow})</span>
                  </div>
                  <div className="flex justify-between border-b border-[#DCE6ED] pb-2">
                    <span className="text-[#0d2030]/65">Contact Method:</span>
                    <span className="font-bold text-[#0d2030] uppercase">{formData.contactPreference}</span>
                  </div>
                  {formData.address && (
                    <div className="flex justify-between">
                      <span className="text-[#0d2030]/65">Address / Region:</span>
                      <span className="font-bold text-[#0d2030]">{formData.address}</span>
                    </div>
                  )}
                </div>

                {/* Direct 1-Click WhatsApp confirmation */}
                <div className="p-4 rounded-2xl bg-[#DCE6ED]/60 border border-[#6FC5ED]/40 text-left space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0d2030]">
                    <Sparkles className="w-4 h-4 text-[#2A9FE4]" />
                    <span>Instant Direct Confirmation (Optional)</span>
                  </div>
                  <p className="text-xs text-[#0d2030]/75">
                    Want an immediate reply on WhatsApp? Send your generated request summary directly to our technician.
                  </p>
                  <a
                    href={`${config.whatsappLink}&text=${getWhatsAppBookingText()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-[#FDFDFE] bg-[#2A9FE4] hover:bg-[#6FC5ED] shadow-md transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send on WhatsApp (+1 403-613-0819)</span>
                  </a>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-heading font-bold text-xs bg-[#0d2030] text-[#FDFDFE] hover:bg-[#2A9FE4] transition-colors cursor-pointer"
                  >
                    Done & Return
                  </button>
                  <a
                    href="tel:+14036130819"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-heading font-semibold text-xs text-[#0d2030] bg-[#DCE6ED] hover:bg-[#DCE6ED]/80 transition-colors inline-flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#2A9FE4]" />
                    <span>Call (403) 613-0819</span>
                  </a>
                </div>
              </motion.div>
            ) : (
              <div>
                
                {/* STEP 1: SERVICE SELECTION */}
                {step === 1 && (
                  <div
                    key="step-1"
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#0d2030]">
                        Step 1: What service do you need?
                      </h3>
                      <p className="text-xs sm:text-sm text-[#0d2030]/75">
                        Choose the primary category for your home or property.
                      </p>
                    </div>

                    {errors.serviceType && (
                      <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errors.serviceType}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                      {serviceOptions.map((opt) => {
                        const isSelected = formData.serviceType === opt.id;
                        return (
                          <div
                            key={opt.id}
                            onClick={() => {
                              setFormData(prev => ({ ...prev, serviceType: opt.id }));
                              setErrors({});
                            }}
                            className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 relative select-none ${
                              isSelected
                                ? 'border-[#2A9FE4] bg-[#DCE6ED]/50 ring-2 ring-[#2A9FE4] shadow-md'
                                : 'border-[#DCE6ED] hover:border-[#6FC5ED] hover:bg-[#DCE6ED]/25 bg-[#FDFDFE]'
                            }`}
                          >
                            <div className={`p-2.5 rounded-xl shrink-0 ${isSelected ? 'bg-[#2A9FE4] text-[#FDFDFE]' : 'bg-[#DCE6ED] text-[#0d2030]'}`}>
                              {opt.icon}
                            </div>
                            <div className="space-y-1 flex-1 pr-6">
                              <div className="flex items-center gap-2">
                                <h4 className="font-heading font-bold text-sm sm:text-base text-[#0d2030]">
                                  {opt.label}
                                </h4>
                              </div>
                              <p className="text-xs text-[#0d2030]/70 leading-relaxed">
                                {opt.desc}
                              </p>
                            </div>
                            <div className="absolute top-4 right-4">
                              <div
                                className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                                  isSelected
                                    ? 'bg-[#2A9FE4] border-[#2A9FE4] text-[#FDFDFE]'
                                    : 'border-[#DCE6ED]'
                                }`}
                              >
                                {isSelected && <Check className="w-3.5 h-3.5" />}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 2: PROJECT DETAILS */}
                {step === 2 && (
                  <div
                    key="step-2"
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#0d2030]">
                        Step 2: Tell us about the job
                      </h3>
                      <p className="text-xs sm:text-sm text-[#0d2030]/75">
                        Selected Service: <strong className="text-[#2A9FE4]">{selectedServiceData.label}</strong>
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Property Type */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#0d2030] uppercase tracking-wider block">
                          Property Type
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: 'residential', label: 'House / Condo', icon: <Home className="w-3.5 h-3.5" /> },
                            { id: 'rental', label: 'Rental Unit', icon: <Building className="w-3.5 h-3.5" /> },
                            { id: 'commercial', label: 'Commercial', icon: <Building className="w-3.5 h-3.5" /> },
                          ].map((p) => (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, propertyType: p.id as any })}
                              className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                                formData.propertyType === p.id
                                  ? 'border-[#2A9FE4] bg-[#DCE6ED]/60 text-[#0d2030] ring-1 ring-[#2A9FE4]'
                                  : 'border-[#DCE6ED] text-[#0d2030]/70 hover:bg-[#DCE6ED]/30'
                              }`}
                            >
                              {p.icon}
                              <span>{p.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Urgency */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#0d2030] uppercase tracking-wider block">
                          Urgency Level
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: 'routine', label: 'Standard (This Week)' },
                            { id: 'urgent', label: 'Urgent (24–48h)' },
                            { id: 'flexible', label: 'Flexible Timing' },
                          ].map((u) => (
                            <button
                              key={u.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, urgency: u.id as any })}
                              className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                                formData.urgency === u.id
                                  ? 'border-[#2A9FE4] bg-[#DCE6ED]/60 text-[#0d2030] ring-1 ring-[#2A9FE4]'
                                  : 'border-[#DCE6ED] text-[#0d2030]/70 hover:bg-[#DCE6ED]/30'
                              }`}
                            >
                              <span>{u.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Problem Description */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-[#0d2030] uppercase tracking-wider block">
                          Problem / Job Description <span className="text-[#2A9FE4]">*</span>
                        </label>
                        <span className="text-[11px] text-[#0d2030]/50 font-mono-code">
                          {formData.issueDescription.length} characters
                        </span>
                      </div>
                      <textarea
                        rows={3}
                        required
                        value={formData.issueDescription}
                        onChange={(e) => {
                          setFormData({ ...formData, issueDescription: e.target.value });
                          if (errors.issueDescription) setErrors({});
                        }}
                        placeholder="e.g., Water heater pilot light went out, slight drip under the laundry tub valve, needing a checkup before winter..."
                        className={`w-full px-4 py-3 rounded-2xl border text-xs sm:text-sm bg-[#DCE6ED]/20 focus:bg-[#FDFDFE] focus:outline-none transition-all resize-none ${
                          errors.issueDescription
                            ? 'border-rose-400 ring-2 ring-rose-100'
                            : 'border-[#DCE6ED] focus:ring-2 focus:ring-[#2A9FE4]'
                        }`}
                      />
                      {errors.issueDescription && (
                        <p className="text-xs text-rose-600 font-medium flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.issueDescription}</span>
                        </p>
                      )}
                    </div>

                    {/* Photo Upload Attachment */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#0d2030] uppercase tracking-wider block">
                        Attach Photos (Optional)
                      </label>
                      <div className="p-4 rounded-2xl border-2 border-dashed border-[#DCE6ED] bg-[#DCE6ED]/25 text-center hover:bg-[#DCE6ED]/40 transition-colors">
                        <input
                          type="file"
                          id="booking-photos"
                          multiple
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <label htmlFor="booking-photos" className="cursor-pointer flex flex-col items-center gap-1.5">
                          <Upload className="w-5 h-5 text-[#2A9FE4]" />
                          <span className="text-xs font-bold text-[#0d2030]">Upload photos of the fixture, heater or problem</span>
                          <span className="text-[10px] text-[#0d2030]/60">Supports JPG, PNG (Max 5 photos)</span>
                        </label>
                      </div>

                      {uploadedPhotos.length > 0 && (
                        <div className="flex flex-wrap gap-2.5 pt-1">
                          {uploadedPhotos.map((p, i) => (
                            <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border border-[#DCE6ED] shadow-xs">
                              <img src={p} alt="uploaded preview" className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => removePhoto(i)}
                                className="absolute top-1 right-1 p-1 rounded-full bg-rose-600 text-white hover:bg-rose-700 cursor-pointer shadow-xs"
                                aria-label="Remove photo"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* STEP 3: PREFERRED DATE & TIME */}
                {step === 3 && (
                  <div
                    key="step-3"
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#0d2030]">
                        Step 3: Preferred Date & Time Window
                      </h3>
                      <p className="text-xs sm:text-sm text-[#0d2030]/75">
                        Select when you would like a technician to arrive.
                      </p>
                    </div>

                    {/* Date Picker Section */}
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-[#0d2030] uppercase tracking-wider block">
                        Select Preferred Date <span className="text-[#2A9FE4]">*</span>
                      </label>

                      {/* Quick Date Shortcuts */}
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { label: 'Tomorrow', daysAhead: 1 },
                          { label: 'In 2 Days', daysAhead: 2 },
                          { label: 'In 3 Days', daysAhead: 3 },
                        ].map((d) => {
                          const dateObj = new Date(Date.now() + d.daysAhead * 86400000);
                          const formatted = dateObj.toISOString().split('T')[0];
                          const isSelected = formData.preferredDate === formatted;

                          return (
                            <button
                              key={d.label}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, preferredDate: formatted });
                                if (errors.preferredDate) setErrors({});
                              }}
                              className={`p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
                                isSelected
                                  ? 'border-[#2A9FE4] bg-[#2A9FE4] text-[#FDFDFE] shadow-sm'
                                  : 'border-[#DCE6ED] bg-[#DCE6ED]/30 text-[#0d2030] hover:bg-[#DCE6ED]/60'
                              }`}
                            >
                              <span className="font-bold">{d.label}</span>
                              <span className="text-[10px] opacity-80">{dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* HTML5 Date Input */}
                      <div>
                        <input
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          value={formData.preferredDate}
                          onChange={(e) => {
                            setFormData({ ...formData, preferredDate: e.target.value });
                            if (errors.preferredDate) setErrors({});
                          }}
                          className={`w-full px-4 py-3 rounded-2xl border text-xs sm:text-sm bg-[#DCE6ED]/20 focus:bg-[#FDFDFE] focus:outline-none transition-all ${
                            errors.preferredDate
                              ? 'border-rose-400 ring-2 ring-rose-100'
                              : 'border-[#DCE6ED] focus:ring-2 focus:ring-[#2A9FE4]'
                          }`}
                        />
                        {errors.preferredDate && (
                          <p className="text-xs text-rose-600 font-medium mt-1">
                            {errors.preferredDate}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Time Window Selectors */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#0d2030] uppercase tracking-wider block">
                        Preferred Time Window
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {[
                          { id: 'morning', label: 'Morning Window', time: '8:00 AM – 12:00 PM', icon: <Clock className="w-4 h-4" /> },
                          { id: 'afternoon', label: 'Afternoon Window', time: '12:00 PM – 4:00 PM', icon: <Clock className="w-4 h-4" /> },
                          { id: 'evening', label: 'Late Afternoon', time: '4:00 PM – 6:00 PM', icon: <Clock className="w-4 h-4" /> },
                          { id: 'anytime', label: 'First Available Slot', time: 'Flexible / Any Window', icon: <CheckCircle2 className="w-4 h-4" /> },
                        ].map((w) => {
                          const isSelected = formData.preferredTimeWindow === w.id;
                          return (
                            <div
                              key={w.id}
                              onClick={() => setFormData({ ...formData, preferredTimeWindow: w.id as any })}
                              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                                isSelected
                                  ? 'border-[#2A9FE4] bg-[#DCE6ED]/60 text-[#0d2030] ring-1 ring-[#2A9FE4]'
                                  : 'border-[#DCE6ED] bg-[#FDFDFE] hover:bg-[#DCE6ED]/30 text-[#0d2030]/80'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <div className={`p-2 rounded-xl ${isSelected ? 'bg-[#2A9FE4] text-[#FDFDFE]' : 'bg-[#DCE6ED] text-[#0d2030]'}`}>
                                  {w.icon}
                                </div>
                                <div>
                                  <p className="text-xs font-bold text-[#0d2030]">{w.label}</p>
                                  <p className="text-[11px] text-[#0d2030]/65">{w.time}</p>
                                </div>
                              </div>
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'bg-[#2A9FE4] border-[#2A9FE4] text-white' : 'border-[#DCE6ED]'}`}>
                                {isSelected && <Check className="w-3 h-3" />}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Flexibility Checkbox */}
                    <label className="flex items-center gap-2.5 p-3 rounded-xl bg-[#DCE6ED]/40 border border-[#DCE6ED] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isFlexibleDate}
                        onChange={(e) => setIsFlexibleDate(e.target.checked)}
                        className="w-4 h-4 accent-[#2A9FE4] rounded cursor-pointer"
                      />
                      <span className="text-xs text-[#0d2030]/80 font-medium">
                        I am flexible on date/time if an earlier cancellation opens up.
                      </span>
                    </label>
                  </div>
                )}

                {/* STEP 4: CUSTOMER CONTACT DETAILS */}
                {step === 4 && (
                  <div
                    key="step-4"
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#0d2030]">
                        Step 4: Your Contact Information
                      </h3>
                      <p className="text-xs sm:text-sm text-[#0d2030]/75">
                        We only use this information to confirm your appointment and send dispatch updates.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-[#0d2030] uppercase tracking-wider block">
                          Full Name <span className="text-[#2A9FE4]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => {
                            setFormData({ ...formData, fullName: e.target.value });
                            if (errors.fullName) setErrors({});
                          }}
                          placeholder="e.g. Sarah Jenkins"
                          className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm bg-[#DCE6ED]/20 focus:bg-[#FDFDFE] focus:outline-none transition-all ${
                            errors.fullName
                              ? 'border-rose-400 ring-2 ring-rose-100'
                              : 'border-[#DCE6ED] focus:ring-2 focus:ring-[#2A9FE4]'
                          }`}
                        />
                        {errors.fullName && (
                          <p className="text-[11px] text-rose-600 font-medium">
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      {/* Phone Number */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-[#0d2030] uppercase tracking-wider block">
                          Phone Number <span className="text-[#2A9FE4]">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (errors.phone) setErrors({});
                          }}
                          placeholder="e.g. (403) 555-0192"
                          className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm bg-[#DCE6ED]/20 focus:bg-[#FDFDFE] focus:outline-none transition-all ${
                            errors.phone
                              ? 'border-rose-400 ring-2 ring-rose-100'
                              : 'border-[#DCE6ED] focus:ring-2 focus:ring-[#2A9FE4]'
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-[11px] text-rose-600 font-medium">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-[#0d2030] uppercase tracking-wider block">
                          Email Address (Optional)
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors({});
                          }}
                          placeholder="name@example.com"
                          className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm bg-[#DCE6ED]/20 focus:bg-[#FDFDFE] focus:outline-none transition-all ${
                            errors.email
                              ? 'border-rose-400 ring-2 ring-rose-100'
                              : 'border-[#DCE6ED] focus:ring-2 focus:ring-[#2A9FE4]'
                          }`}
                        />
                        {errors.email && (
                          <p className="text-[11px] text-rose-600 font-medium">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Service Address */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-[#0d2030] uppercase tracking-wider block">
                          Property Address / Community
                        </label>
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="e.g. 124 Mountain View Way / NW Calgary"
                          className="w-full px-4 py-2.5 rounded-xl border border-[#DCE6ED] text-xs sm:text-sm bg-[#DCE6ED]/20 focus:bg-[#FDFDFE] focus:outline-none focus:ring-2 focus:ring-[#2A9FE4] transition-all"
                        />
                      </div>
                    </div>

                    {/* Preferred Contact Method */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#0d2030] uppercase tracking-wider block">
                        Preferred Confirmation Method
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { id: 'phone', label: 'Phone Call', icon: <Phone className="w-3.5 h-3.5" /> },
                          { id: 'whatsapp', label: 'WhatsApp', icon: <MessageCircle className="w-3.5 h-3.5" /> },
                          { id: 'text', label: 'Text / SMS', icon: <MessageCircle className="w-3.5 h-3.5" /> },
                          { id: 'email', label: 'Email', icon: <Mail className="w-3.5 h-3.5" /> },
                        ].map((m) => (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, contactPreference: m.id as any })}
                            className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                              formData.contactPreference === m.id
                                ? 'border-[#2A9FE4] bg-[#2A9FE4] text-[#FDFDFE] shadow-xs'
                                : 'border-[#DCE6ED] bg-[#FDFDFE] text-[#0d2030]/80 hover:bg-[#DCE6ED]/40'
                            }`}
                          >
                            {m.icon}
                            <span>{m.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 5: REVIEW & CONFIRM */}
                {step === 5 && (
                  <div
                    key="step-5"
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#0d2030]">
                        Step 5: Review & Confirm Request
                      </h3>
                      <p className="text-xs sm:text-sm text-[#0d2030]/75">
                        Please review the details of your request before submitting.
                      </p>
                    </div>

                    <div className="space-y-3">
                      
                      {/* Summary Block 1: Service & Issue */}
                      <div className="p-4 rounded-2xl bg-[#DCE6ED]/30 border border-[#DCE6ED] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#2A9FE4]">
                            Service & Details
                          </span>
                          <button
                            type="button"
                            onClick={() => jumpToStep(1)}
                            className="inline-flex items-center gap-1 text-xs text-[#2A9FE4] hover:underline font-semibold cursor-pointer"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                        </div>
                        <p className="font-heading font-bold text-sm sm:text-base text-[#0d2030]">
                          {selectedServiceData.label}
                        </p>
                        <p className="text-xs text-[#0d2030]/80 leading-relaxed bg-[#FDFDFE] p-3 rounded-xl border border-[#DCE6ED]">
                          {formData.issueDescription}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-[#0d2030]/70 font-mono-code">
                          <span className="px-2 py-0.5 rounded-md bg-[#DCE6ED]">Property: {formData.propertyType}</span>
                          <span className="px-2 py-0.5 rounded-md bg-[#DCE6ED]">Urgency: {formData.urgency}</span>
                          {uploadedPhotos.length > 0 && (
                            <span className="px-2 py-0.5 rounded-md bg-[#2A9FE4]/20 text-[#2A9FE4] font-bold">
                              {uploadedPhotos.length} photo(s) attached
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Summary Block 2: Scheduling */}
                      <div className="p-4 rounded-2xl bg-[#DCE6ED]/30 border border-[#DCE6ED] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#2A9FE4]">
                            Schedule Preference
                          </span>
                          <button
                            type="button"
                            onClick={() => jumpToStep(3)}
                            className="inline-flex items-center gap-1 text-xs text-[#2A9FE4] hover:underline font-semibold cursor-pointer"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                        </div>
                        <div className="flex items-center gap-3 text-xs sm:text-sm">
                          <Calendar className="w-4 h-4 text-[#2A9FE4] shrink-0" />
                          <span className="font-bold text-[#0d2030]">
                            {formData.preferredDate} ({formData.preferredTimeWindow})
                          </span>
                          {isFlexibleDate && (
                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#DCE6ED] text-[#0d2030]">
                              Flexible Timing
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Summary Block 3: Contact */}
                      <div className="p-4 rounded-2xl bg-[#DCE6ED]/30 border border-[#DCE6ED] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#2A9FE4]">
                            Customer & Location
                          </span>
                          <button
                            type="button"
                            onClick={() => jumpToStep(4)}
                            className="inline-flex items-center gap-1 text-xs text-[#2A9FE4] hover:underline font-semibold cursor-pointer"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-[#0d2030]/60 block">Name:</span>
                            <span className="font-bold text-[#0d2030]">{formData.fullName}</span>
                          </div>
                          <div>
                            <span className="text-[#0d2030]/60 block">Phone:</span>
                            <span className="font-bold text-[#0d2030]">{formData.phone}</span>
                          </div>
                          {formData.email && (
                            <div>
                              <span className="text-[#0d2030]/60 block">Email:</span>
                              <span className="font-bold text-[#0d2030]">{formData.email}</span>
                            </div>
                          )}
                          <div>
                            <span className="text-[#0d2030]/60 block">Address / Region:</span>
                            <span className="font-bold text-[#0d2030]">{formData.address || 'Calgary Area'}</span>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Trust Note */}
                    <div className="p-3.5 rounded-xl bg-[#DCE6ED]/50 border border-[#6FC5ED]/40 text-xs text-[#0d2030]/80 flex items-center gap-2.5">
                      <Shield className="w-4 h-4 text-[#2A9FE4] shrink-0" />
                      <span>
                        No upfront charge. We review your request, confirm the arrival window, and provide clear upfront pricing before beginning any work.
                      </span>
                    </div>

                  </div>
                )}

                {/* Bottom Navigation & Submit Actions */}
                <div className={`mt-6 border-t border-[#DCE6ED] flex items-center justify-between gap-3 ${
                  isModalMode
                    ? 'sticky bottom-0 bg-[#FDFDFE]/98 backdrop-blur-md py-3 px-3 sm:px-6 -mx-3.5 sm:-mx-6 -mb-3.5 sm:-mb-6 border-t border-[#DCE6ED] shadow-[0_-8px_20px_rgba(0,0,0,0.06)] z-20 pb-[max(0.75rem,env(safe-area-inset-bottom))]'
                    : 'pt-6'
                }`}>
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold text-[#0d2030] bg-[#DCE6ED]/60 hover:bg-[#DCE6ED] active:scale-95 transition-all cursor-pointer min-h-[44px]"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 5 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-heading font-bold text-xs sm:text-sm text-[#FDFDFE] bg-[#2A9FE4] hover:bg-[#6FC5ED] active:scale-95 shadow-md transition-all cursor-pointer min-h-[44px]"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                      className="inline-flex items-center gap-2 px-5 sm:px-9 py-3 sm:py-3.5 rounded-xl font-heading font-bold text-xs sm:text-sm text-[#FDFDFE] bg-[#2A9FE4] hover:bg-[#6FC5ED] active:scale-95 shadow-lg transition-all cursor-pointer disabled:opacity-75 min-h-[44px]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>CONFIRM & SUBMIT</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

              </div>
            )}
        </div>

      </div>
    </div>
  );
};
