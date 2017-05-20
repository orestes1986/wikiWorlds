////////
/// page body	EVENTS
////////

Template.conditionList.events({
	// add condition button
	"click .js-add-condition":function(event){
// 		console.log("click .js-add-condition");
// 		console.log(event);
// 		console.log(this);
		
		Meteor.call("addPageBodyCondition", this._id);
// 		console.log(this._id);
	},
	// remove condition button
	"click .js-remove-condition":function(event){
// 		console.log("click .js-remove-condition");
		var bodyid = $(event.currentTarget).attr("data-body-id");
		var conditionIndex = $(event.currentTarget).attr("data-condition-index");
// 		console.log(bodyid);
// 		console.log(conditionIndex);
		Meteor.call("removePageBodyCondition", bodyid, conditionIndex);
	},
	// remove condition button
	"change .js-condition-operation":function(event){
// 		console.log("change .js-condition-menu");
// 		console.log(this);
// 		console.log(event);
		var userId = Meteor.userId();
		var selectedConditionIndex = $(event.currentTarget).attr("data-condition-index");
		var selectedBodyid = $(event.currentTarget).attr("data-body-id");
		var value = $(event.currentTarget).val();
// 		console.log(selectedConditionIndex);
// 		console.log(selectedBodyid);
// 		console.log(value);
		var realPageBody = PagesBodies.findOne({_id:selectedBodyid, owner:userId});
		if (realPageBody){
// 			console.log(realPageBody);
			realPageBody.conditions[selectedConditionIndex].index = selectedConditionIndex;
			realPageBody.conditions[selectedConditionIndex].operation = value;
// 			console.log(realPageBody);
		}
		Meteor.call("updatePageBodyCondition", selectedBodyid, realPageBody.conditions[selectedConditionIndex]);
	},
	// remove condition button
	"change .js-condition-operator":function(event){
// 		console.log("change .js-condition-menu");
// 		console.log(this);
// 		console.log(event);
		var userId = Meteor.userId();
		var selectedConditionIndex = $(event.currentTarget).attr("data-condition-index");
		var selectedBodyid = $(event.currentTarget).attr("data-body-id");
		var value = $(event.currentTarget).val();
// 		console.log(selectedConditionIndex);
// 		console.log(selectedBodyid);
// 		console.log(value);
		var realPageBody = PagesBodies.findOne({_id:selectedBodyid, owner:userId});
		if (realPageBody){
// 			console.log(realPageBody);
			realPageBody.conditions[selectedConditionIndex].index = selectedConditionIndex;
			realPageBody.conditions[selectedConditionIndex].operator = value;
// 			console.log(realPageBody);
		}
		Meteor.call("updatePageBodyCondition", selectedBodyid, realPageBody.conditions[selectedConditionIndex]);
// 		
	},
	// add condition button
	"click .js-condition-param":function(event){
// 		console.log("js-condition-param clicked");
// 		console.log(event);
// 		console.log(this);
		Session.set("selectedConditionIndex", $(event.currentTarget).attr("data-condition-index"));
		Session.set("selectedBodyid", $(event.currentTarget).attr("data-bodyid"));
// 		console.log(Session.get("selectedConditionIndex"));
// 		console.log(Session.get("selectedBodyid"));
		$("#condition_select_form").modal('show');
	},
});
Template.condition_select_form.events({
	"click .js-param-to-choose":function(event){
// 		console.log("js-param-to-choose clicked");
		$("#condition_select_form").modal('hide');
		Session.set("paramid", this._id);
		$("#condition_select_value").modal('show');
	},
});
Template.condition_select_value.events({
	"click .js-set-condition-value":function(event){
// 		console.log("js-set-condition-value clicked");
// 		$("#condition_select_form").modal('hide');
// 		console.log(this);
		var userId = Meteor.userId();
		var dataIndex = $(event.currentTarget).attr("data-data-index");
		var valueIndex = $(event.currentTarget).attr("data-value-index");
// 		console.log("valueIndex");
// 		console.log(valueIndex);
		var selectedBodyid = Session.get("selectedBodyid");
		var selectedConditionIndex = Session.get("selectedConditionIndex");
		var paramid = Session.get("paramid");
		var realPageBody = PagesBodies.findOne({_id:selectedBodyid, owner:userId});
		if (realPageBody){
// 			console.log(realPageBody);
			realPageBody.conditions[selectedConditionIndex].index = selectedConditionIndex;
			realPageBody.conditions[selectedConditionIndex].paramid = paramid;
			realPageBody.conditions[selectedConditionIndex].paramIndex = dataIndex;
			realPageBody.conditions[selectedConditionIndex].paramValueIndex = valueIndex;
// 			console.log(realPageBody);
		}
		Meteor.call("updatePageBodyCondition", selectedBodyid, realPageBody.conditions[selectedConditionIndex]);
// 		Meteor.call("removePageBodyChoice", this.bodyid, this.choiceid);
// 		console.log(event);
		$("#condition_select_value").modal('hide');
	},
});
Template.choiseList.events({
	// remove world button
	"click .js-page-choises":function(event){
// 		console.log("click .js-page-choises");
		Session.set("pageid", this._id);
// 		console.log(this._id);
	},
});
Template.removeChoice.events({
	// remove world button
	"click .js-remove-choice": function(event){
// 		console.log("click .js-remove-choice");
// 		console.log(this);
		Meteor.call("removePageBodyChoice", this.bodyid, this.choiceid);
	},
});
Template.addBody.events({
	// remove world button
	"click .js-add-body":function(event){
// 		console.log("click .js-add-body");
		Meteor.call("addPageBody", this._id);
// 		console.log(this._id);
	},
});
Template.removeBody.events({
	// remove world button
	"click .js-remove-body":function(event){
// 		console.log("click .js-remove-body");
		Meteor.call("removePageBody", this._id);
// 		console.log(this._id);
	},
});

Template.addPage.events({
	'click .js-show-page-form':function(event){
// 		console.log("showing the modal...");
// 		console.log($(event.currentTarget).attr("data-body-id"));
		Session.set("bodyid", $(event.currentTarget).attr("data-body-id"));
		$("#page_add_form").modal('show');
	},
});
Template.bodyEditor.events({
	'click .js-editable-time':function(event){
		console.log("js-editable-time clicked");
		console.log(this.bodyid);
		console.log(Meteor.userId());
		var timeToUpdate = 0;
		if ($("#time-centuries").val()) {
			timeToUpdate += $("#time-centuries").val() * 100*365*24*60*60*1000;
		}
		if ($("#time-decades").val()) {
			timeToUpdate += $("#time-decades").val() * 10*365*24*60*60*1000;
		}
		if ($("#time-years").val()) {
			timeToUpdate += $("#time-years").val() * 365*24*60*60*1000;
		}
		if ($("#time-months").val()) {
			timeToUpdate += $("#time-months").val() * 30*24*60*60*1000;
		}
		if ($("#time-weeks").val()) {
			timeToUpdate += $("#time-weeks").val() * 7*24*60*60*1000;
		}
		if ($("#time-days").val()) {
			timeToUpdate += $("#time-days").val() * 24*60*60*1000;
		}
		if ($("#time-hours").val()) {
			timeToUpdate += $("#time-hours").val() * 60*60*1000;
		}
		if ($("#time-minutes").val()) {
			timeToUpdate += $("#time-minutes").val() * 60*1000;
		}
		if ($("#time-seconds").val()) {
			timeToUpdate += $("#time-seconds").val() * 1000;
		}
		if (timeToUpdate != this.overall) {
			console.log("They are different");
			console.log(timeToUpdate);
			console.log(this);
			var realPageBody = PagesBodies.findOne({_id:this.bodyid, owner:Meteor.userId()});
			if (realPageBody){
				realPageBody.time = timeToUpdate;
				Meteor.call("updatePageBody", realPageBody);
// 				Meteor.call("updatePageBody", realPageBody);
			}
		}
	},
	'click .js-pages-body-clickable':function(event){
// 		console.log("body was clicked...");
		if ($(event.currentTarget).hasClass( "js-pages-body-is-paired" )) {
			$('.js-pages-body').removeClass('js-pages-body-clickable');
			$('.js-pages-body').removeClass('js-pages-body-is-paired');
			$('.js-pages-body').removeClass('css-pages-body-is-paired');
			return false;
		}
// 		console.log(this._id);
// 		console.log(event);
		var param = CyoaParams.findOne({_id:$(event.currentTarget).attr("data-param-id")});
// 		console.log(param);
		param.data[$(event.currentTarget).attr("data-data-index")].values[$(event.currentTarget).attr("data-value-index")].bodyid = this._id;
// 		console.log(param);
		var value = { value: param.data[$(event.currentTarget).attr("data-data-index")].values[$(event.currentTarget).attr("data-value-index")].value, pageid: param.data[$(event.currentTarget).attr("data-data-index")].values[$(event.currentTarget).attr("data-value-index")].pageid, bodyid: this._id}
// 		console.log($(event.currentTarget).attr("data-data-index"));
// 		console.log($(event.currentTarget).attr("data-value-index"));
// 		console.log($(event.currentTarget).attr("data-param-id"));
// 		Meteor.call("updateParam", param);
		Meteor.call("updateParamFieldValueBodyId", param._id, $(event.currentTarget).attr("data-data-index"), $(event.currentTarget).attr("data-value-index"), value);
		$('.js-pages-body').removeClass('js-pages-body-clickable');
		$('.js-pages-body').removeClass('js-pages-body-is-paired');
		$('.js-pages-body').removeClass('css-pages-body-is-paired');
	},
	'click .js-pages-body-addValue-clickable':function(event){
// 		console.log("body addValue was clicked...");
// 		console.log(this._id);
// 		console.log(event);
		if ($(event.currentTarget).hasClass( "js-pages-body-is-paired" )) {
			$('.js-pages-body').removeClass('js-pages-body-addValue-clickable');
			$('.js-pages-body').removeClass('js-pages-body-is-paired');
			$('.js-pages-body').removeClass('css-pages-body-is-paired');
			return false;
		}
		var param = CyoaParams.findOne({_id:Session.get("paramid")});
		var dataindex = $(event.currentTarget).attr("data-data-index");
		var value = { value: "Another value", pageid: Session.get("pageid"), bodyid:this._id };
		Meteor.call("addParamFieldValue", param._id, dataindex, value, function(error, result){
			if (result == 1) {
				var msg = "Value added!";
// 				console.log(msg);
				FlashMessages.sendSuccess(msg);
			} else if (result == 2) {
				var msg = "Please attach to a body this value or another one not currently attached to a body, otherwise this page might not behave as expected!";
				FlashMessages.sendError(msg);
			} else if (result == 3) {
				var msg = "Not a valid param";
// 				console.log(msg);
				FlashMessages.sendWarning(msg);
			} else if (result == 0) {
				var msg = "You are not the owner";
// 				console.log(msg);
				FlashMessages.sendWarning(msg);
			}
		});
		$('.js-pages-body').removeClass('js-pages-body-addValue-clickable');
		$('.js-pages-body').removeClass('js-pages-body-is-paired');
		$('.js-pages-body').removeClass('css-pages-body-is-paired');
	},
});