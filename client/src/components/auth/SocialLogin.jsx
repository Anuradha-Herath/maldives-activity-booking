import React from 'react';

const SocialLogin = ({ onGoogleLogin, onFacebookLogin }) => {
  return (
    <div className="mt-3 grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={onGoogleLogin}
        className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#EA4335"
            d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"
          />
          <path
            fill="#34A853"
            d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A12.337 12.337 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"
          />
          <path
            fill="#4A90E2"
            d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"
          />
          <path
            fill="#FBBC05"
            d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"
          />
        </svg>
        <span>Google</span>
      </button>

      <button
        type="button"
        onClick={onFacebookLogin}
        className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#1877F2"
            d="M24 12.073c0-5.988-4.85-10.848-10.824-10.848-6.02 0-10.901 4.86-10.901 10.848 0 5.42 3.954 9.91 9.115 10.729v-7.588H8.073v-3.14h3.317V9.622c0-3.292 1.954-5.113 4.946-5.113 1.432 0 2.93.257 2.93.257v3.24h-1.65c-1.625 0-2.133 1.012-2.133 2.049v2.458h3.632l-.58 3.141h-3.052v7.588c5.16-.82 9.116-5.308 9.116-10.729Z"
          />
        </svg>
        <span>Facebook</span>
      </button>
    </div>
  );
};

export default SocialLogin;
