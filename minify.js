const { exec } = require("child_process");
const fs = require("fs");
const glob = require("glob");
const path = require("path");

const cssFiles = glob.sync("./styles/*.css");

const imports = cssFiles
  .map((file) => {
    const relativePath = "./" + path.relative(".", file).replace(/\\/g, "/");
    return `@import "${relativePath}";`;
  })
  .join("\n");

fs.writeFileSync("temp-bundle.css", imports);

exec(
  `lightningcss --minify --bundle --targets ">= 0.25%" temp-bundle.css -o dist/bundle.css`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`);
      fs.unlinkSync("temp-bundle.css");
      return;
    }
    fs.unlinkSync("temp-bundle.css");
    console.log("CSS minified and bundled successfully!");
  }
);
