import {parentPort} from 'worker_threads';

// n should be received from main thread
export const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

export const sendResult = () => {
  parentPort.once('message', (message) => {
    try {
      parentPort.postMessage(
        {
          status: 'resolved',
          data: nthFibonacci(message)
        }
      );
    } catch (err) {
      parentPort.postMessage(
        {
          status: 'error',
          data: null
        }
      );
    }
  });
};

sendResult();
