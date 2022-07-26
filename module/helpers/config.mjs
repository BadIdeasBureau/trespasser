export const trespasser = {};

/**
 * The set of Ability Scores used within the sytem.
 * @type {Object}
 */
 trespasser.attributes = {
  "str": "TRESPASSER.Ability.Str.Name",
  "agi": "TRESPASSER.Ability.Agi.Name",
  "vig": "TRESPASSER.Ability.Vig.Name",
  "kno": "TRESPASSER.Ability.Kno.Name",
  "cun": "TRESPASSER.Ability.Cun.Name",
  "res": "TRESPASSER.Ability.Res.Name"
};

trespasser.abilityAbbreviations = {
  "str": "TRESPASSER.Ability.Str.Mod",
  "agi": "TRESPASSER.Ability.Agi.Mod",
  "vig": "TRESPASSER.Ability.Vig.Mod",
  "kno": "TRESPASSER.Ability.Kno.Mod",
  "cun": "TRESPASSER.Ability.Cun.Mod",
  "res": "TRESPASSER.Ability.Res.Mod"
};

trespasser.actionTypes = {
  attack: "TRESPASSER.Keywords.Type.Attack",
  support: "TRESPASSER.Keywords.Type.Support"
}

trespasser.implements = {
  melee: "TRESPASSER.Keywords.Implement.Melee",
  ranged: "TRESPASSER.Keywords.Implement.Ranged",
  conjury: "TRESPASSER.Keywords.Implement.Conjury",
  personal: "TRESPASSER.Keywords.Implement.Personal",
  unarmed: "TRESPASSER.Keywords.Implement.Unarmed",
  artifice: "TRESPASSER.Keywords.Implement.Artifice"
}

trespasser.armorWeights = {
  light: "TRESPASSER.ArmorWeight.Light",
  medium: "TRESPASSER.ArmorWeight.Medium",
  heavy: "TRESPASSER.ArmorWeight.Heavy"
}

trespasser.damageTypes = {
  physical: "TRESPASSER.Keywords.Damage.Physical",
  cold: "TRESPASSER.Keywords.Damage.Cold",
  fire: "TRESPASSER.Keywords.Damage.Fire",
  lightning: "TRESPASSER.Keywords.Damage.Lightning",
  mental: "TRESPASSER.Keywords.Damage.Mental",
  necrotic: "TRESPASSER.Keywords.Damage.Necrotic",
  poison: "TRESPASSER.Keywords.Damage.Poison",
  spectral: "TRESPASSER.Keywords.Damage.Spectral"
}

trespasser.targetTypes = {
  creature: "TRESPASSER.Target.Types.Creature",
  blast: "TRESPASSER.Target.Types.Blast",
  burst: "TRESPASSER.Target.Types.Burst",
  closeBurst: "TRESPASSER.Target.Types.CloseBurst",
  line: "TRESPASSER.Target.Types.Line",
  path: "TRESPASSER.Target.Types.Path",
  inherit: "TRESPASSER.Target.Types.Inherit"
}

trespasser.aoeTargets = {
  all: "TRESPASSER.Target.AoETargets.All",
  enemies: "TRESPASSER.Target.AoETargets.Enemies",
  allies: "TRESPASSER.Target.AoETargets.Allies",
  selfAllies: "TRESPASSER.Target.AoETargets.SelfAllies"
}

trespasser.equippable = {
  inventory: "TRESPASSER.Item.Equippable.Inventory",
  hand: "TRESPASSER.Item.Equippable.Hand",
  holding: "TRESPASSER.Item.Equippable.Holding",
  armorHead: "TRESPASSER.Item.Equippable.ArmorHead",
  armorBody: "TRESPASSER.Item.Equippable.ArmorBody",
  armorArms: "TRESPASSER.Item.Equippable.ArmorArms",
  armorLegs: "TRESPASSER.Item.Equippable.ArmorLegs",
  armorOuter: "TRESPASSER.Item.Equippable.ArmorOuter"
}

trespasser.actionSpeeds = {
  main: "TRESPASSER.ActionSpeed.Main",
  move: "TRESPASSER.ActionSpeed.Move",
  minor: "TRESPASSER.ActionSpeed.Minor",
  reaction: "TRESPASSER.ActionSpeed.Reaction",
  free: "TRESPASSER.ActionSpeed.Free"
}

trespasser.mainActionTypes = {
  basic: "TRESPASSER.MainActionType.Basic",
  special: "TRESPASSER.MainActionType.Special",
  mighty: "TRESPASSER.MainActionType.Mighty",
  standard: "TRESPASSER.MainActionType.Standard"
}
//Array for values that scale with level
trespasser.levelScaling = [
  {skillBonus: 2, potency: 6,  minXp: 0,     effort: 0,  actions:{basic: 0, special: 0, mighty: 0}}, //0
  {skillBonus: 2, potency: 6,  minXp: 100,   effort: 4,  actions:{basic: 2, special: 1, mighty: 1}}, //1
  {skillBonus: 2, potency: 6,  minXp: 2000,  effort: 5,  actions:{basic: 2, special: 2, mighty: 1}}, //2
  {skillBonus: 2, potency: 8,  minXp: 4000,  effort: 6,  actions:{basic: 2, special: 3, mighty: 1}}, //3
  {skillBonus: 3, potency: 8,  minXp: 6000,  effort: 7,  actions:{basic: 3, special: 3, mighty: 2}}, //4
  {skillBonus: 3, potency: 8,  minXp: 9000,  effort: 8,  actions:{basic: 3, special: 4, mighty: 2}}, //5
  {skillBonus: 3, potency: 10, minXp: 12000, effort: 9,  actions:{basic: 3, special: 5, mighty: 2}}, //6
  {skillBonus: 4, potency: 10, minXp: 15000, effort: 10, actions:{basic: 3, special: 5, mighty: 3}}, //7
  {skillBonus: 4, potency: 10, minXp: 20000, effort: 11, actions:{basic: 3, special: 6, mighty: 3}}, //8
  {skillBonus: 5, potency: 12, minXp: 25000, effort: 12, actions:{basic: 3, special: 6, mighty: 3}} //9
]