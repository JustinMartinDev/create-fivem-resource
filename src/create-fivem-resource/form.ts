import inquirer from "inquirer";

export const promptForm = async () => {
  let configAnwser = await inquirer.prompt([
    {
      type: "input",
      name: "description",
      message: "Description (optional) :",
    },
    {
      type: "input",
      name: "author",
      message: "Author (optional) :",
    },
    {
      type: "list",
      name: "runtime",
      message: "Runtime :",
      choices: ["Javascript", "Typescript", "Lua"],
    },
    {
      type: "checkbox",
      name: "type",
      message: "Type(s) :",
      choices: ["client", "server"],
      validate: (input: string[]) =>
        input.length > 0 ? true : "You should select one type at less",
    },
  ] as any);

  if (!configAnwser.type.includes("client")) {
    return {
      ...configAnwser,
      Nui: false,
    };
  }

  const nuiAnswer = await inquirer.prompt([
    {
      type: "confirm",
      name: "Nui",
      message: "Do you want to use Nui ?",
    },
  ] as any);

  if (nuiAnswer.Nui) {
    const nuiConfigAnswer = await inquirer.prompt([
      {
        type: "list",
        name: "nuiFramework",
        message: "Nui framework :",
        choices: ["Vue", "React"],
      },
    ] as any);

    configAnwser = {
      ...configAnwser,
      ...nuiConfigAnswer,
    };
  }

  return configAnwser;
};
