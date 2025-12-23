'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

type Phase = 'typing' | 'paused' | 'backspacing' | 'ready';

interface TypingError {
  position: number;
  wrongText: string;
  pauseBeforeCorrect?: number;
}

interface TypingTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  showCursor?: boolean;
  loop?: boolean;
  pauseAfterComplete?: number;
  errors?: TypingError[];
  backspaceSpeed?: number;
}

export function TypingText({
  text,
  delay = 0,
  speed = 50,
  className = '',
  showCursor = true,
  loop = false,
  pauseAfterComplete = 5000,
  errors = [],
  backspaceSpeed = 30,
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('ready');
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Initial delay before starting
  useEffect(() => {
    if (currentIndex === 0 && displayedText === '' && phase === 'ready') {
      timeoutRef.current = setTimeout(() => {
        setPhase('typing');
      }, delay);
    }
  }, [delay, currentIndex, displayedText, phase]);

  // Main typing effect
  useEffect(() => {
    if (phase !== 'typing') return;
    if (currentIndex >= text.length) {
      setPhase('paused');
      return;
    }

    // Check if we've reached an error position
    const currentError = errors.find(e => e.position === currentIndex);

    if (currentError) {
      // Type wrong text
      let wrongIndex = 0;
      const typeWrong = () => {
        if (wrongIndex < currentError.wrongText.length) {
          setDisplayedText(prev => prev + currentError.wrongText[wrongIndex]);
          wrongIndex++;
          timeoutRef.current = setTimeout(typeWrong, speed);
        } else {
          // Pause to show error
          timeoutRef.current = setTimeout(() => {
            // Backspace the wrong text
            let backspaceCount = 0;
            const backspaceWrong = () => {
              if (backspaceCount < currentError.wrongText.length) {
                setDisplayedText(prev => prev.slice(0, -1));
                backspaceCount++;
                timeoutRef.current = setTimeout(backspaceWrong, backspaceSpeed);
              } else {
                // Now type the correct character and move on
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
              }
            };
            backspaceWrong();
          }, currentError.pauseBeforeCorrect || 300);
        }
      };
      typeWrong();
    } else {
      // Normal typing
      timeoutRef.current = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
    }
  }, [phase, currentIndex, text, speed, errors, backspaceSpeed]);

  // Pause after completion
  useEffect(() => {
    if (phase === 'paused') {
      timeoutRef.current = setTimeout(() => {
        if (loop) {
          setPhase('backspacing');
        }
      }, pauseAfterComplete);
    }
  }, [phase, pauseAfterComplete, loop]);

  // Backspace effect
  useEffect(() => {
    if (phase === 'backspacing') {
      if (displayedText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayedText(prev => prev.slice(0, -1));
        }, backspaceSpeed);
      } else {
        setPhase('ready');
      }
    }
  }, [phase, displayedText, backspaceSpeed]);

  // Reset for loop
  useEffect(() => {
    if (phase === 'ready' && loop && displayedText.length === 0 && currentIndex > 0) {
      setCurrentIndex(0);
      timeoutRef.current = setTimeout(() => {
        setPhase('typing');
      }, 500);
    }
  }, [phase, loop, displayedText, currentIndex]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && (phase === 'typing' || phase === 'paused' || phase === 'backspacing') && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block w-2 h-5 bg-accent-primary ml-1"
        />
      )}
    </span>
  );
}
