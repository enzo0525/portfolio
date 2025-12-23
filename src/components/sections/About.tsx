import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeIn } from "@/components/animations/FadeIn";
import Image from "next/image";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col gap-10 self-stretch">
            <FadeIn>
              <SectionTitle>About Me</SectionTitle>
            </FadeIn>

            <div className="flex-1 flex items-center">
              <FadeIn delay={0.2}>
                <div className="space-y-6 text-lg text-foreground-secondary leading-relaxed">
                  <p>
                    Hey! My name is Enzo Varela, I&apos;m a passionate developer with a love for creating beautiful, functional, and (most
                    importantly) apps that make my life easier LOL.
                  </p>
                  <p>
                    My journey in development started when I was around 12 years old. Watching &quot;hackers&quot; type inside black boxes
                    with green text was the coolest thing ever! Also, I always loved solving puzzles and challenges, so this life of
                    bringing ideas to life is a perfect fit for me.
                  </p>
                  <p>
                    I&apos;m always trying to learn new things, connect with new people, share the knowledge I have and improve my skills.
                    But, apart from coding, I enjoy cars, getting a good workout in and playing some games here and there with friends.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>

          <FadeIn delay={0.4} className="self-stretch">
            <div className="relative md:mt-2">
              <Image
                src="/images/me.png"
                alt="Enzo Varela"
                width={500}
                height={500}
                className="h-auto w-full rounded-2xl border-2 border-cyan-400/30 object-cover"
              />
              <div className="absolute -inset-4 bg-linear-to-br from-cyan-400/10 to-white/5 rounded-2xl blur-3xl -z-10" />
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
