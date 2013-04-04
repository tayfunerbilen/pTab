/*
 * jQuery Tab Plugin (pTab)
 * Author - Tayfun ERBİLEN - Mert Osman BAŞOL
 * Web - erbilen.net
 * Mail - tayfunerbilen@gmail.com
 * Version - 1.0
*/

(function($){

  jQuery.fn.efektUygula = function(methodName, speed) {
		return this[methodName]( (methodName == 'show' ? 0 : speed) );
	}

	jQuery.fn.pTab = function(ayarlar){
	
		var ayar = jQuery.extend({
			pEvent : 'click',
			pTab : 'ul',
			pTabElem : 'li',
			pClass : 'aktif',
			pContent : '.icerik',
			pDuration : 500,
			pEffect : 'show',
			pUi : false,
			pUiEffect : 'fade',
			pDebug : false,
			pSlide : false,
			pSlideWidth: 0,
			pEasing: 'linear',
			pSlidePrev: false,
			pSlideNext: false,
			pSlideLoop: false,
			pSlideLoopDuration: 500,
			pMouseWheel: false
		}, ayarlar);
		
		return this.each(function(){

			if ( ayar.pDebug ){
				if ( ayar.pUi ) {
					if ( !jQuery.ui ) {
						alert("Tab uygulaması için UI Kütüphanesini sayfanıza dahil etmeniz gerekiyor!");
					}
				}
			}
		
			var elem = jQuery(this);
			var indis = 0;
			jQuery(ayar.pTab + " " + ayar.pTabElem + ":first", elem).addClass(ayar.pClass);
			
			if ( ayar.pMouseWheel || ayar.pSlideLoop || ayar.pSlide ) {
				var elemLength = jQuery(ayar.pContent, elem).css("float","left").length;
				if ( ayar.pSlideNext == false && ayar.pSlidePrev == false ){
					ayar.pSlideNext = true;
					ayar.pSlidePrev = true;
				}
			}

			if ( ayar.pSlide == false ){
				jQuery(ayar.pContent, elem).hide();
				jQuery(ayar.pContent + ":first", elem).show();
			}
			else {
				jQuery(ayar.pContent, elem).wrapAll('<div rel="pSlide"></div>');
				jQuery('div[rel=pSlide]', elem).wrapAll('<div rel="pSlideContent"></div>');
				jQuery('div[rel=pSlideContent]', elem).css({"width" : ayar.pSlideWidth, "overflow" : "hidden"});
				jQuery('div[rel=pSlide]', elem).width( elemLength * ayar.pSlideWidth );
			}

			jQuery(ayar.pTab + " " + ayar.pTabElem, elem).bind(ayar.pEvent, function(){
			
				if ( !jQuery(this).is('.'+ayar.pClass) ){

					indis = jQuery(this).index();

					if ( ayar.pDebug ){
						if ( !jQuery(ayar.pContent + ":eq("+indis+")", elem).length ) {
							alert( jQuery(this).text() + " nesnesine ait " + ayar.pContent + " nesnesi bulunamadı!");
							return false;
						}
					}

					jQuery(this).parent().find(ayar.pTabElem).removeClass(ayar.pClass);

					jQuery(this).addClass(ayar.pClass);

					if ( ayar.pSlide == false ){

						ayar.pEffect == 'slide' ? jQuery(ayar.pContent, elem).finish().slideUp(ayar.pDuration) : jQuery(ayar.pContent, elem).hide();

						if ( ayar.pUi && jQuery.ui ){
							jQuery(ayar.pContent + ":eq("+indis+")", elem).finish().effect(ayar.pUiEffect);
						} else {
							jQuery(ayar.pContent + ":eq("+indis+")", elem).finish().efektUygula(ayar.pEffect, ayar.pDuration);
						}
					
					}
					else {

						jQuery('div[rel=pSlide]', elem).stop().animate({
							marginLeft: '-' + (indis * ayar.pSlideWidth) + 'px'
						}, {
							duration: ayar.pDuration,
							easing: ayar.pEasing
						});
						
					}
					
				}
				return false;
			});

			if ( ayar.pSlidePrev ){
				
				var pSlidePrevFunc = function(){
				
					indis > 0 ? indis-- : indis = elemLength - 1;
					
					jQuery('div[rel=pSlide]', elem).stop().animate({
						marginLeft: '-' + (indis * ayar.pSlideWidth) + 'px'
					}, {
						duration: ayar.pDuration,
						easing: ayar.pEasing
					});

					jQuery(ayar.pTab + " " + ayar.pTabElem, elem).parent().find(ayar.pTabElem).removeClass(ayar.pClass);

					jQuery(ayar.pTab + " " + ayar.pTabElem + ":eq("+indis+")", elem).addClass(ayar.pClass);

				}
				
				jQuery(ayar.pSlidePrev, elem).click(function(){

					pSlidePrevFunc();
					return false;
					
				});
				
			}

			if ( ayar.pSlideNext ){
				
				var pSlideNextFunc = function(){
				
					indis < elemLength - 1 ? indis++ : indis = 0;

					jQuery('div[rel=pSlide]', elem).stop().animate({
						marginLeft: '-' + (indis * ayar.pSlideWidth) + 'px'
					}, {
						duration: ayar.pDuration,
						easing: ayar.pEasing
					});
					
					/* aktif classını tüm tab elemanlarından kaldır */
					jQuery(ayar.pTab + " " + ayar.pTabElem, elem).parent().find(ayar.pTabElem).removeClass(ayar.pClass);
					
					/* tıklanana aktif sınıfını ata */
					jQuery(ayar.pTab + " " + ayar.pTabElem + ":eq("+indis+")", elem).addClass(ayar.pClass);
				
				}
				
				jQuery(ayar.pSlideNext, elem).click(function(){

					pSlideNextFunc();
					return false;
					
				});
				
			}

			if ( ayar.pSlideLoop ){
			
				var pTabSlider = function(){
					if ( indis < elemLength - 1 ){
						pSlideNextFunc(); 
					}
					else {
						indis = -1;
						pSlideNextFunc();
					}

				}
				var interval = setInterval(function(){
					pTabSlider();
				}, ayar.pSlideLoopDuration);
				
				jQuery(elem).hover(function(){
					clearInterval(interval);
					interval = null;
				}, function(){
					interval = setInterval(function(){
						pTabSlider();
					}, ayar.pSlideLoopDuration);
				});
				
			}

			if ( ayar.pMouseWheel ){
				jQuery(elem).mousewheel(function(event, delta, deltaX, deltaY){
					delta > 0 ? pSlidePrevFunc() : pSlideNextFunc();
					return false;
				});
			}
			
		});
	
	}

})(jQuery);
