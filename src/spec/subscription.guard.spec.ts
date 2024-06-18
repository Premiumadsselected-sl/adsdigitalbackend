import { SubscriptionGuard } from '../guards/auth/subscription.guard'

describe('SubscriptionGuard', () => {
  it('should be defined', () => {
    expect(new SubscriptionGuard()).toBeDefined()
  })
})
