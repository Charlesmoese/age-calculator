import React from 'react';

const AgeDisplay = ({ age }) => {
  return (
    <div className="age-display">
      <p><span className="age-number">{age.years}</span> years</p>
      <p><span className="age-number">{age.months}</span> months</p>
      <p><span className="age-number">{age.days}</span> days</p>
    </div>
  );
};

export default AgeDisplay;