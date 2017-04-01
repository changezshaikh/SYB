export default class DateUtilities {
    static parseDateString(dateString: string) { 
        var dateParts = dateString.split("/");

        if(dateParts.length < 3)
            return new Date().toDateString();

        var newDateString = dateParts[1] + "/" + dateParts[0] + "/" + dateParts[2];
        
        return newDateString; 
    }
}

