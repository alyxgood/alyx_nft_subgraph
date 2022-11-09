import {
  Register as RegisterEvent,
  LevelUp as LevelUpEvent
} from "../generated/User/User"
import {RegisterLogEntity, UserEntity} from "../generated/schema";

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
