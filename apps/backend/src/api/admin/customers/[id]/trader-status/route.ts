import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"
import { setTraderStatusWorkflow } from "../../../../../workflows/set-trader-status"

const schema = z.object({
  status: z.enum(["pending", "approved", "rejected"]),
})

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const parsed = schema.safeParse(req.body)

  if (!parsed.success) {
    res
      .status(400)
      .json({ message: "status must be pending, approved or rejected" })
    return
  }

  const { id } = req.params

  await setTraderStatusWorkflow(req.scope).run({
    input: { customer_id: id, status: parsed.data.status },
  })

  res.json({ id, status: parsed.data.status })
}
