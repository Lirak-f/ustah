import { deleteLineItem } from "@lib/data/cart"
import { IconSpinner, IconTrash } from "@modules/common/icons"
import { clx } from "@modules/common/components/ui"
import { useState } from "react"

const DeleteButton = ({
  id,
  children,
  className,
}: {
  id: string
  children?: React.ReactNode
  className?: string
}) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (id: string) => {
    setIsDeleting(true)
    await deleteLineItem(id).catch((_err) => {
      setIsDeleting(false)
    })
  }

  return (
    <div
      className={clx(
        "flex items-center justify-between text-small-regular",
        className,
      )}
    >
      <button
        className="flex cursor-pointer gap-x-1 text-ui-fg-subtle hover:text-ui-fg-base"
        onClick={() => handleDelete(id)}
      >
        {isDeleting ? <IconSpinner className="animate-spin" /> : <IconTrash />}
        <span>{children}</span>
      </button>
    </div>
  )
}

export default DeleteButton
