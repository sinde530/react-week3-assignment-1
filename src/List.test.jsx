import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClickDelete = jest.fn();
  const listRender = (tasks) => render((
    <List tasks={tasks} onClickDelete={handleClickDelete} />
  ));

  context('without tasks', () => {
    const tasks = [];

    it('show "할 일이 없어요!"', () => {
      const { container } = listRender(tasks);

      expect(container).toHaveTextContent('할 일이 없어요!');
      expect(container).not.toHaveTextContent('완료');
    });
  });

  context('with tasks', () => {
    const tasks = [
      { id: 1, title: '첫번째 할 일' },
      { id: 2, title: '두번째 할 일' },
    ];

    it('show tasks list', () => {
      const { getAllByRole } = listRender(tasks);

      const taskTitles = getAllByRole('listitem');

      taskTitles.forEach((listItem, index) => {
        expect(listItem).toHaveTextContent(tasks[index].title);
      });
    });

    it('show delete button', () => {
      const { container, getAllByText } = listRender(tasks);

      expect(container).toHaveTextContent('완료');

      expect(handleClickDelete).not.toBeCalled();
      const deleteButtons = getAllByText('완료');
      deleteButtons.forEach((deleteButton) => fireEvent.click(deleteButton));
      expect(handleClickDelete).toBeCalledTimes(deleteButtons.length);
    });
  });
});
