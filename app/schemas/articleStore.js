const mongoose = require('mongoose');
const databaseConfig = require(__path_configs + 'database');

var schema = new mongoose.Schema({ 
    name: String, 
    title:String,
    status: String,
    ordering: Number,
    prices: Number,
    content: String,
    special:String,
    thumb: String,
    slug:String,
    category: {
        id: String,
        name: String,
        slug:String
    },
    created: {
        user_id: Number,
        user_name: String,
        time: Date
    },
    modified: {
        user_id: Number,
        user_name: String,
        time: Date
    }
});

module.exports = mongoose.model(databaseConfig.col_article_store, schema );