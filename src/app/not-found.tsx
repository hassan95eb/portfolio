"use client";
import { useRouter } from "next/navigation";

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 overflow-hidden relative flex items-center justify-center px-4">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
        <div className="particle particle-6"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl w-full">
        <div className="text-center space-y-8 animate-fadeInUp">
          {/* Animated SVG Illustration */}
          <div className="flex justify-center mb-8">
            <svg
              className="w-64 h-64 md:w-80 md:h-80 animate-float"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Lost Astronaut Illustration */}
              <defs>
                <linearGradient
                  id="astronautGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
              </defs>

              {/* Helmet */}
              <circle
                cx="100"
                cy="80"
                r="35"
                fill="url(#astronautGradient)"
                className="animate-pulse"
                style={{ animationDuration: "3s" }}
              />
              <circle cx="100" cy="80" r="30" fill="#1e1b4b" opacity="0.8" />

              {/* Visor Reflection */}
              <ellipse
                cx="95"
                cy="75"
                rx="12"
                ry="8"
                fill="#60a5fa"
                opacity="0.6"
                className="animate-pulse"
                style={{ animationDuration: "2s" }}
              />

              {/* Body */}
              <rect
                x="75"
                y="110"
                width="50"
                height="60"
                rx="10"
                fill="url(#astronautGradient)"
              />

              {/* Arms */}
              <rect
                x="55"
                y="120"
                width="15"
                height="40"
                rx="7"
                fill="url(#astronautGradient)"
                className="animate-wave"
                style={{ transformOrigin: "62px 120px" }}
              />
              <rect
                x="130"
                y="120"
                width="15"
                height="40"
                rx="7"
                fill="url(#astronautGradient)"
              />

              {/* Legs */}
              <rect
                x="80"
                y="165"
                width="15"
                height="25"
                rx="7"
                fill="url(#astronautGradient)"
              />
              <rect
                x="105"
                y="165"
                width="15"
                height="25"
                rx="7"
                fill="url(#astronautGradient)"
              />

              {/* Floating Stars */}
              <g className="animate-twinkle">
                <circle cx="30" cy="40" r="2" fill="#fbbf24" />
                <circle cx="170" cy="60" r="2" fill="#fbbf24" />
                <circle cx="50" cy="150" r="2" fill="#fbbf24" />
                <circle cx="160" cy="140" r="2" fill="#fbbf24" />
              </g>

              {/* Question Marks */}
              <text
                x="140"
                y="50"
                fill="#ec4899"
                fontSize="24"
                className="animate-bounce"
                style={{ animationDelay: "0s" }}
              >
                ?
              </text>
              <text
                x="45"
                y="90"
                fill="#ec4899"
                fontSize="20"
                className="animate-bounce"
                style={{ animationDelay: "0.2s" }}
              >
                ?
              </text>
              <text
                x="150"
                y="120"
                fill="#ec4899"
                fontSize="18"
                className="animate-bounce"
                style={{ animationDelay: "0.4s" }}
              >
                ?
              </text>
            </svg>
          </div>

          {/* 404 Text with Animation */}
          <div className="relative">
            <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient">
              404
            </h1>
            <div className="absolute inset-0 blur-2xl opacity-50">
              <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                404
              </h1>
            </div>
          </div>

          {/* Error Message */}
          <div
            className="space-y-4 animate-fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Houston, We Have a Problem
            </h2>
            <p className="text-lg md:text-xl text-purple-200 max-w-2xl mx-auto">
              Looks like you&apos;ve drifted into uncharted space. The page
              you&apos;re looking for has been lost in the cosmos.
            </p>
          </div>

          {/* Action Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp"
            style={{ animationDelay: "0.6s" }}
          >
            <button
              onClick={() => router.push("/")}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg
                  className="w-5 h-5 transition-transform group-hover:-translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Return Home
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button
              onClick={() => router.back()}
              className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white font-semibold rounded-xl border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes wave {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-15deg);
          }
          75% {
            transform: rotate(15deg);
          }
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }

        @keyframes particleFloat {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -30px) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(240deg);
          }
          100% {
            transform: translate(0, 0) rotate(360deg);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-wave {
          animation: wave 2s ease-in-out infinite;
        }

        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }

        .particle-1 {
          width: 100px;
          height: 100px;
          background: linear-gradient(
            135deg,
            rgba(99, 102, 241, 0.3),
            rgba(168, 85, 247, 0.3)
          );
          top: 10%;
          left: 10%;
          animation: particleFloat 20s infinite ease-in-out;
        }

        .particle-2 {
          width: 150px;
          height: 150px;
          background: linear-gradient(
            135deg,
            rgba(168, 85, 247, 0.2),
            rgba(236, 72, 153, 0.2)
          );
          top: 60%;
          right: 10%;
          animation: particleFloat 25s infinite ease-in-out reverse;
        }

        .particle-3 {
          width: 80px;
          height: 80px;
          background: linear-gradient(
            135deg,
            rgba(59, 130, 246, 0.3),
            rgba(147, 51, 234, 0.3)
          );
          bottom: 20%;
          left: 15%;
          animation: particleFloat 18s infinite ease-in-out;
          animation-delay: -5s;
        }

        .particle-4 {
          width: 120px;
          height: 120px;
          background: linear-gradient(
            135deg,
            rgba(236, 72, 153, 0.2),
            rgba(239, 68, 68, 0.2)
          );
          top: 30%;
          right: 20%;
          animation: particleFloat 22s infinite ease-in-out reverse;
          animation-delay: -8s;
        }

        .particle-5 {
          width: 60px;
          height: 60px;
          background: linear-gradient(
            135deg,
            rgba(147, 51, 234, 0.3),
            rgba(59, 130, 246, 0.3)
          );
          bottom: 40%;
          right: 30%;
          animation: particleFloat 16s infinite ease-in-out;
          animation-delay: -3s;
        }

        .particle-6 {
          width: 90px;
          height: 90px;
          background: linear-gradient(
            135deg,
            rgba(168, 85, 247, 0.25),
            rgba(99, 102, 241, 0.25)
          );
          top: 50%;
          left: 5%;
          animation: particleFloat 24s infinite ease-in-out reverse;
          animation-delay: -10s;
        }
      `}</style>
    </div>
  );
}
