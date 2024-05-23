import fs from "fs";
import path from "path";

export default async function (plop) {
  plop.setGenerator("Story", {
    description: "Create a story file",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "스토리를 작성할 컴포넌트 이름을 입력해주세요",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../ui/src/primitive/{{pascalCase name}}/{{pascalCase name}}.stories.tsx",
        templateFile: "templates/Story.tsx.hbs",
      },
      {
        type: "add",
        path: "../ui/src/themed/{{pascalCase name}}/{{pascalCase name}}.stories.tsx",
        templateFile: "templates/Story.tsx.hbs",
      },
    ],
  });

  plop.setGenerator("Icon", {
    description: "Convert SVG to React component",
    prompts: [],
    actions: () => {
      try {
      } catch (e) {
        console.log(e);
      }
      const actions = [];
      const svgDir = "../icons/src/svg";
      const svgFiles = fs
        .readdirSync(svgDir)
        .filter((file) => file.endsWith(".svg"));

      for (const file of svgFiles) {
        const componentName = path
          .basename(file, ".svg")
          .replace(/(^\w|-\w)/g, (match) =>
            match.replace("-", "").toUpperCase()
          );
        const svgFilePath = path.resolve(svgDir, file);
        const componentContent = fs.readFileSync(svgFilePath).toString();

        actions.push({
          type: "add",
          path: `../icons/src/react/{{pascalCase componentName}}.tsx`,
          templateFile: "templates/Icon.tsx.hbs",
          data: {
            componentName,
            componentContent,
          },
        });
      }

      return actions;
    },
  });
}
