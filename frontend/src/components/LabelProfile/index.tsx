type LabelProfileProps = {
  children: React.ReactNode;
};

export function LabelProfile({ children, }: LabelProfileProps) {
  return <label className="text-left w-[90%]">{children}</label>;
}
