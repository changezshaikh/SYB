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
}