import { API_BASE_URL } from "@/config/config";
import Image from "next/image";
import { useRouter } from "next/router";

export default function BlogPage({ blog }) {
  const router = useRouter();

  console.log(blog, "BLOG DATA");

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

  return (
    <div className="font-sora min-h-screen bg-white">
      {/* Hero Container - Dynamic Height Based on Content */}
      <div className="relative w-full min-h-[400px] md:min-h-[500px] flex flex-col">
        {/* Background Image Layer */}
        <div className="absolute inset-0">
          <Image
            src={`${API_BASE_URL}${blog?.image?.url}`}
            alt={
              blog?.image?.alternativeText ||
              blog?.title ||
              "Blog post hero image"
            }
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-30" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col flex-1 px-4 sm:px-8 2xl:px-[178px] md:px-12 lg:px-[100px]">
          {/* Back Button */}
          <div className="container mx-auto pb-3 px-4 pt-6 md:pt-8">
            <button
              onClick={handleGoBack}
              className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors group"
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

          {/* Hero Content - This will determine the height */}
          <div className="flex-1 flex items-center py-8 md:py-12 lg:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl">
                <h1 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-white mb-4 leading-tight">
                  {blog?.title || "Blog Title"}
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mb-4 max-w-3xl">
                  {blog?.description || "Blog description"}
                </p>
                <div className="flex flex-wrap items-center text-gray-300 text-sm md:text-base gap-2">
                  <span>By {blog?.author || "Anonymous"}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{blog?.date || "Date not available"}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{blog?.category?.title || "Uncategorized"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body Copy with Sidebar Layout */}
      <div className="container px-4 sm:px-8 2xl:px-[178px] md:px-12 lg:px-[100px] mx-auto py-8 md:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Main Content - Takes up 3/4 of the width */}
            <div className="lg:col-span-3">
              <div className="prose prose-lg md:prose-xl max-w-none">
                {/* Rich Text Content */}
                {blog?.longdescription && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: processRichTextContent(blog.longdescription),
                    }}
                  />
                )}

                {/* YouTube Videos Section */}
                {blog?.youtubeUrl && blog.youtubeUrl.length > 0 && (
                  <>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
                      Related Videos
                    </h2>
                    <div className="space-y-6 mb-8">
                      {blog.youtubeUrl.map((video, index) => {
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

                {/* PDFs Section */}
                {blog?.pdf && blog.pdf.length > 0 && (
                  <>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
                      Related Resources
                    </h2>
                    <div className="bg-gray-50 rounded-lg p-6 mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Download PDF Documents
                      </h3>
                      <div className="space-y-4">
                        {blog.pdf.map((pdfFile, index) => (
                          <div
                            key={pdfFile.id || index}
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors space-y-3 sm:space-y-0"
                          >
                            <div className="flex items-start space-x-3 min-w-0 flex-1">
                              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg
                                  className="w-5 h-5 text-red-600"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="font-medium text-gray-900 break-words text-sm sm:text-base">
                                  {pdfFile.name || "Document"}
                                </h4>
                                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                  PDF Document •{" "}
                                  {(pdfFile.size / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                            <div className="flex-shrink-0 w-full sm:w-auto">
                              <a
                                href={`${API_BASE_URL}${pdfFile.url}`}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                              >
                                Download
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Author Sidebar - Takes up 1/4 of the width */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Author Info */}
                {blog?.avatar && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      About the Author
                    </h3>
                    <div className="flex items-center space-x-4">
                      <div className="relative flex-shrink-0 w-16 h-16 rounded-full overflow-hidden">
                        <Image
                          src={`${API_BASE_URL}${blog?.avatar?.url}`}
                          alt={
                            blog.avatar.alternativeText ||
                            blog.author ||
                            "Author"
                          }
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {blog.author}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {blog?.category?.title} Expert
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Blog Info */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Article Info
                  </h3>
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                      <span className="text-sm text-gray-600 flex-shrink-0">
                        Category:
                      </span>
                      <span className="text-sm font-medium text-gray-900 text-left sm:text-right break-words">
                        {blog?.category?.title}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                      <span className="text-sm text-gray-600 flex-shrink-0">
                        Published:
                      </span>
                      <span className="text-sm font-medium text-gray-900 text-left sm:text-right break-words">
                        {blog?.date}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                      <span className="text-sm text-gray-600 flex-shrink-0">
                        Author:
                      </span>
                      <span className="text-sm font-medium text-gray-900 text-left sm:text-right break-words">
                        {blog?.author}
                      </span>
                    </div>
                    {blog?.youtubeUrl && blog.youtubeUrl.length > 0 && (
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                        <span className="text-sm text-gray-600 flex-shrink-0">
                          Videos:
                        </span>
                        <span className="text-sm font-medium text-gray-900 text-left sm:text-right">
                          {blog.youtubeUrl.length}
                        </span>
                      </div>
                    )}
                    {blog?.pdf && blog.pdf.length > 0 && (
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                        <span className="text-sm text-gray-600 flex-shrink-0">
                          Resources:
                        </span>
                        <span className="text-sm font-medium text-gray-900 text-left sm:text-right">
                          {blog.pdf.length} PDFs
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
