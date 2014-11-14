
var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name : String,
	userName : {
		type: Schema.Types.Mixed  //email or phone
	},
	passWord : String,
	gender: String,
	photo : String,
	role : { 
		type: Number,
		default: 0
	},
	score: {
		type: Number, 
		default:10, 
		min:10
	},
	regDate : {
		type: Date , 
		default: Date.now
	}
});

var UserModel = mongoose.model('User', UserSchema);

var UserObj  = {
	save: function (obj, callback){
		var User= new UserModel(obj);
		User.save(function (err, user){
			callback(err, user);
		});
	},
	delete: function(id, callback){
		UserModel.remove({_id: id}, function (err){
			callback(err);
		});
	},
	delete2: function(arrId, callback){
		for(var i=arrId.length; i > 0; i--){
			UserModel.remove({_id: arrId[i].id}, function (err){
				callback(err);
			});
		}
	},
	update: function(user, callback){
		UserModel.update({_id: user.id}, user, function (err){
			callback(err);
		});
	},
	update2: function(arrUser, callback){
		for(var i=0, len=arrUser.length; i< len; i++){
			var user=arrUser[i];
			UserModel.update({_id: user.id}, user, function (err){
				callback(err);
			});
		}
	},
	findAll: function(query, callback){
		UserModel.find(query, function (err, users){
			callback(err, users);
		});
	},
	findOne: function(query, callback){
		UserModel.findOne(query, function (err, user){
			callback(err, user);
		});
	},
	upScore: function (id, score, callback){
		UserModel.update({"_id": id}, {"$inc": {"score": score}}, function (err) {
			callback(err);
		});
	},
	upLogDate: function (id, callback){
		UserModel.update({"_id": id}, {"$push": {"logDate": new Date()}}, function ( err ){
			callback(err);
		})
	}
}

module.exports = UserObj;