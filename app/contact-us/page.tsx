import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { HeroSection } from "@/components/ui/hero-section";
import { Package, ArrowRight } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <HeroSection
        className="pt-8"
        title="Connect With Us!"
        // subtitle="Get in touch with our experts to discuss your precision measurement
        //   requirements."
      >
        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg">
            <Package className="h-5 w-5" />
            Contact Us
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
          >
            Request Quote
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div> */}
      </HeroSection>

      {/* <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Contact Us
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get in touch with our experts to discuss your precision measurement
          requirements.
        </p>
      </div> */}

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Information - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <div className="bg-gradient-to-br from-webBlue to-lapis rounded-2xl p-8 text-white shadow-xl">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Get In Touch
              </h2>
              <p className="text-webWhite/90 text-base leading-relaxed">
                Our team is ready to help you find the perfect measurement
                solution for your needs. Contact us today for expert
                consultation and support.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {/* Address Card */}
              <Card className="border-l-4 border-l-webBlue hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-webBlue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-webBlue" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-webBlue text-lg mb-2">
                        Address
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Plot No. E-3, Friends Industrial Complex,
                        <br />
                        Sanjay Colony, Sector 23, Faridabad,
                        <br />
                        Haryana, India (121005)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Phone Card */}
              <Card className="border-l-4 border-l-emerald hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-emerald/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-emerald" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-emerald text-lg mb-2">
                        Phone
                      </h3>
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-700">
                          <a
                            href="tel:+919873267048"
                            className="hover:text-emerald transition-colors font-medium"
                          >
                            +91 98732 67048
                          </a>
                          <span className="block text-xs text-gray-500 mt-1">
                            Mr. Nilesh Mangal - Director
                          </span>
                        </p>
                        <p className="text-gray-700">
                          <a
                            href="tel:+919873437048"
                            className="hover:text-emerald transition-colors font-medium"
                          >
                            +91 98734 37048
                          </a>
                          <span className="block text-xs text-gray-500 mt-1">
                            Mr. Phalaksh Mangal - Technical Director
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Email Card */}
              <Card className="border-l-4 border-l-rosequartz hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-rosequartz/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-rosequartz" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-rosequartz text-lg mb-2">
                        Email
                      </h3>
                      <a
                        href="mailto:info@svnanometrology.com"
                        className="text-gray-700 hover:text-rosequartz transition-colors text-sm font-medium"
                      >
                        info@svnanometrology.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Hours Card */}
              <Card className="border-l-4 border-l-webYellow hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-webYellow/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-webYellow" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-gray-900 text-lg mb-2">
                        Business Hours
                      </h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p className="flex justify-between">
                          <span className="font-medium">
                            Monday - Saturday:
                          </span>
                          <span>9:00 AM - 6:00 PM</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="font-medium">Sunday:</span>
                          <span className="text-red-500">Closed</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form - Right Side */}
          <div className="lg:col-span-3">
            {/* Paper-like form container */}
            <div className="relative">
              {/* Top accent bar - flat edge */}
              <div className="h-1.5 bg-gradient-to-r from-webBlue via-lapis to-webBlue"></div>

              {/* Paper form */}
              <div className=" bg-white">
                {/* Form Header */}
                <div className="border-b-2 border-gray-200 px-8 py-8 bg-gradient-to-b from-gray-50/50 to-white">
                  <h2 className="text-3xl font-heading font-bold text-webBlue mb-2">
                    Send us a Message
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Fill out the form below and we'll get back to you within 24
                    hours.
                  </p>
                </div>

                {/* Form Content */}
                <div className="px-8 py-10">
                  <form
                    action="https://formsubmit.co/info@svnanometrology.com"
                    method="POST"
                    className="space-y-6"
                  >
                    {/* Disable captcha */}
                    <input type="hidden" name="_captcha" value="false" />

                    {/* Redirect after success */}
                    <input
                      type="hidden"
                      name="_next"
                      value="https://svnanometrology.com/contact?success=true"
                    />

                    {/* Customize email subject */}
                    <input
                      type="hidden"
                      name="_subject"
                      value="New Requirement/Query!"
                    />

                    {/* Optional: honeypot field for spam prevention */}
                    <input
                      type="text"
                      name="_honey"
                      style={{ display: "none" }}
                    />

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="firstName"
                          className="text-gray-800 font-accent font-semibold text-sm uppercase tracking-wide"
                        >
                          First Name <span className="text-red-600">*</span>
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          required
                          className="border-b-2 border-t-0 border-l-0 border-r-0 border-gray-300 rounded-md focus:border-webBlue focus:ring-1 focus:ring-webBlue bg-transparent pl-2 pr-0 py-2 text-gray-900 placeholder:text-gray-400"
                          placeholder="First Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="lastName"
                          className="text-gray-800 font-accent font-semibold text-sm uppercase tracking-wide"
                        >
                          Last Name <span className="text-red-600">*</span>
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          required
                          className="border-b-2 border-t-0 border-l-0 border-r-0 border-gray-300 rounded-md focus:border-webBlue focus:ring-1 focus:ring-webBlue bg-transparent pl-2 pr-0 py-2 text-gray-900 placeholder:text-gray-400"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-gray-800 font-accent font-semibold text-sm uppercase tracking-wide"
                      >
                        Email Address <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="border-b-2 border-t-0 border-l-0 border-r-0 border-gray-300 rounded-md focus:border-webBlue focus:ring-1 focus:ring-webBlue bg-transparent pl-2 pr-0 py-2 text-gray-900 placeholder:text-gray-400"
                        placeholder="abc@company.com "
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="company"
                          className="text-gray-800 font-accent font-semibold text-sm uppercase tracking-wide"
                        >
                          Company Name
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          className="border-b-2 border-t-0 border-l-0 border-r-0 border-gray-300 rounded-md focus:border-webBlue focus:ring-1 focus:ring-webBlue bg-transparent pl-2 pr-0 py-2 text-gray-900 placeholder:text-gray-400"
                          placeholder="Your Company Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="phone"
                          className="text-gray-800 font-accent font-semibold text-sm uppercase tracking-wide"
                        >
                          Phone Number <span className="text-red-600 ">*</span>
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          className="border-b-2 border-t-0 border-l-0 border-r-0 border-gray-300 rounded-md focus:border-webBlue focus:ring-1 focus:ring-webBlue bg-transparent pl-2 pr-0 py-2 text-gray-900 placeholder:text-gray-400"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="subject"
                        className="text-gray-800 font-accent font-semibold text-sm uppercase tracking-wide"
                      >
                        Subject <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        required
                        className="border-b-2 border-t-0 border-l-0 border-r-0 border-gray-300 rounded-md focus:border-webBlue focus:ring-1 focus:ring-webBlue bg-transparent pl-2 pr-0 py-2 text-gray-900 placeholder:text-gray-400"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="message"
                        className="text-gray-800 font-accent font-semibold text-sm uppercase tracking-wide"
                      >
                        Your Message <span className="text-red-600">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={6}
                        placeholder="Tell us about your queries/requirements..."
                        required
                        className="border-2 border-gray-300 rounded-md focus:border-webBlue focus:ring-1 focus:ring-webBlue bg-gray-50/50 px-4 py-3 text-gray-900 placeholder:text-gray-400 resize-none transition-colors"
                      />
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        className="w-full bg-webBlue hover:bg-webBlue/90 text-white font-accent font-bold text-base py-6 rounded-sm shadow-md hover:shadow-lg transition-all duration-300 uppercase tracking-wider"
                        size="lg"
                      >
                        Send Message
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Bottom accent bar - flat edge */}
              <div className="h-1.5 bg-gradient-to-r from-webBlue via-lapis to-webBlue"></div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card className="shadow-xl overflow-hidden border-t-4 border-t-webBlue">
            <CardHeader className="bg-gradient-to-r from-webBlue/5 to-lapis/5">
              <CardTitle className="text-3xl font-heading text-webBlue">
                Find Us
              </CardTitle>
              <CardDescription className="text-base">
                Visit our facility to see our products and services in action.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="aspect-video w-full bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3511.278204535607!2d77.29753817527818!3d28.350437475819994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdbf73126c00b%3A0xc2b8caec667a8090!2sS.V.%20Nanometrology%20Private%20Limited!5e0!3m2!1sen!2sin!4v1750168769248!5m2!1sen!2sin"
                  width="600"
                  height="450"
                  style={{ width: "100%", height: "100%", border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
