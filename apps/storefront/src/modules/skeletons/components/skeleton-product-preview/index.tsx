import { Container } from "@modules/common/components/ui"

const SkeletonProductPreview = () => {
  return (
    <div className="animate-pulse">
      <Container className="aspect-9/16 w-full bg-surface" />
      <div className="mt-2 flex justify-between text-small">
        <div className="h-6 w-2/5 bg-gray-100"></div>
        <div className="h-6 w-1/5 bg-gray-100"></div>
      </div>
    </div>
  )
}

export default SkeletonProductPreview
