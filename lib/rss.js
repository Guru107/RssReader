exports.loadRSS=function(obj){
	var xhr = Ti.Network.createHTTPClient();
	xhr.open(obj.method,obj.url);
	xhr.onload = function(){
		Ti.API.info("XHR - onload called, readyState: " + this.readyState);
		var xml = this.responseXML;
		
		if(xml === null || xml.documentElement === null){
			alert("Check your network connection!");
		}
		
		var items = xml.documentElement.getElementsByTagName('item');
		var data = [];
		
		for(var i=0;i<items.length;i++){
			var item = items.item(i);
			
			var image,title,link,pubDate;
			try{
				image = item.getElementByTagName('img').item(0).getAttribute('src');
			}catch(e){
				image = '';
			}
			
			title = item.getElementByTagName('title').item(0).textContent;
			link = item.getElementByTagName('link').item(0).textContent;
			pubDate = item.getElementByTagName('pubDate').item(0).textContent;
			
			data.push({
				title:title,
				link:link,
				date:pubDate,
				image:image
			});
			
			
		}
		
		if(obj.success){
				obj.success(data);
		}
	};
	
	xhr.send();
	
	xhr.onerror = function(e){
		Ti.API.error("XHR - onerror called, readyState: "+this.readyState+", error message: "+e.message);
	};
};
