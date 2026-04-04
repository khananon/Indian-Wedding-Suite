import { useState } from "react";
import { useLocation } from "wouter";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/Button";

export default function Contact() {
  const [searchParams] = useState(new URLSearchParams(window.location.search));
  const prefilledTemplate = searchParams.get("template");
  const prefilledPackage = searchParams.get("package");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">Let's Create Together</h1>
          <p className="text-lg text-muted-foreground">
            Have a question or ready to start designing? Fill out the form below or reach out to us directly. We respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
              <h3 className="font-display text-2xl font-bold text-primary mb-6">Contact Details</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="text-primary w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">WhatsApp</p>
                    <p className="text-muted-foreground text-sm">+91 9058955529</p>
                    <a href="#" className="text-secondary text-sm font-medium mt-1 inline-block hover:underline">Message us now</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="text-primary w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <p className="text-muted-foreground text-sm">Anonhake@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="text-primary w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Phone</p>
                    <p className="text-muted-foreground text-sm">+919058955529</p>
                    <p className="text-xs text-muted-foreground mt-1">Mon-Sat, 10am - 7pm IST</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-secondary/20 p-8 rounded-2xl border border-secondary/30 text-center">
              <h4 className="font-bold text-foreground mb-2">Need it urgently?</h4>
              <p className="text-sm text-muted-foreground mb-4">We offer 24-hour rush delivery for select templates.</p>
              <Button variant="secondary" className="w-full">Request Rush Order</Button>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-border shadow-md">
              {isSuccess ? (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h3 className="font-display text-3xl font-bold text-primary mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground max-w-md">
                    Thank you for reaching out. Our design team will get back to you within 24 hours with the next steps.
                  </p>
                  <Button className="mt-8" onClick={() => setIsSuccess(false)}>Send Another Message</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Your Name <span className="text-red-500">*</span></label>
                      <input required type="text" className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" placeholder="John & Jane" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Email Address <span className="text-red-500">*</span></label>
                      <input required type="email" className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" placeholder="john@example.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">WhatsApp Number <span className="text-red-500">*</span></label>
                      <input required type="tel" className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" placeholder="+91" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Wedding Date</label>
                      <input type="date" className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Interested Package / Template</label>
                    <select className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors appearance-none">
                      <option value="">Select an option</option>
                      <option value="basic" selected={prefilledPackage === 'basic'}>Essential PDF (₹499)</option>
                      <option value="standard" selected={prefilledPackage === 'standard'}>Video + PDF (₹999)</option>
                      <option value="premium" selected={prefilledPackage === 'premium'}>The Full Suite (₹1,999)</option>
                      <option value="custom">Custom Design</option>
                      {prefilledTemplate && <option value={prefilledTemplate} selected>Template ID: {prefilledTemplate}</option>}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Message / Requirements</label>
                    <textarea 
                      rows={4} 
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none" 
                      placeholder="Tell us a bit about your wedding and what kind of design you are looking for..."
                    ></textarea>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Request"}
                  </Button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
