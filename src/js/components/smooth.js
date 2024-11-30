class ComponentsSmooth {
  static init() {
    this.$el = {
      window: $(window),
    };

    this.smoothScroll();
  }

  static smoothScroll() {
    // ページ内リンクのスムーススクロール
    jQuery(function () {
      jQuery('a[href*="#"]').click(function (e) {
        var target = jQuery(this.hash === "" ? "html" : this.hash);
        if (target.length) {
          e.preventDefault();
          var headerHeight = jQuery("header").outerHeight();
          var position = target.offset().top - headerHeight;
          jQuery("html, body").animate({ scrollTop: position }, 500, "swing");
        }
      });
    });

    // 画像が全て読み込まれた後に実行する関数
    function onImagesLoaded(callback) {
      var images = jQuery("img");
      var totalImages = images.length;
      var loadedImages = 0;

      images.each(function () {
        if (this.complete) {
          loadedImages++;
        } else {
          jQuery(this).on("load", function () {
            loadedImages++;
            if (loadedImages === totalImages) {
              callback();
            }
          });
        }
      });

      // 画像が全て読み込まれている場合
      if (loadedImages === totalImages) {
        callback();
      }
    }

    // 画像が全て読み込まれた後に実行する処理
    onImagesLoaded(function () {
      // 画像が全て読み込まれた後にスムーススクロール処理を実行
      var urlHash = location.hash;
      if (urlHash) {
        // ハッシュを取り除いてページトップに遷移させる
        history.replaceState(null, "", window.location.pathname);
        // ページトップに飛ばない場合の保険
        jQuery("html,body").stop().scrollTop(0);

        var target = jQuery(urlHash);
        if (target.length) {
          var headerHeight = jQuery("header").outerHeight();
          var position = target.offset().top - headerHeight - 20;
          jQuery("html, body").animate({ scrollTop: position }, 500, "swing");
        }
      }
    });
  }
}

export default ComponentsSmooth;
