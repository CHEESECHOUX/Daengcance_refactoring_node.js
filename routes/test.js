const { getLogin } = require('../controllers/auth');

describe('getLogin', () => {
  const res = {
    render: jest.fn(() => res),
  };

  test('로그인 되어 있으면 getLogin이 res.render를 호출해야함', () => {
    const req = {
      session: jest.fn(() => true),
      flash: jest.fn(() => true)
    };
    getLogin(req, res);
    expect(res.render).toBeCalledTimes(1);
  });
});