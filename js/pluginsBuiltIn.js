var defaultPlugins = [
	{
		name: 'Save To Disk',
		key: 'save',
		dataType: 'image',
    editorDefault: true,
		onclick: function(scope) {
			String.prototype.twoDigits=function () {return this.replace(/^(.)$/,'0$1')};
			var x = scope.image_blob();
			var url=URL.createObjectURL(x);
			var filename;
			filename=scope.page_title || scope.page_url;
			filename=filename.replace(/[%&\(\)\\\/\:\*\?\"\<\>\|\/\]]/g,' ');
			//filename+='-' + (new Date).getHours().toString().twoDigits() + (new Date).getMinutes().toString().twoDigits() + (new Date).getSeconds().toString().twoDigits()
			// filename+=localStorage['pngjpg']=='png' ? '.png' : '.jpg';
			filename+= '.png' ;
			var evt = document.createEvent("MouseEvents");evt.initMouseEvent("click", true, true, window,0, 0, 0, 0, 0, false, true, false, false, 0, null);
			var a=$('<a></a>').appendTo(document.body);
			a.attr({'href':url,'download':filename})[0].dispatchEvent(evt)
		}
	},
  {
		name: 'Share with Screenshot Extension',
		key: 'openscreenshot',
		dataType: 'image',
		editorDefault:true,
		url: '%s'
  },
  {
		name: 'Print',
		key: 'print',
		dataType: 'image',
    editorDefault: true,
		onclick: function(scope) {
			var image = scope.image_base64()
			var x = new Dialog({
				html: '<img style=border:none;max-width:100% src="data:image/jpg;base64,' + image + '">'
				// ,ui: 'dialog'
			});
			x.print();
		}
	},
	{
		name:'Copy',
		key:'copy',
		dataType:'image',
		editorDefault:true,
		onclick:function(scope){
			var image=scope.image_base64()
			mod = $('<div style=z-index:100000;position:fixed;width:100%;top:5%><center><span style="display:inline-block;background-color:white;padding:10px;border:1px solid black"><h2>Right click the image and choose "Copy Image"</h2><img style="max-width:80%;max-height:80%"></span></center></div>');
			$("img", mod).attr("src", 'data:image/png;base64,' + image);
			mod.appendTo(document.body);
			window.setTimeout(function() {
					$(document).one("click", function() {
							mod.remove()
					})
			}, 0)
		}
	},
	{
		name:'SendBug',
		key:'sendbug',
		dataType:'image',
		editorDefault:true,
		onclick:function(scope){
			var image=scope.image_base64()

			data = {
				image,
				url: scope.page_url
			}

			$.post('http://localhost:3000', data, function (response) {
				console.error(response)
			});

			mod = $('<div style=z-index:100000;position:fixed;width:100%;top:5%><center><span style="display:inline-block;background-color:white;padding:10px;border:1px solid black"><h2>ERROR:</h2><img style="max-width:80%;max-height:80%"></span></center></div>');
			$("img", mod).attr("src", 'data:image/png;base64,' + image);
			mod.appendTo(document.body);
			window.setTimeout(function() {
					$(document).one("click", function() {
							mod.remove()
					})
			}, 0)
		}
	},
]