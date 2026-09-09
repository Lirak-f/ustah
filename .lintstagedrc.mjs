import path from "node:path"

// ESLint resolves its flat config from the working directory, so a run started
// at the repo root never finds apps/storefront/eslint.config.mjs and silently
// reports nothing. Invoke eslint inside the workspace, against staged files
// only — going through `pnpm run lint` would re-lint the whole workspace.
//
// `pnpm -C <dir>` runs in that directory; --filter takes a package NAME rather
// than a path, so -C is what keeps these call sites path-based.
const scopedEslint = (workspace) => (files) => {
  const cwd = path.join(import.meta.dirname, workspace)
  const relative = files.map((file) => path.relative(cwd, file))

  return `pnpm -C ${workspace} exec eslint --fix --no-warn-ignored ${relative.join(" ")}`
}

export default {
  "*.{ts,tsx,js,jsx,mjs,cjs,json,css,md}": "prettier --write",
  "apps/backend/**/*.{ts,tsx}": scopedEslint("apps/backend"),
  "apps/storefront/**/*.{ts,tsx}": scopedEslint("apps/storefront"),
}
