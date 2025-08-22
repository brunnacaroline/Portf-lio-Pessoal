import http from 'k6/http';

// Import the sleep function to introduce delays. From this point, you can use the `sleep` function to introduce delays in your test script.
import { sleep } from 'k6';

export const options = {

    iterations: 10,
  };

export default function () {
  // aqui é o teste
  http.get('http://localhost:3001/login');
  // Sleep for 1 second to simulate real-world usage
  sleep(1);
}