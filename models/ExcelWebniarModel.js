    
        const {Schema,model}=require("mongoose")

const excelWebniarSchema = new Schema({
    day: { type: String, 
        required: [true,"please enter the day of the webniar"]
    },    
    date: { type: Number, 
        required: [true,"please enter the date of the webniar"]
    },   
    month: { type: String,
         required: [true,"please enter the month of the webniar"]

        },  
    time: { type: String, 
        required: [true,"please enter the time of the webniar"]
    } ,
    webniarurl:{
        type:String,
        required:[false,"please enter the url of the webniar"]
    }   
});


const ExcelWebniarModel = new model('excelwebniar', excelWebniarSchema);

module.exports = ExcelWebniarModel;
