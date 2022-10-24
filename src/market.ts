import {
  Cancel as CancelEvent,
  MarketInitialized as MarketInitializedEvent,
  List as ListEvent,
  Take as TakeEvent
} from "../generated/Market/Market"
import { Cancel, MarketInitialized, List, Take } from "../generated/schema"

export function handleCancel(event: CancelEvent): void {
  let entity = new Cancel(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.tokenId = event.params.tokenId
  entity.index = event.params.index
  entity.save()
}

export function handleMarketInitialized(event: MarketInitializedEvent): void {
  let entity = new MarketInitialized(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.version = event.params.version
  entity.save()
}

export function handleList(event: ListEvent): void {
  let entity = new List(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.seller = event.params.seller
  entity.tokenId = event.params.tokenId
  entity.index = event.params.index
  entity.acceptToken = event.params.acceptToken
  entity.priceInAcceptToken = event.params.priceInAcceptToken
  entity.save()
}

export function handleTake(event: TakeEvent): void {
  let entity = new Take(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.buyer = event.params.buyer
  entity.tokenId = event.params.tokenId
  entity.index = event.params.index
  entity.save()
}
