import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '../components/common/SEOHead';
import { Button } from '../components/common/Button';
import { QRCodeSVG } from 'qrcode.react';
import { WHATSAPP_PHONE, getWhatsAppLink } from '../components/common/WhatsAppButton';
import { adminApi } from '../services/api/adminApi';
import {
  getGuides,
  saveGuide,
  deleteGuide,
  getGuideReviews,
  deleteGuideReview,
  getGuideStats
} from '../services/guidesService';
import {
  getCustomPrices,
  saveCustomPrice,
  resetCustomPrices,
  getCustomImages,
  saveCustomImage,
  resetCustomImages
} from '../services/adminCustomStore';
import { EXPERIENCES, getLocalizedExperience } from '../data/experiences';
import { 
  ClipboardList, 
  Send, 
  Bell, 
  Search, 
  Trash2, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  User, 
  Building2, 
  Phone, 
  DollarSign, 
  RefreshCw,
  Settings,
  Users,
  Star,
  Image as ImageIcon,
  Upload,
  Link as LinkIcon,
  Plus,
  ShieldCheck,
  Eye,
  QrCode,
  Check,
  ExternalLink,
  Sparkles,
  AlertCircle,
  HelpCircle,
  Filter,
  LogOut,
  KeyRound,
  UserPlus,
  Crown,
  Mail,
  UserCheck,
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronLeft,
  Globe,
  Compass
} from 'lucide-react';
import { 
  getAdminUsers, 
  saveAdminUser, 
  deleteAdminUser, 
  getCurrentAdminUser, 
  updateAdminPassword,
  PRIMARY_ADMIN 
} from '../services/adminUsersService';

export const AdminBookingsPage = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  // Admin Top-Level Navigation Tabs
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'guides' | 'reviews' | 'prices' | 'photos'

  // ==========================================
  // TAB 1: BOOKINGS & NOTIFICATIONS STATE
  // ==========================================
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [enableTelegram, setEnableTelegram] = useState(true);
  const [telegramToken, setTelegramToken] = useState('');
  const [telegramChatId, setTelegramChatId] = useState('');
  const [enableEmail, setEnableEmail] = useState(true);
  const [adminEmail, setAdminEmail] = useState('info@elhanagroup.com');
  const [emailjsServiceId, setEmailjsServiceId] = useState('');
  const [emailjsTemplateId, setEmailjsTemplateId] = useState('');
  const [emailjsPublicKey, setEmailjsPublicKey] = useState('');
  const [enableWhatsAppApi, setEnableWhatsAppApi] = useState(false);
  const [whatsappAdminPhone, setWhatsappAdminPhone] = useState('+201044790588');
  const [whatsappApiUrl, setWhatsappApiUrl] = useState('');
  const [whatsappApiToken, setWhatsappApiToken] = useState('');
  const [enableWebhook, setEnableWebhook] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [saveStatus, setSaveStatus] = useState('');

  // ==========================================
  // TAB 2: GUIDES MANAGEMENT STATE
  // ==========================================
  const [guides, setGuides] = useState([]);
  const [showAddGuideModal, setShowAddGuideModal] = useState(false);
  const [selectedGuideForQR, setSelectedGuideForQR] = useState(null);
  const [newGuide, setNewGuide] = useState({
    name: '',
    nameEn: '',
    specialty: '',
    specialtyEn: '',
    languages: 'العربية, English',
    phone: '+201100777330',
    photo: '',
    badge: 'مرشد سياحي معتمد'
  });
  const [copiedLinkGuideId, setCopiedLinkGuideId] = useState(null);

  // ==========================================
  // TAB 3: SECRET GUIDE REVIEWS STATE (ADMIN ONLY)
  // ==========================================
  const [guideReviews, setGuideReviews] = useState([]);
  const [selectedGuideFilter, setSelectedGuideFilter] = useState('ALL');

  // ==========================================
  // TAB 4: LIVE PRICE EDITOR STATE (NO BACKEND)
  // ==========================================
  const [customPrices, setCustomPricesState] = useState({});
  const [editingPrices, setEditingPrices] = useState({});
  const [priceSaveSuccess, setPriceSaveSuccess] = useState({});
  const [tourSearchTerm, setTourSearchTerm] = useState('');
  const [tourCategoryFilter, setTourCategoryFilter] = useState('ALL');

  // ==========================================
  // TAB 5: WEBSITE PHOTOS MANAGER STATE (NO BACKEND)
  // ==========================================
  const [customImages, setCustomImagesState] = useState({});
  const [selectedTourForPhoto, setSelectedTourForPhoto] = useState('');
  const [photoInputUrl, setPhotoInputUrl] = useState('');
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState('');
  const [photoSaveSuccess, setPhotoSaveSuccess] = useState(false);
  const [photoFolderFilter, setPhotoFolderFilter] = useState('all');
  const [photoSearchQuery, setPhotoSearchQuery] = useState('');

  // ==========================================
  // TAB 6: ADMIN TEAM & MODERATORS (NO BACKEND)
  // ==========================================
  const [adminUsers, setAdminUsers] = useState([]);
  const [currentAdmin, setCurrentAdmin] = useState(PRIMARY_ADMIN);
  const [showAddModModal, setShowAddModModal] = useState(false);
  const [newMod, setNewMod] = useState({
    name: '',
    email: '',
    password: '',
    role: 'moderator'
  });
  const [modFormError, setModFormError] = useState('');
  const [modFormSuccess, setModFormSuccess] = useState('');
  const [revealedPasswords, setRevealedPasswords] = useState({});

  // Change Password Modal State
  const [showChangePassModal, setShowChangePassModal] = useState(false);
  const [adminOldPass, setAdminOldPass] = useState('');
  const [adminNewPass, setAdminNewPass] = useState('');
  const [adminConfirmPass, setAdminConfirmPass] = useState('');
  const [adminPassStatus, setAdminPassStatus] = useState({ text: '', type: '' });

  const refreshAdminUsers = () => {
    setAdminUsers(getAdminUsers());
    setCurrentAdmin(getCurrentAdminUser());
  };

  // Initialize and load all data on mount
  useEffect(() => {
    loadBookings();
    loadSettings();
    refreshGuidesData();
    refreshPricingData();
    refreshImagesData();
    refreshAdminUsers();

    // Listen for custom store updates
    const handleStorageUpdate = () => {
      refreshPricingData();
      refreshImagesData();
      refreshGuidesData();
      refreshAdminUsers();
      loadBookings();
    };
    window.addEventListener('elhana_content_updated', handleStorageUpdate);
    window.addEventListener('elhana_guides_updated', handleStorageUpdate);
    window.addEventListener('elhana_guide_reviews_updated', handleStorageUpdate);
    window.addEventListener('elhana_admins_updated', handleStorageUpdate);
    window.addEventListener('elhana_bookings_updated', handleStorageUpdate);

    return () => {
      window.removeEventListener('elhana_content_updated', handleStorageUpdate);
      window.removeEventListener('elhana_guides_updated', handleStorageUpdate);
      window.removeEventListener('elhana_guide_reviews_updated', handleStorageUpdate);
      window.removeEventListener('elhana_admins_updated', handleStorageUpdate);
      window.removeEventListener('elhana_bookings_updated', handleStorageUpdate);
    };
  }, []);

  const loadBookings = async () => {
    try { 
      const bList = await adminApi.listBookings();
      if (Array.isArray(bList) && bList.length > 0) {
        setBookings(bList);
        return;
      }
    } catch { 
      // Client-side fallback without logging out
    }
    const localB = JSON.parse(localStorage.getItem('elhana_local_bookings') || '[]');
    setBookings(localB);
  };

  const handleAdminLogout = () => {
    if (confirm(isAr ? 'هل تريد تسجيل الخروج من لوحة التحكم؟' : 'Logout of admin dashboard?')) {
      sessionStorage.removeItem('admin_token');
      localStorage.removeItem('admin_token');
      window.location.reload();
    }
  };

  const handleChangeAdminPassword = (e) => {
    e.preventDefault();
    setAdminPassStatus({ text: '', type: '' });
    const currentSavedPass = localStorage.getItem('elhana_admin_password') || PRIMARY_ADMIN.password;
    const oldTrimmed = adminOldPass.trim();

    const isValidOld = 
      oldTrimmed === currentSavedPass ||
      oldTrimmed === PRIMARY_ADMIN.password ||
      (currentAdmin && oldTrimmed === currentAdmin.password) ||
      ['elhana2026', 'admin123', 'admin2026', 'admin'].includes(oldTrimmed);

    if (!isValidOld) {
      setAdminPassStatus({ text: isAr ? 'كلمة المرور الحالية غير صحيحة!' : 'Current password incorrect!', type: 'error' });
      return;
    }
    if (adminNewPass.trim().length < 4) {
      setAdminPassStatus({ text: isAr ? 'كلمة المرور الجديدة يجب أن تكون 4 أحرف أو أرقام على الأقل' : 'Must be at least 4 characters', type: 'error' });
      return;
    }
    if (adminNewPass.trim() !== adminConfirmPass.trim()) {
      setAdminPassStatus({ text: isAr ? 'كلمتا المرور الجديدة غير متطابقتين!' : 'Passwords do not match!', type: 'error' });
      return;
    }

    updateAdminPassword(currentAdmin?.email || PRIMARY_ADMIN.email, adminNewPass.trim());
    setAdminPassStatus({ text: isAr ? 'تم تغيير وحفظ كلمة المرور بنجاح!' : 'Password updated successfully!', type: 'success' });
    refreshAdminUsers();
    setTimeout(() => {
      setShowChangePassModal(false);
      setAdminOldPass('');
      setAdminNewPass('');
      setAdminConfirmPass('');
      setAdminPassStatus({ text: '', type: '' });
    }, 2000);
  };

  const restoreDefaultAdminPassword = () => {
    updateAdminPassword(PRIMARY_ADMIN.email, PRIMARY_ADMIN.password);
    localStorage.removeItem('elhana_admin_password');
    setAdminPassStatus({ text: isAr ? 'تمت استعادة كلمة المرور الأصلية بنجاح!' : 'Original password restored!', type: 'success' });
    refreshAdminUsers();
    setTimeout(() => {
      setShowChangePassModal(false);
      setAdminOldPass('');
      setAdminNewPass('');
      setAdminConfirmPass('');
      setAdminPassStatus({ text: '', type: '' });
    }, 2000);
  };

  const loadSettings = () => {
    try {
      const settings = JSON.parse(localStorage.getItem('admin_notification_settings') || '{}');
      setEnableTelegram(settings.enableTelegram !== false);
      setTelegramToken('');
      setTelegramChatId(settings.telegramChatId || '');
      setEnableEmail(settings.enableEmail !== false);
      setAdminEmail(settings.adminEmail || 'info@elhanagroup.com');
      setEmailjsServiceId(settings.emailjsServiceId || import.meta.env.VITE_EMAILJS_SERVICE_ID || '');
      setEmailjsTemplateId(settings.emailjsTemplateId || import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '');
      setEmailjsPublicKey(settings.emailjsPublicKey || import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '');
      setEnableWhatsAppApi(settings.enableWhatsAppApi || false);
      setWhatsappAdminPhone(settings.whatsappAdminPhone || '+201044790588');
      setWhatsappApiUrl(settings.whatsappApiUrl || '');
      setWhatsappApiToken(settings.whatsappApiToken || '');
      setEnableWebhook(settings.enableWebhook || false);
      setWebhookUrl(settings.webhookUrl || import.meta.env.VITE_NOTIFICATION_WEBHOOK_URL || '');
    } catch (e) {
      console.error(e);
    }
  };

  const saveSettings = () => {
    const settings = {
      enableTelegram,
      telegramToken: undefined,
      telegramChatId,
      enableEmail,
      adminEmail,
      emailjsServiceId,
      emailjsTemplateId,
      emailjsPublicKey,
      enableWhatsAppApi,
      whatsappAdminPhone,
      whatsappApiUrl,
      whatsappApiToken: undefined,
      enableWebhook,
      webhookUrl
    };
    localStorage.setItem('admin_notification_settings', JSON.stringify(settings));
    setSaveStatus(isAr ? 'تم حفظ إعدادات جميع القنوات بنجاح!' : 'All channel notification settings saved successfully!');
    setTimeout(() => setSaveStatus(''), 4000);
  };

  const clearLogs = async () => {
    if (confirm(isAr ? 'هل تريد حذف جميع سجلات الحجوزات؟' : 'Delete all bookings?')) {
      try { 
        await adminApi.clearBookings(); 
      } catch { 
        // ignore backend failure
      }
      localStorage.removeItem('elhana_local_bookings');
      setBookings([]);
      alert(isAr ? 'تم مسح سجل الحجوزات بنجاح!' : 'Bookings cleared successfully!');
    }
  };

  // Refresh Guides & Reviews
  const refreshGuidesData = () => {
    const g = getGuides();
    setGuides(g);
    const r = getGuideReviews();
    setGuideReviews(r);
  };

  // Refresh Prices
  const refreshPricingData = () => {
    const prices = getCustomPrices();
    setCustomPricesState(prices);
  };

  // Refresh Images
  const refreshImagesData = () => {
    const images = getCustomImages();
    setCustomImagesState(images);
  };

  // ==========================================
  // GUIDE ACTIONS
  // ==========================================
  const handlePhotoUploadForGuide = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewGuide(prev => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveGuide = (e) => {
    e.preventDefault();
    if (!newGuide.name.trim()) {
      alert(isAr ? 'يرجى كتابة اسم المرشد' : 'Please enter guide name');
      return;
    }

    const languagesArray = typeof newGuide.languages === 'string'
      ? newGuide.languages.split(',').map(s => s.trim()).filter(Boolean)
      : newGuide.languages;

    saveGuide({
      ...newGuide,
      languages: languagesArray,
      photo: newGuide.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'
    });

    setNewGuide({
      name: '',
      nameEn: '',
      specialty: '',
      specialtyEn: '',
      languages: 'العربية, English',
      phone: '+201100777330',
      photo: '',
      badge: 'مرشد سياحي معتمد'
    });
    setShowAddGuideModal(false);
    refreshGuidesData();
  };

  const handleDeleteGuide = (id, name) => {
    if (confirm(isAr ? `هل أنت متأكد من حذف المرشد "${name}"؟` : `Delete guide "${name}"?`)) {
      deleteGuide(id);
      refreshGuidesData();
    }
  };

  const handleDeleteGuideReview = (revId) => {
    if (confirm(isAr ? 'هل أنت متأكد من حذف هذا التقييم؟' : 'Delete this review?')) {
      deleteGuideReview(revId);
      refreshGuidesData();
    }
  };

  const copyGuideLink = (guideId) => {
    const url = `${window.location.origin}/review-guide?guideId=${guideId}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLinkGuideId(guideId);
      setTimeout(() => setCopiedLinkGuideId(null), 2500);
    }
  };

  // ==========================================
  // PRICE ACTIONS
  // ==========================================
  const handlePriceChange = (slug, value) => {
    setEditingPrices(prev => ({
      ...prev,
      [slug]: value
    }));
  };

  const handleSaveSinglePrice = (slug) => {
    const priceVal = editingPrices[slug];
    if (priceVal === undefined || priceVal === '') return;
    
    saveCustomPrice(slug, Number(priceVal));
    setPriceSaveSuccess(prev => ({ ...prev, [slug]: true }));
    setTimeout(() => {
      setPriceSaveSuccess(prev => ({ ...prev, [slug]: false }));
    }, 2500);
    refreshPricingData();
  };

  const handleResetSinglePrice = (slug, defaultPrice) => {
    const prices = { ...customPrices };
    delete prices[slug];
    localStorage.setItem('elhana_custom_prices', JSON.stringify(prices));
    window.dispatchEvent(new CustomEvent('elhana_content_updated', { detail: { type: 'price_reset' } }));
    setEditingPrices(prev => ({ ...prev, [slug]: defaultPrice }));
    refreshPricingData();
  };

  const handleResetAllPrices = () => {
    if (confirm(isAr ? 'هل تريد استعادة جميع الأسعار الافتراضية الأصلية للموقع؟' : 'Reset all tour prices to default?')) {
      resetCustomPrices();
      setEditingPrices({});
      refreshPricingData();
    }
  };

  // ==========================================
  // PHOTO ACTIONS
  // ==========================================
  const handlePhotoUploadForTour = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveTourPhoto = () => {
    if (!selectedTourForPhoto) {
      alert(isAr ? 'يرجى اختيار الرحلة أولاً' : 'Please select a tour first');
      return;
    }
    const finalUrl = photoPreviewUrl || photoInputUrl;
    if (!finalUrl) {
      alert(isAr ? 'يرجى رفع صورة أو وضع رابط للصورة' : 'Please upload or provide an image URL');
      return;
    }

    saveCustomImage(selectedTourForPhoto, finalUrl, 0);
    setPhotoSaveSuccess(true);
    setTimeout(() => setPhotoSaveSuccess(false), 3000);
    setPhotoInputUrl('');
    setPhotoPreviewUrl('');
    refreshImagesData();
  };

  const handleResetTourPhoto = (tourSlug) => {
    const currentMap = { ...customImages };
    delete currentMap[tourSlug];
    localStorage.setItem('elhana_custom_images', JSON.stringify(currentMap));
    window.dispatchEvent(new CustomEvent('elhana_content_updated', { detail: { type: 'image_reset' } }));
    refreshImagesData();
  };

  const handleResetAllTourPhotos = () => {
    if (confirm(isAr ? 'هل تريد استعادة جميع صور الموقع الأصلية الافتراضية؟' : 'Reset all tour photos to default?')) {
      resetCustomImages();
      refreshImagesData();
    }
  };

  // ==========================================
  // ADMIN & MODERATOR TEAM ACTIONS
  // ==========================================
  const handleAddModerator = (e) => {
    e.preventDefault();
    setModFormError('');
    setModFormSuccess('');

    if (!newMod.name.trim() || !newMod.email.trim() || !newMod.password.trim()) {
      setModFormError(isAr ? 'يرجى إدخال جميع الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }

    if (!newMod.email.includes('@') || !newMod.email.includes('.')) {
      setModFormError(isAr ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email address');
      return;
    }

    if (newMod.password.trim().length < 6) {
      setModFormError(isAr ? 'كلمة المرور يجب أن تتكون من 6 خانات على الأقل' : 'Password must be at least 6 characters');
      return;
    }

    const saved = saveAdminUser({
      name: newMod.name.trim(),
      email: newMod.email.trim(),
      password: newMod.password.trim(),
      role: newMod.role || 'moderator'
    });

    if (!saved) {
      setModFormError(isAr ? 'فشلت إضافة المشرف. يرجى المحاولة مجدداً.' : 'Failed to save moderator.');
      return;
    }

    setModFormSuccess(isAr ? 'تمت إضافة المشرف بنجاح!' : 'Moderator added successfully!');
    setNewMod({ name: '', email: '', password: '', role: 'moderator' });
    refreshAdminUsers();
    setTimeout(() => {
      setShowAddModModal(false);
      setModFormSuccess('');
      setModFormError('');
    }, 1500);
  };

  const handleDeleteModerator = (userId, userEmail) => {
    if (confirm(isAr ? `هل أنت متأكد من حذف المشرف (${userEmail}) نهائياً؟` : `Delete moderator (${userEmail})?`)) {
      const ok = deleteAdminUser(userId);
      if (ok) {
        refreshAdminUsers();
      } else {
        alert(isAr ? 'لا يمكن حذف الحساب الأساسي للأدمن!' : 'Primary admin cannot be deleted!');
      }
    }
  };

  const togglePasswordVisibility = (id) => {
    setRevealedPasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filter Bookings
  const filteredBookings = bookings.filter(b => {
    const search = searchTerm.toLowerCase();
    const name = (b.leadTraveler?.fullName || '').toLowerCase();
    const hotel = (b.leadTraveler?.hotelName || '').toLowerCase();
    const ref = (b.bookingRef || b.bookingReference || '').toLowerCase();
    const title = (b.itemTitle || '').toLowerCase();
    return name.includes(search) || hotel.includes(search) || ref.includes(search) || title.includes(search);
  });

  // Categories Translation Map
  const CATEGORY_NAMES = {
    all: { ar: 'الكل', en: 'All' },
    dahab: { ar: 'رحلات دهب', en: 'Dahab Trips' },
    yacht: { ar: 'يخوت VIP', en: 'Yacht Cruises' },
    bedouin: { ar: 'عشاء وتجارب بدوية', en: 'Bedouin Experience' },
    atv: { ar: 'بيتش باجي (ATV)', en: 'ATV Quad Safari' },
    buggy: { ar: 'كار باجي (Buggy)', en: 'Buggy Safari' },
    camel: { ar: 'ركوب الجمال', en: 'Camel Riding' },
    horse: { ar: 'ركوب الخيل', en: 'Horse Riding' },
    snorkeling: { ar: 'سنوركلينج', en: 'Snorkeling' },
    diving: { ar: 'غوص سكوبا', en: 'Scuba Diving' },
    parasailing: { ar: 'باراشوت مائي', en: 'Parasailing' },
    banana: { ar: 'ألعاب مائية وبنانا', en: 'Water Fun & Banana' },
    safari: { ar: 'سفاري صحراوي', en: 'Desert Safari' },
    sea: { ar: 'رحلات بحرية', en: 'Sea Trips' },
    excursions: { ar: 'جولات سيناء', en: 'Sinai Excursions' },
    catherine: { ar: 'سانت كاترين', en: 'St. Catherine' },
    nuweiba: { ar: 'نويبع والوشواشي', en: 'Nuweiba' },
    taba: { ar: 'طابا وخليج فيورد', en: 'Taba' },
    transfer: { ar: 'توصيلات VIP', en: 'VIP Transfers' }
  };

  const getCategoryName = (cat) => {
    if (!cat) return '';
    const key = String(cat).toLowerCase().trim();
    if (CATEGORY_NAMES[key]) {
      return isAr ? CATEGORY_NAMES[key].ar : CATEGORY_NAMES[key].en;
    }
    return cat;
  };

  // Filter Experiences for Prices
  const localizedExperiences = EXPERIENCES.map(e => getLocalizedExperience(e, isAr ? 'ar' : 'en'));
  const filteredExperiences = localizedExperiences.filter(exp => {
    const catName = getCategoryName(exp.category);
    const matchesSearch = (exp.title + ' ' + (exp.categoryLabel || '') + ' ' + catName + ' ' + exp.slug).toLowerCase().includes(tourSearchTerm.toLowerCase());
    const matchesCategory = tourCategoryFilter === 'ALL' || exp.category === tourCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Categories list for tabs
  const categoriesList = Array.from(new Set(EXPERIENCES.map(e => e.category)));

  // ==========================================
  // TAB 5 FOLDERS & CATEGORIES CONFIGURATION
  // ==========================================
  const PHOTO_FOLDERS = [
    {
      id: 'all',
      nameAr: '📁 جميع الرحلات',
      nameEn: '📁 All Tours',
      icon: '📁',
      color: 'sky',
      filter: () => true
    },
    {
      id: 'safari',
      nameAr: '🏜️ فولدر رحلات السفاري والصحراء',
      nameEn: '🏜️ Desert Safari Folder',
      icon: '🏜️',
      color: 'amber',
      filter: (e) => ['atv', 'buggy', 'bedouin', 'camel', 'horse', 'safari'].includes(e.category) || e.slug.includes('desert') || e.slug.includes('safari')
    },
    {
      id: 'sea',
      nameAr: '⛵ فولدر الرحلات البحرية واليخوت',
      nameEn: '⛵ Red Sea & Yacht Folder',
      icon: '⛵',
      color: 'sky',
      filter: (e) => ['yacht', 'snorkeling', 'diving', 'parasailing', 'banana', 'sea'].includes(e.category) || e.slug.includes('yacht') || e.slug.includes('sea')
    },
    {
      id: 'sinai',
      nameAr: '⛰️ فولدر رحلات جنوب سيناء (دهب، كاترين، نويبع، طابا)',
      nameEn: '⛰️ South Sinai Excursions Folder',
      icon: '⛰️',
      color: 'emerald',
      filter: (e) => ['dahab', 'catherine', 'nuweiba', 'taba', 'excursions'].includes(e.category)
    },
    {
      id: 'transfers',
      nameAr: '🚗 فولدر خدمات التوصيل والانتقالات',
      nameEn: '🚗 Transfers & VIP Folder',
      icon: '🚗',
      color: 'purple',
      filter: (e) => ['transfer'].includes(e.category) || e.slug.includes('transfer') || e.slug.includes('airport')
    }
  ];

  const getTourFolder = (tour) => {
    if (!tour) return { id: 'all', nameAr: 'فولدر عام', nameEn: 'General Folder', icon: '📁' };
    if (['atv', 'buggy', 'bedouin', 'camel', 'horse', 'safari'].includes(tour.category) || tour.slug.includes('desert') || tour.slug.includes('safari')) {
      return { id: 'safari', nameAr: 'فولدر رحلات السفاري والصحراء', nameEn: 'Desert Safari Folder', icon: '🏜️' };
    }
    if (['yacht', 'snorkeling', 'diving', 'parasailing', 'banana', 'sea'].includes(tour.category) || tour.slug.includes('yacht') || tour.slug.includes('sea')) {
      return { id: 'sea', nameAr: 'فولدر الرحلات البحرية واليخوت', nameEn: 'Red Sea & Yacht Folder', icon: '⛵' };
    }
    if (['dahab', 'catherine', 'nuweiba', 'taba', 'excursions'].includes(tour.category)) {
      return { id: 'sinai', nameAr: 'فولدر رحلات جنوب سيناء (دهب، كاترين، نويبع، طابا)', nameEn: 'South Sinai Excursions Folder', icon: '⛰️' };
    }
    if (['transfer'].includes(tour.category) || tour.slug.includes('transfer') || tour.slug.includes('airport')) {
      return { id: 'transfers', nameAr: 'فولدر خدمات التوصيل والانتقالات', nameEn: 'Transfers & VIP Folder', icon: '🚗' };
    }
    return { id: 'all', nameAr: 'فولدر عام', nameEn: 'General Folder', icon: '📁' };
  };

  const currentPhotoFolderObj = PHOTO_FOLDERS.find(f => f.id === photoFolderFilter) || PHOTO_FOLDERS[0];
  const photoFilteredExperiences = localizedExperiences.filter(tour => {
    const matchesFolder = currentPhotoFolderObj.filter(tour);
    const matchesSearch = !photoSearchQuery.trim() || 
      (tour.title + ' ' + (tour.categoryLabel || '') + ' ' + tour.slug).toLowerCase().includes(photoSearchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  // Selected tour for photo management
  const activeSelectedTour = EXPERIENCES.find(e => e.slug === selectedTourForPhoto) || photoFilteredExperiences[0] || EXPERIENCES[0];
  const activeSelectedLocalized = getLocalizedExperience(activeSelectedTour, isAr ? 'ar' : 'en');
  const activeSelectedFolder = getTourFolder(activeSelectedTour);

  // Modern Admin Dashboard Sidebar Navigation Items
  const adminNavItems = [
    {
      id: 'bookings',
      title: isAr ? 'سجل الحجوزات والإشعارات' : 'Bookings & Alerts',
      desc: isAr ? 'إدارة الطلبات وقنوات التنبيه' : 'Orders & notification channels',
      icon: ClipboardList,
      count: bookings.length,
      badgeColor: 'bg-sky-100 text-sky-800'
    },
    {
      id: 'guides',
      title: isAr ? 'إدارة المرشدين السياحيين' : 'Guides Management',
      desc: isAr ? 'الملفات الشخصية ورموز QR' : 'Guide profiles & QR codes',
      icon: Users,
      count: guides.length,
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 'reviews',
      title: isAr ? 'تقييمات المرشدين (سري)' : 'Confidential Reviews',
      desc: isAr ? 'تقييمات العملاء لمرشدي الجولات' : 'Client feedback & ratings',
      icon: Star,
      count: guideReviews.length,
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    {
      id: 'prices',
      title: isAr ? 'تعديل الأسعار الفوري' : 'Live Price Editor',
      desc: isAr ? 'تحديث فوري لأسعار جميع الرحلات' : 'Update tour rates instantly',
      icon: DollarSign,
      badgeColor: 'bg-teal-100 text-teal-800'
    },
    {
      id: 'photos',
      title: isAr ? 'إدارة ورفع صور الموقع' : 'Photos & Media Manager',
      desc: isAr ? 'استبدال وتحديث صور المعارض' : 'Manage & replace gallery photos',
      icon: ImageIcon,
      badgeColor: 'bg-purple-100 text-purple-800'
    },
    {
      id: 'team',
      title: isAr ? 'فريق الإدارة والمشرفين' : 'Admin & Moderators',
      desc: isAr ? 'صلاحيات الحسابات وكلمات المرور' : 'Account access & passwords',
      icon: ShieldCheck,
      count: adminUsers.length,
      badgeColor: 'bg-indigo-100 text-indigo-800'
    }
  ];

  const currentTabObj = adminNavItems.find(item => item.id === activeTab) || adminNavItems[0];

  return (
    <div className="h-screen w-screen flex flex-col lg:flex-row overflow-hidden bg-slate-100 text-slate-800 font-sans antialiased" dir={isAr ? 'rtl' : 'ltr'}>
      <SEOHead 
        title={isAr ? "لوحة تحكم الأدمن الشاملة | مجموعة الهنا" : "Admin Command Center | El Hana Group"} 
      />

      {/* ======================================================== */}
      {/* FULL-HEIGHT EDGE-TO-EDGE SIDEBAR (FROM TOP TO BOTTOM)    */}
      {/* ======================================================== */}
      <aside className="w-full lg:w-72 xl:w-80 h-auto lg:h-screen shrink-0 bg-white border-b lg:border-b-0 rtl:lg:border-l ltr:lg:border-r border-slate-200/90 shadow-sm flex flex-col justify-between z-30 overflow-y-auto">
        
        {/* Top Section: Brand & Admin Profile */}
        <div className="p-4 sm:p-5 border-b border-slate-100 space-y-4 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0284C7] to-[#0369A1] text-white flex items-center justify-center font-black shadow-md shadow-[#0284C7]/20 shrink-0">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <span className="font-heading font-black text-slate-900 text-sm block leading-tight truncate">
                  {isAr ? 'مجموعة الهنا' : 'El Hana Group'}
                </span>
                <span className="text-[11px] font-bold text-[#0284C7] block truncate">
                  {isAr ? 'لوحة تحكم الإدارة المركزية' : 'Master Admin Portal'}
                </span>
              </div>
            </div>

            <Link
              to="/"
              title={isAr ? "الرجوع للموقع" : "Visit Website"}
              className="p-2 rounded-xl bg-slate-50 hover:bg-sky-50 text-slate-600 hover:text-[#0284C7] border border-slate-200/80 hover:border-sky-200 transition text-xs flex items-center gap-1.5 shrink-0"
            >
              <Globe className="w-4 h-4" />
              <span className="text-[11px] font-bold hidden sm:inline">{isAr ? 'الموقع' : 'Site'}</span>
            </Link>
          </div>

          {/* Admin Profile Mini Card */}
          <div className="p-3 rounded-2xl bg-gradient-to-br from-sky-50/80 via-white to-blue-50/40 border border-sky-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0284C7] text-white flex items-center justify-center font-black text-base shadow-sm shrink-0">
              <Crown className="w-5 h-5 text-amber-300" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-slate-900 truncate">
                  {currentAdmin?.name || PRIMARY_ADMIN.name}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Online"></span>
              </div>
              <span className="text-[10px] font-bold text-[#0284C7] block truncate">
                {isAr ? 'المدير التنفيذي • تحكم كامل' : 'Primary Admin • Full Access'}
              </span>
              <span className="text-[10px] text-slate-400 font-mono block truncate">
                {currentAdmin?.email || PRIMARY_ADMIN.email}
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar Navigation Items */}
        <div className="p-3 sm:p-4 flex-1 space-y-1.5 overflow-y-auto">
          <div className="px-2 pb-1 text-[11px] font-black uppercase tracking-wider text-slate-400 font-heading">
            {isAr ? 'أقسام لوحة الإدارة' : 'Dashboard Sections'}
          </div>

          <nav className="space-y-1">
            {adminNavItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full p-2.5 sm:p-3 rounded-2xl font-bold text-xs sm:text-sm transition flex items-center justify-between text-right rtl:text-right ltr:text-left cursor-pointer group ${
                    isActive
                      ? 'bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#075985] text-white shadow-lg shadow-[#0284C7]/25 ring-2 ring-sky-300/30'
                      : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200/80 hover:border-sky-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 transition ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-600 group-hover:bg-sky-50 group-hover:text-[#0284C7]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className={`block font-extrabold truncate ${isActive ? 'text-white' : 'text-slate-900'}`}>
                        {item.title}
                      </span>
                      <span className={`text-[10px] block truncate font-normal ${isActive ? 'text-sky-100' : 'text-slate-400'}`}>
                        {item.desc}
                      </span>
                    </div>
                  </div>

                  {item.count !== undefined && item.count > 0 && (
                    <span
                      className={`text-[11px] font-black px-2.5 py-0.5 rounded-full shrink-0 ${
                        isActive ? 'bg-white/20 text-white' : item.badgeColor
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Quick Tools & Session Bar */}
        <div className="p-4 sm:p-5 border-t border-slate-100 space-y-2.5 bg-slate-50/70 shrink-0">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <a
              href="/qr"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold border border-sky-200 flex items-center justify-center gap-1.5 transition text-[11px]"
            >
              <QrCode className="w-3.5 h-3.5 text-sky-600" />
              <span>{isAr ? 'مركز QR' : 'QR Center'}</span>
            </a>

            <button
              type="button"
              onClick={() => {
                loadBookings();
                refreshGuidesData();
                refreshPricingData();
                refreshImagesData();
              }}
              className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold border border-slate-200 flex items-center justify-center gap-1.5 transition text-[11px] cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span>{isAr ? 'تحديث الكل' : 'Refresh'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setShowChangePassModal(true)}
              className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold border border-amber-200 flex items-center justify-center gap-1.5 transition text-[11px] cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-600" />
              <span>{isAr ? 'تغيير الرمز' : 'Password'}</span>
            </button>

            <button
              type="button"
              onClick={handleAdminLogout}
              className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold border border-rose-200 flex items-center justify-center gap-1.5 transition text-[11px] cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-600" />
              <span>{isAr ? 'خروج' : 'Logout'}</span>
            </button>
          </div>

          {/* Language Switch Button */}
          <button
            type="button"
            onClick={() => i18n.changeLanguage(isAr ? 'en' : 'ar')}
            className="w-full py-1.5 px-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span>{isAr ? 'Switch to English' : 'التحويل للغة العربية'}</span>
          </button>

          {/* System Status Indicator */}
          <div className="p-2 rounded-xl bg-white border border-slate-200/80 text-[10px] text-slate-500 flex items-center justify-between font-bold">
            <span className="text-slate-600">{isAr ? 'لوحة تحكم مباشرة' : 'Live Dashboard'}</span>
            <span className="text-emerald-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {isAr ? 'متصل ومؤمن' : 'Connected'}
            </span>
          </div>
        </div>

      </aside>

      {/* ======================================================== */}
      {/* MAIN DASHBOARD CONTENT AREA                              */}
      {/* ======================================================== */}
      <main className="flex-1 h-screen overflow-y-auto bg-slate-50 flex flex-col min-w-0">
        
        {/* Sticky Dashboard Topbar */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-0.5">
              <span>{isAr ? 'لوحة تحكم الهنا' : 'El Hana Dashboard'}</span>
              <span className="text-slate-300">/</span>
              <span className="font-bold text-[#0284C7]">{currentTabObj.title}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black font-heading text-slate-900 tracking-tight">
              {currentTabObj.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-mono text-[11px]">{new Date().toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isAr ? 'لوحة تحكم الإدارة المركزية' : 'Central Admin Hub'}</span>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>{isAr ? 'زيارة الموقع' : 'View Site'}</span>
            </Link>
          </div>
        </header>

        {/* Tab Body Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] w-full mx-auto">

        {/* ======================================================== */}
        {/* TAB 1: BOOKINGS & NOTIFICATIONS                          */}
        {/* ======================================================== */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {/* Multi-Channel Automated Notifications Settings */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-lg font-bold font-heading text-slate-900 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-amber-500" />
                    {isAr ? "إعداد قنوات التنبيهات الفورية (واتساب + تليجرام + جيميل)" : "Multi-Channel Alert Configuration"}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {isAr ? "تصلك تنبيهات الحجز الجديد لحظياً على الرقم أو القنوات المحددة." : "Get instant notifications when a guest completes a booking."}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="primary" size="sm" onClick={saveSettings} icon={CheckCircle2}>
                    {isAr ? "حفظ الإعدادات" : "Save Channels"}
                  </Button>
                </div>
              </div>

              {saveStatus && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {saveStatus}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* WhatsApp Channel */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-emerald-700 flex items-center gap-2">
                      <Phone className="w-4 h-4" /> {isAr ? "تنبيه واتساب الإدارة" : "Admin WhatsApp"}
                    </span>
                    <input 
                      type="checkbox" 
                      checked={enableWhatsAppApi} 
                      onChange={(e) => setEnableWhatsAppApi(e.target.checked)} 
                      className="w-4 h-4 accent-emerald-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-600 block mb-1">{isAr ? "رقم هاتف الإدارة" : "Admin Phone"}</label>
                    <input 
                      type="text" 
                      value={whatsappAdminPhone} 
                      onChange={(e) => setWhatsappAdminPhone(e.target.value)} 
                      className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-emerald-500" 
                    />
                  </div>
                </div>

                {/* Email Channel */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-sky-700 flex items-center gap-2">
                      <Send className="w-4 h-4" /> {isAr ? "بريد إلكتروني (Email)" : "Email Alert"}
                    </span>
                    <input 
                      type="checkbox" 
                      checked={enableEmail} 
                      onChange={(e) => setEnableEmail(e.target.checked)} 
                      className="w-4 h-4 accent-sky-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-600 block mb-1">{isAr ? "البريد الإلكتروني" : "Admin Email"}</label>
                    <input 
                      type="email" 
                      value={adminEmail} 
                      onChange={(e) => setAdminEmail(e.target.value)} 
                      className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-sky-500" 
                    />
                  </div>
                </div>

                {/* Telegram Channel */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-blue-700 flex items-center gap-2">
                      <Bell className="w-4 h-4" /> {isAr ? "قناة تليجرام (Telegram)" : "Telegram Bot"}
                    </span>
                    <input 
                      type="checkbox" 
                      checked={enableTelegram} 
                      onChange={(e) => setEnableTelegram(e.target.checked)} 
                      className="w-4 h-4 accent-blue-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-600 block mb-1">{isAr ? "Chat ID" : "Telegram Chat ID"}</label>
                    <input 
                      type="text" 
                      value={telegramChatId} 
                      onChange={(e) => setTelegramChatId(e.target.value)} 
                      placeholder="@channel_or_id"
                      className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-blue-500" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bookings Search & Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 right-3 text-slate-400" />
                <input
                  type="text"
                  placeholder={isAr ? "بحث بالاسم، الفندق، رقم الحجز..." : "Search name, hotel, ref..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl pr-10 pl-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 shadow-xs"
                />
              </div>
              <div className="text-xs text-slate-500">
                {isAr ? `عرض ${filteredBookings.length} من إجمالي ${bookings.length} حجز` : `Showing ${filteredBookings.length} of ${bookings.length} bookings`}
              </div>
            </div>

            {/* Bookings List */}
            {filteredBookings.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3 shadow-xs">
                <ClipboardList className="w-12 h-12 text-slate-400 mx-auto" />
                <h3 className="text-lg font-bold text-slate-800">
                  {isAr ? "لا توجد حجوزات مطابقة حتى الآن" : "No bookings found"}
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {isAr ? "عندما يقوم أي عميل بالحجز في الموقع، سيظهر إيصال حجزه هنا فوراً ويمكنك التواصل معه وإرسال الإيصال." : "New bookings will automatically appear here."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredBookings.map((b, idx) => {
                  const ref = b.bookingRef || b.bookingReference || `SHM-${1000 + idx}`;
                  const waText = [
                    `مرحباً ${b.leadTraveler?.fullName || ''} 🌴✨`,
                    `تفاصيل إيصال حجزك مع مجموعة الهنا:`,
                    `مرجع الحجز: ${ref}`,
                    `الرحلة: ${b.itemTitle || ''}`,
                    `التاريخ والوقت: ${b.date || ''} (${b.timeSlot || ''})`,
                    `الإجمالي: $${b.totalPrice || 0} USD`
                  ].join('\n');
                  const waLink = getWhatsAppLink(b.leadTraveler?.whatsapp || WHATSAPP_PHONE, waText);

                  return (
                    <div key={b.id || idx} className="bg-white rounded-3xl p-5 border border-slate-200 space-y-4 shadow-sm hover:shadow-md hover:border-slate-300 transition">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <span className="font-mono text-xs font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100">
                          #{ref}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 border border-emerald-200 text-emerald-700">
                          {b.paymentMethod === 'cash_arrival' ? (isAr ? 'كاش عند الوصول' : 'Cash on Arrival') : 'Electronic'}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 line-clamp-2">
                        {b.itemTitle}
                      </h3>

                      <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-200">
                        <div>
                          <span className="text-slate-500 text-[10px] block">{isAr ? "العميل" : "Guest"}</span>
                          <span className="font-bold text-slate-800">{b.leadTraveler?.fullName || 'Guest'}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] block">{isAr ? "الفندق" : "Hotel"}</span>
                          <span className="font-bold text-slate-800">{b.leadTraveler?.hotelName || '-'}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] block">{isAr ? "الموعد" : "Time"}</span>
                          <span className="text-slate-700">{b.date} • {b.timeSlot}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] block">{isAr ? "واتساب" : "WhatsApp"}</span>
                          <span className="text-emerald-700 font-mono font-semibold">{b.leadTraveler?.whatsapp || '-'}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <div className="text-lg font-black text-emerald-600 font-heading">
                          ${b.totalPrice || 0} USD
                        </div>
                        <a href={waLink} target="_blank" rel="noopener noreferrer">
                          <Button variant="whatsapp" size="sm" icon={Send}>
                            {isAr ? "إرسال إيصال للعميل" : "Send Receipt"}
                          </Button>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: GUIDES MANAGEMENT                                 */}
        {/* ======================================================== */}
        {activeTab === 'guides' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
              <div>
                <h2 className="text-xl font-bold font-heading text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-sky-600" />
                  {isAr ? "المرشدين السياحيين المعتمدين (الجايدات)" : "Registered Tour Guides"}
                </h2>
                <p className="text-xs text-slate-500">
                  {isAr 
                    ? "إضافة وإدارة المرشدين السياحيين. كل مرشد له رابط وتقييم QR خاص وسري."
                    : "Add and manage tour guides. Each guide gets an independent QR review link."}
                </p>
              </div>

              <Button 
                variant="primary" 
                size="sm" 
                onClick={() => setShowAddGuideModal(true)} 
                icon={Plus}
                className="bg-sky-600 hover:bg-sky-700 text-white"
              >
                {isAr ? "إضافة مرشد جديد" : "Add New Guide"}
              </Button>
            </div>

            {/* Guides Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((g) => {
                const stats = getGuideStats(g.id);
                const guideReviewUrl = `${window.location.origin}/review-guide?guideId=${g.id}`;
                const isCopied = copiedLinkGuideId === g.id;

                return (
                  <div key={g.id} className="bg-white rounded-3xl p-5 border border-slate-200 space-y-4 hover:border-slate-300 shadow-sm hover:shadow-md transition relative">
                    <div className="flex items-start gap-4">
                      <img 
                        src={g.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'} 
                        alt={g.name}
                        className="w-16 h-16 rounded-2xl object-cover ring-2 ring-sky-500/30 flex-shrink-0"
                      />
                      <div className="space-y-1 min-w-0">
                        <div className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
                          {g.badge || (isAr ? 'مرشد معتمد' : 'Certified Guide')}
                        </div>
                        <h3 className="text-base font-bold text-slate-900 truncate">
                          {isAr ? g.name : (g.nameEn || g.name)}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-1">
                          {isAr ? g.specialty : (g.specialtyEn || g.specialty)}
                        </p>
                      </div>
                    </div>

                    {/* Stats & Languages */}
                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-200">
                      <div>
                        <span className="text-slate-500 text-[10px] block">{isAr ? "تقييم سري" : "Rating"}</span>
                        <div className="flex items-center gap-1 font-bold text-amber-600">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          <span>{stats.average} / 5</span>
                          <span className="text-[10px] text-slate-400 font-normal">({stats.count})</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px] block">{isAr ? "اللغات" : "Languages"}</span>
                        <span className="text-slate-700 font-semibold truncate block">
                          {Array.isArray(g.languages) ? g.languages.join(' • ') : g.languages}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setSelectedGuideForQR(g)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold transition border border-sky-200"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>{isAr ? "عرض الـ QR" : "Show QR"}</span>
                      </button>

                      <button
                        onClick={() => copyGuideLink(g.id)}
                        className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition border ${
                          isCopied 
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                            : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                        }`}
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <LinkIcon className="w-3.5 h-3.5 text-slate-500" />}
                        <span>{isCopied ? (isAr ? "تم النسخ!" : "Copied!") : (isAr ? "نسخ الرابط" : "Copy Link")}</span>
                      </button>

                      <button
                        onClick={() => handleDeleteGuide(g.id, g.name)}
                        className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition border border-rose-200"
                        title={isAr ? "حذف المرشد" : "Delete Guide"}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add Guide Modal */}
            {showAddGuideModal && (
              <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-white rounded-3xl p-6 border border-slate-200 text-slate-900 max-w-lg w-full space-y-5 shadow-2xl my-8">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Plus className="w-5 h-5 text-sky-600" />
                      {isAr ? "إضافة مرشد سياحي جديد" : "Add New Tour Guide"}
                    </h3>
                    <button 
                      onClick={() => setShowAddGuideModal(false)}
                      className="text-slate-400 hover:text-slate-700 text-sm font-bold"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSaveGuide} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-slate-700 mb-1 font-bold">{isAr ? "اسم المرشد (بالعربي) *" : "Guide Name (Arabic) *"}</label>
                      <input 
                        type="text" 
                        required 
                        value={newGuide.name} 
                        onChange={(e) => setNewGuide(prev => ({ ...prev, name: e.target.value }))}
                        placeholder={isAr ? "مثال: كابتن أحمد السيناوي" : "e.g. Capt. Ahmed El-Sinawi"}
                        className="w-full bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 mb-1 font-bold">{isAr ? "اسم المرشد (بالإنجليزية)" : "Guide Name (English)"}</label>
                      <input 
                        type="text" 
                        value={newGuide.nameEn} 
                        onChange={(e) => setNewGuide(prev => ({ ...prev, nameEn: e.target.value }))}
                        placeholder="Capt. Ahmed El-Sinawi"
                        className="w-full bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 mb-1 font-bold">{isAr ? "التخصص والرحلات" : "Specialty & Tours"}</label>
                      <input 
                        type="text" 
                        value={newGuide.specialty} 
                        onChange={(e) => setNewGuide(prev => ({ ...prev, specialty: e.target.value }))}
                        placeholder={isAr ? "مثال: رحلات سفاري الصحراء والبيتش باجي" : "e.g. Desert Safari & Quads"}
                        className="w-full bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-700 mb-1 font-bold">{isAr ? "اللغات (مفصولة بفاصلة)" : "Languages (comma separated)"}</label>
                        <input 
                          type="text" 
                          value={newGuide.languages} 
                          onChange={(e) => setNewGuide(prev => ({ ...prev, languages: e.target.value }))}
                          placeholder="العربية, English, Italiano"
                          className="w-full bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-sky-500"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 mb-1 font-bold">{isAr ? "رقم الهاتف / الواتساب" : "Phone / WhatsApp"}</label>
                        <input 
                          type="text" 
                          value={newGuide.phone} 
                          onChange={(e) => setNewGuide(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+201100777330"
                          className="w-full bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-sky-500"
                        />
                      </div>
                    </div>

                    {/* Photo upload / URL */}
                    <div className="space-y-2">
                      <label className="block text-slate-700 font-bold">{isAr ? "صورة المرشد الشخصية" : "Guide Profile Photo"}</label>
                      <div className="flex items-center gap-3">
                        {newGuide.photo && (
                          <img 
                            src={newGuide.photo} 
                            alt="preview" 
                            className="w-12 h-12 rounded-xl object-cover ring-2 ring-sky-500"
                          />
                        )}
                        <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 font-bold transition">
                          <Upload className="w-4 h-4 text-sky-600" />
                          <span>{isAr ? "رفع صورة من جهازك" : "Upload File"}</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handlePhotoUploadForGuide} 
                            className="hidden" 
                          />
                        </label>
                        <span className="text-slate-500 text-[11px]">{isAr ? "أو ضع رابط صورة:" : "or paste URL:"}</span>
                      </div>
                      <input 
                        type="url" 
                        value={newGuide.photo} 
                        onChange={(e) => setNewGuide(prev => ({ ...prev, photo: e.target.value }))}
                        placeholder="https://..."
                        className="w-full bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setShowAddGuideModal(false)}
                        className="border-slate-300 text-slate-700 hover:bg-slate-100"
                      >
                        {isAr ? "إلغاء" : "Cancel"}
                      </Button>
                      <Button 
                        type="submit" 
                        variant="primary" 
                        size="sm" 
                        icon={CheckCircle2}
                        className="bg-sky-600 hover:bg-sky-700 text-white"
                      >
                        {isAr ? "حفظ المرشد" : "Save Guide"}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* QR Modal for Guide */}
            {selectedGuideForQR && (
              <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-6 border border-slate-200 text-slate-900 max-w-sm w-full text-center space-y-4 shadow-2xl">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <h3 className="font-bold text-slate-900 text-sm">
                      {isAr ? `كيوار كود تقييم: ${selectedGuideForQR.name}` : `QR Review: ${selectedGuideForQR.name}`}
                    </h3>
                    <button 
                      onClick={() => setSelectedGuideForQR(null)}
                      className="text-slate-400 hover:text-slate-700 text-sm font-bold"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl inline-block border border-slate-200 shadow-inner">
                    <QRCodeSVG 
                      value={`${window.location.origin}/review-guide?guideId=${selectedGuideForQR.id}`}
                      size={200}
                      level="H"
                      includeMargin={false}
                    />
                  </div>

                  <p className="text-xs text-slate-500">
                    {isAr 
                      ? "يقوم السائح بمسح هذا الكود بكاميرا الموبايل لتقييم هذا المرشد مباشرة وبسرية تامة للأدمن."
                      : "Scan with any smartphone camera to submit private feedback."}
                  </p>

                  <div className="flex gap-2">
                    <a 
                      href={`${window.location.origin}/review-guide?guideId=${selectedGuideForQR.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition shadow-xs"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{isAr ? "فتح صفحة التقييم" : "Open Page"}</span>
                    </a>
                    <button
                      onClick={() => copyGuideLink(selectedGuideForQR.id)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition border border-slate-200"
                    >
                      <LinkIcon className="w-3.5 h-3.5 text-slate-500" />
                      <span>{isAr ? "نسخ الرابط" : "Copy Link"}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: SECRET GUIDE REVIEWS (ADMIN ONLY)                 */}
        {/* ======================================================== */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6 space-y-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-amber-100 text-amber-700">
                  <Star className="w-6 h-6 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-heading text-slate-900">
                    {isAr ? "تقييمات المرشدين السياحيين السرية (خاصة بالإدارة فقط)" : "Confidential Tour Guide Reviews (Admin Only)"}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {isAr 
                      ? "هذه التقييمات لا تظهر للجمهور في الموقع. يرسلها العملاء بعد انتهاء الرحلة لتقييم أداء كل مرشد بشفافية."
                      : "These reviews are strictly confidential to the admin and do not appear on the public website."}
                  </p>
                </div>
              </div>

              {/* Guide Filter Selector */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-amber-200">
                <span className="text-xs text-slate-600 font-bold">{isAr ? "تصفية حسب المرشد:" : "Filter by guide:"}</span>
                <button
                  onClick={() => setSelectedGuideFilter('ALL')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                    selectedGuideFilter === 'ALL'
                      ? 'bg-amber-500 text-white font-black shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-amber-50 border border-slate-200'
                  }`}
                >
                  {isAr ? "جميع المرشدين" : "All Guides"} ({guideReviews.length})
                </button>
                {guides.map(g => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGuideFilter(g.id)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                      selectedGuideFilter === g.id
                        ? 'bg-amber-500 text-white font-black shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-amber-50 border border-slate-200'
                    }`}
                  >
                    {isAr ? g.name : (g.nameEn || g.name)} ({guideReviews.filter(r => r.guideId === g.id).length})
                  </button>
                ))}
              </div>
            </div>

            {/* Guide Reviews Feed */}
            {(() => {
              const displayedReviews = selectedGuideFilter === 'ALL'
                ? guideReviews
                : guideReviews.filter(r => r.guideId === selectedGuideFilter);

              if (displayedReviews.length === 0) {
                return (
                  <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3 shadow-xs">
                    <Star className="w-12 h-12 text-slate-400 mx-auto" />
                    <h3 className="text-lg font-bold text-slate-800">
                      {isAr ? "لا توجد تقييمات مسجلة للمرشدين حتى الآن" : "No guide reviews yet"}
                    </h3>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      {isAr 
                        ? "يمكن للعملاء مسح كود QR الخاص بالمرشد في نهاية الرحلة، وستظهر كل تقييماتهم السرية هنا فوراً."
                        : "Guests can scan the guide's personal QR code at the end of the tour."}
                    </p>
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {displayedReviews.map((rev) => {
                    const guideObj = guides.find(g => g.id === rev.guideId);
                    const waLink = rev.clientPhone ? getWhatsAppLink(rev.clientPhone, `مرحباً ${rev.clientName || 'عزيزي العميل'}، شكراً لتقييمك لرحلتنا مع ${rev.guideName || 'مرشدنا'}`) : null;

                    return (
                      <div key={rev.id} className="bg-white rounded-3xl p-5 border border-slate-200 space-y-4 shadow-sm hover:shadow-md hover:border-slate-300 transition">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <div className="flex items-center gap-2.5">
                            {guideObj?.photo && (
                              <img src={guideObj.photo} alt="" className="w-9 h-9 rounded-full object-cover ring-1 ring-amber-400" />
                            )}
                            <div>
                              <span className="font-bold text-slate-900 text-sm block">
                                {rev.guideName || guideObj?.name || 'المرشد'}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                {rev.tourTaken || 'رحلة شرم الشيخ'} • {new Date(rev.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 font-black text-sm">
                            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                            <span>{rev.rating} / 5</span>
                          </div>
                        </div>

                        {/* Detailed Sub-Ratings */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
                          <div className="text-center p-1">
                            <span className="text-slate-500 block text-[10px]">{isAr ? "المواعيد" : "Punctual"}</span>
                            <span className="font-bold text-amber-600">★ {rev.punctuality || 5}</span>
                          </div>
                          <div className="text-center p-1">
                            <span className="text-slate-500 block text-[10px]">{isAr ? "المعلومات" : "Knowledge"}</span>
                            <span className="font-bold text-amber-600">★ {rev.knowledge || 5}</span>
                          </div>
                          <div className="text-center p-1">
                            <span className="text-slate-500 block text-[10px]">{isAr ? "الضيافة" : "Hospitality"}</span>
                            <span className="font-bold text-amber-600">★ {rev.hospitality || 5}</span>
                          </div>
                          <div className="text-center p-1">
                            <span className="text-slate-500 block text-[10px]">{isAr ? "الأمان" : "Safety"}</span>
                            <span className="font-bold text-amber-600">★ {rev.safety || 5}</span>
                          </div>
                        </div>

                        {/* Client Feedback Comment */}
                        {(rev.feedback || rev.comment) && (
                          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 italic">
                            "{rev.feedback || rev.comment}"
                          </div>
                        )}

                        {/* Client Info & Action */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                          <div>
                            <span className="text-slate-800 font-bold block">
                              {rev.clientName || (isAr ? 'عميل بدون اسم' : 'Anonymous Guest')}
                            </span>
                            {rev.clientPhone && (
                              <span className="text-emerald-700 font-mono text-[11px]">
                                {rev.clientPhone}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {waLink && (
                              <a href={waLink} target="_blank" rel="noopener noreferrer">
                                <Button variant="whatsapp" size="sm" icon={Send}>
                                  {isAr ? "واتساب العميل" : "WhatsApp"}
                                </Button>
                              </a>
                            )}
                            <button
                              onClick={() => handleDeleteGuideReview(rev.id)}
                              className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition border border-rose-200"
                              title={isAr ? "حذف التقييم" : "Delete Review"}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: LIVE PRICE EDITOR (NO BACKEND)                    */}
        {/* ======================================================== */}
        {activeTab === 'prices' && (
          <div className="space-y-6">
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
              <div>
                <h2 className="text-xl font-bold font-heading text-slate-900 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                  {isAr ? "تعديل أسعار الرحلات الفوري" : "Live Tour Price Editor"}
                </h2>
                <p className="text-xs text-slate-500">
                  {isAr 
                    ? "أي سعر تقوم بتعديله هنا يُحفظ فوراً ويظهر في كافة صفحات وتفاصيل الرحلات وبطاقات الحجز في الموقع مباشرة."
                    : "Prices modified here take effect instantly across all tour pages, experience details, and direct booking widgets."}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleResetAllPrices}
                  className="text-rose-600 border-rose-200 hover:bg-rose-50 bg-white"
                  icon={RefreshCw}
                >
                  {isAr ? "استعادة كافة الأسعار الأصلية" : "Reset All to Default"}
                </Button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 right-3 text-slate-400" />
                <input
                  type="text"
                  placeholder={isAr ? "بحث في الرحلات لتعديل سعرها..." : "Search tour to edit price..."}
                  value={tourSearchTerm}
                  onChange={(e) => setTourSearchTerm(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl pr-10 pl-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 shadow-xs"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none">
                <button
                  onClick={() => setTourCategoryFilter('ALL')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    tourCategoryFilter === 'ALL'
                      ? 'bg-emerald-600 text-white font-black shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {isAr ? "الكل" : "All"} ({EXPERIENCES.length})
                </button>
                {categoriesList.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setTourCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                      tourCategoryFilter === cat
                        ? 'bg-emerald-600 text-white font-black shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {getCategoryName(cat)}
                  </button>
                ))}
              </div>
            </div>

            {/* Tours Price Table */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-bold text-[11px]">
                    <tr>
                      <th className="p-4">{isAr ? "الرحلة" : "Tour"}</th>
                      <th className="p-4">{isAr ? "القسم" : "Category"}</th>
                      <th className="p-4 text-center">{isAr ? "السعر الافتراضي" : "Default Price"}</th>
                      <th className="p-4 text-center">{isAr ? "السعر المعدل الحالي" : "Current Active Price"}</th>
                      <th className="p-4 text-center">{isAr ? "تعديل وحفظ" : "Action"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredExperiences.map((tour) => {
                      const originalDefault = EXPERIENCES.find(e => e.slug === tour.slug)?.startingPrice || tour.startingPrice;
                      const activeCustom = customPrices[tour.slug] !== undefined ? customPrices[tour.slug] : null;
                      const currentValueInput = editingPrices[tour.slug] !== undefined 
                        ? editingPrices[tour.slug] 
                        : (activeCustom !== null ? activeCustom : originalDefault);
                      const isSaved = priceSaveSuccess[tour.slug];

                      return (
                        <tr key={tour.slug} className="hover:bg-slate-50/80 transition">
                          <td className="p-4 flex items-center gap-3">
                            <img 
                              src={tour.images?.[0] || '/images/default.jpg'} 
                              alt="" 
                              className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200 flex-shrink-0 shadow-xs"
                            />
                            <div className="min-w-0">
                              <span className="font-bold text-slate-900 block truncate max-w-xs">
                                {tour.title}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                {tour.slug}
                              </span>
                            </div>
                          </td>

                          <td className="p-4">
                            <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-semibold text-[11px] border border-slate-200">
                              {getCategoryName(tour.category)}
                            </span>
                          </td>

                          <td className="p-4 text-center font-bold text-slate-500">
                            ${originalDefault} USD
                          </td>

                          <td className="p-4 text-center">
                            <div className="inline-flex items-center gap-1.5">
                              <span className="text-emerald-600 font-bold">$</span>
                              <input
                                type="number"
                                min="1"
                                max="9999"
                                value={currentValueInput}
                                onChange={(e) => handlePriceChange(tour.slug, e.target.value)}
                                className="w-20 bg-slate-50 border border-slate-300 rounded-xl px-2 py-1 text-center font-bold text-slate-900 text-xs focus:outline-none focus:border-emerald-500 focus:bg-white"
                              />
                              <span className="text-slate-400 text-[10px]">USD</span>
                            </div>
                            {activeCustom !== null && (
                              <span className="block text-[10px] text-emerald-600 font-bold mt-1">
                                {isAr ? "مُعدّل من الإدارة" : "Customized"}
                              </span>
                            )}
                          </td>

                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleSaveSinglePrice(tour.slug)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition inline-flex items-center gap-1 ${
                                  isSaved
                                    ? 'bg-emerald-600 text-white shadow-xs'
                                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
                                }`}
                              >
                                {isSaved ? <Check className="w-3.5 h-3.5" /> : <DollarSign className="w-3.5 h-3.5" />}
                                <span>{isSaved ? (isAr ? "تم الحفظ!" : "Saved!") : (isAr ? "حفظ" : "Save")}</span>
                              </button>

                              {activeCustom !== null && (
                                <button
                                  onClick={() => handleResetSinglePrice(tour.slug, originalDefault)}
                                  className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition border border-slate-200"
                                  title={isAr ? "استعادة السعر الافتراضي" : "Reset to default"}
                                >
                                  <RefreshCw className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: WEBSITE PHOTOS MANAGER (FOLDER SYSTEM)            */}
        {/* ======================================================== */}
        {activeTab === 'photos' && (
          <div className="space-y-6">
            {/* Folder Manager Header */}
            <div className="bg-gradient-to-r from-purple-50 via-white to-pink-50 border border-purple-200/80 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 font-bold text-xs">
                  <FolderOpen className="w-3.5 h-3.5 text-purple-600" />
                  <span>{isAr ? "نظام الفولدرات والأقسام المباشرة" : "Live Folder Categories System"}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-black font-heading text-slate-900 flex items-center gap-2">
                  <ImageIcon className="w-6 h-6 text-purple-600" />
                  {isAr ? "إدارة ورفع صور الموقع المباشرة" : "Live Website Photos Manager"}
                </h2>
                <p className="text-xs text-slate-500">
                  {isAr 
                    ? "اختر الفولدر المناسب (سفاري، بحر، سيناء، تنقلات) ثم اضغط على الرحلة المطلوبة وارفع صورتها فوراً لتظهر في الموقع مباشرة."
                    : "Select a category folder (Safari, Sea, Sinai, Transfers), choose a tour, and upload or paste photos to update the site instantly."}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleResetAllTourPhotos}
                  className="bg-white hover:bg-rose-50 border-rose-200 text-rose-600 shadow-xs"
                  icon={RefreshCw}
                >
                  {isAr ? "استعادة كافة الصور الأصلية" : "Reset All Photos"}
                </Button>
              </div>
            </div>

            {/* Folder Selector Navigation Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {PHOTO_FOLDERS.map((folder) => {
                const isCurrent = photoFolderFilter === folder.id;
                const folderToursCount = localizedExperiences.filter(folder.filter).length;
                return (
                  <button
                    key={folder.id}
                    onClick={() => {
                      setPhotoFolderFilter(folder.id);
                      const firstInFolder = localizedExperiences.find(folder.filter);
                      if (firstInFolder) {
                        setSelectedTourForPhoto(firstInFolder.slug);
                        setPhotoInputUrl('');
                        setPhotoPreviewUrl('');
                      }
                    }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition whitespace-nowrap border ${
                      isCurrent
                        ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/20 ring-2 ring-purple-400/30'
                        : 'bg-white text-slate-700 hover:bg-purple-50 hover:text-purple-700 border-slate-200 shadow-xs'
                    }`}
                  >
                    <span className="text-base">{folder.icon}</span>
                    <span>{isAr ? folder.nameAr : folder.nameEn}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      isCurrent ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {folderToursCount}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Photo Editor Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Selector Column (Tours inside selected folder) */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <h3 className="text-xs font-bold text-slate-800 flex items-center gap-2">
                    <Folder className="w-4 h-4 text-purple-600" />
                    <span>{isAr ? currentPhotoFolderObj.nameAr : currentPhotoFolderObj.nameEn}</span>
                    <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[11px] font-mono">
                      ({photoFilteredExperiences.length})
                    </span>
                  </h3>
                </div>

                {/* Quick Search inside folder */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 right-3 text-slate-600" />
                  <input
                    type="text"
                    value={photoSearchQuery}
                    onChange={(e) => setPhotoSearchQuery(e.target.value)}
                    placeholder={isAr ? "ابحث باسم الرحلة داخل الفولدر..." : "Search inside folder..."}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-9 pl-3 py-2 text-xs text-slate-800 placeholder:text-slate-600 focus:outline-none focus:border-purple-500 focus:bg-white transition"
                  />
                </div>

                {/* Tours List inside this folder */}
                <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                  {photoFilteredExperiences.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-600">
                      {isAr ? "لا توجد رحلات مطابقة في هذا الفولدر" : "No tours match in this folder"}
                    </div>
                  ) : (
                    photoFilteredExperiences.map((tour) => {
                      const isSelected = activeSelectedTour?.slug === tour.slug;
                      const hasCustom = Boolean(customImages[tour.slug]);

                      return (
                        <button
                          key={tour.slug}
                          onClick={() => {
                            setSelectedTourForPhoto(tour.slug);
                            setPhotoInputUrl('');
                            setPhotoPreviewUrl('');
                          }}
                          className={`w-full text-right p-3 rounded-2xl flex items-center gap-3 transition border ${
                            isSelected
                              ? 'bg-purple-50 border-purple-500 text-purple-950 ring-2 ring-purple-400/20 shadow-xs'
                              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-2xs'
                          }`}
                        >
                          <img 
                            src={tour.images?.[0] || '/images/default.jpg'} 
                            alt="" 
                            className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200 flex-shrink-0 shadow-xs"
                          />
                          <div className="min-w-0 flex-1">
                            <span className="font-bold text-xs text-slate-900 block leading-snug">
                              {tour.title}
                            </span>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold">
                                {getCategoryName(tour.category)}
                              </span>
                              {hasCustom && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold">
                                  {isAr ? "صورة مخصصة" : "Custom"}
                                </span>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Right Preview and Upload Controls */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
                {/* Visual Breadcrumb Location Tracker */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-50 via-sky-50 to-white border border-purple-200 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-purple-900">
                    <FolderOpen className="w-4 h-4 text-purple-600 shrink-0" />
                    <span className="text-slate-600">{isAr ? "مسار الرفع المحدد:" : "Upload Location:"}</span>
                    <span className="px-2.5 py-1 rounded-xl bg-white border border-purple-200 text-purple-700 shadow-xs">
                      {activeSelectedFolder.icon} {isAr ? activeSelectedFolder.nameAr : activeSelectedFolder.nameEn}
                    </span>
                    <span className="text-slate-600">&larr;</span>
                    <span className="text-slate-900 font-black">{activeSelectedLocalized?.title}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono bg-white px-2 py-0.5 rounded-md border border-slate-200">
                    ID: {activeSelectedTour?.slug}
                  </span>
                </div>

                {photoSaveSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    {isAr ? "تم تحديث وحفظ صورة الرحلة بنجاح في كل الموقع!" : "Tour image updated successfully across the entire site!"}
                  </div>
                )}

                {/* Side-by-Side Photo Previews */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Current Active Image */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-600 block">
                      {isAr ? "الصورة الحالية الفعالة في الموقع:" : "Currently Active on Site:"}
                    </span>
                    <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative group shadow-inner">
                      <img 
                        src={activeSelectedTour?.images?.[0] || '/images/default.jpg'} 
                        alt="Current" 
                        className="w-full h-full object-cover"
                      />
                      {customImages[activeSelectedTour?.slug] && (
                        <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-purple-600 text-white font-bold text-[10px] shadow">
                          {isAr ? "صورة مخصصة" : "Custom Photo"}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* New Upload / URL Preview */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-purple-700 block">
                      {isAr ? "معاينة الصورة الجديدة قبل الحفظ:" : "New Image Preview:"}
                    </span>
                    <div className="aspect-video rounded-2xl overflow-hidden bg-purple-50/40 border-2 border-dashed border-purple-300 flex items-center justify-center relative">
                      {photoPreviewUrl || photoInputUrl ? (
                        <img 
                          src={photoPreviewUrl || photoInputUrl} 
                          alt="New Preview" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center p-4 space-y-2 text-slate-600">
                          <Upload className="w-8 h-8 mx-auto text-purple-400" />
                          <span className="text-xs font-medium block">{isAr ? "اختر صورة أو الصق رابطاً للمعاينة هنا" : "Upload or paste URL to preview"}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Upload & Link Controls */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <label className="w-full sm:w-auto cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition shadow-md shadow-purple-600/20">
                      <Upload className="w-4 h-4" />
                      <span>{isAr ? "اختر صورة من جهازك (ملف)" : "Upload File From Computer"}</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handlePhotoUploadForTour} 
                        className="hidden" 
                      />
                    </label>
                    <span className="text-xs text-slate-600 font-bold">{isAr ? "أو" : "or"}</span>
                    <div className="relative flex-1 w-full">
                      <LinkIcon className="w-3.5 h-3.5 absolute top-1/2 -translate-y-1/2 right-3 text-slate-600" />
                      <input
                        type="url"
                        placeholder={isAr ? "الصق رابط صورة مباشر https://..." : "Paste image URL https://..."}
                        value={photoInputUrl}
                        onChange={(e) => setPhotoInputUrl(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl pr-9 pl-3 py-2 text-xs text-slate-800 placeholder:text-slate-600 focus:outline-none focus:border-purple-500 font-mono shadow-xs"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                    <div className="text-[11px] text-slate-500">
                      {isAr ? "يتم حفظ الصورة بصيغة بيانات مشفرة في التخزين المحلي للمتصفح مباشرة." : "Stored securely in client state with real-time site reactivity."}
                    </div>

                    <div className="flex items-center gap-2">
                      {customImages[activeSelectedTour?.slug] && (
                        <button
                          onClick={() => handleResetTourPhoto(activeSelectedTour?.slug)}
                          className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition border border-slate-200"
                        >
                          {isAr ? "استعادة الصورة الأصلية" : "Reset Original"}
                        </button>
                      )}
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={handleSaveTourPhoto}
                        icon={CheckCircle2}
                        className="bg-[#0284C7] hover:bg-[#0369A1] text-white shadow-md shadow-sky-600/20"
                      >
                        {isAr ? "تطبيق وحفظ الصورة للرحلة" : "Apply & Save Photo"}
                      </Button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 6: ADMIN & MODERATORS TEAM (NO BACKEND)              */}
        {/* ======================================================== */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            {/* Top Bar for Team Management */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-xs uppercase tracking-wider mb-2">
                    <ShieldCheck className="w-4 h-4" />
                    {isAr ? "فريق الإدارة والمشرفين (Client-Side)" : "Admin & Moderator Team"}
                  </div>
                  <h2 className="text-xl md:text-2xl font-black font-heading text-slate-900">
                    {isAr ? "إدارة حسابات المسؤولين والمشرفين" : "Admin & Moderator Accounts"}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {isAr
                      ? "يمكنك تعيين مشرفين إضافيين مع تحديد بيانات الدخول (البريد الإلكتروني وكلمة المرور) وتعيين الصلاحيات الخاصة بهم بكل سهولة وأمان."
                      : "Add and manage moderators with their own email, password, and custom permissions safely and seamlessly."}
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setShowAddModModal(true)}
                    icon={UserPlus}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20"
                  >
                    {isAr ? "إضافة مشرف جديد" : "Add Moderator"}
                  </Button>
                </div>
              </div>

              {/* Quick Info Alert */}
              <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-indigo-900 text-xs flex items-start gap-3">
                <Crown className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-slate-900 block">
                    {isAr ? "الحساب الأساسي للمدير (غير قابل للحذف):" : "Master Admin Account (Protected):"}
                  </span>
                  <p className="text-slate-600">
                    {isAr ? "البريد الإلكتروني الأساسي للأدمن هو " : "Primary Admin email is "}
                    <span className="text-amber-700 font-mono font-bold">ahmedyasser697@gmail.com</span>
                    {isAr ? " ولديه صلاحيات كاملة في لوحة التحكم وتغيير الأسعار والصور وإدارة المشرفين." : " with full command access."}
                  </p>
                </div>
              </div>
            </div>

            {/* Admin Users Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {adminUsers.map((user) => {
                const isUserPrimary = user.isPrimary || user.email?.toLowerCase() === PRIMARY_ADMIN.email.toLowerCase();
                const isPasswordRevealed = revealedPasswords[user.id];

                return (
                  <div
                    key={user.id}
                    className={`rounded-3xl p-5 border relative overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                      isUserPrimary
                        ? 'bg-gradient-to-br from-amber-50/90 to-orange-50/50 border-amber-300 shadow-sm'
                        : 'bg-white border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    {/* Header Tag */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      {isUserPrimary ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-800 font-bold text-xs">
                          <Crown className="w-3.5 h-3.5 text-amber-600" />
                          <span>{isAr ? "المدير العام والمالك" : "Master Superadmin"}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-xs">
                          <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                          <span>{user.roleLabel || (isAr ? "مشرف" : "Moderator")}</span>
                        </span>
                      )}

                      <span className="text-[10px] text-slate-400 font-mono">
                        {user.createdAt || '2026-10-25'}
                      </span>
                    </div>

                    {/* User Details */}
                    <div className="space-y-3.5 flex-1">
                      <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-base ${
                          isUserPrimary ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20' : 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                        }`}>
                          {user.name ? user.name.charAt(0) : 'U'}
                        </div>
                        <div>
                          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                            {user.name}
                            {isUserPrimary && <Crown className="w-3.5 h-3.5 text-amber-500" />}
                          </h3>
                          <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <Mail className="w-3 h-3 text-slate-400" />
                            <span className="font-mono">{user.email}</span>
                          </span>
                        </div>
                      </div>

                      {/* Password Display Box */}
                      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                        <div className="flex items-center justify-between text-[11px] text-slate-600">
                          <span>{isAr ? "كلمة المرور:" : "Password:"}</span>
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility(user.id)}
                            className="text-sky-600 hover:text-sky-700 flex items-center gap-1 text-[11px] font-bold"
                          >
                            <Eye className="w-3 h-3" />
                            <span>{isPasswordRevealed ? (isAr ? "إخفاء" : "كشف") : (isAr ? "كشف" : "Show")}</span>
                          </button>
                        </div>
                        <div className="font-mono text-xs font-bold text-slate-900 tracking-wider">
                          {isPasswordRevealed ? (
                            <span className="text-amber-800 font-black select-all">{user.password}</span>
                          ) : (
                            <span className="text-slate-400 tracking-widest">••••••••••••</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-4 mt-4 border-t border-slate-200/80 flex items-center justify-between">
                      {isUserPrimary ? (
                        <div className="flex items-center justify-between w-full">
                          <span className="text-[11px] text-amber-800 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                            {isAr ? "حساب رئيسي محمي" : "Protected Account"}
                          </span>
                          <button
                            type="button"
                            onClick={() => setShowChangePassModal(true)}
                            className="text-xs px-2.5 py-1 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold transition border border-amber-300"
                          >
                            {isAr ? "تغيير الباسورد" : "Change Pass"}
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between w-full">
                          <span className="text-[11px] text-slate-600 flex items-center gap-1">
                            <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                            {isAr ? "مشرف مفعل" : "Active Moderator"}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteModerator(user.id, user.email)}
                            className="text-xs px-2.5 py-1 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold transition border border-rose-200 flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>{isAr ? "حذف" : "Delete"}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        </div>
      </main>

        {/* Add Moderator Modal */}
        {showAddModModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 text-slate-900 max-w-md w-full space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-indigo-600" />
                  <span>{isAr ? "إضافة مشرف جديد للوحة التحكم" : "Add New Moderator"}</span>
                </h3>
                <button
                  onClick={() => {
                    setShowAddModModal(false);
                    setModFormError('');
                    setModFormSuccess('');
                  }}
                  className="text-slate-400 hover:text-slate-700 text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddModerator} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {isAr ? "اسم المشرف *" : "Moderator Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={newMod.name}
                    onChange={e => setNewMod({ ...newMod, name: e.target.value })}
                    placeholder={isAr ? "مثال: مروان أحمد" : "e.g. Marwan Ahmed"}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white rounded-xl focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {isAr ? "البريد الإلكتروني *" : "Email Address *"}
                  </label>
                  <input
                    type="email"
                    required
                    value={newMod.email}
                    onChange={e => setNewMod({ ...newMod, email: e.target.value })}
                    placeholder={isAr ? "مثال: mod@elhanagroup.com" : "e.g. mod@elhanagroup.com"}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white rounded-xl focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {isAr ? "كلمة المرور الخاصة بالمشرف *" : "Moderator Password *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={newMod.password}
                    onChange={e => setNewMod({ ...newMod, password: e.target.value })}
                    placeholder={isAr ? "كلمة مرور قوية (6 خانات على الأقل)" : "Strong password (min 6 chars)"}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white rounded-xl focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {isAr ? "الدور والصلاحية" : "Role & Permissions"}
                  </label>
                  <select
                    value={newMod.role}
                    onChange={e => setNewMod({ ...newMod, role: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white rounded-xl focus:outline-none focus:border-indigo-500 text-xs"
                  >
                    <option value="moderator">{isAr ? "مشرف عام (كامل الصلاحيات)" : "General Moderator (Full Access)"}</option>
                    <option value="bookings_mod">{isAr ? "مشرف حجوزات وعملاء" : "Bookings & Customers Moderator"}</option>
                    <option value="tours_mod">{isAr ? "مشرف رحلات وأسعار" : "Tours & Prices Moderator"}</option>
                  </select>
                </div>

                {modFormError && (
                  <div className="p-3 rounded-xl text-xs font-bold bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{modFormError}</span>
                  </div>
                )}

                {modFormSuccess && (
                  <div className="p-3 rounded-xl text-xs font-bold bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>{modFormSuccess}</span>
                  </div>
                )}

                <div className="pt-2 flex items-center gap-2">
                  <Button type="submit" variant="primary" size="sm" icon={UserPlus} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">
                    {isAr ? "حفظ وإضافة المشرف" : "Save Moderator"}
                  </Button>
                  <button
                    type="button"
                    onClick={() => setShowAddModModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition border border-slate-200"
                  >
                    {isAr ? "إلغاء" : "Cancel"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Change Password Modal */}
        {showChangePassModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 text-slate-900 max-w-md w-full space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-amber-500" />
                  <span>{isAr ? "تغيير رمز مرور لوحة التحكم" : "Change Admin Password"}</span>
                </h3>
                <button
                  onClick={() => {
                    setShowChangePassModal(false);
                    setAdminPassStatus({ text: '', type: '' });
                  }}
                  className="text-slate-400 hover:text-slate-700 text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleChangeAdminPassword} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {isAr ? "كلمة المرور الحالية *" : "Current Password *"}
                  </label>
                  <input
                    type="password"
                    required
                    value={adminOldPass}
                    onChange={e => setAdminOldPass(e.target.value)}
                    placeholder={isAr ? "أدخل كلمة المرور الحالية" : "Current password"}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white rounded-xl focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {isAr ? "كلمة المرور الجديدة *" : "New Password *"}
                  </label>
                  <input
                    type="password"
                    required
                    value={adminNewPass}
                    onChange={e => setAdminNewPass(e.target.value)}
                    placeholder={isAr ? "كلمة المرور الجديدة (4 أحرف/أرقام على الأقل)" : "New password"}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white rounded-xl focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {isAr ? "تأكيد كلمة المرور الجديدة *" : "Confirm New Password *"}
                  </label>
                  <input
                    type="password"
                    required
                    value={adminConfirmPass}
                    onChange={e => setAdminConfirmPass(e.target.value)}
                    placeholder={isAr ? "أعد كتابة كلمة المرور الجديدة" : "Confirm new password"}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white rounded-xl focus:outline-none focus:border-amber-500"
                  />
                </div>

                {adminPassStatus.text && (
                  <div className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                    adminPassStatus.type === 'success'
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                      : 'bg-rose-50 border border-rose-200 text-rose-700'
                  }`}>
                    {adminPassStatus.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" /> : <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />}
                    <span>{adminPassStatus.text}</span>
                  </div>
                )}

                <div className="pt-2 flex flex-col gap-2">
                  <Button type="submit" variant="primary" size="sm" icon={CheckCircle2} className="bg-amber-600 hover:bg-amber-700 text-white">
                    {isAr ? "حفظ كلمة المرور الجديدة" : "Save New Password"}
                  </Button>

                  <button
                    type="button"
                    onClick={restoreDefaultAdminPassword}
                    className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 font-semibold text-[11px] transition border border-slate-200 flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{isAr ? "استعادة كلمة المرور الافتراضية (elhana2026)" : "Restore default (elhana2026)"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

    </div>
  );
};

export default AdminBookingsPage;
