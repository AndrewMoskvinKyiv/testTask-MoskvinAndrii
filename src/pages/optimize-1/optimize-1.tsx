import React, { memo, useCallback, useMemo, useState } from 'react';
import { CenteredLayout } from '~/components';
import { useRenderHighlight } from '~/utils';
import css from './optimize-1.module.scss';

const todosData = [
  { id: 1, text: 'run a marathon', done: false },
  { id: 2, text: 'ride an elephant', done: false },
  { id: 3, text: 'swim with a fish', done: false },
];

// TODO Fix all list re-rendering when only one component is changed :(

interface TodoProps {
  item: { id: number; text: string, done: boolean };
  onClick: (id: number) => void;
}

const Todo = React.memo(({ item, onClick }: TodoProps) => {
  const ref = useRenderHighlight(css.render);
  const onItemClick = () => onClick(item.id);

  return (
    <li ref={ref} onClick={onItemClick} className={css.listItem}>
      {item.done ? '[x]' : '[ ]'} {item.text}
    </li>
  );
});

export const Optimize1 = () => {
  const [todos, setTodos] = useState(todosData);

  const handleTodoClick = useCallback(
    (id: number) => {
      setTodos(prevState => prevState.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
    },
    [],
  );

  return (
    <CenteredLayout className='gap-4'>
      <div className='text-3xl'>It re-renders all items! =\</div>
      <div>We need to fix that</div>
      <ul>
        {todos.map((item, index) => <Todo
            key={index}
            item={item}
            onClick={handleTodoClick}
          />,
        )}
      </ul>
    </CenteredLayout>
  );
};
