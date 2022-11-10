import {
  Cancel as CancelEvent,
  List as ListEvent,
  Take as TakeEvent
} from "../generated/Market/Market"
import {LYNKNFTEntity, MarketGoodsEntity} from "../generated/schema";
import {Address, BigInt} from "@graphprotocol/graph-ts";
import {calcTokenLevel} from "../utils/utils";

export function handleCancel(event: CancelEvent): void {
  let entity = MarketGoodsEntity.load(event.params.tokenId.toString())
  if (entity) {
    entity.onSale = false
    entity.seller = Address.zero()
    entity.index = 0
    entity.acceptToken = Address.zero()
    entity.priceInAcceptToken = BigInt.zero()

    entity.save()
  }

  let entityNFT = LYNKNFTEntity.load(event.params.tokenId.toString())
  if (entityNFT) {
    entityNFT.isList = false
    entityNFT.listIndex = 0

    entityNFT.save()
  }
}

export function handleList(event: ListEvent): void {
  let entity = MarketGoodsEntity.load(event.params.tokenId.toString())
  if (!entity) {
    entity = new MarketGoodsEntity(event.params.tokenId.toString())
  }
  entity.onSale = true
  entity.seller = event.params.seller
  entity.index = event.params.index.toI32()
  entity.acceptToken = event.params.acceptToken
  entity.priceInAcceptToken = event.params.priceInAcceptToken

  let entityNFT = LYNKNFTEntity.load(event.params.tokenId.toString())
  if (entityNFT) {
    entity.name = entityNFT.name
    entity.level = calcTokenLevel(entityNFT)

    entityNFT.isList = true
    entityNFT.listIndex = event.params.index.toI32()
    entityNFT.owner = event.params.seller

    entityNFT.save()
  }

  entity.save()
}

export function handleTake(event: TakeEvent): void {
  let entity = MarketGoodsEntity.load(event.params.tokenId.toString())
  if (entity) {
    entity.onSale = false
    entity.seller = Address.zero()
    entity.index = 0
    entity.acceptToken = Address.zero()
    entity.priceInAcceptToken = BigInt.zero()

    entity.save()
  }

  let entityNFT = LYNKNFTEntity.load(event.params.tokenId.toString())
  if (entityNFT) {
    entityNFT.isList = false
    entityNFT.listIndex = 0

    entityNFT.save()
  }
}
