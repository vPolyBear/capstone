import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { describe, expect, test } from '@jest/globals';
import Activities from '../app/activities';

describe('Activities screen integration', () => {
  const sections = [
    {
      button: 'Breathing Activity 🌬️',
      title: 'Select A Breathing Activity',
      first: 'Breathing Activity 1',
      second: 'Breathing Activity 2',
      instructions: /Breathe in for 4 seconds/,
    },
    {
      button: 'Sound Activity 🔊',
      title: 'Select A Sound Activity',
      first: 'Sound Activity 1',
      second: 'Sound Activity 2',
      instructions: /sounds/,
    },
    {
      button: 'Creative Activity 🎨',
      title: 'Select A Creative Activity',
      first: 'Creative Activity 1',
      second: 'Creative Activity 2',
      instructions: /Draw a flower/,
    },
    {
      button: 'Physical Activity 🌅',
      title: 'Select A Physical Activity',
      first: 'Physical Activity 1',
      second: 'Physical Activity 2',
      instructions: /stretch/,
    },
    {
      button: 'Self-Care Activity 🍵',
      title: 'Select A Self-Care Activity',
      first: 'Self-Care Activity 1',
      second: 'Self-Care Activity 2',
      instructions: /Take a nap/,
    },
  ];

  test.each(sections)('TC-107 lists two $title choices and lets the user replay an activity', async (section) => {
    const { getByText, queryByText } = await render(<Activities />);

    await fireEvent.press(getByText(section.button));
    expect(getByText(section.title)).toBeTruthy();
    expect(getByText(section.first)).toBeTruthy();
    expect(getByText(section.second)).toBeTruthy();

    await fireEvent.press(getByText(section.first));
    expect(getByText(section.instructions)).toBeTruthy();

    await fireEvent.press(getByText('Back'));
    expect(getByText(section.title)).toBeTruthy();
    await fireEvent.press(getByText(section.first));
    expect(getByText(section.instructions)).toBeTruthy();

    expect(queryByText(section.title)).toBeNull();
  });
});
