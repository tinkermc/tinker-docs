# Tinker Docs Writer

## For Tommy

Install **Tinker Docs Writer Setup 0.0.0.exe**. Start it, choose the folder for the Tinker Docs repository (the folder containing `package.json` and `vocs.config.ts`), then edit and save. Saved pages go into `src/pages/contributing/`. Use **Preview in Vocs** to start the docs site and see the page rendered by the real Vocs site. The app follows the computer's light/dark appearance.

## Move this app into its own repository

1. Make a new empty GitHub repository named `tinker-docs-writer`.
2. Copy the `writer/` folder from this project into the new repo as the project root. Also copy `package.json`, `package-lock.json`, and `.gitignore`.
3. In the copied `package.json`, keep only the writer dependencies/scripts (React, React DOM, Vite, TypeScript, Electron, Electron Builder, concurrently, wait-on). Remove Vocs and Waku. Update the scripts to use the writer config and `main` to `writer/main.cjs` (or move the writer files to the root and adjust paths).
4. Run `npm install`, then `npm run writer:win` on a Mac or Windows computer. The installer is written to `release/`.
5. Commit and push the new repo. Tommy's docs repo remains separate; the app selects it when launched.

The current build can be made from the existing repository with `npm run writer:win` (Windows x64 installer). A publisher certificate is needed to avoid Windows SmartScreen warnings for an unsigned installer.
