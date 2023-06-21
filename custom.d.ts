// Remember to add this file to `tsconfig.json` in `{"include": ["src, custom.d.ts"]}`
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";

declare module "*.svg" {
  const ReactComponent: React.FunctionComponent<
    React.SVGAttributes<SVGElement>
  >;
  const content: string;
  export default content;
}
