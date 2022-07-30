import { trespasser } from "../helpers/config.mjs"

const {
    systemDataField,
    foreignDocumentField,
    embeddedCollectionField,
    field,
    AlphaField,
    AngleField,
    ArrayField,
    BooleanField,
    ColorField,
    DataField,
    DocumentIdField,
    DocumentOwnershipField,
    DocumentStatsField,
    EmbeddedDataField,
    EmbeddedCollectionField,
    FilePathField,
    ForeignDocumentField,
    HTMLField,
    IntegerSortField,
    JSONField,
    NumberField,
    ObjectField,
    SchemaField,
    SetField,
    StringField,
    SystemDataField,
    ModelValidationError
 } = foundry.data.fields

 const DataModel = foundry.abstract.DataModel

function getChoices(config){
    return{
        choices: config,
        initial: Object.keys(config)[0]
    }
}

class EffectField extends SchemaField {
    constructor({requireDamage = false, weaponEffect = false}) {
        return new SchemaField({
            damage: new StringField({
                blank: true, 
                required: requireDamage, 
                label: "TRESPASSER.Items.Damage.Label", 
                hint: "TRESPASSER.Items.Damage.Hint"
            }),
            conditions: new ArrayField(
                new SchemaField({
                    name: new StringField(),
                    duration: new NumberField({
                        min: 0, 
                        integer: true, 
                        required: true
                    }),
                    target: new StringField({...getChoices(trespasser.aoeTargets)})
                }),
                {
                    required: true,
                    initial: [],
                }
            ),
            chooseCondition: new BooleanField(),
            other: new StringField({
                blank: true,
                required: true
            }),
            weaponEffect: new BooleanField()
        })
    }
}

class TargetField extends SchemaField {
    constructor({inherit = false}){
        let targetTypes = {...trespasser.targetTypes}
        if(!inherit) delete targetTypes.inherit
        return new SchemaField({
            type: new StringField({
                required: true,
                ...getChoices(trespasser.targetTypes)
            }),
            number: new NumberField({
                min: 0, 
                integer: true, 
                required: true
            }),
            size: new NumberField({
                min: 0, 
                integer: true, 
                required: true
            }),
            aoeTargets: new StringField({
                required: true,
                ...getChoices(trespasser.aoeTargets)
            }),
        })
    }
}

class BaseTemplateDataModel extends DataModel{
    static defineSchema(){
        return {
            description: new StringField({
                required: true,
                initial: ""
            })
        }
    }
}

class InventoryTemplateDataModel extends DataModel{
    static defineSchema(){
        return{
            inventory: new SchemaField({
                equippable: new ArrayField( 
                    new StringField({choices: trespasser.equippable}),
                    {
                        initial: ["inventory"],
                    }
                    )
            })
        }
    }
}

class ArmorTemplateDataModel extends DataModel{
    static defineSchema(){
        return {
            die: new StringField({
                required: true,
                initial: ""
            }),
            ac: new NumberField({
                min: 0,
                integer: true,
                required: true,
                initial: 0
            }),
            spent: new BooleanField({required: true, initial: false}),
            broken: new BooleanField({required: true, initial: false})
        }
    }
}

class CostsEffortTemplateDataModel extends DataModel{
    static defineSchema(){
        return{
            effort: new SchemaField({
                base: new NumberField({
                    min: 0, 
                    integer: true, 
                    required: true
                }),
                scaling: new NumberField({
                    min: 0, 
                    integer: true, 
                    required: true
                }),
                used: new NumberField({
                    min: 0, 
                    integer: true, 
                    required: true
                }),
            })
        }
    }
}

class MainActionTemplateDataModel extends DataModel{
    static defineSchema(){
        return {
            attribute: new StringField({
                ...getChoices(trespasser.attributes),
                required: true,
            }),
            keywords: new SchemaField({
                attribute: new StringField({
                    ...getChoices(trespasser.attributes),
                    required: true,
                }),
                type: new StringField({
                    ...getChoices(trespasser.actionTypes),
                    required: true
                }),
                implement: new ArrayField( 
                    new StringField({
                        choices:trespasser.implements,
                        required: true
                    }),
                    {
                        required: true,
                        initial: []
                    }
                )

            }),
            hit: new EffectField({requireDamage: true}),
            solidHit: new EffectField({requireDamage: false}),
            after: new EffectField({requireDamage: false}),
            target: new TargetField({inherit: false})
        }
    }
}

class WeaponDataModel extends DataModel {
    static defineSchema(){
        let baseTemplate = BaseTemplateDataModel.defineSchema()
        let inventoryTemplate = InventoryTemplateDataModel.defineSchema()
        inventoryTemplate.inventory.fields.equippable.initial = ["inventory", "hand"]
        return {
            ...baseTemplate,
            ...inventoryTemplate,
            melee: new NumberField({
                min: 0, 
                integer: true, 
                required: false
            }),
            range: new NumberField({
                min: 0, 
                integer: true, 
                required: false
            }),
            conjury: new NumberField({
                min: 0, 
                integer: true, 
                required: false
            }),
            damage: new StringField(),
            strReq: new NumberField({
                min: 0, 
                integer: true, 
                required: false
            }),
            effect: new EffectField({requireDamage: false, weaponEffect: true})
        }
    }
}

class ArmorDataModel extends DataModel {
    static defineSchema(){
        let baseTemplate = BaseTemplateDataModel.defineSchema()
        let inventoryTemplate = InventoryTemplateDataModel.defineSchema()
        let armorTemplate = ArmorTemplateDataModel.defineSchema()
        
        return{
            ...baseTemplate,
            ...inventoryTemplate,
            ...armorTemplate,
            weight: new StringField({...getChoices(trespasser.armorWeights), required: true})
        }
    }
}

class ShieldDataModel extends DataModel {
    static defineSchema(){
        let baseTemplate = BaseTemplateDataModel.defineSchema()
        let inventoryTemplate = InventoryTemplateDataModel.defineSchema()
        let armorTemplate = ArmorTemplateDataModel.defineSchema()
        inventoryTemplate.inventory.fields.equippable.initial = ["inventory", "hand"]
        return{
            ...baseTemplate,
            ...inventoryTemplate,
            ...armorTemplate,
            strReq: new NumberField({
                min: 0, 
                integer: true, 
                required: false
            })
        }
    }
}

class MiscItemDataModel extends DataModel{
    static defineSchema(){
        let baseTemplate = BaseTemplateDataModel.defineSchema()
        let inventoryTemplate = InventoryTemplateDataModel.defineSchema()
        inventoryTemplate.inventory.fields.quantity = new NumberField({integer: true, positive: true, required: true})
        return{
            ...baseTemplate,
            ...inventoryTemplate,
            consumable: new BooleanField({required: true, initial: false})
        }
    }
}

class MainActionDataModel extends DataModel{
    static defineSchema(){
        let baseTemplate = BaseTemplateDataModel.defineSchema()
        let costsEffortTemplate = CostsEffortTemplateDataModel.defineSchema()
        let mainActionTemplate = MainActionTemplateDataModel.defineSchema()
        return{
            ...baseTemplate,
            ...costsEffortTemplate,
            ...mainActionTemplate,
            actionSpeed: new StringField({
                required: true,
                ...getChoices(trespasser.actionSpeeds)
            }),
            actionType: new StringField({
                required: true,
                ...getChoices(trespasser.mainActionTypes)
            })
        }
    }
}

class SpellDataModel extends DataModel{
    static defineSchema(){
        let baseTemplate = BaseTemplateDataModel.defineSchema()
        return{
            ...baseTemplate,
            used: new NumberField({min: 0, integer: true, required: true}),
            miscast: new BooleanField({required: true, initial: false})
        }
    }
}

export const itemDataModels = {
    weapon: WeaponDataModel,
    armor: ArmorDataModel,
    shield: ShieldDataModel,
    miscItem: MiscItemDataModel,
    mainAction: MainActionDataModel,
    spell: SpellDataModel
}