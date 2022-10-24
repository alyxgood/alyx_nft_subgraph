import {
  DBContractInitialized as DBContractInitializedEvent,
  OwnershipTransferred as OwnershipTransferredEvent
} from "../generated/DBContract/DBContract"
// import {
//   DBContractInitialized,
//   OwnershipTransferred
// } from "../generated/schema"

export function handleDBContractInitialized(
  event: DBContractInitializedEvent
): void {
  // let entity = new DBContractInitialized(
  //   event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  // )
  // entity.version = event.params.version
  // entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  // let entity = new OwnershipTransferred(
  //   event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  // )
  // entity.previousOwner = event.params.previousOwner
  // entity.newOwner = event.params.newOwner
  // entity.save()
}
