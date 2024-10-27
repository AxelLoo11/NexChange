"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const avatars = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"]; // List of available avatars

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Perform registration logic here (e.g., API call)
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, nickname, selectedAvatar }),
      });

      if (!res.ok) {
        throw new Error('Registry Failed');
      }

      router.push('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/home-bg.jpg')" }}
    >
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nickname">
              Nickname
            </label>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Select Avatar</label>
            <div className="flex space-x-4">
              {avatars.map((avatar) => (
                <button
                  key={avatar}
                  type="button"
                  className={`border-2 rounded-full overflow-hidden ${selectedAvatar === avatar ? "border-yellow-600" : "border-gray-300"
                    }`}
                  onClick={() => setSelectedAvatar(avatar)}
                >
                  <Image
                    src={`/images/${avatar}`}
                    alt={`Avatar ${avatar}`}
                    width={64}
                    height={64}
                    className="object-cover rounded-full"
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white font-bold py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-200"
            >
              Register
            </button>
          </div>
        </form>
        <div className="mt-6">
          <button
            onClick={() => router.back()}
            className="text-yellow-600 hover:text-yellow-500 underline"
          >
            Return to previous page
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
