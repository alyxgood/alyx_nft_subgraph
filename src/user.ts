import {
  Register as RegisterEvent,
  LevelUp as LevelUpEvent,
  ClaimAchievementReward as ClaimAchievementRewardEvent,
  SocialRewardDistribute as SocialRewardDistributeEvent,
  CommunityRewardDistribute as CommunityRewardDistributeEvent,
  ContributionRewardDistribute as ContributionRewardDistributeEvent,
} from "../generated/User/User"
import {AchievementRewardLogEntity, RegisterLogEntity, RewardLogEntity, UserEntity} from "../generated/schema";

export function handleLevelUp(event: LevelUpEvent): void {
  let entity = UserEntity.load(event.params.account.toHex())
  if (!entity) {
    entity = new UserEntity(event.params.account.toHex())
    entity.address = event.params.account
  }
  entity.level = event.params.level

  entity.save()
}

export function handleRegister(event: RegisterEvent): void {
  let entity = RegisterLogEntity.load(event.params.account.toHex())
  if (!entity) {
    entity = new RegisterLogEntity(event.params.account.toHex())
  }
  entity.eventTime = event.block.timestamp.toI32()
  entity.inviter = event.params.ref
  entity.tx = event.transaction.hash

  entity.save()

  let entityUser = UserEntity.load(event.params.account.toHex())
  if (!entityUser) {
    entityUser = new UserEntity(event.params.account.toHex())
    entityUser.address = event.params.account
    entityUser.level = 0;

    entityUser.save()
  }
}

export function handleClaimAchievementReward(event: ClaimAchievementRewardEvent): void {
  let entity = AchievementRewardLogEntity.load(`${event.transaction.hash.toHex()}-${event.logIndex.toI32()}`)
  if (!entity) {
    entity = new AchievementRewardLogEntity(`${event.transaction.hash.toHex()}-${event.logIndex.toI32()}`)
    entity.account = event.params.account
    entity.tokenId = event.params.nftId.toI32()
    entity.eventTime = event.block.timestamp.toI32()
    entity.tx = event.transaction.hash
    entity.amount = event.params.amount

    entity.save()
  }
}

export function handleSocialRewardDistribute(event: SocialRewardDistributeEvent): void {
  let entity = RewardLogEntity.load(`${event.transaction.hash.toHex()}-${event.logIndex.toI32()}`)
  if (!entity) {
    entity = new RewardLogEntity(`${event.transaction.hash.toHex()}-${event.logIndex.toI32()}`)
    entity.rewardType = 'social'
    entity.account = event.params.account
    entity.invitee = event.params.invitee
    entity.eventTime = event.block.timestamp.toI32()
    entity.tx = event.transaction.hash
    entity.amount = event.params.amount

    entity.save()
  }
}

export function handleCommunityRewardDistribute(event: CommunityRewardDistributeEvent): void {
  let entity = RewardLogEntity.load(`${event.transaction.hash.toHex()}-${event.logIndex.toI32()}`)
  if (!entity) {
    entity = new RewardLogEntity(`${event.transaction.hash.toHex()}-${event.logIndex.toI32()}`)
    entity.rewardType = 'community'
    entity.account = event.params.account
    entity.invitee = event.params.invitee
    entity.eventTime = event.block.timestamp.toI32()
    entity.tx = event.transaction.hash
    entity.amount = event.params.amount

    entity.save()
  }
}

export function handleContributionRewardDistribute(event: ContributionRewardDistributeEvent): void {
  let entity = RewardLogEntity.load(`${event.transaction.hash.toHex()}-${event.logIndex.toI32()}`)
  if (!entity) {
    entity = new RewardLogEntity(`${event.transaction.hash.toHex()}-${event.logIndex.toI32()}`)
    entity.rewardType = 'contribution'
    entity.account = event.params.account
    entity.invitee = event.params.invitee
    entity.eventTime = event.block.timestamp.toI32()
    entity.tx = event.transaction.hash
    entity.amount = event.params.amount

    entity.save()
  }
}