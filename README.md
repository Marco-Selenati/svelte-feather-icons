# svelte-feather-icons-typescript

Typescript only svelte feather icons

## Install

```bash
yarn add --dev @marco-selenati/svelte-feather-icons-typescript
```

or use NPM

```bash
npm install --save-dev @marco-selenati/svelte-feather-icons-typescript
```

## Usage

```html
<script lang="typescript">
  // Only import what you need!
  import { AirplayIcon, AtSignIcon, ... } from 'svelte-feather-icons-typescript'
</script>

<AirplayIcon size="24" />
<AtSignIcon size="1.5x" />
```

See all icons and usage here: [https://vue-feather-icons.netlify.com](https://vue-feather-icons.netlify.com)

## Development

To generate the Svelte components from the feather-icons run:

```bash
npm run-script build
```

Remove the generated files:

```bash
npm run-script clean
```

## Author

This package is completely based on [vue-feather-icons](https://github.com/egoist/vue-feather-icons)

and [svelte-feather-icons](https://github.com/dylanblokhuis/svelte-feather-icons)
