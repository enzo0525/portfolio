"use client";

import { Container } from "@/components/ui/Container";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { FadeIn } from "@/components/animations/FadeIn";
import { TypingText } from "@/components/animations/TypingText";
import { personal, stats } from "@/data/personal";
import { ArrowRight, Terminal as TerminalIcon } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center relative py-20">
      <div className="absolute inset-0 grid-bg opacity-50" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <FadeIn className="space-y-8">
            <div className="space-y-4">
              <StatusBadge status={stats.currentStatus} color={stats.statusColor} />

              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                <span className="text-foreground">I&apos;m </span>
                <span className="bg-linear-to-r from-cyan-400 to-white bg-clip-text text-transparent">{personal.name}</span>
              </h1>

              <h2 className="text-2xl md:text-3xl text-foreground-secondary font-medium">{personal.title}</h2>
            </div>

            <p className="text-lg text-foreground-secondary leading-relaxed max-w-xl">{personal.bio}</p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="#projects"
                className="group inline-flex items-center gap-2 px-8 py-4 text-lg rounded-lg font-medium bg-accent-primary text-white hover:bg-accent-primary-light shadow-lg shadow-accent-primary/30 transition-all duration-200">
                View My Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center px-8 py-4 text-lg rounded-lg font-medium border border-border-light text-foreground hover:bg-background-secondary transition-all duration-200">
                Get In Touch
              </Link>
            </div>

            {/* Social Links */}
            <SocialLinks className="pt-4" iconSize={20} />
          </FadeIn>

          {/* Right Side - Mini Terminal Window */}
          <FadeIn delay={0.3}>
            <div className="rounded-lg overflow-hidden border border-border-light shadow-2xl">
              {/* Terminal Header */}
              <div className="bg-background-tertiary px-4 py-3 flex items-center justify-between border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-sm text-foreground-secondary ml-4 font-mono">~/portfolio</span>
                </div>
                <TerminalIcon className="w-4 h-4 text-foreground-muted" />
              </div>

              {/* Terminal Content */}
              <div className="bg-background-secondary p-6 font-mono text-sm space-y-4 min-h-[400px]">
                <div>
                  <div className="text-accent-primary">$ whoami</div>
                  <div className="text-foreground mt-1">
                    <TypingText
                      text={`> ${personal.name}`}
                      delay={300}
                      speed={50}
                      loop={true}
                      pauseAfterComplete={15000}
                      backspaceSpeed={50}
                    />
                  </div>
                </div>

                <div>
                  <div className="text-accent-primary mt-4">$ cat skills.txt</div>
                  <div className="text-foreground mt-1">
                    <TypingText
                      text="> Frontend, Backend, Full Stack"
                      delay={1500}
                      speed={40}
                      loop={true}
                      pauseAfterComplete={15000}
                      backspaceSpeed={50}
                    />
                  </div>
                </div>

                <div>
                  <div className="text-accent-primary mt-4">$ ls stats/</div>
                  <div className="text-foreground mt-1">
                    <TypingText
                      text={`> experience: ${stats.yearsExperience} years\n> projects: ${stats.projectsCompleted}\n> technologies: ${stats.technologiesMastered}`}
                      delay={2800}
                      speed={40}
                      loop={true}
                      pauseAfterComplete={15000}
                      backspaceSpeed={50}
                      className="whitespace-pre-line leading-7"
                    />
                  </div>
                </div>

                <div>
                  <div className="text-accent-primary mt-4">$ status</div>
                  <div className="text-green-500 mt-1">
                    <TypingText
                      text={`> ${stats.currentStatus}`}
                      delay={6000}
                      speed={40}
                      loop={true}
                      pauseAfterComplete={15000}
                      backspaceSpeed={50}
                    />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
