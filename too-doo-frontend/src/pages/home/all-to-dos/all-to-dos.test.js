import React from 'react';
import AllToDos from './index';
import apiService from '../../../util/api';
import { waitForElementToBeRemoved, within, fireEvent, waitFor } from '@testing-library/react';
import { renderWithRouter } from '../../../util/testing';
import { formatTime } from '../../../util/misc';


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomDate() {
  return (new Date(
    2021,
    getRandomInt(11),
    getRandomInt(25),
    getRandomInt(23),
    getRandomInt(59),
    getRandomInt(59)
  )).toISOString();
}

const LIST_RESP = [...Array(8)].map((_, idx) => ({
  id: idx + 1,
  title: `Ticket #${idx + 1}`,
  description: `Description for Ticket #${idx + 1}`,
  createdAt: getRandomDate(),
  updatedAt: getRandomDate(),
  done: Boolean(Math.round(Math.random()))
}));

it('All ToDos page', async () => {
  jest
    .spyOn(apiService, 'listToDos')
    .mockResolvedValue(LIST_RESP);
  jest
    .spyOn(apiService, 'updateToDo')
    .mockImplementation((id, data) => {
      const toUpdate = LIST_RESP.find(item => item.id === id);
      return Promise.resolve({ ...toUpdate, ...data });
    });

  const { getByText, container } = renderWithRouter(
    <AllToDos />, { initialEntries: ['/to_dos'] }
  );

  await waitForElementToBeRemoved(() => container.querySelector('.td-spinner'));

  for (const item of LIST_RESP) {
    const cardTitle = getByText(item.title);
    const card = cardTitle.parentElement;
    const cardScope = within(card);
    expect(cardScope.queryByText(`Created: ${formatTime(item.createdAt)}`)).toBeInTheDocument();
    expect(cardScope.queryByText(`Updated: ${formatTime(item.updatedAt)}`)).toBeInTheDocument();

    const doneToggle = cardScope.getByRole('button');
    expect(
      doneToggle.getAttribute('aria-label')
    ).toBe(item.done ? 'Mark as pending' : 'Mark as done');

    fireEvent.click(doneToggle);
    await waitFor(() => {
      expect(doneToggle.hasAttribute('disabled')).toBeFalsy();
    });

    expect(
      doneToggle.getAttribute('aria-label')
    ).toBe(!item.done ? 'Mark as pending' : 'Mark as done');
  }
});