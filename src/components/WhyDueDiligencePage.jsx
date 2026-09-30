import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Target, 
  Users, 
  Code2, 
  Award, 
  Rocket, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Briefcase,
  GraduationCap,
  Laptop,
  Lightbulb,
  Layers,
  HeartHandshake
} from 'lucide-react';

const WhyDueDiligencePage = ({ onOpenApply, onNavigate }) => {
  const pillars = [
    {
      icon: Code2,
      title: "100% Practical & Project-First",
      tag: "Real-World Experience",
      color: "from-blue-600 to-indigo-600",
      description: "We don't teach passive theory. From your very first week, you write production-grade code, architect cloud databases, build interactive AI assistants, and deploy live applications that employers can inspect."
    },
    {
      icon: Users,
      title: "1:1 Expert Mentorship & Small Cohorts",
      tag: "Personalized Growth",
      color: "from-cyan-600 to-blue-600",
      description: "Learn directly from active industry engineers and tech leaders. Our small cohort sizes guarantee personalized code reviews, live troubleshooting, and dedicated career guidance tailored to your goals."
    },
    {
      icon: GraduationCap,
      title: "Dual-Track Ecosystem",
      tag: "Pros & Grade 1-12",
      color: "from-purple-600 to-indigo-600",
      description: "We are unique in bridging the gap across all generations. From foundational coding and robotics for Grade 1–12 students to advanced Software Engineering and Cloud DevOps for working professionals."
    },
    {
      icon: ShieldCheck,
      title: "Modern, Future-Proof Curriculums",
      tag: "Cutting-Edge Tech",
      color: "from-emerald-600 to-teal-600",
      description: "Our syllabus is continuously updated with the latest advancements in Generative AI, Retrieval-Augmented Generation (RAG), Cloud Architecture (AWS/Azure), Cyber Threat Defense, and Modern Web stacks."
    },
    {
      icon: Briefcase,
      title: "Career & Portfolio Readiness",
      tag: "Employability Focus",
      color: "from-amber-600 to-orange-600",
      description: "Graduate with an impressive multi-project GitHub portfolio, optimized LinkedIn presence, polished resume, and confidence gained through mock technical interviews."
    },
    {
      icon: Rocket,
      title: "Vibrant Innovation Community",
      tag: "Lifelong Network",
      color: "from-rose-600 to-red-600",
      description: "Join an ambitious network of fellow builders, developers, founders, and mentors. Collaborate on hackathons, find project partners, and access exclusive industry opportunities."
    }
  ];

  const stats = [
    { number: "100%", label: "Hands-on Project Labs", desc: "Build real enterprise software" },
    { number: "1 : 1", label: "Mentor-to-Student Guidance", desc: "Dedicated feedback on your code" },
    { number: "Grade 1-12", label: "Youth STEM Pathways", desc: "Starting early from Scratch to AI" },
    { number: "7+", label: "High-Demand Specializations", desc: "Engineered for modern careers" }
  ];

  const comparison = [
    { feature: "Curriculum Approach", traditional: "Rote memorization & slides", dueDiligence: "Production projects & live deployment" },
    { feature: "Instructors", traditional: "Academic lecturers", dueDiligence: "Active software engineers & tech practitioners" },
    { feature: "Student Support", traditional: "Crowded lecture halls with no 1:1 help", dueDiligence: "Small cohorts with direct mentorship & code reviews" },
    { feature: "Modern Tech (AI/Cloud)", traditional: "Outdated legacy syllabus", dueDiligence: "Cutting-edge tools: PyTorch, Docker, AWS, React, LLMs" },
    { feature: "Youth Education (Grade 1–12)", traditional: "Generic computer appreciation", dueDiligence: "Real apps (Thunkable), Robotics, AI & Game Dev" },
    { feature: "Outcome", traditional: "Paper certificate with no live portfolio", dueDiligence: "Deployable live applications & career readiness" }
  ];

  return (
    <div className="pt-20 bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-16 sm:py-24">
        {/* Glow Backdrops */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-blue-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-5">
              <Sparkles size={16} className="text-amber-400" />
              <span>The Due Diligence Advantage</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 max-w-4xl mx-auto leading-tight">
              Why Choose <span className="text-primary">Due Diligence</span> Technologies?
            </h1>

            <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto mb-8 font-light leading-relaxed">
              In a rapidly transforming digital world, generic courses are not enough. We provide rigorous, hands-on, high-standard technology training engineered to turn aspiring learners and young innovators into confident creators.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onOpenApply()}
                className="px-8 py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-[0_0_25px_rgba(5,111,236,0.5)] hover:shadow-[0_0_35px_rgba(5,111,236,0.8)] transition-all hover:scale-105 cursor-pointer text-sm uppercase tracking-wider"
              >
                Apply for Admission
              </button>
              <button
                onClick={() => {
                  if (onNavigate) onNavigate('young-coders');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-lg transition-all hover:scale-105 cursor-pointer text-sm uppercase tracking-wider flex items-center gap-2"
              >
                <Sparkles size={16} />
                <span>Explore Young Coders (Grade 1–12)</span>
              </button>
            </div>
          </motion.div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-14 pt-8 border-t border-slate-800">
            {stats.map((stat, idx) => (
              <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 text-left">
                <p className="text-2xl sm:text-4xl font-black text-primary mb-1">{stat.number}</p>
                <p className="text-xs sm:text-sm font-bold text-white mb-1">{stat.label}</p>
                <p className="text-xs text-slate-400">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission & Philosophy */}
      <section className="py-14 sm:py-18 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-3">
                <Target size={14} />
                <span>Our Core Philosophy</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
                "Due Diligence" Means Leaving No Skill to Chance
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                In business and engineering, <em>due diligence</em> represents the thorough, comprehensive investigation required before making high-stakes commitments.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                We apply this exact standard to tech education. We rigorously vet our curriculums against current global hiring trends, ensuring that every module, lab exercise, and capstone project directly equips you with the in-demand skills needed to thrive in modern industry.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary flex-shrink-0 mt-1" size={20} />
                  <div>
                    <strong className="text-slate-900 text-sm block">Zero-Fluff, Practical Mastery</strong>
                    <span className="text-xs text-slate-600">Every lesson translates directly into demonstrable code and portfolio assets.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary flex-shrink-0 mt-1" size={20} />
                  <div>
                    <strong className="text-slate-900 text-sm block">Future-Proof AI & Cloud Standards</strong>
                    <span className="text-xs text-slate-600">We train you on the tools reshaping tomorrow—not the technologies of yesterday.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary flex-shrink-0 mt-1" size={20} />
                  <div>
                    <strong className="text-slate-900 text-sm block">Lifelong Career & Mentorship Bridge</strong>
                    <span className="text-xs text-slate-600">Our relationship doesn't end at graduation; we support your continuous advancement.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Box */}
            <div className="relative">
              <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 to-blue-950 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-primary/30 rounded-full blur-2xl pointer-events-none" />
                <h3 className="text-2xl font-bold mb-4">The Due Diligence Standard</h3>
                <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                  Whether you are a university graduate transitioning to software engineering, a career professional upskilling in Artificial Intelligence, or a parent empowering your child in Grade 1–12, our structured roadmap ensures complete success.
                </p>
                <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-medium">Hands-on Code & Labs</span>
                    <span className="text-amber-400 font-bold">100%</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full w-full rounded-full" />
                  </div>
                  <div className="flex justify-between items-center text-xs pt-2">
                    <span className="text-slate-300 font-medium">Curriculum Relevance to Industry</span>
                    <span className="text-primary font-bold">100%</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-full rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Core Pillars Grid */}
      <section className="py-14 sm:py-18 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck size={16} />
              <span>Pillars of Excellence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Built on 6 Uncompromising Standards
            </h2>
            <p className="text-base text-slate-600">
              How our structured learning framework guarantees real, measurable career and technical outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, index) => {
              const IconComp = pillar.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="bg-white p-7 rounded-3xl border border-slate-200/80 hover:border-primary/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-13 h-13 rounded-2xl bg-blue-50 border border-blue-100 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-xs">
                      <IconComp size={26} />
                    </div>
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full">
                      {pillar.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mt-auto">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-14 sm:py-18 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-primary tracking-widest uppercase mb-2">How We Compare</h2>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Due Diligence vs Traditional Learning
            </h3>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-4 sm:p-5 text-xs sm:text-sm font-bold uppercase tracking-wider">Feature</th>
                  <th className="p-4 sm:p-5 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400">Traditional Programs</th>
                  <th className="p-4 sm:p-5 text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400 bg-slate-800">Due Diligence Standard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-700">
                {comparison.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="p-4 sm:p-5 font-bold text-slate-900">{row.feature}</td>
                    <td className="p-4 sm:p-5 text-slate-500">{row.traditional}</td>
                    <td className="p-4 sm:p-5 font-semibold text-primary bg-blue-50/40">{row.dueDiligence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-12 sm:py-16 bg-slate-900 text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-4 tracking-tight">
            Ready to Experience the Due Diligence Standard?
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Take the next step in your technology journey. Join our upcoming cohort and start building real-world software today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenApply()}
              className="px-8 py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg transition-all hover:scale-105 cursor-pointer text-sm uppercase tracking-wider"
            >
              Apply for Next Cohort
            </button>
            <button
              onClick={() => {
                if (onNavigate) onNavigate('home');
                setTimeout(() => {
                  const el = document.getElementById('services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl transition-all cursor-pointer text-sm"
            >
              View Professional Courses
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyDueDiligencePage;
