import 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';
// import NewDeckForm from '../../../components/decks/NewDeckForm';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// Helper function - uses act() under the hood from react-dom/test-utils
const actImmediate = (wrapper) =>
  renderer.act(
    () =>
      new Promise((resolve) => {
        setImmediate(() => {
          wrapper.update();
          resolve();
        });
      })
  );

const setup = ({ handleSubmit = jest.fn() } = {}) => {
  return renderer.create(<NewDeckForm onSubmit={handleSubmit} />);
};

describe('components::decks::NewDeckForm', () => {
  describe('submission', () => {
    it.skip('calls onSubmit with correct values when its valid', async () => {
      const handleSubmit = jest.fn();
      const { root } = setup({ handleSubmit });

      root.findByType(Button).props.onPress();
      await actImmediate(root);

      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
