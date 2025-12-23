import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { SkillCategory as SkillCategoryComponent } from "@/components/features/SkillCategory";
import { skillCategories } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 bg-background-secondary">
      <Container>
        <FadeIn>
          <SectionTitle>Skills & Expertise</SectionTitle>
        </FadeIn>

        <div className="mt-16">
          <StaggerContainer className="grid gap-12">
            {skillCategories.map((category) => (
              <SkillCategoryComponent key={category.name} category={category} />
            ))}
          </StaggerContainer>
        </div>
      </Container>
    </section>
  );
}
