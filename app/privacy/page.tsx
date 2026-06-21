export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <div className="border-b border-zinc-200 pb-6">
        <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Legal & Compliance</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-zinc-500">Last updated: June 21, 2026</p>
      </div>

      <div className="mt-8 space-y-8 text-sm leading-7 text-zinc-600">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-950">1. Introduction & Scope</h2>
          <p>
            Welcome to Soonbird Inc. (&ldquo;Soonbird,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). We are committed to protecting your personal information and your right to privacy. This Privacy Policy governs the collection, processing, and storage of personal data across all of our services, including our primary platform at <span className="font-medium text-zinc-900">soonbird.com</span>, and all of our subsidiary websites, product waitlists, and subdomains (collectively, the &ldquo;Services&rdquo;).
          </p>
          <p>
            By using our Services, submitting your email address, or participating in any of our product waitlists, you consent to the data practices described in this policy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-950">2. Information We Collect</h2>
          <p>
            We collect information that you voluntarily provide to us when you register interest in our upcoming products, sign up for a waitlist, or communicate with us. This includes:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-zinc-900">Contact Information:</strong> Your email address and any other contact details you submit.</li>
            <li><strong className="text-zinc-900">Marketing & Attribution Data:</strong> Referral URLs, UTM parameters (source, medium, campaign, content, term), and landing path history to measure the performance of our marketing campaigns.</li>
            <li><strong className="text-zinc-900">Technical Data:</strong> Internet Protocol (IP) addresses (processed securely via one-way cryptographic hashing), browser user agent strings, and device operating system details.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-950">3. How We Use Your Information</h2>
          <p>
            Soonbird Inc. processes your personal data for legitimate business interests and to fulfill our commitments to you. Specifically, we use your data to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Provide you with product updates, beta-testing invitations, and launch announcements regarding the specific Services or subsidiary products you registered interest in.</li>
            <li>Optimize, analyze, and improve our marketing campaigns, user acquisition strategies, and overall platform performance.</li>
            <li>Maintain the security and integrity of our Services, including detecting and preventing spam, fraudulent signups, and malicious activity.</li>
            <li>Comply with applicable legal obligations, regulatory requirements, or law enforcement requests.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-950">4. Data Sharing and Disclosure</h2>
          <p>
            We do not sell, rent, or lease your personal information to third parties. We may share your data only in the following limited circumstances:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-zinc-900">Service Providers:</strong> With trusted third-party vendors, hosting providers, and database services (such as Supabase and Vercel) who perform services on our behalf and are bound by strict confidentiality agreements.</li>
            <li><strong className="text-zinc-900">Business Transfers:</strong> In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
            <li><strong className="text-zinc-900">Legal Requirements:</strong> If required to do so by law, court order, or government authority, or in the good faith belief that such action is necessary to protect the rights, property, or safety of Soonbird Inc., our users, or the public.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-950">5. Data Security & Retention</h2>
          <p>
            We implement industry-standard administrative, technical, and physical security measures designed to safeguard your personal data from unauthorized access, disclosure, alteration, or destruction. However, please be aware that no method of transmission over the Internet or electronic storage is 100% secure.
          </p>
          <p>
            We retain your personal data only for as long as is necessary to fulfill the purposes outlined in this Privacy Policy, or until you request its deletion.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-950">6. Your Rights & Choices</h2>
          <p>
            Depending on your geographic location (including the European Economic Area under GDPR, and California under CCPA), you may have certain rights regarding your personal data:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>The right to access, update, or correct the personal information we hold about you.</li>
            <li>The right to request that we delete your personal information from our active databases.</li>
            <li>The right to object to or restrict our processing of your data.</li>
            <li>The right to opt-out of marketing communications at any time by clicking the &ldquo;unsubscribe&rdquo; link in our emails.</li>
          </ul>
          <p>
            To exercise any of these rights, please contact our privacy compliance team at <span className="font-medium text-zinc-900">privacy@soonbird.com</span>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-950">7. International Data Transfers</h2>
          <p>
            Soonbird Inc. is headquartered in India. Your information may be transferred to, stored, and processed in India and other countries where our service providers operate. By using our Services, you consent to this transfer, storage, and processing.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-950">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal obligations. We will notify you of any material changes by posting the updated policy on this page and updating the &ldquo;Last updated&rdquo; date at the top. Your continued use of our Services after such changes constitutes your acceptance of the revised policy.
          </p>
        </section>

        <section className="space-y-3 border-t border-zinc-200 pt-6">
          <h2 className="text-lg font-semibold text-zinc-950">9. Contact Us</h2>
          <p>
            If you have any questions, concerns, or complaints regarding this Privacy Policy or our data handling practices, please contact us at:
          </p>
          <div className="mt-3 rounded-xl border border-zinc-200 bg-zinc-50 p-5 text-zinc-700">
            <p className="font-semibold text-zinc-950">Soonbird Inc.</p>
            <p>Attn: Privacy & Compliance Department</p>
            <p>G-12, Block A, Kamat Complex</p>
            <p>Caranzalem, Panaji, Goa 403002</p>
            <p>India</p>
            <p className="mt-2">Email: <span className="font-medium text-zinc-900">privacy@soonbird.com</span></p>
          </div>
        </section>
      </div>
    </main>
  );
}
