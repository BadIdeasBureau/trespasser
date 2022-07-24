/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Combatant}
 */
 export class TrespasserCombatant extends Combatant {

  isNpc(){
    return false //determine whether this is an NPC
  }
  /** @override */
  _onCreate(data,options,userId) {
    super._onCreate(data,options,userId)
    if(this.isNpc){
    //find parent combat, determine if flags.trespasser.monsterInit is less than this monster's init
    //if yes, set flag to this monster's init and rerollNPCs (will break delayed monsters...)
    //if no, set this combatant's initiative to monsterInit
    }
  }
  /** @override */
  rollInitiative(formula){
    if(this.isNpc){
        return super.rollInitiative(this.parent.getFlag("trespasser", "monsterInit"))
    } else {
        return super.rollInitiative(formula)
    }
  }

}