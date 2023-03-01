import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const CURRENT_TIME_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay({ seconds }) {
  console.log(localStorage.setItem(CURRENT_TIME_KEY, seconds));
  // localStorage.setItem(CURRENT_TIME_KEY, seconds);
}

player
  .setCurrentTime(localStorage.getItem(CURRENT_TIME_KEY))
  .then(function (seconds) {
    seconds = localStorage.getItem(CURRENT_TIME_KEY);
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        seconds = 0 || seconds > player.duration;
        break;

      default:
        console.log('An error occurred while setting the time');
      // some other error occurred
    }
  });
