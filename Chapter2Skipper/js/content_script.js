if (!$('body').data('script-loaded')) {
  $('body').data('script-loaded', true);

  //1秒ごとに監視
  setInterval(function() {
    //再生リスト再生時
    if(window.location.href.includes("list=")){
      let time_str = get_time();
      if (time_str) {
        let time_sec = convertTimeToSeconds(time_str);
        let video = document.querySelector('.video-stream');
        if (video) {
          if (video.currentTime >= time_sec) {
            let prev_btn = $('a.ytp-next-button')[0];
            if (prev_btn) {
              prev_btn.click();
            }
          }
        }
      }
    }
  }, 1000);
}

//チャプター２の時刻を取得
function get_time(){
  let chapters = $('#primary ytd-horizontal-card-list-renderer[modern-chapters] #items').children();
  if (chapters.length == 2) {
    let chapter2 = $(chapters[1]);
    return $(chapter2.find('#time')[0]).text();
  }
  return '';
}

//分：秒の形式を秒に変換
function convertTimeToSeconds(timeString) {
  const [min, sec] = timeString.split(':').map(Number);
  return (min * 60) + (sec);
}
