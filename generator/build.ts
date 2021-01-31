import path from "path";
import feather from "feather-icons/dist/icons.json";
import { pascalCase } from "pascal-case";
import fs from "fs-extra";

interface Icon {
  name: string;
  pascalCasedComponentName: string;
  kebabCasedComponentName: string;
}

const handleComponentName = (name: string) => name.replace(/\-(\d+)/, "$1");

const featherSvgs: Record<string, string> = feather;

const component = (icon: Icon) => `
<script lang="typescript">
  export let size: string = "100%";
  export let strokeWidth: number = 2;
  let customClass: string = "";
  export { customClass as class };

  if (size !== "100%") {
    size = size.slice(-1) === 'x' 
          ? size.slice(0, size.length -1) + 'em'
          : parseInt(size) + 'px';
  }
</script>

<svg 
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  stroke-width="{strokeWidth}"
  stroke-linecap="round"
  stroke-linejoin="round"
  class="feather feather-${icon.name} {customClass}"
  >${featherSvgs[icon.name]}</svg>
`;

const icons: Icon[] = Object.keys(feather).map((name) => ({
  name,
  pascalCasedComponentName: pascalCase(`${handleComponentName(name)}-icon`),
  kebabCasedComponentName: `${handleComponentName(name)}-icon`,
}));

Promise.all(
  icons.map(async (icon) => {
    const filepath = `./src/icons/${icon.pascalCasedComponentName}.svelte`;
    await fs.ensureDir(path.dirname(filepath));
    return await fs.writeFile(filepath, component(icon), "utf8");
  })
).then(() => {
  const main = icons
    .map(
      (icon) =>
        `export { default as ${icon.pascalCasedComponentName} } from './icons/${icon.pascalCasedComponentName}.svelte'`
    )
    .join("\n");
  return fs.outputFile("./src/index.ts", main, "utf8");
});
