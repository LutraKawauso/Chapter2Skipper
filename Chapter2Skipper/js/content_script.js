if (!$('body').data('script-loaded')) {
  $('body').data('script-loaded', true);

  //1秒ごとに監視
  setInterval(function() {
    //再生リスト再生時
    if (new URLSearchParams(window.location.search).has('list')) {
      let time_str = get_time();
      if (time_str) {
        let time_sec = convertTimeToSeconds(time_str) - 3; //ジングル分マイナス
        let video = document.querySelector('.video-stream');
        if (video) {
          if (video.currentTime >= time_sec) {
            let prev_btn = document.querySelector('a.ytp-next-button');
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
function get_time() {
  let chapters = document.querySelectorAll('#secondary ytd-horizontal-card-list-renderer[modern-chapters] #items > *');
  if (chapters.length >= 2) {
    let timeElement = chapters[1].querySelector('#time');
    return timeElement ? timeElement.textContent.trim() : '';
  }
  return '';
}

//分：秒の形式を秒に変換
function convertTimeToSeconds(timeString) {
  if (!timeString || !/^\d+:\d+$/.test(timeString)) return 0;
  const [min, sec] = timeString.split(':').map(Number);
  return (min * 60) + sec;
}
