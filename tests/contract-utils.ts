import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  Cancel,
  ContractInitialized,
  List,
  Take
} from "../generated/Contract/Contract"

export function createCancelEvent(tokenId: BigInt, index: BigInt): Cancel {
  let cancelEvent = changetype<Cancel>(newMockEvent())

  cancelEvent.parameters = new Array()

  cancelEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  cancelEvent.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
  )

  return cancelEvent
}

export function createContractInitializedEvent(
  version: i32
): ContractInitialized {
  let contractInitializedEvent = changetype<ContractInitialized>(newMockEvent())

  contractInitializedEvent.parameters = new Array()

  contractInitializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return contractInitializedEvent
}

export function createListEvent(
  seller: Address,
  tokenId: BigInt,
  index: BigInt,
  acceptToken: Address,
  priceInAcceptToken: BigInt
): List {
  let listEvent = changetype<List>(newMockEvent())

  listEvent.parameters = new Array()

  listEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  listEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  listEvent.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
  )
  listEvent.parameters.push(
    new ethereum.EventParam(
      "acceptToken",
      ethereum.Value.fromAddress(acceptToken)
    )
  )
  listEvent.parameters.push(
    new ethereum.EventParam(
      "priceInAcceptToken",
      ethereum.Value.fromUnsignedBigInt(priceInAcceptToken)
    )
  )

  return listEvent
}

export function createTakeEvent(
  buyer: Address,
  tokenId: BigInt,
  index: BigInt
): Take {
  let takeEvent = changetype<Take>(newMockEvent())

  takeEvent.parameters = new Array()

  takeEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  takeEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  takeEvent.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
  )

  return takeEvent
}
