import { promises as fs } from "fs";

const PRESET_DIR = "../presets/src";

const generatePresetTokens = async () => {
  const TOKEN_DIR = "../tokens/src";
  const files = await fs.readdir(TOKEN_DIR);
  const tokenFiles = files.filter((file) => file !== "index.ts");

  for (const tokenFile of tokenFiles) {
    const filePath = `${TOKEN_DIR}/${tokenFile}`;
    const fileContent = (await fs.readFile(filePath)).toString();

    if (tokenFile === "color.ts") {
      generateColorTokens(fileContent);
    } else if (tokenFile === "radius.ts") {
      generateRadiusTokens(fileContent);
    } else if (tokenFile === "space.ts") {
      generateSpacingTokens(fileContent);
    } else {
      generateTextStyleTokens(fileContent);
    }
  }
};

const generateColorTokens = async (fileContent: string) => {
  const scaleTokens: Record<string, string> = {};
  const semanticTokens: Record<string, string> = {};

  let currentCategory = "";

  const lines = fileContent.split("\n");

  const scalePattern = /export const (\w+) = (.*);/;
  const semanticPattern = /export const (\w+) = ([\w#]+);/;

  lines.forEach((line) => {
    line = line.trim();

    if (line.startsWith("//")) {
      currentCategory = line.substring(2).trim().toLowerCase();
    } else if (line.startsWith("export const")) {
      let match;
      if (currentCategory === "scale" && (match = scalePattern.exec(line))) {
        const variableName = match[1] as string;

        scaleTokens[variableName] = variableName;
      } else if (
        currentCategory === "semantic" &&
        (match = semanticPattern.exec(line))
      ) {
        const variableName = match[1] as string;

        semanticTokens[variableName] = variableName;
      }
    }
  });

  const tokenFileContent = [
    'import { defineTokens, defineSemanticTokens } from "@pandacss/dev";',
    'import { color } from "warrrui-test-tokens";',
    "",
    "export const colors = defineTokens.colors({",
    ...Object.entries(scaleTokens).map(
      ([key, value]) => `  ${key}: { value: color.${value} },`
    ),
    "});",
    "",
    "export const semanticColors = defineSemanticTokens({",
    "colors: {",
    ...Object.entries(semanticTokens).map(
      ([key, value]) => `  ${key}: { value: color.${value} },`
    ),
    "}",
    "});",
  ].join("\n");

  const presetFilePath = `${PRESET_DIR}/colors.ts`;

  await fs.writeFile(presetFilePath, tokenFileContent);
};

const generateRadiusTokens = async (fileContent: string) => {
  const variableRegex = /export const (\w+) = "(.*?)";/g;
  const objects: Record<string, string> = {};
  let match;

  while ((match = variableRegex.exec(fileContent)) !== null) {
    const objectName = match[1] as string;
    objects[objectName] = `radius.${objectName}`;
  }

  const textStyleFileContent = [
    'import { defineTokens } from "@pandacss/dev";',
    'import { radius } from "warrrui-test-tokens";',
    "",
    "export const radii = defineTokens.radii({",
    ...Object.keys(objects).map(
      (key) => `  ${key}: { value: ${objects[key]} },`
    ),
    "});",
  ].join("\n");
  const presetFilePath = `${PRESET_DIR}/radius.ts`;

  await fs.writeFile(presetFilePath, textStyleFileContent);
};

const generateSpacingTokens = async (fileContent: string) => {
  const variableRegex = /export const (\w+) = "(.*?)";/g;
  const objects: Record<string, string> = {};
  let match;

  while ((match = variableRegex.exec(fileContent)) !== null) {
    const objectName = match[1] as string;
    objects[objectName] = `space.${objectName}`;
  }

  const textStyleFileContent = [
    'import { defineTokens } from "@pandacss/dev";',
    'import { space } from "warrrui-test-tokens";',
    "",
    "export const spacing = defineTokens.spacing({",
    ...Object.keys(objects).map(
      (key) => `  ${key}: { value: ${objects[key]} },`
    ),
    "});",
  ].join("\n");
  const presetFilePath = `${PRESET_DIR}/spacing.ts`;

  await fs.writeFile(presetFilePath, textStyleFileContent);
};

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
