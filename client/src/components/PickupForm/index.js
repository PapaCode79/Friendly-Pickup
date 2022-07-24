import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_PICKUP } from '../../utils/mutations';
import { QUERY_PICKUP, QUERY_ME } from '../../utils/queries';

const PickupForm = () => {
  const [pickupText, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addPickup, { error }] = useMutation(ADD_PICKUP, {
    update(cache, { data: { addPickup } }) {
      
        // could potentially not exist yet, so wrap in a try/catch
      try {
        // update me array's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, pickup: [...me.pickup, addPickup] } },
        });
      } catch (e) {
        console.warn("First pickup insertion by user!")
      }

      // update pickup array's cache
      const { pickups } = cache.readQuery({ query: QUERY_PICKUP });
      cache.writeQuery({
        query: QUERY_PICKUP,
        data: { pickups: [addPickup, ...pickups] },
      });
    }
  });

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addPickup({
        variables: { pickupText },
      });

      // clear form value
      setText('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p
        className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Here's a new pickup..."
          value={pickupText}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PickupForm;
