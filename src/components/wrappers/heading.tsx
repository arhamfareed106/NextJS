interface HeadingProps {
  level: "h2" | "h3" | "h4";
  heading: string;
  subheading?: string;
  className?: string;
}

export function Heading({
  level,
  heading,
  subheading,
  className,
}: HeadingProps) {
  const headingClassMap = {
    h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
    h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
    h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  };

  const HeadingTag = level;

  return (
    <div className={className}>
      <HeadingTag className={headingClassMap[level]}>{heading}</HeadingTag>
      {subheading && <p className="text-muted-foreground">{subheading}</p>}
    </div>
  );
}
