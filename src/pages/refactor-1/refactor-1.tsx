import clsx from 'clsx';
import React, { useState } from 'react';
import { CenteredLayout } from '~/components';

// TODO is there a way to not write this twice? =\

const buttons = ['fast', 'quality', 'cheap'] as const

type ButtonType = typeof buttons[number]


interface ButtonProps {
  button: ButtonType;
  selectedButton: ButtonType | null;
  setSelectedButton: (value: ButtonType) => void;
}

// TODO is it possible to improve this component's interface (props)?


const Button: React.FC<ButtonProps> = (props) => {

  const style = props.button === props.selectedButton;
  return (
    <button
      key={props.button}
      onClick={() => props.setSelectedButton(props.button)}
      className={clsx(
        'h-10 px-5 flex items-center justify-center rounded transition-colors',
        style ? 'bg-green-400' : 'bg-gray-300',
      )}
    >
      {props.button}
    </button>
  );
};

export const Refactor1 = () => {
  const [selectedButton, setSelectedButton] = useState<ButtonType | null>(null);
  return (
    <CenteredLayout className="gap-4">
      <div className="text-3xl">See the code</div>
      <div className="grid grid-cols-3 gap-2 w-60">
        {buttons.map((button) => (
          <Button
            key={button}
            button={button}
            selectedButton={selectedButton}
            setSelectedButton={setSelectedButton}
          />
        ))}
      </div>
    </CenteredLayout>
  );
};
