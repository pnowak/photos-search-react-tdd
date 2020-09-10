import React from 'react';
import 'whatwg-fetch';
import { createContainer } from './helpers';
import {
  PhotosSearchResult
} from '../src/PhotosSearchResult';

describe('PhotosSearchResult', () => {
  let container, element, render;

  beforeEach(() => {
    ({
      container,
      element,
      render
    } = createContainer());
  });

  it('renders a div with the right id', () => {
    render(<PhotosSearchResult />, container);

    expect(element('div#photosSearchResult')).not.toBeNull();
  });
});
