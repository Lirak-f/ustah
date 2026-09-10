import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  return (
    <div
      className="flex flex-col items-start justify-center px-6 py-8"
      data-testid="empty-cart-message"
    >
      <h1 className="text-page-title uppercase">Shporta</h1>
      <p className="mt-4 mb-6 max-w-lg text-small text-muted">
        Nuk ke asgjë në shportë. Përdor lidhjen më poshtë për të filluar
        shfletimin e produkteve tona.
      </p>
      <InteractiveLink href="/store">Shfleto produktet</InteractiveLink>
    </div>
  )
}

export default EmptyCartMessage
