Tanks.findById(id, function(err, tank) {
	tank.size = large
	tank.save(function(err, updatedTank) {
		res.send(updatedTank)
	})
})


Tanks.update({_id : id}, {$set: {size: 'large'}}, callback)

Tanks.findByIdAndUpdate(id, {$set: {size:'large'}}, {new: true}, function(err, tank) {
	res.json({tank: tank})
})



//find

Tanks.where('size').gte(2).lte(70).exec(function(err, kitens){

})
tank = new Tank(obj)

tank.save(function(err, tank) {
	// body...
})


//dellete

Tanks.findByIdAndDelete(id, function(err, alltanks) {
	//body
})