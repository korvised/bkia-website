interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
}

export function FormSectionHeader({ icon, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="bg-primary/10 text-primary flex h-9 w-9 items-center justify-center rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
    </div>
  );
}
