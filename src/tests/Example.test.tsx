import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import ProofOfDelivery from '../components/ProofOfDelivery';

jest.mock('../bridges/CameraModule', () => ({
  openCamera: jest.fn(() => Promise.resolve('file://mocked_image_path.jpg')),
}));

describe('ProofOfDelivery Component', () => {
  it('renders correctly', () => {
    const {getByText, getByPlaceholderText} = render(<ProofOfDelivery />);

    expect(getByText('Capture Proof')).toBeTruthy();
    expect(getByPlaceholderText('Describe condition')).toBeTruthy();
    expect(getByPlaceholderText('Rate (1-5)')).toBeTruthy();
    expect(getByText('Submit Proof')).toBeTruthy();
  });

  it('captures proof using the camera', async () => {
    const {getByText, getByTestId} = render(<ProofOfDelivery />);

    const captureButton = getByText('Capture Proof');
    fireEvent.press(captureButton);

    await waitFor(() => {
      expect(getByTestId('captured-image')).toBeTruthy();
    });
  });

  it('handles input for condition and rating', () => {
    const {getByPlaceholderText} = render(<ProofOfDelivery />);

    const conditionInput = getByPlaceholderText('Describe condition');
    const ratingInput = getByPlaceholderText('Rate (1-5)');

    fireEvent.changeText(conditionInput, 'Product in good condition');
    fireEvent.changeText(ratingInput, '5');

    expect(conditionInput.props.value).toBe('Product in good condition');
    expect(ratingInput.props.value).toBe('5');
  });

  it('submits proof with correct data', () => {
    const {getByText, getByPlaceholderText} = render(<ProofOfDelivery />);

    const conditionInput = getByPlaceholderText('Describe condition');
    const ratingInput = getByPlaceholderText('Rate (1-5)');
    const submitButton = getByText('Submit Proof');

    fireEvent.changeText(conditionInput, 'Product is excellent');
    fireEvent.changeText(ratingInput, '5');
    fireEvent.press(submitButton);

    // Mocked console.log to verify the submission
    jest.spyOn(console, 'log');
    expect(console.log).toHaveBeenCalledWith({
      imageUri: 'file://mocked_image_path.jpg',
      condition: 'Product is excellent',
      rating: 5,
    });
  });
});
