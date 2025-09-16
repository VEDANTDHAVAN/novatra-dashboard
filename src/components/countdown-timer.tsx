'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Timer, RotateCw } from 'lucide-react';

const STARTING_TIME = 60;

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(STARTING_TIME);
  const [isActive, setIsActive] = useState(true);

  //Preload sounds 
  const tickSound = typeof Audio !== 'undefined' ? new Audio('/sounds/tick.mp3') : null;
  const endSound = typeof Audio !== 'undefined' ? new Audio('/sounds/buzzer.mp3') : null;

  useEffect(() => {
    if (!isActive || timeLeft <= 0) {
      if (timeLeft <= 0) {
        setIsActive(false);
        endSound?.play();
      }
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1;
        if(newTime > 0) {
          tickSound?.play().catch(() => {});
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isActive, timeLeft]);

  const resetTimer = useCallback(() => {
    setTimeLeft(STARTING_TIME);
    setIsActive(true);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium font-headline">
          Auction Clock
        </CardTitle>
        <Timer className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4 pt-4">
        <div className="relative flex h-32 w-32 items-center justify-center">
          <svg className="absolute h-full w-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              className="stroke-muted"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              className="stroke-primary transition-all duration-1000 ease-linear"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 57.6}
              strokeDashoffset={
                2 * Math.PI * 57.6 * (1 - timeLeft / STARTING_TIME)
              }
              strokeLinecap="round"
            />
          </svg>
          <span className="text-4xl font-bold font-headline text-primary tabular-nums">
            {formatTime(timeLeft)}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          {timeLeft > 0 ? 'Time remaining' : "Time's up!"}
        </p>
        <Button onClick={resetTimer} variant="outline" size="sm">
          <RotateCw className="mr-2 h-4 w-4" />
          Reset Timer
        </Button>
      </CardContent>
    </Card>
  );
}
