import { HeroSection } from "@/components/ui/hero-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <HeroSection
        className="pt-8"
        title="Privacy Policy"
        subtitle="Your privacy is important to us. Learn how we collect, use, and protect your information."
      />

      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Card className="shadow-lg">
          <CardHeader className="border-b-2 border-webBlue/20">
            <CardTitle className="text-2xl font-heading text-webBlue">
              Privacy Policy for SV Nanometrology Pvt. Ltd.
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Last Updated: October 1, 2025
            </p>
          </CardHeader>

          <CardContent className="prose prose-slate max-w-none p-8 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-xl font-heading font-bold text-webBlue mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed">
                SV Nanometrology Pvt. Ltd. ("we," "our," or "us") is committed to
                protecting your privacy. This Privacy Policy explains how we collect,
                use, disclose, and safeguard your information when you visit our
                website{" "}
                <a
                  href="https://svnanometrology.com"
                  className="text-webBlue hover:underline"
                >
                  svnanometrology.com
                </a>{" "}
                or use our services.
              </p>
              <p className="text-gray-700 leading-relaxed mt-3">
                By accessing or using our website and services, you agree to the
                terms of this Privacy Policy. If you do not agree with the terms,
                please do not access or use our services.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-xl font-heading font-bold text-webBlue mb-4">
                2. Information We Collect
              </h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                2.1 Personal Information
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                We may collect personal information that you voluntarily provide to
                us when you:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Fill out contact forms on our website</li>
                <li>Request quotes or product information</li>
                <li>Subscribe to our newsletters or communications</li>
                <li>Register for services or calibration requests</li>
                <li>Communicate with us via email or phone</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                This information may include: name, email address, phone number,
                company name, job title, postal address, and any other information
                you choose to provide.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">
                2.2 Automatically Collected Information
              </h3>
              <p className="text-gray-700 leading-relaxed">
                When you visit our website, we may automatically collect certain
                information about your device and browsing activity, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mt-3">
                <li>IP address and browser type</li>
                <li>Operating system and device information</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-xl font-heading font-bold text-webBlue mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>To respond to your inquiries and provide customer support</li>
                <li>To process orders and deliver products or services</li>
                <li>To send you technical notices, updates, and administrative messages</li>
                <li>To provide information about our products, services, and calibration offerings</li>
                <li>To improve our website, products, and services</li>
                <li>To analyze website usage and optimize user experience</li>
                <li>To comply with legal obligations and protect our rights</li>
                <li>To prevent fraud and maintain security</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-xl font-heading font-bold text-webBlue mb-4">
                4. Information Sharing and Disclosure
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We do not sell, trade, or rent your personal information to third
                parties. We may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  <strong>Service Providers:</strong> With trusted third-party service
                  providers who assist us in operating our website and conducting our
                  business (e.g., email service providers, payment processors)
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law or to
                  respond to legal processes, court orders, or government requests
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a merger,
                  acquisition, or sale of assets
                </li>
                <li>
                  <strong>Protection of Rights:</strong> To protect our rights,
                  property, or safety, or that of our users or the public
                </li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-xl font-heading font-bold text-webBlue mb-4">
                5. Data Security
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate technical and organizational security measures
                to protect your personal information against unauthorized access,
                alteration, disclosure, or destruction. However, no method of
                transmission over the internet or electronic storage is 100% secure.
                While we strive to protect your information, we cannot guarantee
                absolute security.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-xl font-heading font-bold text-webBlue mb-4">
                6. Cookies and Tracking Technologies
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We use cookies and similar tracking technologies to enhance your
                browsing experience and analyze website traffic. You can control
                cookie preferences through your browser settings. However, disabling
                cookies may affect the functionality of our website.
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-xl font-heading font-bold text-webBlue mb-4">
                7. Data Retention
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We retain your personal information for as long as necessary to
                fulfill the purposes outlined in this Privacy Policy, unless a longer
                retention period is required or permitted by law. When your
                information is no longer needed, we will securely delete or anonymize it.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-xl font-heading font-bold text-webBlue mb-4">
                8. Your Rights
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Depending on your location, you may have certain rights regarding
                your personal information, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>The right to access and receive a copy of your personal data</li>
                <li>The right to correct inaccurate or incomplete information</li>
                <li>The right to request deletion of your personal information</li>
                <li>The right to object to or restrict processing of your data</li>
                <li>The right to withdraw consent at any time</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                To exercise these rights, please contact us at{" "}
                <a
                  href="mailto:info@svnanometrology.com"
                  className="text-webBlue hover:underline"
                >
                  info@svnanometrology.com
                </a>
              </p>
            </section>

            {/* Third-Party Links */}
            <section>
              <h2 className="text-xl font-heading font-bold text-webBlue mb-4">
                9. Third-Party Links
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our website may contain links to third-party websites. We are not
                responsible for the privacy practices or content of these external
                sites. We encourage you to review the privacy policies of any
                third-party sites you visit.
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-xl font-heading font-bold text-webBlue mb-4">
                10. Children's Privacy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our services are not directed to individuals under the age of 18.
                We do not knowingly collect personal information from children. If
                you believe we have inadvertently collected information from a child,
                please contact us immediately.
              </p>
            </section>

            {/* Changes to Policy */}
            <section>
              <h2 className="text-xl font-heading font-bold text-webBlue mb-4">
                11. Changes to This Privacy Policy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or legal requirements. We will notify you
                of any material changes by posting the updated policy on our website
                with a revised "Last Updated" date. Your continued use of our
                services after such changes constitutes acceptance of the updated policy.
              </p>
            </section>

            {/* Contact Information */}
            <section className="bg-webBlue/5 p-6 rounded-lg border-l-4 border-webBlue">
              <h2 className="text-xl font-heading font-bold text-webBlue mb-4">
                12. Contact Us
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions, concerns, or requests regarding this
                Privacy Policy or our data practices, please contact us:
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
