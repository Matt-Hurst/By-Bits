const axios = require('axios');

exports.loginController = async (req, res) => {
  try {
    const { password, username } = req.body;
    if (!password || !username) throw new Error();
    const { data } = await axios.post(
      'https://api.bybits.co.uk/auth/token',
      {
        password,
        username,
        type: 'USER_PASSWORD_AUTH',
      },
      {
        headers: {
          environment: 'mock',
          'Content-type': 'application/json',
        },
      }
    );
    const axiosResult = await axios.get(
      'https://api.bybits.co.uk/policys/details',
      {
        headers: {
          environment: 'mock',
          Authorization: `Bearer ${data.access_token}`,
          'Content-type': 'application/json',
        },
      }
    );
    res
      .status(200)
      .cookie('access_token', data.access_token, {
        maxAge: 1000 * 60 * 15,
        sameSite: 'Strict',
        secure: process.env.NODE_ENV ? true : false,
      })
      .send(axiosResult.data);
  } catch (error) {
    res.status(403).send({ msg: 'Username or password incorrect' });
  }
};

exports.getPolicyController = async (req, res) => {
  try {
    const { access_token } = req.cookies;
    if (!access_token) throw new Error();
    const axiosResult = await axios.get(
      'https://api.bybits.co.uk/policys/details',
      {
        headers: {
          environment: 'mock',
          Authorization: `Bearer ${access_token}`,
          'Content-type': 'application/json',
        },
      }
    );
    res.send(axiosResult.data);
  } catch (error) {
    res.send({ msg: 'Unauthenticated' });
  }
};
