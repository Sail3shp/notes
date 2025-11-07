import mongoose from 'mongoose'
/* Why timestamps Is Outside the Fields
1. timestamps is a Schema Option, not a field definition.

The first argument in new mongoose.Schema() defines the fields (the actual structure of the document).

The second argument defines options — extra features that control how the schema behaves.

Schema constructor signature:

new mongoose.Schema(definition, [options])


So:

definition → { title, content }

options → { timestamps: true }

That’s why timestamps goes outside the field definitions — it’s not a data field, but a configuration setting.

*/

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        require:true
    },
},
    {timestamps:true}
)

const Note = mongoose.model('Note',noteSchema)

export default Note