import {
  Cancel as CancelEvent,
  List as ListEvent,
  Take as TakeEvent
} from "../generated/Market/Market"
import {HolderOverview, LYNKNFTEntity, MarketGoodsEntity, MarketOverview, TradeLogEntity} from "../generated/schema";
import {Address, BigInt} from "@graphprotocol/graph-ts";
import { MARKET_OVERVIEW_ENTITY_ID } from "../constants/constants";

export function handleCancel(event: CancelEvent): void {
  let entity = MarketGoodsEntity.load(event.params.tokenId.toString())
  if (entity) {
    let fromEntity = HolderOverview.load(entity.seller.toHex())
    if (fromEntity) {
      fromEntity.num -= 1
      fromEntity.save()

      if (fromEntity.num === 0) {
        let marketEntity = MarketOverview.load(MARKET_OVERVIEW_ENTITY_ID)
        if (!marketEntity) {
          marketEntity = new MarketOverview(MARKET_OVERVIEW_ENTITY_ID)
        }
        marketEntity.holdersNum -= 1
        marketEntity.save()
      }
    }

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
    entity.level = entityNFT.level

    entity.charisma = entityNFT.charisma
    entity.charismaThreshold = entityNFT.charismaThreshold
    entity.vitality = entityNFT.vitality
    entity.vitalityThreshold = entityNFT.vitalityThreshold
    entity.intellect = entityNFT.intellect
    entity.intellectThreshold = entityNFT.intellectThreshold
    entity.dexterity = entityNFT.dexterity
    entity.dexterityThreshold = entityNFT.dexterityThreshold
    
    entity.sex = entityNFT.sex
    entity.grade = entityNFT.grade
    entity.factions = entityNFT.factions

    entityNFT.isList = true
    entityNFT.listIndex = event.params.index.toI32()
    entityNFT.owner = event.params.seller

    entityNFT.save()
  }

  entity.save()

  let marketEntity = MarketOverview.load(MARKET_OVERVIEW_ENTITY_ID)
  if (!marketEntity) {
    marketEntity = new MarketOverview(MARKET_OVERVIEW_ENTITY_ID)
  }

  marketEntity.tradeAmount = marketEntity.tradeAmount.plus(event.params.priceInAcceptToken)
  if (marketEntity.highestPrice.equals(BigInt.zero()) || event.params.priceInAcceptToken.gt(marketEntity.highestPrice)) {
    marketEntity.highestPrice = event.params.priceInAcceptToken
  }
  if (marketEntity.lowestPrice.equals(BigInt.zero()) || event.params.priceInAcceptToken.lt(marketEntity.lowestPrice)) {
    marketEntity.lowestPrice = event.params.priceInAcceptToken
  }
  marketEntity.save()
}

export function handleTake(event: TakeEvent): void {
  let entity = MarketGoodsEntity.load(event.params.tokenId.toString())
  if (entity) {
    const tradeEntity = new TradeLogEntity(`${event.transaction.hash.toHex()}-${event.logIndex.toI32()}`)
    tradeEntity.buyer = event.params.buyer.toHexString()
    tradeEntity.seller = entity.seller.toHexString()
    tradeEntity.tokenId = event.params.tokenId.toI32()
    tradeEntity.name = entity.name
    tradeEntity.tx = event.transaction.hash
    tradeEntity.eventTime = event.block.timestamp.toI32()
    tradeEntity.payment = entity.acceptToken
    tradeEntity.priceInPayment = entity.priceInAcceptToken
    tradeEntity.save()

    entity.onSale = false
    entity.seller = Address.zero()
    entity.index = 0
    entity.acceptToken = Address.zero()
    entity.priceInAcceptToken = BigInt.zero()

    entity.save()

    let marketEntity = MarketOverview.load(MARKET_OVERVIEW_ENTITY_ID)
    if (!marketEntity) {
      marketEntity = new MarketOverview(MARKET_OVERVIEW_ENTITY_ID)
    }
    marketEntity.tradeAmount = marketEntity.tradeAmount.plus(entity.priceInAcceptToken)
    marketEntity.save()
  }

  let entityNFT = LYNKNFTEntity.load(event.params.tokenId.toString())
  if (entityNFT) {
    entityNFT.isList = false
    entityNFT.listIndex = 0

    entityNFT.save()
  }
}
