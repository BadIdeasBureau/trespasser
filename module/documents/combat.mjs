/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Combat}
 */
 export class TrespasserCombat extends Combat {

    _preCreate(data, options, user){
        super._preCreate()
        this.updateSource({ "flags.trespasser.monsterInit": 0 })
    }
 }
 