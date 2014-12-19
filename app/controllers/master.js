var rss = require('rss');

var url = 'http://timesofindia.indiatimes.com/rssfeeds/5880659.cms';
	

var localData = [];
function refreshRss(){
		rss.loadRSS({
			url:url,
			method:'GET',
			success:function(data){
				$.progressIndicator.hide();
				loadTable(data);
			},
			error:function(e){
				Ti.API.error(e.message);
			},
			progress:function(event){
				console.log(event.progress);
				$.progressIndicator.show();
				var val = Math.floor((event.progress *10)+1);
				console.log(val);
				$.progressIndicator.value = val;
			}
		});
}

function loadTable(data){
	
	var table = Ti.UI.createTableView();
	table.addEventListener('click',function(e){
		console.log(e.index);
		var intent = Ti.Android.createIntent({
			action:Ti.Android.ACTION_VIEW,
			data:data[e.index].link
		});
	
		$.master.activity.startActivity(intent);
	});
	
	for(var i=0;i<data.length;i++){
		var row = createRow(data[i]);
		table.appendRow(row);
	}
	$.master.add(table);
	table = null;
}


function createRow(obj){
	var row = Ti.UI.createTableViewRow();
	
	var view = Ti.UI.createView({
		backgroundColor:'#fff',
		color:'black',
		height:'70dp',
	});
	var label = Ti.UI.createLabel({
		text:obj.title,
		height:'70dp',
		font:{
			fontSize:'15dp'
		},
		color:'black',
		left:'83dp',
		right:'3dp',
		bottom:'10dp',
		touchEnabled:false
	});
	
	var dateLabel = Ti.UI.createLabel({
		text:obj.date,
		height:Ti.UI.SIZE,
		width:Ti.UI.SIZE,
		left:'80dp',
		bottom:'3dp',
		color:'#444',
		font:{
			fontSize:'12dp'
		},
		textAlign:'center',
		touchEnabled:false
	});
	
	var img = Ti.UI.createImageView({
		url:obj.image,
		height:'42dp',
		width:'68dp',
		left:'5dp',
		top:'3dp',
		touchEnabled:false
	});
	
	view.add(img);
	view.add(label);
	view.add(dateLabel);
	row.add(view);
	return row;
}
refreshRss();