import React, { FC, useState } from 'react';
interface Props {
  title: string;
  body: string;
}

//Need to pass the Accordion object props to the Accordion component
const Accordion: FC<Props> = ({ title, body }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="mb-3">
      <div
        className={`transition-all duration-1000 ${
          isActive ? 'rounded-t-lg bg-green-500 text-white' : ''
        } z-10 flex cursor-pointer justify-between p-3`}
        onClick={() => setIsActive(!isActive)}
      >
        <div>{title}</div>
        <div>{isActive ? '-' : '+'}</div>
      </div>
      {
        <div
          className={`overflow-hidden z-0 origin-top p-4 transition-all duration-700 ${
            isActive
              ? 'h-max border border-solid border-slate-300 translate-y'
              : 'translate-y p-0 h-0 ' 
          }`}
        >
          {body}
        </div>
      }
    </div>
  );
};

export default Accordion;
