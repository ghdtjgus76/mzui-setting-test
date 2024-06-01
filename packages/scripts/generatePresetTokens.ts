import { promises as fs } from "fs";

const PRESET_DIR = "../presets/src";

const generatePresetTokens = async () => {
  const TOKEN_DIR = "../tokens/src";
  const files = await fs.readdir(TOKEN_DIR);
  const tokenFiles = files.filter((file) => file !== "index.ts");

  for (const tokenFile of tokenFiles) {
    const filePath = `${TOKEN_DIR}/${tokenFile}`;
    const fileContent = (await fs.readFile(filePath)).toString();
    console.log("---------");
    console.log(fileContent);

    if (tokenFile === "color.ts") {
      generateColorScaleTokens();
      generateColorSemanticTokens();
    } else if (tokenFile === "radius.ts") {
      generateRadiusTokens();
    } else if (tokenFile === "space.ts") {
      generateSpacingTokens();
    } else {
      generateTextStyleTokens(fileContent);
    }
  }
};

const generateColorScaleTokens = () => {};

const generateColorSemanticTokens = () => {};

const generateRadiusTokens = () => {};

const generateSpacingTokens = () => {};

const generateTextStyleTokens = async (fileContent: string) => {
  const objectRegex = /export const (\w+) = \{([\s\S]*?)\};/g;
  const objects: Record<string, string> = {};
  let match;

  while ((match = objectRegex.exec(fileContent)) !== null) {
    const objectName = match[1] as string;
    objects[objectName] = `typography.${objectName}`;
  }

  const textStyleFileContent = [
    'import { defineTextStyles } from "@pandacss/dev";',
    'import { typography } from "warrrui-test-tokens";',
    "",
    "export const textStyles = defineTextStyles({",
    ...Object.keys(objects).map(
      (key) => `  ${key}: { value: ${objects[key]} },`
    ),
    "});",
  ].join("\n");
  const presetFilePath = `${PRESET_DIR}/typography.ts`;

  await fs.writeFile(presetFilePath, textStyleFileContent);
};

(() => {
  generatePresetTokens();
})();
