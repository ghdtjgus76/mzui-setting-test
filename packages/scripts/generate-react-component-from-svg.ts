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
      const ${componentName} = () => (
        ${svgContent.replace(/-(\w)/g, (_, letter) => letter.toUpperCase())}
      );

      export default ${componentName};
    `;
    const componentDir = "../icons/src/react";
    const componentFilePath = path.resolve(
      componentDir,
      `${componentName}.tsx`
    );

    const formattedComponentContent = await prettier.format(componentContent, {
      parser: "babel",
    });

    await fs.writeFile(componentFilePath, formattedComponentContent);
  }

  const entryFilePath = "../icons/src/react/index.ts";
  const entryFileContent = components
    .map(
      (component) =>
        `export { default as ${component} } from "./${component}.tsx";`
    )
    .join("\n");
  const formattedEntryFileContent = await prettier.format(entryFileContent, {
    parser: "babel",
  });

  await fs.writeFile(entryFilePath, formattedEntryFileContent);
};

generateReactComponentFromSvg();
