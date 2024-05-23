import { promises as fs } from "fs";
import path from "path";
import prettier from "prettier";

const generateReactComponentFromSvg = async () => {
  const svgDir = "../icons/src/svg";
  const svgFiles = (await fs.readdir(svgDir)).filter((file) =>
    file.endsWith(".svg")
  );

  const components = [];

  for (const file of svgFiles) {
    const componentName = path
      .basename(file, ".svg")
      .replace(/(^\w|-\w)/g, (match) => match.replace("-", "").toUpperCase());
    components.push(componentName);
    const svgFilePath = path.resolve(svgDir, file);
    const svgContent = (await fs.readFile(svgFilePath)).toString();

    const componentContent = `
      import type { SVGProps } from 'react';
      import { Ref, forwardRef } from 'react';

      const ${componentName} = (
        {
          size = 24,
          ...props
        }: SVGProps<SVGSVGElement> & {
          size?: number | string,
        },
        ref: Ref<SVGSVGElement>
      ) => (
        ${svgContent.replace(/-(\w)/g, (_, letter) => letter.toUpperCase())}
      );

      const ForwardRef = forwardRef(${componentName});
      export default ForwardRef;
    `;
    const componentDir = "../icons/src/react";
    const componentFilePath = path.resolve(
      componentDir,
      `${componentName}.tsx`
    );

    const formattedComponentContent = await prettier.format(componentContent, {
      parser: "typescript",
    });

    await fs.writeFile(componentFilePath, formattedComponentContent);
  }

  return components;
};

const generateEntryFile = async (components: string[]) => {
  const entryFilePath = "../icons/src/react/index.ts";
  const entryFileContent = components
    .map(
      (component) =>
        `export { default as ${component} } from "./${component}.tsx";`
    )
    .join("\n");
  const formattedEntryFileContent = await prettier.format(entryFileContent, {
    parser: "typescript",
  });

  await fs.writeFile(entryFilePath, formattedEntryFileContent);
};

(async () => {
  const components = await generateReactComponentFromSvg();
  generateEntryFile(components);
})();
