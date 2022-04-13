import * as tf from '@tensorflow/tfjs';

const modelUrl = 'localstorage://aiModel';
const model = await tf.loadLayersModel(modelUrl);

export function predict(input) {
    const inputTensor = tf.tensor([input]);
    const result = model.predict(inputTensor);
    const probability = result.dataSync()[0];
    return probability;
}
