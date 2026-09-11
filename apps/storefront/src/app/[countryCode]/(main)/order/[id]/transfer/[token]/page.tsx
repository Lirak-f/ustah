import { Heading, Text } from "@modules/common/components/ui"
import TransferActions from "@modules/order/components/transfer-actions"
import TransferImage from "@modules/order/components/transfer-image"

export default async function TransferPage({
  params,
}: {
  params: { id: string; token: string }
}) {
  const { id, token } = params

  return (
    <div className="mx-auto mt-10 mb-20 flex w-2/5 flex-col items-start gap-y-4">
      <TransferImage />
      <div className="flex flex-col gap-y-6">
        <Heading level="h1" className="text-xl text-zinc-900">
          Kërkesë për transferimin e porosisë {id}
        </Heading>
        <Text className="text-zinc-600">
          Ke marrë një kërkesë për të transferuar pronësinë e porosisë ({id}).
          Nëse e pranon këtë kërkesë, mund ta miratosh transferimin duke klikuar
          butonin më poshtë.
        </Text>
        <div className="h-px w-full bg-zinc-200" />
        <Text className="text-zinc-600">
          Nëse e pranon, pronari i ri merr përsipër të gjitha përgjegjësitë dhe
          lejet e lidhura me këtë porosi.
        </Text>
        <Text className="text-zinc-600">
          Nëse nuk e njeh këtë kërkesë ose dëshiron ta mbash pronësinë, nuk
          duhet asnjë veprim tjetër.
        </Text>
        <div className="h-px w-full bg-zinc-200" />
        <TransferActions id={id} token={token} />
      </div>
    </div>
  )
}
