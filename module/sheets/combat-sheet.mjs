/**
 * Extend the basic CombatSheet with some very simple modifications
 * @extends {CombatSheet}
 */
 export class TrespasserCombatSheet extends CombatSheet {

/*
With a bit of custom UI work to:
a) allow manually setting the monster initiative (either to a specific number, or designating a particular monster as the lead) 
b) collapse the monsters into a single entry that can be expanded out to show them, sorted by their innate initiative
c) allow checking off monsters as they take their turn, since the monsters can act in any order which can change between rounds
d) allow monsters and characters to delay and go to init = -10 (or some other special value) for the round, with similar "check off actors as they act" UX
*/
 }
