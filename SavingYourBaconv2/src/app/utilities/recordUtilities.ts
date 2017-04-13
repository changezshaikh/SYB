export default class RecordUtilities {
    static getRecordTypeOptions() { 
        let options = [
            {
                id: 1002,
                value: "Mark this expense as one time?"
            },
            {
                id: -1,
                value: "Mark this expense as recurring?"
            }
        ];

        return options;
    }

    static getIncomeTypeOptions() { 
        let options = [
            {
                id: 1002,
                value: "Mark this income as one time?"
            },
            {
                id: -1,
                value: "Mark this income as recurring?"
            }
        ];

        return options;
    }

    static getRecurringTypes(){
        let recurringTypes = [
            {id: 1000, value: "Fixed"}, {id: 1001, value: "Variable"}
        ];

        return recurringTypes;
    }

    static getAmountTypeName(id){
        let recurringTypes = this.getRecurringTypes();
        
        recurringTypes.forEach(type =>{
            if(type.id == id) return type.value;
        });

        return "One-time";
    }
}