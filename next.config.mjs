/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "api.tsx", "api.ts"],
  images: {
    remotePatterns: [
      {
        hostname: "scontent.cdninstagram.com",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Configuração para arquivos de vídeo
    config.module.rules.push({
      test: /\.(mp4|webm|ogg)$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: `/_next/static/videos/`,
          outputPath: `${isServer ? "../" : ""}static/videos/`,
          name: "[name].[hash].[ext]",
        },
      },
    });

    return config;
  },
};

export default nextConfig;
