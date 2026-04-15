type LayoutTemplateProfileProps = {
  children: React.ReactNode;
  className?: string
};

export function LayoutTemplateProfile({ children, className }: LayoutTemplateProfileProps) {
  return (
    <div className={`${className} p-4 bg-[#e6e6e6] rounded-lg flex flex-col gap-2`}>
      {children}
    </div>
  );
}
