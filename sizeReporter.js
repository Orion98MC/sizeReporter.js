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
  
  var base64 = {
    "iPhone Portrait":'iVBORw0KGgoAAAANSUhEUgAAABkAAAAvCAYAAAAWymHTAAAFfElEQVRYCbVYy09cZRQ/994ZhhnmyQDyjGWhaWOrIT5iMGhtokt2surCbZOa1E0JK43R7rqobN11w1/QFWkiStq6EBZFYoWKDQw1WmY6D+Z57/X8zr3f7cDcwfI6cF/f4/zO+Z3zvUazbZuU3L79w7mlpd/eL5VK3WRZupTruua8EJm2qXV2RigY1Mk0iQwDLYxAdyr1RjBoBHXNoGqtki3mi/eT6fSD6enpFbTQXBDt6tUrX9y9++N3mUwmWq/XUecrExMTNDk5SbVazatvNhSFJluws7NTYuO+/vbGjZsCMjs7+9b3t279sra+3uH1bPMyPDxMMzMz7IVB+5WrLpqm8atG6+trZk9Pz3gAFT8vLHyylcn8LwDabm5u0urqKo2OjgoQyvxE13VKpVLGkycbnwpIPp/vbjQafm0pEk1QZzhC2X+36cKFNykSiQjIxsYGjY2NUSKR4PBZLX3hDWjjujRAtJ6+nr52rlfLJarXykwNERQHAgFKJpM0NTVFoVCIqtWqL20AQWwjnRFNQFLJ1Gg7ENNsSCbBVPZYLM7lcoQrHA6LtVK47wYQJIfF1gHELpcruX1tDvwEPcvLy5SIx6kuNLvDAA9Wjj/ExLRMstlPAXn69/ajAGfLZ5c/p9Qrw2Q3TEpEdNKRJK7AsuzOjvCP+KW703Tx44uiyGvDykFRnSpULBTp1/tLDKaJJ9QZCsfwcf6dD2n4tXOkMUWDca7EKHSN1Lh+izPLZADQgBQeefUMD0y20xvQDkUlO0fZZ1lq/FSnDq6XmESj0bMN06LNh4tkPXssPP/hKldW4gkK4BEElFVLBerv79+TXajHyC8WC1SulCkYiDp0cUD/hALCBKLzXMEAMmOIOv8blCERent7W7LL1m2OVd0JPFkOXZVy+R9/Ve1LAbK7u0s8z0kqN2cnDEbckN7wGHRRRygUba+ufQ0GW6FQkLEDEAXUDGLbmtClx+Px80A8rMAbgHBM93SFLmSZM4k6nljP87m/0OGwgj6VSkUuzARKmj3x6DLr5tOjgEAplCA2XV1de+iCJxKThhsTPYDUOrqUy+U9wVee1BB4TlXxUddfuHpYKDAA7nFBOQQJINnFZRgOoj3AQ/uodEEpKAM1HR0dAuB5wiA217meHIstMVBNNSqVkd6Iixd4HuYw6FiilIIRRReAG8qTwydvqz1KMahS7wCBHD3irThquZUZGoEHXcyXA4LgnITAAwjigAsUQiQYmnH8mIg2vikgPHHBfNGOBes4KawA1FMBON+2AgmcKIgCkyczeHI87dHsfIAdi/fPLl3YZJxEIrciIadcT07HIRgOzZ52FJyGNzardUGsUwGA0TbvglyQ483CrZFwYqyYERDcVIFfh6OWiSe8k3A94eAcb3H0tQM6vREP0k7LE6B7szBAgKymal/TXrJQ6XEMd2dhlcnz8/Ny5lCT3Evq9G3mHY6YL88TtOSTr8yczdQBEN/q2axxvzGqHdrgHWu+OgTR82xWlOA4cJBgIcJmDoKjXDAYPKi56MwX8o4nMT5cNlvv1xNWYxPHJ1ppy+d0WQHBfzuBzliXc3SgoGE4S1qb1gCAsqGhIUqn07LBHhgYoO3tbVliDzJQM4yqxCSZSGTgOujw64AyLKexWIxGRkaEa5znsYb7tYetMAz7466u8KaAfHTp0p3Fe/e+ebiyktgfF6UEnba2toQyeAW6UOYnKIdRg4MD2fG3370jIPxbydrvKyuXO8Phm5xhr8Mj1iDHxReKWCH/48yInxX4uCH6sQoBqvlpsAf9fX2PPhgf//LKtWuP1Q840mFubm5wcWHhvefFYpKBNMuqy47D5JkUggWIYdQ/PnyPfeFoNDc2dvbB9etfZdDmP8e25b0EdCeeAAAAAElFTkSuQmCC',
    "iPhone Landscape":'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',
    "iPad Portrait":'iVBORw0KGgoAAAANSUhEUgAAACAAAAAuCAYAAABJcBuEAAAE3klEQVRYCcVYy28bRRj/drx+PxI7OEZxWkqFFE7l8U8AQsoRkRscygUkekQ9IPXGpSf+D24cUCvgUlUR4gCXtgeKFBWM7XibhMSP9T74ft9knI3J1o6yTr9k1rOzM/P95vc9ZnatMAwJ8umdO7nf7j2oddp/qsFgIG1xlzzlyRk4NOmH7nndG88of3wzmYA74F/mtQKivsN6h3hsAcBHW598+POP978ZDPprY2+swkCDmoyfqqTTNm1tfUz1ep18n+eLiKUsUpYVadHVgPWEQUCWUoHvh3+Xl+pffX371vf25uZm4Zdff7/b7bQ2/jcqpsEdBfRPq0XvvvM2ua5LqVSKDJMxQ6TZwEqn07V29/ldq9n8yX7yZKf6fM9p6IGmy4umwTOLtre36cZbNyify1O5XJoLgJkV/I5G/caKKlVVrpqzUkpxE5p9LqB0ViHqdtv09I+ntLxUYTP4FDC95yk+9+/3di27z47h8QSrqw1aX2+Ko8BZrDPsyMgiEtLBwT5VGADMMI8J4O+5XJaGwxGNecyA/2yn1yePb65euULvf/AeP2RAnj8DANiyiG1JpVKJqtWqsBBBF1vFmJ2dHdYxlj424gPobdumQqFAmUwmdvD0A1Df6XSYvVVxxOnnZ90rNjfGYZEIWQaAmLUEBIDAjvMKzLS7u0v7+/sCfh4zAMB4PObiiWol6ud1/jOQYbIWhySAY2WzShD47DMA4MpszMDFBCx0u11qNBriE7NYCMOUKAcISCIAhsOhmAK+MMuEAAjlrjtKBgBmMb6wvLw8I3pEJyehkYQunODCDBgAR0dH4ozlcvmFOUEz4NKIWYD/2XLlKEhCHMfhjTA/FwCXWYAkwgAmghkODw8JTGSz2VgQmgHOhBw9WPwEAHLbRQUOiJxQq9ViAWDPQeoejRIKwyhosAAGisVibGZEH50HEjaBAeJ53gREXE4AAzoPJBQFRjl+scJ+vy9+EG03dTyH/TUA3g2JCtgKEhUoQHLCxjbNAgB4vA9EdsPE9ctiAABHtWmBo8JMKJBJFEx3vMi9oRlMYPeLijDgezQGAH4ku6HUor0SqsPZsOLpgq3YQx5gWQgDBj9onjaDMCAm8CmVtRkAfFCcMIlUZFTrXzggzBAFATZ8NgHOBfAQtoI+EZ0emtwdFAJItGgQ+uS1UBNgGVAMhaA+eo+3JAgzwIdSeSeQ+4VcoixgLwj41Y95Ye45Ew44a2k0CWejyFIM/Wgy9dDXPnc6SCODkq5C8Ylon8BLtc0WEFnc+vX8BsCEATH7AD4AiaLTLYu7mneQiRMuTtX0zJqF04u9NB8wYCYmYByIgksHIHtvhISXACDicZyE1XEQGIYu/ZcZwOv5pes93gALxgcYwaITQcwaX4oPaCyKY4AzIULhXztDjx49pna7I7k6BmwizdgVHafHB9Y0n4d5M8qvrFB6ryMfnA4O9hJRMnsSiwrFinRTq6+uuSplH3+XwRllvqKUTeuvvU5Xr13nEw++K803TveTXTEoUMpVD374rnft+hsPUzZTcg5B4BSKJSqWKuc2WyaT58+8jYcbG80eTkR+s7F+s91ufeEOhm96QZDmA8IJFIkOpcOFvwNHg+WvZ88kq5QqSyf9TU064sJQ8Y9DCM9rqdB7pb72+ObnX357+9Zn/n8JbdYei6kuQwAAAABJRU5ErkJggg==',
    "iPad Landscape":'iVBORw0KGgoAAAANSUhEUgAAADIAAAAiCAYAAAAd6YoqAAAEqUlEQVRYCdVZS28bVRQ+d2Y8fkzbOCnKIgJSHhKbViRS2wUbFiB2CCo2VPRfIDZsqoo/wIYNElskKlVCLNggxJZ120WiFlRw1cQYOeBM/Jgn57s3dzyZTMbTEY3dK9kzvq9zvvO+1yKOY/HZ519cvf3dtx+67r/nfc8XcRgQkUHCMIgEv+Y0HuGWGURnhP6YohjPvBbRxuYmvbJ+gQJJR82JeY1cK0nyvqDNTX6L6buwTDL4txAUexOvv9v75/uffrzzq7jy1jtX/tr58+fHnUdno1BRNw43AZ8iyywIHuuTNFNfag4LKdV3uCwO6fLlq3TjxicUhuHR8Rm/5G6pPbH/cOy5O333Xevhg61re73uWUhRtZg2NzdodXWVXNel4XDI6DOSn0EQw6BnmiYtLZ3jp0V7e30KAjAeS2FPJhNaWVmmKJIqLLEjUb3eIN/3qdN5nPBUq9XO7D767ZrlT4Zt8DkFGtE6q/3SpYtyUSkKBZMgBHzSDEMTjtNiOutPpRUIptvt0mg0YmEocwt4ryD02hY7ArMBiWuNwDwNYqQJ6gI+Kw3BJPr9vtS2bdul94AwoJE0EIt/Q9OWyc6T10DsmI3nTazYB9OCdNfW1kprBRrBOpi71ohlWbw+IMtQcaEiO9WXwdx6vR61223pS2WEBo1MJt4xID40MjMAVee1cCWAjMdjaWLLy+WcXgE5qhEEEpibVUjtFAbhK61WqxQlDeTg4CAxLZjb3IForQwGAwlmlnlpIGkfkUC8BdAImAcQOO2sBiCelzUtDgDStKZRd9Y+z2RcawUhFSG/SCsY81j6w+FIBggwBI2EnFOtMEJdNd8GBmEujuMUMgLQ8AeEYABAMwyTYs57VkF1V7jp/zkIBj3PkxrR+eGk/YMgC8Qg027MP2pphqEVSLoo0+drxCDbrKWBzNlZGFEQBDKsguG8hn7MgfZgWpgmuMQybc7sakHMlWWTyy5OUiM3b49T6YNWNJg8ggASchaHeTWaDebZJnf/gL0jRH2i0OOQE/jzd3yEWAA66RPyOIrE9Vdfpzcuvkm1ep1CDyWKbEA6fxBgBQAAJs+8NDgcA7bu3yObQQw5y59bXtFAFJxF+QbDeU0DwXM8HslyHr7CuJ9fIBprhJc4ApB89HkSOc0+SD3PvBS/qbMSz8NheXaBc5rcZ2hlTUybFsAkY7iuYdtaaCAZXPKnMqkUEIBiIAbUsqjmJVkr8cUBW59z8zNpiT0WZoq+ilsYhioxwm6SZPZKGyzQInXLtUAMVWXFEHwh9Nw3LiatZtOJBmLvSOBC2n+WN41VBYdzvT4ZpvcwDBFZLedMx0B5nGR4Qdvb27S/P+AbPBWc04vm+W6aBj15ssMsIMqqigRnErve6Ij3Pvj4pd0/fv9he+v+hvxbgQdQ80fR0135K4AnhPFMN/6q4DSmeTmUDRjDRMXgYeexhzxI8TUvyhdYzcsXXrvrNJz3BVL9rVtftr/+5qu3fX/yoiCj5Ye+GXgjWVVO47P0JUWFX/M9S/eKJEMlV7J8V5C88zTBWczHxUeO1lHNThsEKpC8k1arWVGj0fSWzr/Qvf7R9V9u3vz07/8Ak81cHk8nR2IAAAAASUVORK5CYII=',
    "Laptop":'iVBORw0KGgoAAAANSUhEUgAAAEQAAAAnCAYAAAC2c+5GAAAE90lEQVRoBeVavW8URxR/+3U++2w+JIhkyZYiQCRFnPRQp+WjcQSiMx2ioUhBCmRFyF0a0iCklBT+B5wiUYREShd0CIxkiCWHL4s73+G726+838zO3l72dnZZgew95rye2Tdv3s77zXtvdmbHCMOQNMn+8ebNsztv333pe55hUhgwvxHzm7IkMysmDxUS5EQxwWKRzz8ki38yyXuUHadOVo3pA1LEg0y1jEgjeELTCI0gNEzTNBqN6a2VlZ8fMLcbtUhlhg6QS1euXPvrjz9/bbWaqYYfk2BZNhmGQZ6X7uf09DTNz8+Trp9ZfRkaar6p1+v0zbcLy/fu3l3mNkPVSoatCiNy5+njJz+8fPkvzczMiA6P4PkoJNOyyMBvYHux3H6/T77vC2XKgBIL4gIG9sXm84sbG7Ry6hT1knWqrAPE5BGrTU5O0tLSEk1NTZUaJfWgsjlAwLMxKGUBgfW5rkurq6vkeq7FYIyAXvZQBwhzsP+xMJgarrIdKgtGsp1t28RxIEkqXIYOuEQKR7uKEpYDSCSDRwlg7BcgQRBQt9slWGuZPgAMyCiiQyFAFHr7lUMhADIxMVG6CwBDgKI3EKoEIEDB8zxCgK3VaqWsJAaEgdGlck6pk/gJ63q9XiGzz+qCcDc9HtWxELgNZgpcCLBCuSzNR9CVhQSBHpFKWQiUgtsgL3PJwBrQ1lbpaXcE1PtIUlaCOIJy0QRegIEXPOS6VJmgqpSAZcBtPjS4op20EHaZOSUtnVcOEKig4khanWwKwJBXqMOjOkE1qSoUwzRs8RqoaBpYyJi5jAIAVvIhr/IDQPSzTCVdBqDAShAki4Iy9oAAFABSdLb5bACBhRQBRQGS92JWWZeBhSDBdYq4jQIkDMc0qEo4irvNAJAxDaoKEGUleW4DQGAdyHWpUmuZLEXgNlJh/RoH8QN829vZa5mxAARA5Y284mHosnAV9MoHVaVdHiDKgggxdVa1SudjAwhU04GCOulagQ4PGhuXSY91miKsJMdlPitABET6EKK3EDayNMxjTtFbSA6aVcSGJ15tt7WA5DXWSj6olXo89C6TA+ZBVVnbL7yHbGs4tBaiaVfdqpywqH0PUfO64zh8cMXRzvMHGSG16x6vd2AiGS9nWkDwxo/vIGtra5UHBJtJe3t7ueOmA4S/Gxq8l+vR+vp6rqCqMPDGtD87S92s/tqLi4vW8u3bZ7c2/6k3O+/paz5N0mg0xHXuwnnn9Fenh3akYHZqlwqnfsQf00AXP1VGbkpek0+noQxmJlOn/V60y9rYUatXHKdiPxWuGmDpzqtV1ImyWsbzrCFmQ5FDTTmNoNp1+7JfeCg/GyHgxImT5qtXO993Os2w1enQ041NOtyYorm5+e6tWz/9DQupdVrt3/wgPGnww3r9HtkOH4QLPLq6dFV8R8V2P59Zi4UL5aOHyLJQlf8BEpGJDuBGUvg2SuDfbbdHf0aAFlwP87b5mYcOzbDyUlOltJITvxKIagkaWAU8oPGN3P9AWX6T8Tzx+WKh2Wr+jvNsbs/DDhN5fkDtzu4zbrwgDt39cufOd7s7rcuv37450+/1j/I42IEfDs1APMiJBLVlEgMvYJD3Aqf4PhQgUmJ2R72REJYosgUoqTJX231SUdDkvgdgjjhY2agYWUb6W7Zk+L9sHpiAB9nnA3/vDh858vCLY8fv37hx/dF//ZTLZafXLaoAAAAASUVORK5CYII=',
    "Large screen":'iVBORw0KGgoAAAANSUhEUgAAAEYAAAA2CAYAAAB6DO9FAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEJmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS4xLjIiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxMy0wOS0wNlQxOTowOTo0NzwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+UGl4ZWxtYXRvciAyLjI8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIj4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+NzI8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOkNvbXByZXNzaW9uPjU8L3RpZmY6Q29tcHJlc3Npb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjE8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjcyPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlm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'
  };
  
  var images = {};
  for (var k in base64) {
    var image = new Image();
    image.src = "data:image/png;base64," + base64[k];
    image.style.float = "left";
    images[k] = image;
  }
	
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
    markup += '  <div style="margin-left:60px;color:black;"></div>';
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
      image = images[dev];
      imageNode.parentNode.removeChild(imageNode);
      div.insertBefore(image, desc);
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
