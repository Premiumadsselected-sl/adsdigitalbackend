import { SubscriptionGuard } from '../auth/guards/subscription.guard'

describe('SubscriptionGuard', () => {
  it('should be defined', () => {
    expect(new SubscriptionGuard()).toBeDefined()
  })
})
