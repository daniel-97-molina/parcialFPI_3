function Usuario(id, name, email){
				//properties
				this.id = id;
				this.name = name;
				this.email = email;
				//methods
				if (typeof this.sayName != "function"){
					Person.prototype.sayName = function(){
					//console.log(this.name);
				};
				}
			}
