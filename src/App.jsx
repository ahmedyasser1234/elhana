import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { BookingProvider } from './context/BookingContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { WhatsAppButton } from './components/common/WhatsAppButton';

// Page Imports
import HomePage from './pages/HomePage';
import SafariToursPage from './pages/SafariToursPage';
import ATVToursPage from './pages/ATVToursPage';
import BuggyToursPage from './pages/BuggyToursPage';
import BedouinExperiencePage from './pages/BedouinExperiencePage';
import CamelRidingPage from './pages/CamelRidingPage';
import HorseRidingPage from './pages/HorseRidingPage';
import SeaTripsPage from './pages/SeaTripsPage';
import YachtTripsPage from './pages/YachtTripsPage';
import SnorkelingPage from './pages/SnorkelingPage';
import DivingPage from './pages/DivingPage';
import ParasailingPage from './pages/ParasailingPage';
import BananaBoatPage from './pages/BananaBoatPage';
import ExcursionsPage from './pages/ExcursionsPage';
import DolphinExperiencePage from './pages/DolphinExperiencePage';
import AllExperiencesPage from './pages/AllExperiencesPage';
import ExperienceDetailsPage from './pages/ExperienceDetailsPage';
import GalleryPage from './pages/GalleryPage';
import AboutUsPage from './pages/AboutUsPage';
import TransfersPage from './pages/TransfersPage';
import ContactUsPage from './pages/ContactUsPage';
import FAQPage from './pages/FAQPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import CheckoutPage from './pages/CheckoutPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsConditionsPage from './pages/TermsConditionsPage';
import CancellationPolicyPage from './pages/CancellationPolicyPage';
import NotFoundPage from './pages/NotFoundPage';
import QRCodePage from './pages/QRCodePage';
import LeaveReviewPage from './pages/LeaveReviewPage';
import GuideReviewPage from './pages/GuideReviewPage';
import AdminBookingsPage from './pages/AdminBookingsPage';
import AdminAccess from './components/common/AdminAccess';
import { CurrencyProvider } from './context/CurrencyContext';
import AirportVIPPage from './pages/AirportVIPPage';
import ErrorBoundary from './components/common/ErrorBoundary';
import { QuickAdventureBookingModal } from './components/booking/QuickAdventureBookingModal';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export function App() {
  return (
    <ErrorBoundary>
      <Router>
        <LanguageProvider>
          <CurrencyProvider>
            <BookingProvider>
              <ToastProvider>
                <ScrollToTop />
                <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 font-sans selection:bg-[#0284C7] selection:text-white">
                  <Navbar />
                  <main className="flex-grow">
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
                  </main>
                  <Footer />
                  <WhatsAppButton />
                  <QuickAdventureBookingModal />
                  <Toast />
                </div>
              </ToastProvider>
            </BookingProvider>
          </CurrencyProvider>
        </LanguageProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;

