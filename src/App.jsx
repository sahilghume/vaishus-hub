import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import WhatsAppButton from './components/common/WhatsAppButton';
import ScrollToTopButton from './components/common/ScrollToTopButton';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-cream-light text-luxury-black font-sans antialiased">
      <Navbar />
      <main className="flex-grow pt-20"> {/* Padding top to offset the sticky Navbar */}
        <AppRoutes />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTopButton />
    </div>
  );
}

export default App;
