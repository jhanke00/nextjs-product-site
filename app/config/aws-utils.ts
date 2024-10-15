import AWS from 'aws-sdk';
import crypto from 'crypto';

AWS.config.update({ region: 'us-east-2' });
const cognito = new AWS.CognitoIdentityServiceProvider();
const clientId = '7m8rq95bergnn4e4suug72g5fo';
const clientSecret = '1mgjhel6hls7t4llbfgqfm54vffkrh33vr8p1iof4edtmjea0eq9'; // Replace with your actual client secret

function generateSecretHash(username: string, clientId: string, clientSecret: string): string {
  return crypto
    .createHmac('SHA256', clientSecret)
    .update(username + clientId)
    .digest('base64');
}

export async function signUp(username: string, password: string, email: string) {
  const secretHash = generateSecretHash(username, clientId, clientSecret);

  const params = {
    ClientId: clientId,
    Username: username,
    Password: password,
    SecretHash: secretHash,
    UserAttributes: [
      {
        Name: 'email',
        Value: email,
      },
    ],
  };

  try {
    const data = await cognito.signUp(params).promise();
    console.log(data);
    return { success: true, data };
  } catch (error: any) {
    console.log(error);
    return { success: false, error: error?.message };
  }
}

export async function verification(username: string, verificationCode: string) {
  const secretHash = generateSecretHash(username, clientId, clientSecret);

  const params = {
    ClientId: clientId,
    Username: username,
    ConfirmationCode: verificationCode,
    SecretHash: secretHash,
  };

  try {
    const data = await cognito.confirmSignUp(params).promise();
    console.log(data);
    return { success: true, data };
  } catch (error: any) {
    console.log(error);
    return { success: false, error: error?.message };
  }
}

export async function resendVerificationCode(username: string) {
  const secretHash = generateSecretHash(username, clientId, clientSecret);
  const params = {
    ClientId: clientId,
    Username: username,
    SecretHash: secretHash,
  };

  try {
    const data = await cognito.resendConfirmationCode(params).promise();
    console.log('Verification code resent:', data);
    return { success: true, data };
  } catch (error: any) {
    console.log('Error resending verification code:', error);
    return { success: false, error: error?.message };
  }
}

export async function login(username: string, password: string) {
  const secretHash = generateSecretHash(username, clientId, clientSecret);

  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: clientId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
      SECRET_HASH: secretHash,
    },
  };

  try {
    const data = await cognito.initiateAuth(params).promise();
    console.log('Login successful:', data);
    return { success: true, token: data.AuthenticationResult?.AccessToken, data };
  } catch (error: any) {
    console.log('Login error:', error);
    return { success: false, error: error?.message };
  }
}
