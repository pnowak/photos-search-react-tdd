import React from 'react';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import 'whatwg-fetch';
import { createContainer, fetchResponseOk } from './helpers';
import {
  PhotosSearchResult
} from '../src/PhotosSearchResult';

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
    name: 'ABC',
    profile_image: {
      small: 'https://images.unsplash.com/profile-1593436914961-40416e2f9c5dimage?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32'
    },
    twitter_username: 'abc'
  },
  description: 'bla bla'
};

describe('PhotosSearchResult', () => {
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation(init => [init, setState]);

  let container, element, elements, render, renderAndWait;

  beforeEach(() => {
    ({
      container,
      element,
      elements,
      render,
      renderAndWait
    } = createContainer());
    jest.spyOn(window, 'fetch').mockReturnValue(fetchResponseOk(photoResult));
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  it('renders a div with the right id', () => {
    render(<PhotosSearchResult />, container);

    expect(element('div#photosSearchResult')).not.toBeNull();
  });

  it('has a search input element with a placeholder', () => {
    render(<PhotosSearchResult />, container);

    expect(element('input[type="search"]')).not.toBeNull();
    expect(element('input[type="search"]').getAttribute('placeholder')).toMatch('Search free high-resolution photos');
  });

  it.skip('renders a h2 element with the searched value', () => {
    act(() => {
      render(<PhotosSearchResult />, container);
    });
    
    const input = element('input');

    act(() => {
      ReactTestUtils.Simulate.change(input, searchTerm);
    });

    act(() =>
      ReactTestUtils.Simulate.keyDown(input, {
        key: 'Enter',
        keyCode: 13,
        which: 13,
      })
    );

    expect(element('h2#searchedTerm')).not.toBeNull();
    expect(element('h2#searchedTerm').textContent).toEqual(searchTerm);
  });

  it.skip('renders a div\'s in an li\'s with the fetched images fit to searched term', () => {
    act(() => {
      render(<PhotosSearchResult />, container);
    });

    const input = element('input');

    act(() => {
      ReactTestUtils.Simulate.change(input, searchTerm);
    });

    act(() =>
      ReactTestUtils.Simulate.keyDown(input, {
        key: 'Enter',
        keyCode: 13,
        which: 13,
      })
    );

    expect(element('div#photos')).not.toBeNull();
    expect(elements('ul li').length).toEqual(10);
  });

  it.skip('renders a div with single image on modal window when div is clicked', async () => {
    window.fetch.mockReturnValue(fetchResponseOk(photoResult));
    await renderAndWait (< PhotosSearchResult />);

    const input = element('input');

    act(() => {
      ReactTestUtils.Simulate.change(input, searchTerm);
    });

    await act(async () =>
      ReactTestUtils.Simulate.keyDown(input, {
        key: 'Enter',
        keyCode: 13,
        which: 13,
      })
    );

    const firstPhoto = elements('div#photos ul li img')[0];

    act(() =>
      ReactTestUtils.Simulate.click(firstPhoto)
    );

    await act(async () => ReactTestUtils.Simulate.click(firstPhoto));

    expect(firstPhoto.getAttribute('className')).toMatch('modal');
  });
});
