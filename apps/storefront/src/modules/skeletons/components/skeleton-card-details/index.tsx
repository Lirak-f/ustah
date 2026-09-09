const SkeletonCardDetails = () => {
  return (
    <div className="my-4 flex flex-col gap-1 transition-all duration-150 ease-in-out">
      <div className="mb-1 h-4 w-1/4 animate-pulse bg-surface-alt"></div>
      <div className="mt-0 block h-11 w-full animate-pulse appearance-none border border-divider bg-surface px-4 pt-3 pb-1" />
    </div>
  )
}

export default SkeletonCardDetails
