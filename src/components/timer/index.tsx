import Button from "@components/atoms/button";
import { formatTime } from "@helpers/numberHelper";
import { useTimer } from "react-timer-hook";
import addNotification from "react-push-notification";

const Timer = () => {
  const { seconds, minutes, restart, isRunning } = useTimer({
    onExpire: () => {
      document.title = `Draft!`;
      addNotification({
        title: "Draft",
        subtitle: "Draft available",
        native: true, // when using native, your OS will handle theming.
      });
    },
    expiryTimestamp: new Date(),
    autoStart: false,
  });
  if (isRunning) {
    document.title = `${formatTime(minutes)}:${formatTime(seconds)}`;
  }
  return (
    <p>
      {minutes == 0 && seconds == 0 && <span>Draft </span>}
      {(minutes > 0 || seconds > 0) && (
        <span>{`${formatTime(minutes)}:${formatTime(seconds)}`}</span>
      )}
      <Button
        onClick={() => {
          const time = new Date();
          time.setSeconds(time.getSeconds() + 360);
          restart(time);
        }}
      >
        Start Timer
      </Button>
    </p>
  );
};
export default Timer;
