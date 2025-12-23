export interface Skill {
  name: string;
  proficiency?: number;
  icon?: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
  icon?: string;
}
