import { promises as fs } from "fs";
import path from "path";
import prettier from "prettier";

const generateReactComponentFromSvg = async () => {
  const svgDir = "../icons/src/svg";
  const svgFiles = (await fs.readdir(svgDir)).filter((file) =>
    file.endsWith(".svg")
  );

  for (const file of svgFiles) {
    const componentName = path
      .basename(file, ".svg")
      .replace(/(^\w|-\w)/g, (match) => match.replace("-", "").toUpperCase());
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
};

generateReactComponentFromSvg();
