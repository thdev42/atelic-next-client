import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { API_BASE_URL } from "@/config/config";

const SingleNews = ({ news }) => {
  const router = useRouter();
  console.log(news, "NEWS DATA");

  const handleGoBack = () => {
    router.back();
  };

  const getYouTubeVideoId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const processRichTextContent = (htmlContent) => {
    if (!htmlContent) return "";

    return (
      htmlContent
        // H1 tags
        .replace(
          /<h1>/g,
          '<h1 class="text-3xl md:text-4xl font-bold text-gray-900 mt-12 mb-6 first:mt-0">'
        )
        // H2 tags
        .replace(
          /<h2>/g,
          '<h2 class="text-2xl md:text-3xl font-bold text-gray-900 mt-10 mb-4">'
        )
        // H3 tags
        .replace(
          /<h3>/g,
          '<h3 class="text-xl md:text-2xl font-semibold text-gray-900 mt-8 mb-3">'
        )
        // H4 tags
        .replace(
          /<h4>/g,
          '<h4 class="text-lg md:text-xl font-semibold text-gray-900 mt-6 mb-2">'
        )
        // H5 tags
        .replace(
          /<h5>/g,
          '<h5 class="text-base md:text-lg font-semibold text-gray-900 mt-4 mb-2">'
        )
        // H6 tags
        .replace(
          /<h6>/g,
          '<h6 class="text-sm md:text-base font-semibold text-gray-900 mt-4 mb-2">'
        )
        // Paragraph tags
        .replace(/<p>/g, '<p class="text-gray-700 leading-relaxed mb-6">')
        // Blockquote tags
        .replace(
          /<blockquote>/g,
          '<blockquote class="border-l-4 border-blue-500 pl-6 my-8 italic text-gray-600 text-lg bg-gray-50 py-4 rounded-r-lg">'
        )
        // Strong/Bold tags
        .replace(/<strong>/g, '<strong class="font-semibold text-gray-900">')
        // Em/Italic tags
        .replace(/<em>/g, '<em class="italic text-gray-700">')
        // Unordered list
        .replace(
          /<ul>/g,
          '<ul class="list-disc list-inside mb-6 space-y-2 text-gray-700">'
        )
        // Ordered list
        .replace(
          /<ol>/g,
          '<ol class="list-decimal list-inside mb-6 space-y-2 text-gray-700">'
        )
        // List items
        .replace(/<li>/g, '<li class="leading-relaxed">')
        // Links
        .replace(
          /<a /g,
          '<a class="text-blue-600 hover:text-blue-800 underline transition-colors" '
        )
        // Code tags
        .replace(
          /<code>/g,
          '<code class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">'
        )
        // Pre tags
        .replace(
          /<pre>/g,
          '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">'
        )
        // Table tags
        .replace(
          /<table>/g,
          '<table class="min-w-full table-auto border-collapse border border-gray-300 mb-6">'
        )
        .replace(/<thead>/g, '<thead class="bg-gray-50">')
        .replace(
          /<th>/g,
          '<th class="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-900">'
        )
        .replace(
          /<td>/g,
          '<td class="border border-gray-300 px-4 py-2 text-gray-700">'
        )
        // Horizontal rule
        .replace(/<hr>/g, '<hr class="border-t border-gray-300 my-8">')
        .replace(/<hr\/>/g, '<hr class="border-t border-gray-300 my-8" />')
    );
  };

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

  return (
    <div className="font-sora min-h-screen bg-white">
      {/* Hero Container */}
      <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
        <Image
          src={`${API_BASE_URL}${news.images[0].url}`}
          alt={
            news?.image?.alternativeText ||
            news?.title ||
            "News article hero image"
          }
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col">
          {/* Back Arrow */}
          <div className="container mx-auto px-4 pt-6 md:pt-8">
            <button
              onClick={handleGoBack}
              className="flex items-center pb-3 space-x-2 text-white hover:text-gray-200 transition-colors group"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 transform group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="text-sm md:text-base font-medium">Back</span>
            </button>
          </div>

          {/* Existing Hero Content */}
          <div className="flex-1 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 leading-tight">
                  {news?.title || "News Title"}
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mb-4">
                  {news?.description || "News description"}
                </p>
                <div className="flex items-center justify-center text-gray-300 text-sm md:text-base">
                  {/* <span>{news?.date || "Date not available"}</span> */}
                  {/* <span className="mx-2">•</span> */}
                  {/* <span>{news?.category || "Uncategorized"}</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Centered */}
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg md:prose-xl max-w-none">
            {/* Rich Text Content */}
            {news?.longDescription && (
              <div
                dangerouslySetInnerHTML={{
                  __html: processRichTextContent(news.longDescription),
                }}
              />
            )}

            {/* YouTube Videos Section */}
            {news?.youtubeUrl && news.youtubeUrl.length > 0 && (
              <>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
                  Related Videos
                </h2>
                <div className="space-y-6 mb-8">
                  {news.youtubeUrl.map((video, index) => {
                    const videoId = getYouTubeVideoId(video.videoUrl);
                    return (
                      <div
                        key={video.id || index}
                        className="bg-gray-50 rounded-lg p-4"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          {video.title}
                        </h3>
                        <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden">
                          <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* News Info Card */}
            {/* <div className="bg-gray-50 rounded-lg p-6 mt-12">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Article Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Category:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {news?.category || "General News"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Published:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {news?.date || "Date not available"}
                  </span>
                </div>
                {news?.youtubeUrl && news.youtubeUrl.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Videos:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {news.youtubeUrl.length}
                    </span>
                  </div>
                )}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleNews;
