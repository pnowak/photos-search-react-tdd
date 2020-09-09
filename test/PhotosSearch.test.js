import React from 'react';
import { createContainer } from './helpers';
import {
  PhotosSearch,
} from '../src/PhotosSearch';

describe('PhotosSearch', () => {
  let container, element, render;

  beforeEach(() => {
    ({
      container,
      element,
      render
    } = createContainer());
  });

  it('renders a div with the right id', () => {
    render(<PhotosSearch />, container);

    expect(element('div#photosSearch')).not.toBeNull();
  });

  it('has a search input element', () => {
    render(<PhotosSearch />, container);

    expect(element('input[type="search"]')).not.toBeNull();
  });
});
