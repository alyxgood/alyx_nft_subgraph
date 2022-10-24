import {
  UserInitialized as UserInitializedEvent,
  LevelUp as LevelUpEvent
} from "../generated/User/User"
import { UserInitialized, LevelUp } from "../generated/schema"

export function handleUserInitialized(event: UserInitializedEvent): void {
  let entity = new UserInitialized(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.version = event.params.version
  entity.save()
}

export function handleLevelUp(event: LevelUpEvent): void {
  let entity = new LevelUp(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.account = event.params.account
  entity.level = event.params.level
  entity.save()
}
