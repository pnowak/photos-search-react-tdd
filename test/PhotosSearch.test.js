import React from 'react';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import 'whatwg-fetch';
import { createContainer, fetchResponseOk } from './helpers';
import {
  PhotosSearch,
} from '../src/PhotosSearch';

const searchTerm = 'office';

const photoResult = {
  id: 'g2E2NQ5SWSU',
  links: {
    html: 'https://unsplash.com/photos/abc'
  },
  tags: [
    {
      title: 'abc'
    }
  ],
  user: {
    first_name: 'ABC',
    profile_image: {
      small: 'https://images.unsplash.com/profile-1593436914961-40416e2f9c5dimage?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32'
    },
    twitter_username: 'abc'
  }

};

describe('PhotosSearch', () => {
  let container, element, render;

  beforeEach(() => {
    ({
      container,
      element,
      render
    } = createContainer());
    jest.spyOn(window, 'fetch').mockReturnValue(fetchResponseOk(photoResult));
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  it('renders a div with the right id', () => {
    render(<PhotosSearch />, container);

    expect(element('div#photosSearch')).not.toBeNull();
  });

  it('has a search input element with a placeholder', () => {
    render(<PhotosSearch />, container);

    expect(element('input[type="search"]')).not.toBeNull();
    expect(element('input[type="search"]').getAttribute('placeholder')).toMatch('Search free high-resolution photos');
  });

  it.skip('performs search when Enter is pressed', async () => {
    render(<PhotosSearch />, container);

    act(() => {
      ReactTestUtils.Simulate.change(element('input'), searchTerm);
    });

    await act(async () =>
      ReactTestUtils.Simulate.keyDown(element('input'), {
        key: 'Enter',
        keyCode: 13,
        which: 13,
      })
    );

    expect(window.fetch).toHaveBeenLastCalledWith(
      `https://api.unsplash.com/search/photos?page=1&query=${searchTerm}`,
      expect.anything()
    );
  })
});
