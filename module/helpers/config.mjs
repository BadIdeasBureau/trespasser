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

//Array for values that scale with level
trespasser.levelScaling = [
  {skillBonus: 2, potency: 6}, //0
  {skillBonus: 2, potency: 6}, //1
  {skillBonus: 2, potency: 6}, //2
  {skillBonus: 2, potency: 8}, //3
  {skillBonus: 3, potency: 8}, //4
  {skillBonus: 3, potency: 8}, //5
  {skillBonus: 3, potency: 10}, //6
  {skillBonus: 4, potency: 10}, //7
  {skillBonus: 4, potency: 10}, //8
  {skillBonus: 5, potency: 12} //9
]