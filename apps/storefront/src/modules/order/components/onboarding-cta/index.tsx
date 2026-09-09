"use client"

import { resetOnboardingState } from "@lib/data/onboarding"
import { Button, Container, Text } from "@modules/common/components/ui"

const OnboardingCta = ({ orderId }: { orderId: string }) => {
  return (
    <Container className="size-full max-w-4xl bg-surface">
      <div className="flex flex-col gap-y-4 p-4 md:items-center">
        <Text className="text-xl text-text">
          Your test order was successfully created! 🎉
        </Text>
        <Text className="text-xs text-muted">
          You can now complete setting up your store in the admin.
        </Text>
        <Button
          className="w-fit"
          size="large"
          onClick={() => resetOnboardingState(orderId)}
        >
          Complete setup in admin
        </Button>
      </div>
    </Container>
  )
}

export default OnboardingCta
