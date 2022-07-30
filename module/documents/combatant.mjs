/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Combatant}
 */
 export class TrespasserCombatant extends Combatant {

  get isMonster(){
    return (this.actor?.type === "npc")
  }
  /** @override */
  static async _onCreateDocuments(documents,context) {
    for(let combatant of documents){
      if(combatant.isMonster){
        //find parent combat, determine if flags.trespasser.monsterInit is less than this monster's init
        //if yes, set flag to this monster's init and rerollNPCs (will break delayed monsters...)
        //if no, set this combatant's initiative to monsterInit
        let combatantInit = combatant.actor?.system.init
        let monsterInit = combatant.parent.flags?.trespasser?.monsterInit
        if(combatantInit > monsterInit){
          await combatant.combat.setFlag("trespasser", "monsterInit", combatantInit)
        }
      }
    }
  }
  /** @override */
  _getInitiativeFormula(){
    if(this.isMonster){
        return this.parent.getFlag("trespasser", "monsterInit").toString()
    } else {
        return super._getInitiativeFormula()
    }
  }

}