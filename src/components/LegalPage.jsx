import React from 'react';
import { ShieldCheck, FileText } from 'lucide-react';

const EMAIL = 'hello@duediligence.tech';
const PHONE = '09039982165';
const UPDATED = 'October 2026';

const privacy = {
  title: 'Privacy Policy',
  icon: ShieldCheck,
  intro:
    'Duediligence Technologies ("we", "us") respects your privacy. This policy explains what personal data we collect through this website, why we collect it, and your rights.',
  sections: [
    {
      heading: '1. Information we collect',
      body: [
        'Contact and application forms: your full name, email address, phone number, gender (application form only), selected course, learning mode and any message you write.',
        'Technical data: basic security and anti-spam signals processed by Cloudflare Turnstile, and your cookie preference stored in your browser.'
      ]
    },
    {
      heading: '2. How we use your information',
      body: [
        'To respond to enquiries, process course applications and communicate about admissions, payments and schedules.',
        'To protect the website and our forms from spam, abuse and fraud.',
        'We do not sell your personal data.'
      ]
    },
    {
      heading: '3. Third-party services',
      body: [
        'Web3Forms delivers your form submissions to our email. Cloudflare Turnstile helps us block automated abuse. Google Fonts serves our typefaces. These providers process limited data under their own privacy policies.'
      ]
    },
    {
      heading: '4. Cookies and local storage',
      body: [
        'We use essential cookies and browser storage to keep the site secure and to remember your cookie choice. Currently we do not run advertising or analytics cookies. If that changes, we will ask for your consent first.'
      ]
    },
    {
      heading: '5. Retention and security',
      body: [
        'We keep enquiry and application data only as long as needed for admissions and record keeping, and delete it on request where the law allows. We use HTTPS, security headers, spam protection and restricted access to protect your data, but no online system is completely risk-free.'
      ]
    },
    {
      heading: '6. Your rights',
      body: [
        'You may request access to, correction of, or deletion of your personal data, or withdraw consent at any time. We handle data in line with applicable data protection laws, including the Nigeria Data Protection Act (NDPA).'
      ]
    },
    {
      heading: '7. Children',
      body: [
        'Our Young Coders Academy serves learners under 18. Applications for minors must be submitted by a parent or guardian, who is responsible for the information provided.'
      ]
    }
  ]
};

const terms = {
  title: 'Terms of Service',
  icon: FileText,
  intro:
    'By using this website or applying to a Duediligence Technologies programme, you agree to these terms and to the Student Agreement & Training Terms.',
  sections: [
    {
      heading: '1. Website use',
      body: [
        'You agree to use this site lawfully and not to attempt to disrupt it, submit false or automated enquiries, or access areas you are not authorised to use.'
      ]
    },
    {
      heading: '2. Applications and enrolment',
      body: [
        'Submitting an application expresses interest and does not guarantee a place. Admission is confirmed by us after review and, where applicable, payment of tuition. Information you provide must be accurate and complete.'
      ]
    },
    {
      heading: '3. Fees and payments',
      body: [
        'Course fees, duration and schedules are shown on the website and may be updated. Payments are made only to official Duediligence Technologies channels communicated to you directly. We will never ask you to pay to a personal account or via unofficial social media accounts.'
      ]
    },
    {
      heading: '4. Student conduct',
      body: [
        'Students agree to follow school rules, attend sessions respectfully, respect other learners and instructors, and avoid plagiarism or misuse of course materials.'
      ]
    },
    {
      heading: '5. Intellectual property',
      body: [
        'All website content, curriculum and course materials belong to Duediligence Technologies or its licensors and may not be copied, redistributed or resold without written permission.'
      ]
    },
    {
      heading: '6. Liability',
      body: [
        'We aim for accurate, up-to-date information but provide the website "as is". To the extent permitted by law, we are not liable for indirect or consequential losses arising from use of the site. Training outcomes depend on individual effort and are not guaranteed.'
      ]
    },
    {
      heading: '7. Changes',
      body: [
        'We may update these terms and our Privacy Policy from time to time. Continued use of the site means you accept the updated terms.'
      ]
    }
  ]
};

const LegalPage = ({ type = 'privacy', onNavigate }) => {
  const doc = type === 'terms' ? terms : privacy;
  const Icon = doc.icon;
  const other = type === 'terms' ? 'privacy' : 'terms';
  const otherLabel = type === 'terms' ? 'Privacy Policy' : 'Terms of Service';

  return (
    <div className="pt-20 bg-white">
      <section className="relative overflow-hidden bg-slate-900 text-white py-14 sm:py-16">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/20 border border-primary/40 text-primary flex items-center justify-center">
            <Icon size={28} />
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">{doc.title}</h1>
          <p className="text-sm text-slate-400">Last updated: {UPDATED}</p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-base text-slate-600 leading-relaxed mb-10">{doc.intro}</p>

          <div className="space-y-8">
            {doc.sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-xl font-bold text-slate-900 mb-3">{s.heading}</h2>
                <div className="space-y-3">
                  {s.body.map((p, i) => (
                    <p key={i} className="text-sm sm:text-base text-slate-600 leading-relaxed">{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-2">Contact us</h2>
            <p className="text-sm text-slate-600">
              Questions or requests about this document: <strong>{EMAIL}</strong> or <strong>{PHONE}</strong>.
            </p>
            <button
              onClick={() => {
                if (onNavigate) onNavigate(other);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mt-4 text-sm font-bold text-primary hover:underline cursor-pointer"
            >
              Read our {otherLabel}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LegalPage;
