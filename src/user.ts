import {
  UserInitialized as UserInitializedEvent,
  LevelUp as LevelUpEvent
} from "../generated/User/User"
import {UserEntity} from "../generated/schema";

export function handleUserInitialized(event: UserInitializedEvent): void {
}

export function handleLevelUp(event: LevelUpEvent): void {
  let entity = UserEntity.load(event.params.account.toHex())
  if (!entity) {
    entity = new UserEntity(event.params.account.toHex())
  }
  entity.level = event.params.level

  entity.save()
}
