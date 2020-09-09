import ReactDOM from 'react-dom';

export const createContainer = () => {
  const container = document.createElement('div');
  const element = selector => container.querySelector(selector);

  return {
    render: component => ReactDOM.render(component, container),
    container,
    element
  };
};
