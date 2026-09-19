import React from 'react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';

type SheetSide = 'top' | 'right' | 'bottom' | 'left';

interface CustomSheetProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  children: React.ReactNode;
  side?: SheetSide;
  hideClose?: boolean;
  reset?: () => void;
  setIsOpen: (open: boolean) => void;
  className?: string;
}

export function CustomSheet({
  isOpen,
  setIsOpen,
  children,
  description,
  title,
  side = 'right',
  reset,
  className,
}: CustomSheetProps) {
  const onOpenChange = (open: boolean) => {
    setIsOpen(open);

    if (!open && reset) {
      reset();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side={side} className={`p-4 z-100 ${className ?? ''}`}>
        {(title || description) && (
          <SheetHeader className='px-0'>
            {title && (
              <SheetTitle className='text-md md:text-lg text-start leading-5.5'>
                {title}
              </SheetTitle>
            )}

            {description && (
              <SheetDescription className='text-xs md:text-sm text-start'>
                {description}
              </SheetDescription>
            )}
          </SheetHeader>
        )}

        <div className='w-full flex-1 overflow-y-auto scrollbar-thin'>
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
}
