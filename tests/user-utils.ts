import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { UserInitialized, LevelUp } from "../generated/User/User"

export function createUserInitializedEvent(version: i32): UserInitialized {
  let userInitializedEvent = changetype<UserInitialized>(newMockEvent())

  userInitializedEvent.parameters = new Array()

  userInitializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return userInitializedEvent
}

export function createLevelUpEvent(account: Address, level: i32): LevelUp {
  let levelUpEvent = changetype<LevelUp>(newMockEvent())

  levelUpEvent.parameters = new Array()

  levelUpEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  levelUpEvent.parameters.push(
    new ethereum.EventParam(
      "level",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(level))
    )
  )

  return levelUpEvent
}
