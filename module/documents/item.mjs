/**
 * Extend the basic Item with some very simple modifications.
 * @extends {Item}
 */

/**
 * Thought noodling on action handling
 * ```js
        "hit": {
          "damage": "1d8",
          "condition": [{name: "foo", duration: 2, self:false}, {name: "this", duration: 2, self: true}],
          "chooseCondition": true
          "other": "Push the target 15ft",
          "weaponEffect": false
        },
```
(and the same data for `solidHit` and `after`)With the plan being to match the conditions by name with the basic conditions, and with a special value for "use the condition embedded as an active effect on this item"

Where the user gets a solid hit, I can push any new conditions into the array (or more probably, reduce the array so that I can stack durations on conditions as required), and if there is more than one condition and chooseCondition is true (for all hit levels obtained), then present the user with a dialog to select which condition to apply.  If weaponEffect is true, then I combine the weapon's additional damage/conditions/other effects in the same way.

Does this seem like a sensible model to be going on with? Any pitfalls I might be missing here that will trip me up later? I'm aiming for a highish level of automation for the system, so will be wanting to consume this data for that. (I may change `self:` to something which would allow a choice between target self, target one target of the original attack, target all targets of original attack, and target new target(s))
 */
export class TrespasserItem extends Item {
  /**
   * Augment the basic Item data model with additional dynamic data.
   */
  prepareData() {
    // As with the actor class, items are documents that can have their data
    // preparation methods overridden (such as prepareBaseData()).
    super.prepareData();
  }

  /**
   * Prepare a data object which is passed to any Roll formulas which are created related to this Item
   * @private
   */
   getRollData() {
    // If present, return the actor's roll data.
    if ( !this.actor ) return null;
    const rollData = this.actor.getRollData();
    // Grab the item's system data as well.
    rollData.item = foundry.utils.deepClone(this.system);

    return rollData;
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  async roll() {
    const item = this;

    // Initialize chat data.
    const speaker = ChatMessage.getSpeaker({ actor: this.actor });
    const rollMode = game.settings.get('core', 'rollMode');
    const label = `[${item.type}] ${item.name}`;

    // If there's no roll data, send a chat message.
    if (!this.system.formula) {
      ChatMessage.create({
        speaker: speaker,
        rollMode: rollMode,
        flavor: label,
        content: item.system.description ?? ''
      });
    }
    // Otherwise, create a roll and send a chat message from it.
    else {
      // Retrieve roll data.
      const rollData = this.getRollData();

      // Invoke the roll and submit it to chat.
      const roll = new Roll(rollData.item.formula, rollData);
      // If you need to store the value first, uncomment the next line.
      // let result = await roll.roll({async: true});
      roll.toMessage({
        speaker: speaker,
        rollMode: rollMode,
        flavor: label,
      });
      return roll;
    }
  }
}
