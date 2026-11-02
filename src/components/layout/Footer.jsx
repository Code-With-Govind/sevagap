import { Link } from 'react-router-dom';
import {
  Layers,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Overview */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Seva<span className="text-blue-400">Gap</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mb-4">
              An empirical spatial analytics and decision-support platform assessing regional disparity and spatial accessibility in Education, Healthcare, and Drinking Water across Maharashtra.
            </p>
            <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/80 text-[11px] text-amber-300 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
              <p>
                <strong>Methodology Status:</strong> Active data collection, statistical cleaning, and GIS hospital coordinate validation in progress. Dashboard reflects architectural placeholders.
              </p>
            </div>
          </div>

          {/* Platform Sections */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Platform Modules
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Overview Dashboard
                </Link>
              </li>
              <li>
                <Link to="/district-analysis" className="text-slate-400 hover:text-white transition-colors">
                  District Comparison
                </Link>
              </li>
              <li>
                <Link to="/education" className="text-slate-400 hover:text-white transition-colors">
                  Education Analytics
                </Link>
              </li>
              <li>
                <Link to="/healthcare" className="text-slate-400 hover:text-white transition-colors">
                  Healthcare & GIS Map
                </Link>
              </li>
              <li>
                <Link to="/drinking-water" className="text-slate-400 hover:text-white transition-colors">
                  Drinking Water (JJM)
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors">
                  About Project & References
                </Link>
              </li>
            </ul>
          </div>

          {/* Official References */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Official Data Sources
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://udiseplus.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-400 hover:text-blue-400 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>UDISE+ – Unified District Information System for Education</span>
                </a>
              </li>
              <li>
                <a
                  href="https://ejalshakti.gov.in/jjmreport/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-400 hover:text-blue-400 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Jal Jeevan Mission – Ministry of Jal Shakti</span>
                </a>
              </li>
              <li>
                <a
                  href="https://data.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-400 hover:text-blue-400 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Government Data (OGD) Platform India</span>
                </a>
              </li>
              <li>
                <a
                  href="https://mahavillages.mahabhumi.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-400 hover:text-blue-400 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Maharashtra Village Directory (MahaVillages)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-6 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SevaGap Research Project. Developed for Maharashtra Public Policy & Spatial Equity.</p>
          <div className="flex items-center gap-4">
            <span>Built with React + Vite + Tailwind CSS</span>
            <span>•</span>
            <Link to="/about" className="hover:text-slate-300">
              Documentation & Stack
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
