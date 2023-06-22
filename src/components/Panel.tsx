import { ReactNode } from "react";
import classNames from "classnames";

interface PanelProps {
  children: ReactNode;
  className: string;
  [rest: string]: any;
}

function Panel({ children, className, ...rest }: PanelProps) {
  const finalClassNames = classNames(
    "border rounded p-3 shadow bg-white w-full",
    className,
  );

  return (
    <div {...rest} className={finalClassNames}>
      {children}
    </div>
  );
}

export default Panel;
