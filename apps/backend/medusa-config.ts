import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

/**
 * Payment note (cash on delivery):
 *
 * Ustah takes no online payments, but Medusa cannot complete a cart without an
 * authorized payment session. The built-in *system* provider covers exactly this
 * case — its `authorizePayment` returns AUTHORIZED without moving money, leaving
 * settlement to us in cash at the door.
 *
 * It needs no entry here: @medusajs/payment registers SystemPaymentProvider in
 * its own provider loader, so it is always available as `pp_system_default`
 * (format: pp_{identifier}_{id}). It must still be enabled per-region in admin.
 *
 * The storefront initializes a session against that id behind the scenes; the
 * checkout UI never renders a payment step.
 */
module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
    },
  },
})
