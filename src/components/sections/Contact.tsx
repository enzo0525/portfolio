import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeIn } from "@/components/animations/FadeIn";
import { ContactForm } from "@/components/features/ContactForm";
import { personal } from "@/data/personal";
import { Mail, MapPin } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-background-secondary">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <FadeIn>
            <div className="space-y-8">
              <SectionTitle>Contact</SectionTitle>

              <p className="text-lg text-foreground-secondary leading-relaxed">
                Take a look at my professional experience, skills, and education. Feel free to reach out if you&apos;d like to discuss
                opportunities.
              </p>

              <ContactForm />

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4 text-foreground-secondary">
                  <Mail size={20} className="text-accent-primary" />
                  <a href={`mailto:${personal.email}`} className="hover:text-accent-primary transition-colors">
                    {personal.email}
                  </a>
                </div>
                <div className="flex items-center gap-4 text-foreground-secondary">
                  <MapPin size={20} className="text-accent-primary" />
                  <span>{personal.location}</span>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="w-full h-[600px] border border-border-light rounded-lg overflow-hidden shadow-2xl">
              <iframe src={personal.resume} className="w-full h-full" title="Resume PDF" />
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
