import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Route-level code-splitting
const Home = lazy(() => import('./pages/Home'));
const DistrictAnalysis = lazy(() => import('./pages/DistrictAnalysis'));
const Education = lazy(() => import('./pages/Education'));
const Healthcare = lazy(() => import('./pages/Healthcare'));
const DrinkingWater = lazy(() => import('./pages/DrinkingWater'));
const About = lazy(() => import('./pages/About'));

function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-3">
      <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
      <span className="text-xs text-slate-500 font-medium">Loading SevaGap Dashboard...</span>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Suspense fallback={<PageLoader />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="district-analysis"
            element={
              <Suspense fallback={<PageLoader />}>
                <DistrictAnalysis />
              </Suspense>
            }
          />
          <Route
            path="education"
            element={
              <Suspense fallback={<PageLoader />}>
                <Education />
              </Suspense>
            }
          />
          <Route
            path="healthcare"
            element={
              <Suspense fallback={<PageLoader />}>
                <Healthcare />
              </Suspense>
            }
          />
          <Route
            path="drinking-water"
            element={
              <Suspense fallback={<PageLoader />}>
                <DrinkingWater />
              </Suspense>
            }
          />
          <Route
            path="about"
            element={
              <Suspense fallback={<PageLoader />}>
                <About />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
