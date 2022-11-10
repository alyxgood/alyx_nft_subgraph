import {ATTRIBUTE_CA, ATTRIBUTE_DX, ATTRIBUTE_IN, ATTRIBUTE_VA} from "../constants/constants";
import {LYNKNFTEntity} from "../generated/schema";

export function calcTokenLevel(entity: LYNKNFTEntity) {
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
    return levelToken > levelCurrentAttr ? levelCurrentAttr : levelToken
}