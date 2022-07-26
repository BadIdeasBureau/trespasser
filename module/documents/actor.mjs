/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class TrespasserActor extends Actor {

  /** @override */
  prepareData() {
    // Prepare data for the actor. Calling the super version of this executes
    // the following, in order: data reset (to clear active effects),
    // prepareBaseData(), prepareEmbeddedDocuments() (including active effects),
    // prepareDerivedData().
    super.prepareData();
  }

  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded
    // documents or derived data.
    const actorData = this;
    const systemData = actorData.system;
    const flags = actorData.flags.trespasser || {};

    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.
    this._prepareBaseCharacterData(actorData);
    this._prepareBaseNpcData(actorData);
  }

  /**
   * Prepare Character type specific data
   */
   _prepareBaseCharacterData(actorData) {
    if (actorData.type !== 'character') return;

    // Make modifications to data here. For example:
    const systemData = actorData.system;

    // Loop through ability scores, and add their modifiers to our sheet output.
    for (let [key, attribute] of Object.entries(systemData.attributes)) {
      // Calculate the modifier using d20 rules.
      attribute.mod = Math.floor((attribute.value - 10) / 2);
    }

    //calculate level scaling values
    const level = systemData.info.level
    const thisLevel = CONFIG.trespasser.levelScaling[level]

    systemData.potency = {
      size: thisLevel.potency,
      dice: "d" + thisLevel.potency
    }

    systemData.skillBonus = thisLevel.skillBonus

    systemData.effort.max = thisLevel.effort

    systemData.info.xpToNext = CONFIG.trespasser.levelScaling[level+1]?.minXp ?? Infinity

    //calculate stat scaling values
    
    systemData.reactions = level ? Math.floor(systemData.attributes.agi.value/5) : 0

    systemData.recovery.max = level ? 8 + systemData.attributes.res.mod : 0

  }

  /**
   * Prepare NPC type specific data.
   */
  _prepareBaseNpcData(actorData) {
    if (actorData.type !== 'npc') return;

    // Make modifications to data here. For example:
    const systemData = actorData.system;
  }

  /**
   * @override
   * Augment the basic actor data with additional dynamic data. Typically,
   * you'll want to handle most of your calculated/derived data in this step.
   * Data calculated in this step should generally not exist in template.json
   * (such as ability modifiers rather than ability scores) and should be
   * available both inside and outside of character sheets (such as if an actor
   * is queried and has a roll executed directly from it).
   */
  prepareDerivedData() {
    const actorData = this;
    const systemData = actorData.system;
    const flags = actorData.flags.trespasser || {};

    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.
    this._prepareDerivedCharacterData(actorData);
    this._prepareDerivedNpcData(actorData);
  }

  /**
   * Prepare Character type specific data
   */
  _prepareDerivedCharacterData(actorData) {
    if (actorData.type !== 'character') return;

    // Make modifications to data here. For example:
    const systemData = actorData.system;

    //Calculate total AC
    const ac = systemData.ac
    ac.value = ac.base + ac.bonus + ac.armor 

    //initiative

    systemData.init = systemData.skillBonus + systemData.bonus.init + systemData.attributes.cun.mod

    //skilled modifiers

    for (let [key, attribute] of Object.entries(systemData.attributes)) {
      // Calculate the modifier using d20 rules.
      attribute.skilled = attribute.mod + systemData.skillBonus;
    }

  }

  /**
   * Prepare NPC type specific data.
   */
  _prepareDerivedNpcData(actorData) {
    if (actorData.type !== 'npc') return;

    // Make modifications to data here. For example:
    const systemData = actorData.system;

    //Calculate total AC
    const ac = systemData.ac
    ac.value = ac.base + ac.bonus + ac.armor 

  }

  /**
   * Override getRollData() that's supplied to rolls.
   */
  getRollData() {
    const data = super.getRollData();

    // Prepare character roll data.
    this._getCharacterRollData(data);
    this._getNpcRollData(data);

    return data;
  }

  /**
   * Prepare character roll data.
   */
  _getCharacterRollData(data) {
    if (this.type !== 'character') return;

    // Copy the ability scores to the top level, so that rolls can use
    // formulas like `@str.mod + 4`.
    if (data.attributes) {
      for (let [k, v] of Object.entries(data.attributes)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

  }

  /**
   * Prepare NPC roll data.
   */
  _getNpcRollData(data) {
    if (this.type !== 'npc') return;

    // Process additional NPC data here.
  }

}