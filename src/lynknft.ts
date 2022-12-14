import {Address} from "@graphprotocol/graph-ts"
import {
  Approval,
  ApprovalForAll,
  Initialized,
  Transfer,
  Upgrade,
  Mint
} from "../generated/LYNKNFT/LYNKNFT"
import {LYNKNFTEntity, MintLogEntity} from "../generated/schema"
import {ATTRIBUTE_CA, ATTRIBUTE_DX, ATTRIBUTE_IN, ATTRIBUTE_VA} from "../constants/constants";

export function handleApproval(event: Approval): void {
  // // Entities can be loaded from the store using a string ID; this ID
  // // needs to be unique across all entities of the same type
  // let entity = ExampleEntity.load(event.transaction.from.toHex())
  //
  // // Entities only exist after they have been saved to the store;
  // // `null` checks allow to create entities on demand
  // if (!entity) {
  //   entity = new ExampleEntity(event.transaction.from.toHex())
  //
  //   // Entity fields can be set using simple assignments
  //   entity.count = BigInt.fromI32(0)
  // }
  //
  // // BigInt and BigDecimal math are supported
  // entity.count = entity.count + BigInt.fromI32(1)
  //
  // // Entity fields can be set based on event parameters
  // entity.owner = event.params.owner
  // entity.approved = event.params.approved
  //
  // // Entities can be written to the store with `.save()`
  // entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.BLACK_HOLE(...)
  // - contract.DB_CONTRACT(...)
  // - contract.balanceOf(...)
  // - contract.exists(...)
  // - contract.getApproved(...)
  // - contract.isApprovedForAll(...)
  // - contract.mintInfoOf(...)
  // - contract.name(...)
  // - contract.nftInfo(...)
  // - contract.nftInfoOf(...)
  // - contract.ownerOf(...)
  // - contract.supportsInterface(...)
  // - contract.symbol(...)
  // - contract.tokenByIndex(...)
  // - contract.tokenOfOwnerByIndex(...)
  // - contract.tokenURI(...)
  // - contract.totalSupply(...)
}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleInitialized(event: Initialized): void {}

export function handleTransfer(event: Transfer): void {
  let entity = LYNKNFTEntity.load(event.params.tokenId.toString())
  if (!entity || event.params.from.toHex() === Address.zero().toHex()) {
    entity = new LYNKNFTEntity(event.params.tokenId.toString())
    entity.isList = false
    entity.listIndex = 0
    entity.isStaking = false
    entity.charisma = 0
    entity.vitality = 0
    entity.intellect = 0
    entity.dexterity = 0
    entity.name = ''
  }
  entity.owner = event.params.to

  entity.save()
}

export function handleUpgrade(event: Upgrade): void {
  let entity = LYNKNFTEntity.load(event.params.tokenId.toString())
  if (entity) {
    if (event.params.attr == 0) {
      entity.charisma += event.params.point.toI32()
      for (let index: i32 = ATTRIBUTE_CA.length - 1; index >= 0; index--) {
        if (entity.charisma >= ATTRIBUTE_CA[index]) {
          entity.charismaThreshold = index == ATTRIBUTE_CA.length - 1 ? ATTRIBUTE_CA[ATTRIBUTE_CA.length - 1] : ATTRIBUTE_CA[index + 1]
          break
        }
      }
    } else if (event.params.attr == 1) {
      entity.vitality += event.params.point.toI32()
      for (let index: i32 = ATTRIBUTE_VA.length - 1; index >= 0; index--) {
        if (entity.vitality >= ATTRIBUTE_VA[index]) {
          entity.vitalityThreshold = index == ATTRIBUTE_VA.length - 1 ? ATTRIBUTE_VA[ATTRIBUTE_VA.length - 1] : ATTRIBUTE_VA[index + 1]
          break
        }
      }
    } else if (event.params.attr == 2) {
      entity.intellect += event.params.point.toI32()
      for (let index: i32 = ATTRIBUTE_IN.length - 1; index >= 0; index--) {
        if (entity.intellect >= ATTRIBUTE_IN[index]) {
          entity.intellectThreshold = index == ATTRIBUTE_IN.length - 1 ? ATTRIBUTE_IN[ATTRIBUTE_IN.length - 1] : ATTRIBUTE_IN[index + 1]
          break
        }
      }
    } else if (event.params.attr == 3) {
      entity.dexterity += event.params.point.toI32()
      for (let index: i32 = ATTRIBUTE_DX.length - 1; index >= 0; index--) {
        if (entity.dexterity >= ATTRIBUTE_DX[index]) {
          entity.dexterityThreshold = index == ATTRIBUTE_DX.length - 1 ? ATTRIBUTE_DX[ATTRIBUTE_DX.length - 1] : ATTRIBUTE_DX[index + 1]
          break
        }
      }
    }

    let levelToken: i32
    let levelCurrentAttr: i32 = 0
    for (let index: i32 = 0; index < ATTRIBUTE_CA.length; index++) {
      if (entity.charisma >= ATTRIBUTE_CA[index]) {
        levelCurrentAttr = index + 1
      }
    }
    levelToken = levelCurrentAttr

    levelCurrentAttr = 0
    for (let index: i32 = 0; index < ATTRIBUTE_VA.length; index++) {
      if (entity.vitality >= ATTRIBUTE_VA[index]) {
        levelCurrentAttr = index + 1
      }
    }
    levelToken = levelToken > levelCurrentAttr ? levelCurrentAttr : levelToken

    levelCurrentAttr = 0
    for (let index: i32 = 0; index < ATTRIBUTE_IN.length; index++) {
      if (entity.intellect >= ATTRIBUTE_IN[index]) {
        levelCurrentAttr = index + 1
      }
    }
    levelToken = levelToken > levelCurrentAttr ? levelCurrentAttr : levelToken

    levelCurrentAttr = 0
    for (let index: i32 = 0; index < ATTRIBUTE_DX.length; index++) {
      if (entity.dexterity >= ATTRIBUTE_DX[index]) {
        levelCurrentAttr = index + 1
      }
    }
    entity.level = levelToken > levelCurrentAttr ? levelCurrentAttr : levelToken

    entity.save()
  }
}

export function handleMint(event: Mint): void {
  let entity = LYNKNFTEntity.load(event.params.tokenId.toString())
  if (entity) {
    entity.charisma = event.params.nftInfo[0].toI32()
    for (let index: i32 = ATTRIBUTE_CA.length - 1; index >= 0; index--) {
      if (entity.charisma >= ATTRIBUTE_CA[index]) {
        entity.charismaThreshold = index == ATTRIBUTE_CA.length - 1 ? ATTRIBUTE_CA[ATTRIBUTE_CA.length - 1] : ATTRIBUTE_CA[index + 1]
        break
      }
    }
    entity.vitality = event.params.nftInfo[1].toI32()
    entity.vitalityThreshold = ATTRIBUTE_VA[0]
    entity.intellect = event.params.nftInfo[2].toI32()
    entity.intellectThreshold = ATTRIBUTE_IN[0]
    entity.dexterity = event.params.nftInfo[3].toI32()
    entity.dexterityThreshold = ATTRIBUTE_DX[0]
    entity.name = event.params.name
    entity.creator = event.transaction.from
    entity.createdTime = event.block.timestamp.toI32()

    entity.save()

    let logEntity = MintLogEntity.load(event.params.tokenId.toString())
    if (!logEntity) {
      logEntity = new MintLogEntity(event.params.tokenId.toString())
      logEntity.name = entity.name
      logEntity.owner = event.transaction.from
      logEntity.eventTime = event.block.timestamp.toI32()
      logEntity.num = 1
      logEntity.tx = event.transaction.hash
      logEntity.payment = event.params.payment
      logEntity.amount = event.params.amount

      logEntity.save()
    }
  }
}
