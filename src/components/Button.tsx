import type { FunctionComponent } from "react";
import className from "classnames";
import { GoSync } from "react-icons/go";

type ExcludeFromTuple<T extends any[], U> = {
  [K in keyof T]: T[K] extends U ? never : T[K];
}[number];

type Exclusive<
  T extends PropertyKey[],
  U = any,
> = T[number] extends infer E
  ? E extends string
    ? Record<E, U> & { [k in ExcludeFromTuple<T, E>]?: never }
    : never
  : never & {};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  Partial<{
    outline?: boolean;
    rounded?: boolean;
    loading: boolean;
  }> &
  Exclusive<
    ["primary", "secondary", "success", "warning", "danger"],
    boolean
  >;

const Button: FunctionComponent<ButtonProps> = ({
  children,
  loading,
  primary,
  secondary,
  success,
  warning,
  danger,
  outline,
  rounded,
  ...rest
}) => {
  const classes = className(
    rest.className,
    "flex items-center px-3 py-1.5 border h-8",
    {
      "opacity-80": loading,
      "border-blue-500 bg-blue-500": primary,
      "border-gray-900 bg-gray-900": secondary,
      "border-green-500 bg-green-500": success,
      "border-yellow-400 bg-yellow-400": warning,
      "border-red-500 bg-red-500": danger,
      "rounded-full": rounded,
      "text-white":
        !outline &&
        (primary || secondary || success || warning || danger),
      "bg-white": outline,
      "text-blue-500": outline && primary,
      "text-gray-500": outline && secondary,
      "text-green-500": outline && success,
      "text-yellow-500": outline && warning,
      "text-red-500": outline && danger,
    },
  );

  return (
    <button {...rest} disabled={loading} className={classes}>
      {loading ? <GoSync className="animate-spin" /> : children}
    </button>
  );
};

export default Button;

// import { ReactNode } from "react";
// import className from "classnames";
// import { GoSync } from "react-icons/go";
//
// interface ButtonProps {
//   children: ReactNode;
//   primary?: boolean;
//   secondary?: boolean;
//   success?: boolean;
//   warning?: boolean;
//   danger?: boolean;
//   outline?: boolean;
//   rounded?: boolean;
//   loading: boolean;
//   [rest: string]: any;
// }
//
// function Button({
//   children,
//   primary,
//   secondary,
//   success,
//   warning,
//   danger,
//   outline,
//   rounded,
//   loading,
//   ...rest
// }: ButtonProps) {
//   const classes = className(
//     rest.className,
//     "flex items-center px-3 py-1.5 border h-8",
//     {
//       "opacity-80": loading,
//       "border-blue-500 bg-blue-500 text-white": primary,
//       "border-gray-900 bg-gray-900 text-white": secondary,
//       "border-green-500 bg-green-500 text-white": success,
//       "border-yellow-400 bg-yellow-400 text-white": warning,
//       "border-red-500 bg-red-500 text-white": danger,
//       "rounded-full": rounded,
//       "bg-white": outline,
//       "text-blue-500": outline && primary,
//       "text-gray-900": outline && secondary,
//       "text-green-500": outline && success,
//       "text-yellow-400": outline && warning,
//       "text-red-500": outline && danger,
//     },
//   );
//
//   return (
//     <button {...rest} disabled={loading} className={classes}>
//       {loading ? <GoSync className="animate-spin" /> : children}
//     </button>
//   );
// }
//
// interface ButtonType {
//   primary: boolean;
//   secondary: boolean;
//   success: boolean;
//   warning: boolean;
//   danger: boolean;
// }
//
// Button.propTypes = {
//   checkVariationValue: ({
//     primary,
//     secondary,
//     success,
//     warning,
//     danger,
//   }: ButtonType) => {
//     const count =
//       Number(!!primary) +
//       Number(!!secondary) +
//       Number(!!warning) +
//       Number(!!success) +
//       Number(!!danger);
//
//     if (count > 1) {
//       return new Error(
//         "Only one of primary, secondary, success, warning, danger can be true",
//       );
//     }
//   },
// };
//
// export default Button;
