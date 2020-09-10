import React from 'react';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import 'whatwg-fetch';
import { createContainer } from './helpers';
import {
  PhotosSearchResult
} from '../src/PhotosSearchResult';

const searchTerm = 'office';

describe('PhotosSearchResult', () => {
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation(init => [init, setState]);

  let container, element, elements, render;

  beforeEach(() => {
    ({
      container,
      element,
      elements,
      render
    } = createContainer());
  });

  afterEach(() => {
    jest.clearAllMocks();
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
      render(<PhotosSearchResult value={searchTerm} />, container);
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
      render(<PhotosSearchResult value={searchTerm} />, container);
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
});
