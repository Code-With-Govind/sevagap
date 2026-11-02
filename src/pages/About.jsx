import {
  Compass,
  AlertTriangle,
  Target,
  Globe2,
  Workflow,
  Database,
  Cpu,
  Layers,
  ExternalLink,
  CheckCircle,
  Sparkles,
} from 'lucide-react';
import { ABOUT_SECTIONS } from '../data/aboutData';

export default function About() {
  const {
    projectOverview,
    problemStatement,
    projectObjectives,
    projectScope,
    methodology,
    dataSources,
    technologyStack,
    limitationsAndFutureScope,
  } = ABOUT_SECTIONS;

  return (
    <div className="space-y-12 max-w-5xl mx-auto pb-8">
      {/* Page Title & Mission Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5" />
            Project Documentation & Methodology
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            About <span className="text-blue-400">SevaGap</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            SevaGap is an empirical spatial analytics and regional disparity benchmarking platform developed for Maharashtra state, assessing equity and physical accessibility across School Education, Healthcare, and Drinking Water.
          </p>

          <div className="mt-6 pt-6 border-t border-slate-700/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block">Territory:</span>
              <span className="font-semibold text-white">Maharashtra (36 Districts)</span>
            </div>
            <div>
              <span className="text-slate-400 block">Focal Sectors:</span>
              <span className="font-semibold text-white">Education, Health, Water</span>
            </div>
            <div>
              <span className="text-slate-400 block">Analytical Framework:</span>
              <span className="font-semibold text-white">GIS Spatial Buffer + CGI</span>
            </div>
            <div>
              <span className="text-slate-400 block">Integration Phase:</span>
              <span className="font-semibold text-emerald-400">Data Curation Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Project Overview */}
      <section id="project-overview" className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
        <div className="flex items-center gap-2.5 text-blue-600 mb-2">
          <Layers className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Section 01</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-3">
          {projectOverview.title}
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          {projectOverview.summary}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {projectOverview.highlights.map((item, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200/70 rounded-lg p-4">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wide block mb-1">
                {item.label}
              </span>
              <p className="text-xs text-slate-600">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Problem Statement */}
      <section id="problem-statement" className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
        <div className="flex items-center gap-2.5 text-amber-600 mb-2">
          <AlertTriangle className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Section 02</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
          {problemStatement.title}
        </h2>
        <p className="text-xs font-medium text-amber-700 mb-4">{problemStatement.subtitle}</p>

        <div className="space-y-3 mb-6 text-sm text-slate-600 leading-relaxed">
          {problemStatement.content.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {problemStatement.points.map((pt, idx) => (
            <div key={idx} className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <h4 className="text-xs font-bold uppercase tracking-wide text-slate-900 mb-1.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                {pt.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">{pt.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Project Objectives */}
      <section id="project-objectives" className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
        <div className="flex items-center gap-2.5 text-indigo-600 mb-2">
          <Target className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Section 03</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
          {projectObjectives.title}
        </h2>
        <p className="text-xs text-slate-500 mb-6">{projectObjectives.subtitle}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {projectObjectives.objectives.map((obj, idx) => (
            <div key={idx} className="flex gap-4 p-4 rounded-xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50">
              <span className="text-2xl font-black text-indigo-600/40 shrink-0 font-mono">
                {obj.number}
              </span>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">{obj.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{obj.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Project Scope */}
      <section id="project-scope" className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
        <div className="flex items-center gap-2.5 text-sky-600 mb-2">
          <Globe2 className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Section 04</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
          {projectScope.title}
        </h2>
        <p className="text-xs text-slate-500 mb-6">{projectScope.subtitle}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projectScope.scopeItems.map((item, idx) => (
            <div key={idx} className="p-4 rounded-lg border border-slate-200 bg-white">
              <span className="text-xs font-bold text-slate-900 block mb-1">
                {item.category}
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">{item.details}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Methodology */}
      <section id="methodology" className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
        <div className="flex items-center gap-2.5 text-emerald-600 mb-2">
          <Workflow className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Section 05</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
          {methodology.title}
        </h2>
        <p className="text-xs text-slate-500 mb-6">{methodology.subtitle}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {methodology.steps.map((st, idx) => (
            <div key={idx} className="relative p-4 rounded-xl border border-slate-200 bg-slate-50/40">
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-100 text-blue-800 mb-2">
                {st.step}
              </span>
              <h4 className="text-xs font-bold text-slate-900 mb-1">{st.name}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{st.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Data Sources and References */}
      <section id="data-sources" className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5 text-blue-600">
            <Database className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Section 06</span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Official Portals
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
          {dataSources.title}
        </h2>
        <p className="text-xs text-slate-500 mb-6">{dataSources.subtitle}</p>

        <div className="space-y-4">
          {dataSources.sources.map((source, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-xl border transition-all ${
                source.inProgress
                  ? 'border-amber-200 bg-amber-50/30'
                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-blue-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-sm font-bold text-slate-900">{source.name}</h3>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        source.inProgress
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {source.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{source.department}</p>
                </div>

                {source.url !== '#' && (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors shrink-0 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs"
                  >
                    <span>Visit Source Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mt-2">{source.description}</p>
              {source.url !== '#' && (
                <div className="mt-2 text-[11px] font-mono text-slate-400 truncate">
                  URL: {source.url}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. Technology Stack */}
      <section id="technology-stack" className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
        <div className="flex items-center gap-2.5 text-purple-600 mb-2">
          <Cpu className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Section 07</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
          {technologyStack.title}
        </h2>
        <p className="text-xs text-slate-500 mb-6">{technologyStack.subtitle}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {technologyStack.categories.map((cat, idx) => (
            <div key={idx} className="border border-slate-200 rounded-xl p-5 bg-white">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 pb-2 border-b border-slate-100">
                {cat.name}
              </h3>
              <ul className="space-y-2.5">
                {cat.techs.map((tech, tIdx) => (
                  <li key={tIdx} className="text-xs flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-slate-800">{tech.name}: </strong>
                      <span className="text-slate-500">{tech.role}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Limitations and Future Scope */}
      <section id="limitations-future-scope" className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
        <div className="flex items-center gap-2.5 text-rose-600 mb-2">
          <Sparkles className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Section 08</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
          {limitationsAndFutureScope.title}
        </h2>
        <p className="text-xs text-slate-500 mb-6">{limitationsAndFutureScope.subtitle}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Limitations */}
          <div className="p-5 rounded-xl border border-rose-200/80 bg-rose-50/20">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-800 mb-3 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              Methodological & Analytical Caveats
            </h3>
            <ul className="space-y-3">
              {limitationsAndFutureScope.limitations.map((item, idx) => (
                <li key={idx} className="text-xs text-slate-600 flex items-start gap-2 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Future Scope */}
          <div className="p-5 rounded-xl border border-emerald-200/80 bg-emerald-50/20">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-3 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Planned Enhancements & Roadmap
            </h3>
            <ul className="space-y-3">
              {limitationsAndFutureScope.futureScope.map((item, idx) => (
                <li key={idx} className="text-xs text-slate-600 flex items-start gap-2 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
