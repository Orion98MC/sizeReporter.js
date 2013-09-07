(function (window, document) {

  function removeEvent(e, type, callback) {
    if (e == null || e == undefined) return;
    if (e.removeEventListener ) { e.removeEventListener(type, callback, false); } 
    else if (e.detachEvent) { e.detachEvent("on" + type, callback);
    } else { e["on" + type] = callback; }
  }
  
	function addEvent(e, type, callback) {
    if (e == null || e == undefined) return;
    if (e.addEventListener) { e.addEventListener(type, callback, false ); }
    else if (e.attachEvent) { e.attachEvent("on" + type, callback); } 
    else { e["on" + type] = callback; }
	}
	
  var windowSize = (function winSize() {
		var f='';
		if (typeof(window.innerWidth) == 'number') { //Non-IE
			f='width:window.innerWidth,height:window.innerHeight';
		} else if (document.documentElement && document.documentElement.clientWidth) { //IE 6+ in 'standards compliant mode'
			f='width:document.documentElement.clientWidth,height:document.documentElement.clientHeight';
		} else if (document.body && document.body.clientWidth)  { //IE 4 compatible
			f='width:document.body.clientWidth,height:document.body.clientHeight';
		} else if (document.width) { //doc version
			f='width:document.width,height:document.height';
		}
		return Function('return{'+f+'}');
	})();
  	
  function device(size) {
		var device = "unknown";
		if (size.width <= 320) { device = "iPhone Portrait"; } 
    else if (size.width <= 480) { device = "iPhone Landscape"; } 
    else if (size.width <= 768) { device = "iPad Portrait"; } 
    else if (size.width <= 1024) { device = "iPad Landscape"; } 
    else if (size.width <= 1440) { device = "Laptop"; } 
    else { device = "Large screen"; }
    return device;
	}
          
  function setup () {
    var div = document.createElement("div");
    div.id = "SizeReporter";
    
    var style = "";
    style += "position:fixed;";
    style += "width:150px;height:60px;";
    style += "top:0;left:0;";
    style += "background-color:gray;border:1px solid #222;";
    style += "opacity:0.9;";
    style += "font-size:14px;";
    style += "font-family:Arial;";
    style += "color:white;";
    style += "text-align:center;";
    style += "padding:10px 10px 0;";
    style += "";
    div.style.cssText = style;
    
    var markup = "";
    markup += '<img style="float:left"/>';
    markup += '<div style="margin-left:5px;">';
    markup += '  <div style="margin-bottom:5px;"></div>';
    markup += '  <div style="color:black;"></div>';
    markup += "</div>";
    div.innerHTML = markup;
    
    var dev, size, imageNode, 
      desc = div.children[1],
      deviceNode = desc.children[0], sizeNode = desc.children[1], 
      offset = {x:0, y:0}, zindex = 0, start = {x:0, y:0};
    
    function noop() { return false; }

    function onresize() {
      imageNode = div.children[0];
      size = windowSize();
      dev = device(size);
      deviceNode.textContent = dev;
      sizeNode.textContent = size.width + "x" + size.height;
    }
    
    function onmousedown(e) {
      if (e == null) { e = window.event; }    
      if (e.button == 1 && window.event != null || e.button == 0) {
        start.x = e.clientX;
        start.y = e.clientY;
        var rect = div.getBoundingClientRect();
        offset.x = rect.left;
        offset.y = rect.top;
    
        zindex = div.style.zIndex;
        div.style.zIndex = 10000;
    
        document.body.focus();
        addEvent(document, 'mousemove', onmousemove);
        addEvent(document, 'selectstart', noop);
        addEvent(div, 'dragstart', noop);
        return false;
      }
    }
    
    function onmouseup(e){
      div.style.zIndex = zindex;
      removeEvent(document, 'mousemove', onmousemove);
      removeEvent(document, 'selectstart', noop);
      removeEvent(div, 'dragstart', noop);
    }
    
    function onmousemove(e){
      if (e == null) { e = window.event; }    
      div.style.left = (offset.x + e.clientX - start.x) + 'px';
      div.style.top = (offset.y + e.clientY - start.y) + 'px';    
    }
    
    addEvent(window, "resize", onresize);
    addEvent(div, "mousedown", onmousedown);
    addEvent(div, "mouseup", onmouseup);
    document.body.appendChild(div);
    onresize();
  }
  
  setup();
  
})(window, document);
