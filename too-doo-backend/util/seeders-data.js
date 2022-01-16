const USERS = [
  { username: 'Jack Sparrow', password: '123' },
  { username: 'Hector Barbossa', password: '456' },
  { username: 'William Turner', password: '789' },
  { username: 'The Kraken', password: '0ab' }
];

const TO_DOS = [
  {
    title: 'Get some rum',
    description: 'Bring a bottle or two from the hold',
    done: true,
    user_id: 1
  },
  {
    title: 'Collect all the gold pieces',
    description: 'Just a single one left',
    done: false,
    user_id: 2
  },
  {
    title: 'Get the Black Pearl',
    description: 'The crew chose me!',
    done: true,
    user_id: 2
  },
  {
    title: 'Destroy every human being',
    description: '(Consume them)',
    done: false,
    user_id: 4
  }
];

const AUTH_TOKENS = [{
  key: 'd80c38a66b309b660401d9096b6d1272713e1be0',
  user_id: 2
}];

module.exports = {
  USERS, TO_DOS, AUTH_TOKENS
};