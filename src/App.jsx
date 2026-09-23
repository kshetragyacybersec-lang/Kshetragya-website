import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import PageTransition from './components/PageTransition.jsx';
import Home from './pages/Home.jsx';

// Home is loaded eagerly for a fast first paint; other pages are code-split.
const ServiceDetail = lazy(() => import('./pages/ServiceDetail.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Careers = lazy(() => import('./pages/Careers.jsx'));
const Blog = lazy(() => import('./pages/Blog.jsx'));
const BlogPost = lazy(() => import('./pages/BlogPost.jsx'));
const CaseStudies = lazy(() => import('./pages/CaseStudies.jsx'));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail.jsx'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.jsx'));
const TermsOfService = lazy(() => import('./pages/TermsOfService.jsx'));
const ResponsibleDisclosure = lazy(() => import('./pages/ResponsibleDisclosure.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function PublicSite() {
  const location = useLocation();
  return (
    <>
      <Nav />
      <main id="main-content" className="site-main">
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route
            path="/services/:slug"
            element={
              <PageTransition>
                <Suspense fallback={null}><ServiceDetail /></Suspense>
              </PageTransition>
            }
          />
          <Route path="/about" element={<PageTransition><Suspense fallback={null}><About /></Suspense></PageTransition>} />
          <Route path="/careers" element={<PageTransition><Suspense fallback={null}><Careers /></Suspense></PageTransition>} />
          <Route path="/blog" element={<PageTransition><Suspense fallback={null}><Blog /></Suspense></PageTransition>} />
          <Route path="/blog/:slug" element={<PageTransition><Suspense fallback={null}><BlogPost /></Suspense></PageTransition>} />
          <Route
            path="/case-studies"
            element={
              <PageTransition>
                <Suspense fallback={null}><CaseStudies /></Suspense>
              </PageTransition>
            }
          />
          <Route
            path="/case-studies/:slug"
            element={
              <PageTransition>
                <Suspense fallback={null}><CaseStudyDetail /></Suspense>
              </PageTransition>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <PageTransition>
                <Suspense fallback={null}><PrivacyPolicy /></Suspense>
              </PageTransition>
            }
          />
          <Route
            path="/terms-of-service"
            element={
              <PageTransition>
                <Suspense fallback={null}><TermsOfService /></Suspense>
              </PageTransition>
            }
          />
          <Route
            path="/responsible-disclosure"
            element={
              <PageTransition>
                <Suspense fallback={null}><ResponsibleDisclosure /></Suspense>
              </PageTransition>
            }
          />
          <Route path="*" element={<PageTransition><Suspense fallback={null}><NotFound /></Suspense></PageTransition>} />
        </Routes>
      </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return <PublicSite />;
}
