import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { BookingProvider } from './context/BookingContext';
import { ToastProvider } from './context/ToastContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import ErrorBoundary from './components/common/ErrorBoundary';
import { QuickAdventureBookingModal } from './components/booking/QuickAdventureBookingModal';

// Lazy Loaded Pages for high performance & fast initial load
const HomePage = lazy(() => import('./pages/HomePage'));
const SafariToursPage = lazy(() => import('./pages/SafariToursPage'));
const ATVToursPage = lazy(() => import('./pages/ATVToursPage'));
const BuggyToursPage = lazy(() => import('./pages/BuggyToursPage'));
const BedouinExperiencePage = lazy(() => import('./pages/BedouinExperiencePage'));
const CamelRidingPage = lazy(() => import('./pages/CamelRidingPage'));
const HorseRidingPage = lazy(() => import('./pages/HorseRidingPage'));
const SeaTripsPage = lazy(() => import('./pages/SeaTripsPage'));
const YachtTripsPage = lazy(() => import('./pages/YachtTripsPage'));
const SnorkelingPage = lazy(() => import('./pages/SnorkelingPage'));
const DivingPage = lazy(() => import('./pages/DivingPage'));
const ParasailingPage = lazy(() => import('./pages/ParasailingPage'));
const BananaBoatPage = lazy(() => import('./pages/BananaBoatPage'));
const ExcursionsPage = lazy(() => import('./pages/ExcursionsPage'));
const DolphinExperiencePage = lazy(() => import('./pages/DolphinExperiencePage'));
const AllExperiencesPage = lazy(() => import('./pages/AllExperiencesPage'));
const ExperienceDetailsPage = lazy(() => import('./pages/ExperienceDetailsPage'));
const AirportVIPPage = lazy(() => import('./pages/AirportVIPPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const AboutUsPage = lazy(() => import('./pages/AboutUsPage'));
const TransfersPage = lazy(() => import('./pages/TransfersPage'));
const ContactUsPage = lazy(() => import('./pages/ContactUsPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const BookingConfirmationPage = lazy(() => import('./pages/BookingConfirmationPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsConditionsPage = lazy(() => import('./pages/TermsConditionsPage'));
const CancellationPolicyPage = lazy(() => import('./pages/CancellationPolicyPage'));
const QRCodePage = lazy(() => import('./pages/QRCodePage'));
const LeaveReviewPage = lazy(() => import('./pages/LeaveReviewPage'));
const GuideReviewPage = lazy(() => import('./pages/GuideReviewPage'));
const AdminBookingsPage = lazy(() => import('./pages/AdminBookingsPage'));
const AdminAccess = lazy(() => import('./components/common/AdminAccess'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-10 h-10 border-3 border-sky-100 border-t-[#0284C7] rounded-full animate-spin"></div>
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/admin-login' || location.pathname === '/login';

  return (
    <div className={`min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 font-sans selection:bg-[#0284C7] selection:text-white ${isAdminRoute ? 'h-screen overflow-hidden' : ''}`}>
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}
      <main className={isAdminRoute ? "h-screen w-screen overflow-hidden flex flex-col" : "flex-grow"}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/safari" element={<SafariToursPage />} />
            <Route path="/atv-tours" element={<ATVToursPage />} />
            <Route path="/buggy-tours" element={<BuggyToursPage />} />
            <Route path="/bedouin-experience" element={<BedouinExperiencePage />} />
            <Route path="/camel-riding" element={<CamelRidingPage />} />
            <Route path="/horse-riding" element={<HorseRidingPage />} />
            <Route path="/excursions" element={<ExcursionsPage />} />
            <Route path="/sea-trips" element={<SeaTripsPage />} />
            <Route path="/dolphin-experience" element={<DolphinExperiencePage />} />
            <Route path="/yacht-trips" element={<YachtTripsPage />} />
            <Route path="/snorkeling" element={<SnorkelingPage />} />
            <Route path="/diving" element={<DivingPage />} />
            <Route path="/parasailing" element={<ParasailingPage />} />
            <Route path="/banana-boat" element={<BananaBoatPage />} />
            <Route path="/experiences" element={<AllExperiencesPage />} />
            <Route path="/experience/:slug" element={<ExperienceDetailsPage />} />

            <Route path="/airport-vip" element={<AirportVIPPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/transfers" element={<TransfersPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-and-conditions" element={<TermsConditionsPage />} />
            <Route path="/cancellation-policy" element={<CancellationPolicyPage />} />
            <Route path="/qr" element={<QRCodePage />} />
            <Route path="/leave-review" element={<LeaveReviewPage />} />
            <Route path="/review-guide" element={<GuideReviewPage />} />
            <Route path="/review/guide" element={<GuideReviewPage />} />
            <Route path="/admin" element={<AdminAccess><AdminBookingsPage /></AdminAccess>} />
            <Route path="/admin/bookings" element={<AdminAccess><AdminBookingsPage /></AdminAccess>} />
            <Route path="/admin/login" element={<AdminAccess><AdminBookingsPage /></AdminAccess>} />
            <Route path="/admin-login" element={<AdminAccess><AdminBookingsPage /></AdminAccess>} />
            <Route path="/login" element={<AdminAccess><AdminBookingsPage /></AdminAccess>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <WhatsAppButton />}
      {!isAdminRoute && <QuickAdventureBookingModal />}
      <Toast />
    </div>
  );
}

export function App() {
  return (
    <ErrorBoundary>
      <Router>
        <LanguageProvider>
          <CurrencyProvider>
            <BookingProvider>
              <ToastProvider>
                <AppContent />
              </ToastProvider>
            </BookingProvider>
          </CurrencyProvider>
        </LanguageProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;

