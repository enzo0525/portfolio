import { SkillCategory as SkillCategoryType } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { StaggerItem } from '@/components/animations/StaggerContainer';

interface SkillCategoryProps {
  category: SkillCategoryType;
}

export function SkillCategory({ category }: SkillCategoryProps) {
  return (
    <StaggerItem>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">
          {category.name}
        </h3>
        <div className="flex flex-wrap gap-3">
          {category.skills.map((skill) => (
            <Badge
              key={skill.name}
              variant="primary"
              className="text-base px-4 py-2"
            >
              {skill.name}
            </Badge>
          ))}
        </div>
      </div>
    </StaggerItem>
  );
}
