// Extensionless: Next/Turbopack resolves this, and the generator script is run
// through tsx which resolves it too. A '.js' specifier breaks the bundler.
export { colors, fonts, type, space, radius, layout, commerce } from './tokens'
