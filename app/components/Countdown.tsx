import React from 'react';

import {useCountdown} from '~/hooks/useCountdown';

const ShowCounter = ({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) => {
  return (
    <div className="show-counter grid grid-cols-4">
      <>
        <p className="font-native text-5xl">{days}</p>
        <span>Days</span>
      </>
      <>
        <p className="font-native text-5xl">{hours}</p>
        <span>Hours</span>
      </>
      <>
        <p className="font-native text-5xl">{minutes}</p>
        <span>Mins</span>
      </>
      <>
        <p className="font-native text-5xl">{seconds}</p>
        <span>Seconds</span>
      </>
    </div>
  );
};

export function Countdown({targetDate}: {targetDate: Date}) {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  if (days + hours + minutes + seconds <= 0) {
    return <h2>Done</h2>;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
}
