import React from 'react';
import FarmForm from './FarmForm';
import FarmFormNdvi from './FarmFormNdvi';
import FarmFormPrecipitation from './FarmFormPrecipitation';

export default function Farms() {
  return (
    <>
      <FarmForm />
      <hr />
      <FarmFormNdvi />
      <hr />
      <FarmFormPrecipitation />
    </>
  );
}
