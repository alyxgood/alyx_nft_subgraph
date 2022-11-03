import {
    Claim as ClaimEvent,
    Stake as StakeEvent,
    UnStake as UnStakeEvent
} from "../generated/Staking/Staking"
import {StakingLogEntity} from "../generated/schema";
import {BigInt} from "@graphprotocol/graph-ts";

export function handleClaim(event: ClaimEvent): void {
    let entity = new StakingLogEntity(`${event.transaction.hash.toHex()}-${event.logIndex.toI32()}`)
    entity.tokenId = 0
    entity.owner = event.params.account
    entity.eventType = 'claim'
    entity.eventTime = event.block.timestamp.toI32()
    entity.tx = event.transaction.hash
    entity.amount = event.params.amount

    entity.save()
}

export function handleStake(event: StakeEvent): void {
    let entity = new StakingLogEntity(`${event.transaction.hash.toHex()}-${event.logIndex.toI32()}`)
    entity.tokenId = event.params.tokenId.toI32()
    entity.owner = event.params.account
    entity.eventType = 'stake'
    entity.eventTime = event.block.timestamp.toI32()
    entity.tx = event.transaction.hash
    entity.amount = BigInt.zero()

    entity.save()
}

export function handleUnStake(event: UnStakeEvent): void {
    let entity = new StakingLogEntity(`${event.transaction.hash.toHex()}-${event.logIndex.toI32()}`)
    entity.tokenId = event.params.tokenId.toI32()
    entity.owner = event.params.account
    entity.eventType = 'unStake'
    entity.eventTime = event.block.timestamp.toI32()
    entity.tx = event.transaction.hash
    entity.amount = BigInt.zero()

    entity.save()
}
