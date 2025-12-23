import { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    skills: [
      { name: "Python", proficiency: 90 },
      { name: "Java", proficiency: 85 },
      { name: "Javascript", proficiency: 88 },
      { name: "Typescript", proficiency: 92 },
      { name: "HTML/CSS", proficiency: 95 },
      { name: "SQL", proficiency: 80 },
    ],
  },
  {
    name: "Frameworks & Libraries",
    skills: [
      { name: "React", proficiency: 85 },
      { name: "Next.js", proficiency: 80 },
      { name: "Tailwind CSS", proficiency: 75 },
      { name: "Django", proficiency: 78 },
      { name: "Ant Design", proficiency: 70 },
      { name: "Flask", proficiency: 88 },
    ],
  },
  {
    name: "Tools & Technologies",
    skills: [
      { name: "Git", proficiency: 90 },
      { name: "Docker", proficiency: 75 },
      { name: "Vercel", proficiency: 85 },
      { name: "Postman", proficiency: 80 },
    ],
  },
];
