import { acceptTransferRequest } from "@lib/data/orders"
import { Heading, Text } from "@modules/common/components/ui"
import TransferImage from "@modules/order/components/transfer-image"

export default async function TransferPage({
  params,
}: {
  params: { id: string; token: string }
}) {
  const { id, token } = params

  const { success, error } = await acceptTransferRequest(id, token)

  return (
    <div className="mx-auto mt-10 mb-20 flex w-2/5 flex-col items-start gap-y-4">
      <TransferImage />
      <div className="flex flex-col gap-y-6">
        {success && (
          <>
            <Heading level="h1" className="text-xl text-zinc-900">
              Porosia u transferua!
            </Heading>
            <Text className="text-zinc-600">
              Porosia {id} u transferua me sukses te pronari i ri.
            </Text>
          </>
        )}
        {!success && (
          <>
            <Text className="text-zinc-600">
              Ndodhi një gabim gjatë pranimit të transferimit. Provo përsëri.
            </Text>
            {error && (
              <Text className="text-red-500">Mesazhi i gabimit: {error}</Text>
            )}
          </>
        )}
      </div>
    </div>
  )
}
