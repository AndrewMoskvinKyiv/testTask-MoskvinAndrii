import { CenteredLayout } from '~/components';
import React, { memo, useMemo, useState } from 'react';


// TODO refactor

interface QuestionOrAnswer {
  question?: string;
  answer?: string;
}

const QnA: QuestionOrAnswer[] = [
  { question: 'Do you run like a fish?' },
  { answer: 'Absolutely man' },
  { question: 'Have you tried to swim like a dinosaur?' },
  { answer: 'Nah, not my cup of tea' },
  { question: 'How are we counting from 5 to 10?' },
  { answer: 'Do I look like a counter?' },
];

const QnaRender = ({question, answer}: QuestionOrAnswer) => {
  return(
    <div>
      <h3 className='font-bold text-lg'>{question}</h3>
      <p className='mb-2 text-center' >{answer}</p>
    </div>
)
};

export const  Refactor2 = React.memo(() => {

 let arr = [];
 for (let i = 0; i < QnA.length; i++) {
    if (Object.keys(QnA[i]).toString() === 'question'){
      arr.push(Object.assign(QnA[i], QnA[i+1]))
    }
  }


  return (
    <CenteredLayout className='gap-2'>
      <div className='text-3xl mb-2'>See the code</div>
      {arr.map((item, index) => (<QnaRender key={index} question={item.question} answer={item.answer}/>))}

    </CenteredLayout>
  )
});
