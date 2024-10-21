import { readFileSync } from "fs";
import * as yaml from "js-yaml";

export function script(): string {
  const ymlFile = yaml.load(readFileSync("action.yml", "utf8")) as {
    inputs: {
      [p: string]: {
        default: string;
        description: string;
        required: "true" | "false";
      };
    };
  };
  const inputs = ymlFile.inputs;
  const rows = ["| 引数名 | 説明 | 必須 |", "|:---:|:---:|:---:|"];

  for (const inputName of Object.keys(inputs)) {
    let row = `| ${inputName} | ${inputs[inputName].description} | `;

    if (inputs[inputName].default === undefined && inputs[inputName].required) {
      row += "O";
    }

    row += " |";
    rows.push(row);
  }

  return rows.join("\n");
}
