import { HeroSection } from "@/components/ui/hero-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <HeroSection
        className="pt-8"
        title="Terms of Service"
        subtitle="Please read these terms carefully before using our services."
      />

      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Card className="shadow-lg">
          <CardHeader className="border-b-2 border-webBlue/20">
            <CardTitle className="text-2xl font-heading text-webBlue">
              Terms of Service for SV Nanometrology Pvt. Ltd.
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Last Updated: October 1, 2025
            </p>
          </CardHeader>

          <CardContent className="prose prose-slate max-w-none p-8 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-xl font-heading font-bold text-webBlue mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to SV Nanometrology Pvt. Ltd. ("Company," "we," "our," or
                "us"). These Terms of Service ("Terms") govern your access to and use
                of our website{" "}
                <a
                  href="https://svnanometrology.com"
                  className="text-webBlue hover:underline"
                >
                  svnanometrology.com
                </a>
                , products, and services (collectively, the "Services").
              </p>
              <p className="text-gray-700 leading-relaxed mt-3">
                By accessing or using our Services, you agree to be bound by these
                Terms and our Privacy Policy. If you do not agree to these Terms,
                please do not use our Services.
              </p>
            </section>

            {/* Services Description */}
            <section>
              <h2 className="text-xl font-heading font-bold text-webBlue mb-4">
                2. Services Description
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                SV Nanometrology Pvt. Ltd. provides:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  Precision dimension calibration services with ISO 17025 accreditation
                </li>
                <li>
                  High-precision mechanical gauges and measuring instruments
                </li>
                <li>Technical consultation and measurement solutions</li>
                <li>Calibration certificates and documentation</li>
                <li>After-sales support and technical assistance</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                We reserve the right to modify, suspend, or discontinue any aspect
                of our Services at any time without prior notice.
              </p>
            </section>

            {/* User Obligations */}
            <section>
              <h2 className="text-xl font-heading font-bold text-webBlue mb-4">
                3. User Obligations
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                When using our Services, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Use our Services only for lawful purposes</li>
                <li>
                  Not interfere with or disrupt the integrity of our Services
                </li>
                <li>
                  Not attempt to gain unauthorized access to our systems or networks
                </li>
                <li>
                  Comply with all applicable local, state, national, and international
                  laws
                </li>
                <li>
                  Not use our Services to transmit harmful, offensive, or illegal content
                </li>
              </ul>
            </section>

            {/* Orders and Payments */}
            <section>
              <h2 className="text-xl font-heading font-bold text-webBlue mb-4">
                4. Orders and Payments
              </h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                4.1 Order Acceptance
              </h3>
              <p className="text-gray-700 leading-relaxed">
                All orders are subject to acceptance by SV Nanometrology. We reserve
                the right to refuse or cancel any order for any reason, including
                product availability, errors in pricing or product information, or
                suspected fraudulent activity.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">
                4.2 Pricing
              </h3>
              <p className="text-gray-700 leading-relaxed">
                All prices are listed in Indian Rupees (INR) unless otherwise stated
                and are subject to change without notice. Prices do not include
                applicable taxes, shipping, or handling charges unless explicitly stated.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">
                4.3 Payment Terms
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Payment terms will be specified in your quotation or invoice. We
                accept various payment methods as communicated during the ordering
                process. Full payment must be received before delivery of products
                or completion of calibration services, unless credit terms have been
                pre-approved.
              </p>
            </section>

            {/* Calibration Services */}
            <section>
              <h2 className="text-xl font-heading font-bold text-webBlue mb-4">
                5. Calibration Services
              </h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                5.1 Service Standards
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our calibration services are performed in accordance with ISO 17025
                standards and applicable industry specifications. Calibration
                certificates are issued upon completion of services.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">
                5.2 Customer Responsibilities
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Customers are responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  Ensuring instruments are clean and safe for handling before submission
                </li>
                <li>Providing accurate specifications and calibration requirements</li>
                <li>Proper packaging and shipping of instruments to our facility</li>
                <li>
                  Notifying us of any special handling or safety requirements
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">
                5.3 Turnaround Time
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Standard turnaround times will be communicated at the time of order.
                We strive to meet estimated delivery dates but cannot guarantee
                specific timeframes due to factors beyond our control.
              </p>
            </section>

            {/* Product Warranties */}
            <section>
              <h2 className="text-xl font-heading font-bold text-webBlue mb-4">
                6. Product Warranties
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Products sold by SV Nanometrology are covered by manufacturer
                warranties as specified in product documentation. We warrant that:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  Products will conform to published specifications at the time of delivery
                </li>
                <li>
                  Products are free from defects in materials and workmanship under
                  normal use
                </li>
                <li>
                  Calibration services meet ISO 17025 accreditation requirements
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                Warranty claims must be made within the specified warranty period.
                Our liability is limited to repair, replacement, or refund at our
                discretion.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-xl font-heading font-bold text-webBlue mb-4">
                7. Limitation of Liability
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                To the maximum extent permitted by law:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  We shall not be liable for any indirect, incidental, special,
                  consequential, or punitive damages
                </li>
                <li>
                  Our total liability shall not exceed the amount paid by you for
                  the specific product or service giving rise to the claim
                </li>
                <li>
                  We are not liable for delays or failures due to circumstances
                  beyond our reasonable control
                </li>
                <li>
                  We do not warrant that our Services will be uninterrupted,
                  error-free, or secure
                </li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-xl font-heading font-bold text-webBlue mb-4">
                8. Intellectual Property Rights
              </h2>
              <p className="text-gray-700 leading-relaxed">
                All content on our website, including text, graphics, logos, images,
                software, and documentation, is the property of SV Nanometrology or
                its licensors and is protected by intellectual property laws. You may
                not reproduce, distribute, modify, or create derivative works without
                our express written permission.
              </p>
            </section>

            {/* Confidentiality */}
            <section>
              <h2 className="text-xl font-heading font-bold text-webBlue mb-4">
                9. Confidentiality
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We respect the confidentiality of customer information and technical
                data. Both parties agree to maintain confidentiality of proprietary
                information disclosed during the course of business. This obligation
                survives termination of the business relationship.
              </p>
            </section>

            {/* Returns and Cancellations */}
            <section>
              <h2 className="text-xl font-heading font-bold text-webBlue mb-4">
                10. Returns and Cancellations
              </h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                10.1 Product Returns
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Products may be returned within 15 days of delivery if unused and in
                original packaging. Custom-manufactured or calibrated products are
                non-returnable unless defective. Return shipping costs are the
                responsibility of the customer unless the return is due to our error.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">
                10.2 Service Cancellations
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Calibration service orders may be cancelled before work commences.
                Once calibration has begun, cancellation fees may apply to cover
                work performed and administrative costs.
              </p>
            </section>

            {/* Indemnification */}
            <section>
              <h2 className="text-xl font-heading font-bold text-webBlue mb-4">
                11. Indemnification
              </h2>
              <p className="text-gray-700 leading-relaxed">
                You agree to indemnify, defend, and hold harmless SV Nanometrology,
                its officers, directors, employees, and agents from any claims,
                liabilities, damages, losses, and expenses arising from your use of
                our Services, violation of these Terms, or infringement of any rights
                of third parties.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-xl font-heading font-bold text-webBlue mb-4">
                12. Governing Law and Jurisdiction
              </h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms shall be governed by and construed in accordance with
                the laws of India. Any disputes arising from these Terms or use of
                our Services shall be subject to the exclusive jurisdiction of the
                courts in Faridabad, Haryana, India.
              </p>
            </section>

            {/* Dispute Resolution */}
            <section>
              <h2 className="text-xl font-heading font-bold text-webBlue mb-4">
                13. Dispute Resolution
              </h2>
              <p className="text-gray-700 leading-relaxed">
                In the event of any dispute, both parties agree to first attempt to
                resolve the matter through good faith negotiations. If resolution
                cannot be reached within 30 days, the dispute may be submitted to
                arbitration in accordance with the Arbitration and Conciliation Act, 1996.
              </p>
            </section>

            {/* Severability */}
            <section>
              <h2 className="text-xl font-heading font-bold text-webBlue mb-4">
                14. Severability
              </h2>
              <p className="text-gray-700 leading-relaxed">
                If any provision of these Terms is found to be invalid or
                unenforceable, the remaining provisions shall continue in full force
                and effect. The invalid provision shall be replaced with a valid
                provision that most closely reflects the original intent.
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-xl font-heading font-bold text-webBlue mb-4">
                15. Modifications to Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms at any time. Changes will
                be effective immediately upon posting to our website. Your continued
                use of our Services after changes are posted constitutes acceptance
                of the modified Terms. We encourage you to review these Terms
                periodically.
              </p>
            </section>

            {/* Contact Information */}
            <section className="bg-webBlue/5 p-6 rounded-lg border-l-4 border-webBlue">
              <h2 className="text-xl font-heading font-bold text-webBlue mb-4">
                16. Contact Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions or concerns about these Terms of Service,
                please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>SV Nanometrology Pvt. Ltd.</strong>
                </p>
                <p>
                  Plot No. E-3, Friends Industrial Complex,
                  <br />
                  Sanjay Colony, Sector 23, Faridabad,
                  <br />
                  Haryana, India (121005)
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:info@svnanometrology.com"
                    className="text-webBlue hover:underline"
                  >
                    info@svnanometrology.com
                  </a>
                </p>
                <p>
                  <strong>Phone:</strong> +91 98732 67048
                </p>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="bg-emerald/10 p-6 rounded-lg border-l-4 border-emerald">
              <h2 className="text-xl font-heading font-bold text-emerald mb-4">
                Acknowledgment
              </h2>
              <p className="text-gray-700 leading-relaxed">
                By using our Services, you acknowledge that you have read,
                understood, and agree to be bound by these Terms of Service and our
                Privacy Policy. Thank you for choosing SV Nanometrology Pvt. Ltd.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
